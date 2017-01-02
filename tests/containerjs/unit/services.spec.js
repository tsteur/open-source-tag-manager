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

describe('Unit: services module', function () {

    var services;

    beforeEach(function () {
        services = window.sevenTag;
    });

    describe('listeners', function () {

        it('should call listener for event name', function () {
            var called = false;

            services.on('click', function () {
                called = true;
            })

            services.emit('click');

            expect(called).toBeTruthy();
        });

        it('should not call listener for different event name', function () {
            var called = false;

            services.on('touch', function () {
                called = true;
            })

            services.emit('click');

            expect(called).toBeFalsy();
        });
    });

    describe('defines globals', function () {

        it('should have $documentElement service', function () {
            var service = window.sevenTag.$injector.get('$documentElement');
            expect(service).toBeDefined();
        });

        it('should have $injector service', function () {
            var service = window.sevenTag.$injector.get('$injector');
            expect(service).toBeDefined();
        });

        it('should provide DOMAIN value', function () {
            var value = window.sevenTag.$injector.get('DOMAIN');
            expect(value).toBeDefined();
        });

        it('should provide DELAY value', function () {
            var value = window.sevenTag.$injector.get('DELAY');
            expect(value).toBeDefined();
        });

        it('should provide ID value', function () {
            var value = window.sevenTag.$injector.get('ID');
            expect(value).toBeDefined();
        });

        it('should provide $variables value', function () {
            var value = window.sevenTag.$injector.get('$variables');
            expect(value).toBeDefined();
        });

        it('should provide DEBUG_PARAM_NAME value', function () {
            var value = window.sevenTag.$injector.get('DEBUG_PARAM_NAME');
            expect(value).toBeDefined();
        });

        it('should provide $location value', function () {
            var value = window.sevenTag.$injector.get('$location');
            expect(value).toBeDefined();
        });
    });

});
