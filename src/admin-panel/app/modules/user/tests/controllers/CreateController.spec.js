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


describe('Unit: CreateController', () => {
    var CreateController, PageInfo, user, userResource, $scope, $translate;

    beforeEach(module('clearcode.tm.user', ($provide) => {
        user = {
            save: jasmine.createSpy('save').and.returnValue({
                then: () => 'save called'
            })
        };

        userResource = {
            getEntity: jasmine.createSpy('getEntity').and.returnValue({
                then: () => user
            })
        };

        PageInfo = {
            clear: () => PageInfo,
            add: () => PageInfo,
            broadcast: jasmine.createSpy('broadcast').and.returnValue({
                then: () => PageInfo
            })
        };

        $translate = jasmine.createSpy('$translate');
        $translate.storageKey = jasmine.createSpy('storageKey');
        $translate.storage = jasmine.createSpy('storage');
        $translate.preferredLanguage = jasmine.createSpy('preferredLanguage');
        $translate.and.callFake(() => {
            return {
                then: () => {
                    PageInfo.clear()
                        .add('test', 'users')
                        .add('test')
                        .broadcast();
                }
            }
        });

        $provide.value('clearcode.tm.pageInfo.pageInfo', PageInfo);
        $provide.value('clearcode.tm.user.userResource', userResource);
        $provide.value('$translate', $translate);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            CreateController = $controller('clearcode.tm.user.CreateController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(CreateController).toBeDefined();
    });

    it('should get call broadcast method from PageInfo', () => {
        expect(PageInfo.broadcast).toHaveBeenCalled();
    });

    it('should get call getEntity method from userResource', () => {
        expect(userResource.getEntity).toHaveBeenCalled();
    });

    describe('when call submitForm method', () => {
        beforeEach(() => {
            CreateController.password = {};
            CreateController.password.first = 'testtesttest';
            CreateController.password.second = 'testtesttest';
        });

        it('should call save method on User with password', () => {
            CreateController.activation = 'ACTIVATION_SET_PASSWORD';

            CreateController.submitForm(user);

            expect(user.save).toHaveBeenCalled();
            expect(user.plainPassword).toBeDefined();
        });

        it('should call save method on User without password', () => {
            CreateController.activation = 'ACTIVATION_EMAIL';

            CreateController.submitForm(user);

            expect(user.save).toHaveBeenCalled();
            expect(user.plainPassword).not.toBeDefined();
        });
    });
});
