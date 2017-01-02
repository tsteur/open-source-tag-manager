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
    var ManageController, currentContainer, user;

    beforeEach(module('clearcode.tm.user', ($provide) => {
        currentContainer = {
            disableDebugMode: jasmine.createSpy('disableDebugMode').and.returnValue({
                then: () => {
                    return 'disableDebugMode called';
                }
            })
        };

        $provide.value('clearcode.tm.tagContainer.currentContainer', currentContainer);
    }));

    beforeEach(inject(
        ($controller) => {
            ManageController = $controller('clearcode.tm.user.ManageController');
        }
    ));

    it('should be defined', () => {
        expect(ManageController).toBeDefined();
    });

    it('should get call disableDebugMode method from currentContainer in constructor', () => {
        expect(currentContainer.disableDebugMode).toHaveBeenCalled();
    });

    describe('when call removeUser method', () => {
        user = {
            remove: jasmine.createSpy('remove').and.returnValue({
                then: () => {
                    return 'remove called';
                }
            })
        };

        it('should call remove method on User object', () => {
            ManageController.removeUser(user);

            expect(user.remove).toHaveBeenCalled();
        });
    });
});
