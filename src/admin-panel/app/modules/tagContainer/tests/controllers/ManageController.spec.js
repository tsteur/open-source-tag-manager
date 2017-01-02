/**
 * Copyright (C) 2015 Digimedia Sp. z.o.o. d/b/a Clearcode
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

 /* global describe: false, jasmine: false, beforeEach: false, inject: false, it: false, expect: false */

describe('Unit: ManageController', () => {
    let ManageController, currentContainer, container, containerResource, timeout, queryResponse, containerRemoveSuccessful, publishedStatus;

    beforeEach(module('clearcode.tm.tagContainer', ($provide) => {
        container = {};

        currentContainer = {
            disableDebugMode: jasmine.createSpy('disableDebugMode').and.returnValue({
                then: () => 'disableDebugMode called'
            })
        };

        publishedStatus = {
            getPublishedStatusForContainer: jasmine.createSpy('getPublishedStatusForContainer').and.returnValue({
                then: () => 'getPublishedStatusForContainer called'
            })
        };

        containerRemoveSuccessful = true;

        queryResponse = {
            total: 0,
            data: []
        };

        containerResource = {
            query: jasmine.createSpy('query').and.returnValue({
                then: (successCallback) => {
                    successCallback(queryResponse);
                    return 'query called';
                }
            })
        };

        timeout = callback => {
            callback.apply(ManageController);
        };
        timeout.cancel = jasmine.createSpy('cancel').and.returnValue({});

        $provide.value('clearcode.tm.tagContainer.currentContainer', currentContainer);
        $provide.value('clearcode.tm.tagContainer.containerResource', containerResource);
        $provide.value('clearcode.tm.tagContainer.publishedStatus', publishedStatus);
        $provide.value('$timeout', timeout);
    }));

    beforeEach(inject(['$controller', '$rootScope', ($controller, $rootScope) => {
        let $scope = $rootScope.$new();

        ManageController = $controller('clearcode.tm.tagContainer.ManageController', {
            $scope: $scope
        });
    }]));

    it('should be defined', () => {
        expect(ManageController).toBeDefined();
    });

    it('should get call disableDebugMode method from currentContainer in constructor', () => {
        expect(currentContainer.disableDebugMode).toHaveBeenCalled();
    });

    describe('when call removeContainer method', () => {
        beforeEach(() => {
            let removePromise = {
                then: (successCallback, failureCallback) => {
                    if (containerRemoveSuccessful) {
                        successCallback();
                    } else {
                        failureCallback();
                    }
                    return 'remove called';
                }
            };
            container = {
                remove: jasmine.createSpy('remove').and.returnValue(removePromise)
            };
        });


        it('should call remove method on Container object', () => {
            ManageController.removeContainer(container);
            expect(container.remove).toHaveBeenCalled();
        });

        it('should refresh container list on success', () => {
            spyOn(ManageController.tableParams, 'reload');
            ManageController.removeContainer(container);
            expect(ManageController.tableParams.reload).toHaveBeenCalled();
        });

        it('should refresh container list on failure', () => {
            containerRemoveSuccessful = false;
            spyOn(ManageController.tableParams, 'reload');
            ManageController.removeContainer(container);
            expect(ManageController.tableParams.reload).toHaveBeenCalled();
        });
    });

    describe('when call getPublishedStatus method', () => {
        it('should call getPublishedStatusForContainer method on publishedStatus object', () => {
            ManageController.getPublishedStatus(container);

            expect(publishedStatus.getPublishedStatusForContainer).toHaveBeenCalled();
        });
    });

    describe('when call getData method of tableParams', () => {
        it('should call query method on containerResource object', () => {
            let settings = ManageController.tableParams.settings(),
                params = {
                    url: jasmine.createSpy('url').and.returnValue({
                        then: () => 'url called'
                    }),
                    total: jasmine.createSpy('total').and.returnValue({
                        then: () => 'total called'
                    })
                },
                defer = {
                    resolve: jasmine.createSpy('resolve').and.returnValue({
                        then: () => 'resolve called'
                    })
                };
            settings.getData(defer, params);

            expect(containerResource.query).toHaveBeenCalled();
            expect(params.url).toHaveBeenCalled();
            expect(defer.resolve).toHaveBeenCalled();
        });
    });

    describe('when call search method', () => {
        beforeEach(() => {
            ManageController.currentFilterQuery = '';
            ManageController.filterQuery = ' ';
        });

        it('should go back to first page', () => {
            spyOn(ManageController.tableParams, 'page');
            ManageController.search();
            expect(ManageController.tableParams.page).toHaveBeenCalledWith(1);
        });

        it('should refresh data', () => {
            spyOn(ManageController.tableParams, 'reload');
            ManageController.search();
            expect(ManageController.tableParams.reload).toHaveBeenCalled();
        });
    });

    describe('when call searchDebounced method', () => {
        beforeEach(() => {
            ManageController.currentFilterQuery = '';
            ManageController.filterQuery = ' ';
        });

        it('should cancel current debounce', () => {
            ManageController.searchDebounced();
            expect(timeout.cancel).toHaveBeenCalled();
        });

        it('should call search method', () => {
            spyOn(ManageController, 'search');
            ManageController.searchDebounced();
            expect(ManageController.search).toHaveBeenCalled();
        });

        it('should not refresh data if current query is same as previous', () => {
            ManageController.filterQuery = ManageController.currentFilterQuery;
            spyOn(ManageController, 'search');
            ManageController.searchDebounced();
            expect(ManageController.search).not.toHaveBeenCalled();
        });
    });

    describe('when call resetSearchQuery method', () => {
        it('should call search method', () => {
            spyOn(ManageController, 'search');
            ManageController.resetSearchQuery();
            expect(ManageController.search).toHaveBeenCalled();
        });

        it('should reset current search query', () => {
            ManageController.currentFilterQuery = '123';
            ManageController.resetSearchQuery();
            expect(ManageController.currentFilterQuery).toBe('');
        });
    });

    describe('when call useSearchByName method', () => {
        it('should return true if filter query is present', () => {
            ManageController.currentFilterQuery = 'search term';
            expect(ManageController.useSearchByName()).toBe(true);
        });

        it('should return false if filter query is not present', () => {
            ManageController.currentFilterQuery = undefined;
            expect(ManageController.useSearchByName()).toBe(false);
        });

        it('should return false if filter query is empty', () => {
            ManageController.currentFilterQuery = '';
            expect(ManageController.useSearchByName()).toBe(false);
        });
    });
});
