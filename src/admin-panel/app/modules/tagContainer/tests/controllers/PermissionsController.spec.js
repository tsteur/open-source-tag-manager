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


describe('Unit: PermissionsController', () => {
    var PermissionsController, PageInfo, $scope, permission, currentContainer;

    beforeEach(module('clearcode.tm.tagContainer', ($provide) => {
        PageInfo = {
            clear: () => {
                return PageInfo;
            },
            add: () => {
                return PageInfo;
            },
            broadcast: jasmine.createSpy('broadcast').and.returnValue({
                then: () => {
                    return PageInfo;
                }
            })
        };

        currentContainer = {
            $container: {
                id: 1
            }
        };

        $provide.value('clearcode.tm.pageInfo.pageInfo', PageInfo);
        $provide.value('clearcode.tm.tagContainer.currentContainer', currentContainer);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            PermissionsController = $controller('clearcode.tm.tagContainer.PermissionsController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(PermissionsController).toBeDefined();
    });

    describe('when call setPermission method', () => {
        permission = {
            permissions: 'something else then test',
            save: jasmine.createSpy('save').and.returnValue({
                then: () => {
                    return 'save called';
                }
            })
        };

        beforeEach(() => {
            PermissionsController.setPermission(permission, 'test');
        });

        it('should call save method on Permissino object', () => {
            expect(permission.save).toHaveBeenCalled();
        });
    });

    describe('when call isValid method', () => {
        permission = {
            user: {
                roles: [
                    'ROLE_USER'
                ]
            },
            permissions: 'something else then test',
            save: jasmine.createSpy('save').and.returnValue({
                then: () => {
                    return 'save called';
                }
            })
        };

        it('should call isValid method on Permission object', () => {
            expect(PermissionsController.isValid(permission, 'test')).toBeTruthy();
            expect(PermissionsController.isValid(permission, 'something else then test')).toBeFalsy();
            expect(PermissionsController.isValid(permission, 'ROLE_SUPER_ADMIN')).toBeTruthy();

            permission.user.roles = ['ROLE_SUPER_ADMIN'];

            expect(PermissionsController.isValid(permission, 'ROLE_SUPER_ADMIN')).toBeFalsy();
        });
    });
});
