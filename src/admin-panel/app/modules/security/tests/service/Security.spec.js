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

/* global describe: false, beforeEach: false, it: false, expect: false */


describe('Unit: Security service', () => {
    let MODULE_NAME = 'clearcode.tm.security';
    let security;

    beforeEach(angular.mock.module(MODULE_NAME));

    beforeEach(angular.mock.inject([
        `${MODULE_NAME}.security`,
        (_security_) => {
            security = _security_;
        }
    ]));

    it('should check user roles', () => {
        security.authenticate({
            roles: ['ROLE_ADMIN']
        });

        expect(security.hasRole('ROLE_ADMIN')).toBeTruthy();
    });

    it('should authenticate user', () => {
        security.authenticate({
            roles: ['ROLE_ADMIN']
        });

        expect(security.isAuthenticated()).toBeTruthy();
    });
});
