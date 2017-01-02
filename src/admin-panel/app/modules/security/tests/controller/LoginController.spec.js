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

/* global describe: false, beforeEach: false, inject: false, it: false, expect: false */


describe('Unit: LoginController', () => {
    let oauthResource, LoginController, $scope;

    beforeEach(module('clearcode.tm.security', ($provide) => {
        oauthResource = {
            post: jasmine.createSpy('post').and.returnValue({
                then: () => 'post has been called'
            })
        };

        $provide.value('clearcode.tm.security.oauthResource', oauthResource);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            LoginController = $controller('clearcode.tm.security.LoginController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(LoginController).toBeDefined();
    });

    describe('when I call submitForm method', () => {
        it('should call post method from oauthResource', () => {
            var auth = {
                identity: '',
                password: ''
            };

            LoginController.submitForm(auth);

            expect(oauthResource.post).toHaveBeenCalled();
        });
    });
});
