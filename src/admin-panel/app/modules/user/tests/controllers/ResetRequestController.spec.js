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


describe('Unit: ResetRequestController', () => {
    var ResetRequestController, userResource, $scope;

    beforeEach(module('clearcode.tm.user', ($provide) => {
        userResource = {
            resetPassword: jasmine.createSpy('changePassword').and.returnValue({
                then: () => {
                    return 'changePassword called';
                }
            })
        };

        $provide.value('clearcode.tm.user.userResource', userResource);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            ResetRequestController = $controller('clearcode.tm.user.ResetRequestController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(ResetRequestController).toBeDefined();
    });

    describe('when call submitForm method', () => {
        it('should call save method on User', () => {
            ResetRequestController.submitForm('email');

            expect(userResource.resetPassword).toHaveBeenCalled();
        });
    });
});
