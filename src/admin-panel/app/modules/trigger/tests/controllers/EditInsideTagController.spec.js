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


describe('Unit: EditInsideTagController', () => {
    var EditInsideTagController, triggerResource, $scope;

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

            EditInsideTagController = $controller('clearcode.tm.trigger.EditInsideTagController', {
                $scope: $scope
            });
        }
    ]));

    it('should be defined', () => {
        expect(EditInsideTagController).toBeDefined();
    });

    describe('when call initTrigger method', () => {
        it('should get Trigger entity', () => {
            EditInsideTagController.initTrigger(1);

            expect(triggerResource.get).toHaveBeenCalled();
        });
    });

    describe('when call submitForm method', () => {
        it('should call save method on Trigger', () => {
            var trigger = {
                save: jasmine.createSpy('save').and.returnValue({
                    then: () => {
                        return 'save has been called';
                    }
                })
            };

            EditInsideTagController.submitForm(trigger);

            expect(trigger.save).toHaveBeenCalled();
        });
    });
});
