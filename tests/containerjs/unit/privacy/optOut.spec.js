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
'use strict';

describe('Unit: OptOut', function () {

    var optOut, cookieMock, configuration;

    describe('when calling isEnabled method', function () {

        beforeEach(function () {

            cookieMock = {
                get: function () {
                }
            };

            configuration = {
                'stg_global_opt_out' : false
            };
            var OptOut = window.sevenTag.$injector.get('OptOut');
            optOut = new OptOut(cookieMock, configuration);

        });

        it('should read the optout preferences from cookie when optout is enabled', function() {

            spyOn(cookieMock, 'get').andCallFake(function () {
                return 'true';
            });

            var isEnabled = optOut.isEnabled();

            expect(cookieMock.get).toHaveBeenCalledWith('_stg_optout');
            expect(isEnabled).toBeTruthy();

        });

        it('should read the optout preferences from cookie when optout is not enabled', function() {

            spyOn(cookieMock, 'get').andCallFake(function () {
                return false;
            });

            var isEnabled = optOut.isEnabled();

            expect(cookieMock.get).toHaveBeenCalledWith('_stg_optout');
            expect(isEnabled).toBeFalsy();

        });

        it('should read the optout preferences from global cookie when optout is not enabled', function() {

            spyOn(cookieMock, 'get').andCallFake(function () {
                return false;
            });

            var OptOut = window.sevenTag.$injector.get('OptOut');
            optOut = new OptOut(cookieMock, {
                'stg_global_opt_out' : false
            });
            var isEnabled = optOut.isEnabled();

            expect(cookieMock.get).toHaveBeenCalledWith('_stg_optout');
            expect(isEnabled).toBeFalsy();

        });

        it('should read the optout preferences from global cookie when optout is not enabled', function() {

            spyOn(cookieMock, 'get').andCallFake(function () {
                return false;
            });

            var OptOut = window.sevenTag.$injector.get('OptOut');
            optOut = new OptOut(cookieMock, {
                'stg_global_opt_out' : true
            });
            var isEnabled = optOut.isEnabled();

            expect(cookieMock.get).toHaveBeenCalledWith('_stg_optout');
            expect(isEnabled).toBeTruthy();

        });

    });

});
