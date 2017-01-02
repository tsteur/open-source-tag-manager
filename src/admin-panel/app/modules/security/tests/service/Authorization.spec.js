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

/* global describe: false, beforeEach: false, inject: false, it: false, expect: false, jasmine: false */


describe('Unit: Authorization service', () => {
    let MODULE_NAME = 'clearcode.tm.security';
    let authorization;
    let $state;

    beforeEach(module(MODULE_NAME, ($provide) => {
        $provide.service(`${MODULE_NAME}.security`, function () {
            this.isAuthenticated = jasmine.createSpy('isAuthenticated');

            this.getUser = function () {
                this.then = (callback) => {
                    callback();
                };

                return this;
            };

            this.hasAnyRole = jasmine.createSpy('hasAnyRole');

            this.user = {
                roles: [
                    'ROLE_ADMIN'
                ]
            };
        });

        $provide.service('$state', function () {
            this.go = jasmine.createSpy('go');
        });
    }));

    beforeEach(inject([
        `${MODULE_NAME}.authorization`,
        `${MODULE_NAME}.security`,
        '$state',
        (_authorization_, _security_, _$state_) => {
            authorization = _authorization_;
            $state = _$state_;
        }
    ]));

    it('should authorize me correctly', () => {
        authorization.authorize(['ROLE_ADMIN']);

        expect($state.go).toHaveBeenCalled();
    });

    it('should redirect to access denied', () => {
        authorization.authorize(['ROLE_ADMIN']);

        expect($state.go).not.toHaveBeenCalledWith('');
    });

    it('should redirect to login', () => {
        authorization.authorize(['ROLE_ADMIN']);

        expect($state.go).toHaveBeenCalledWith('signIn');
    });
});
