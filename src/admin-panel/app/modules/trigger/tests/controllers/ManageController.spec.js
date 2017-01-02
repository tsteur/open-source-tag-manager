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

/* global describe: false, jasmine: false, beforeEach: false, it: false, expect: false */


describe('Unit: ManageController', () => {
    var ManageController, trigger, $scope;

    beforeEach(angular.mock.module('clearcode.tm.trigger'));

    beforeEach(angular.mock.inject([
        '$controller',
        '$rootScope',
        'clearcode.tm.tagContainer.currentContainer',
        ($controller, $rootScope, currentContainer) => {
            spyOn(currentContainer, 'getId').and.returnValue(1);

            $scope = $rootScope.$new();

            ManageController = $controller('clearcode.tm.trigger.ManageController', {
                $scope: $scope
            });
        }
    ]));

    it('should be defined', () => {
        expect(ManageController).toBeDefined();
    });

    it('should set table properly', () => {
        expect(ManageController.tableParams).toBeDefined();
    });

    describe('when call removeTrigger method', () => {
        trigger = {
            remove: jasmine.createSpy('remove').and.returnValue({
                then: () => {
                    return 'remove called';
                }
            })
        };

        it('should call remove method on Trigger object', () => {
            ManageController.removeTrigger(trigger);

            expect(trigger.remove).toHaveBeenCalled();
        });
    });
});
