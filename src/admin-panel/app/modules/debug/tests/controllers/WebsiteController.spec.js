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

describe('Unit: WebsitesController', () => {
    var WebsitesController, websiteResource, container, $scope, currentContainer, hasPermission = true;

    beforeEach(module('clearcode.tm.debug', ($provide) => {
        container = {};

        websiteResource = {
            put: jasmine.createSpy('put').and.returnValue({
                then: (callback) => {
                    callback(container);

                    return 'put called';
                }
            }),

            query: jasmine.createSpy('query').and.returnValue({
                then: (callback) => {
                    callback(container);

                    return 'query called';
                }
            }),

            getEntityObject: jasmine.createSpy('getEntityObject').and.returnValue({
                then: (callback) => {
                    callback(container);

                    return 'getEntityObject called';
                }
            })
        };


        var stateParams = {
            containerId: 1
        };

        currentContainer = {
            get: jasmine.createSpy('get').and.returnValue({
                then: () => {
                    return 'get called';
                }
            }),
            $container: {
                hasPermission: () => {
                    return hasPermission;
                }
            }
        };

        $provide.value('$stateParams', stateParams);
        $provide.value('clearcode.tm.debug.websiteResource', websiteResource);
        $provide.value('clearcode.tm.tagContainer.currentContainer', currentContainer);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            WebsitesController = $controller('clearcode.tm.debug.WebsitesController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(WebsitesController).toBeDefined();
    });

    it('should get call query method from websiteResource', () => {
        expect(websiteResource.query).toHaveBeenCalled();
    });

    describe('when call addContainerWebsite method', () => {
        it('shouldn\'t add website without edit permissions', () => {
            WebsitesController.websites = [];
            hasPermission = false;
            WebsitesController.addContainerWebsite();
            expect(WebsitesController.websites.length).toBe(0);
        });

        it('should add website with edit permissions', () => {
            WebsitesController.websites = [];
            hasPermission = true;
            WebsitesController.addContainerWebsite();
            expect(WebsitesController.websites.length).toBe(1);
        });
    });

    describe('when call removeContainerWebsite method', () => {
        it('shouldn\'t remove website if index out of range', () => {
            WebsitesController.websites = [
                {name: 'test 1'},
                {name: 'test 2'},
                {name: 'test 3'}
            ];
            WebsitesController.removeContainerWebsite(5);
            expect(WebsitesController.websites.length).toBe(3);
            expect(WebsitesController.websites[2].name).toBe('test 3');
        });

        it('should remove website', () => {
            WebsitesController.websites = [
                {name: 'test 1'},
                {name: 'test 2'},
                {name: 'test 3'}
            ];
            WebsitesController.removeContainerWebsite(1);
            expect(WebsitesController.websites.length).toBe(2);
            expect(WebsitesController.websites[1].name).toBe('test 3');
        });
    });

    describe('when call submitForm method', () => {
        it('should call put method on websiteResource object', () => {
            WebsitesController.submitForm();
            expect(websiteResource.put).toHaveBeenCalled();
        });

        it('should call get method on currentContainer object', () => {
            WebsitesController.submitForm();
            expect(currentContainer.get).toHaveBeenCalled();
        });
    });
});
