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


describe('Unit: security module', () => {
    let MODULE_NAME = 'clearcode.tm.security';

    let authorization;
    let security;

    beforeEach(angular.mock.module(MODULE_NAME));

    beforeEach(angular.mock.inject([
        `${MODULE_NAME}.authorization`,
        `${MODULE_NAME}.security`,
        (_authorization_, _security_) => {
            authorization = _authorization_;
            security = _security_;
        }
    ]));

    it('should have Authorization service be defined', () => {
        expect(authorization).toBeDefined();
    });

    it('should have Security service be defined', () => {
        expect(security).toBeDefined();
    });
});
