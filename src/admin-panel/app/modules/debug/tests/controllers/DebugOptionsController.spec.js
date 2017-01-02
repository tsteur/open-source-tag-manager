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

describe('Unit: DebugOptionsController', () => {
    var DebugOptionsController, containerResource, currentContainer, $scope;

    beforeEach(module('clearcode.tm.debug', ($provide) => {
        containerResource = {
            getEntityObject: jasmine.createSpy('getEntityObject').and.returnValue({
                then: () => {
                    return 'getEntityObject called';
                }
            }),
            get: jasmine.createSpy('get').and.returnValue({
                then: () => {
                    return 'get called';
                }
            })
        };

        currentContainer = {
            getContainer: jasmine.createSpy('getContainer').and.returnValue({
                then: () => {
                    return 'getContainer called';
                }
            })
        };

        $provide.value('clearcode.tm.tagContainer.containerResource', containerResource);
        $provide.value('clearcode.tm.tagContainer.currentContainer', currentContainer);
    }));

    beforeEach(inject([
        '$controller',
        '$rootScope',
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            DebugOptionsController = $controller('clearcode.tm.debug.DebugOptionsController', {
                $scope: $scope
            });
        }
    ]));

    it('should be defined', () => {
        expect(DebugOptionsController).toBeDefined();
    });

    describe('when call constructor method', () => {
        it('should call getEntityObject method from containerResource', () => {
            expect(containerResource.getEntityObject).toHaveBeenCalled();
        });

        it('should call get method from containerResource', () => {
            expect(containerResource.get).toHaveBeenCalled();
        });
    });
});
