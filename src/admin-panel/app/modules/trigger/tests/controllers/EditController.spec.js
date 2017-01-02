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


describe('Unit: EditController', () => {
    var EditController, triggerResource, $scope;

    beforeEach(module('clearcode.tm.trigger', ($provide) => {
        triggerResource = {
            getEntityObject: () => {},
            get: jasmine.createSpy('get').and.returnValue({
                then: () => {
                    return 'get has been called';
                }
            })
        };

        $provide.value('clearcode.tm.trigger.triggerResource', triggerResource);
    }));

    beforeEach(inject([
        '$controller',
        '$rootScope',
        'clearcode.tm.tagContainer.currentContainer',
        ($controller, $rootScope, currentContainer) => {
            spyOn(currentContainer, 'getId').and.returnValue(1);

            $scope = $rootScope.$new();

            EditController = $controller('clearcode.tm.trigger.EditController', {
                $scope: $scope
            });
        }
    ]));

    it('should be defined', () => {
        expect(EditController).toBeDefined();
    });

    describe('when call constructor method', () => {
        it('should get Trigger entity', () => {
            expect(triggerResource.get).toHaveBeenCalled();
        });
    });
});
