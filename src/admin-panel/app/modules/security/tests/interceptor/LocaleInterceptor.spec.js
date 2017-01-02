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


describe('Unit: security module', () => {
    let MODULE_NAME = 'clearcode.tm.security';
    let interceptor, $window;

    beforeEach(module('clearcode.tm.security', ($provide) => {
        $window = {
            localStorage: []
        };
        $window.localStorage['NG_TRANSLATE_LANG_KEY'] = 'en';

        $provide.value('$window', $window);
    }));

    beforeEach(inject([
        `${MODULE_NAME}.localeInterceptor`,

        (_localeInterceptor_) => {
            interceptor = _localeInterceptor_;
        }
    ]));

    it('should have securityInterceptor service be defined', () => {
        expect(interceptor).toBeDefined();
    });

    describe('request method', () => {
        it('should set config property', () => {
            var config = {
                url: 'www.test.com',
                headers: {
                    Locale: 'en'
                }
            };

            interceptor.request(config);
        });
    });
});
