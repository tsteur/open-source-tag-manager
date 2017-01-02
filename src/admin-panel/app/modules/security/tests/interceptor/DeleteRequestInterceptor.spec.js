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
    var MODULE_NAME = 'clearcode.tm.security';

    /**
     * @type {interceptor}
     */
    var interceptor, rootScope, http;

    beforeEach(module('clearcode.tm.security', ($provide) => {
        http = {
            post: jasmine.createSpy('post').and.returnValue({
                then: () => 'newPostMethod'
            })
        };

        $provide.value('$http', http);
    }));

    beforeEach(inject([
        `${MODULE_NAME}.deleteRequestInterceptor`,
        '$rootScope',
        (_deleteRequestInterceptor, $rootScope) => {
            interceptor = _deleteRequestInterceptor;
            rootScope = $rootScope;
        }
    ]));

    it('should have deleteRequestInterceptor service be defined', () => {
        expect(interceptor).toBeDefined();
    });

    describe('request method', () => {
        it('should not change config property if server support DELETE', () => {
            var config = {
                method: 'DELETE',
                url: 'http://myurl.com'
            };
            var result = interceptor.request(config);

            expect(result).toBe(config);
        });

        it('should not change config property if method is not DELETE', () => {
            var config = {
                method: 'POST',
                url: 'http://myurl.com'
            };
            var result = interceptor.request(config);

            expect(result).toBe(config);
        });

        it('should change config property if server not support DELETE method', () => {
            var config = {
                url: 'www.test.com',
                method: 'DELETE'
            };

            rootScope.deleteHeaderNotSupported = true;

            var result = interceptor.request(config);

            var expectedConfig = {
                url: 'www.test.com/remove',
                method: 'POST'
            };

            expect(result.url).toBe(expectedConfig.url);
            expect(result.method).toBe(expectedConfig.method);
        });
    });

    describe('responseError method', () => {
        it('should re-send request as post', () => {
            var rejection = {
                config: {
                    method: 'DELETE'
                },
                status: 405
            };

            interceptor.responseError(rejection);

            expect(http.post).toHaveBeenCalled();
        });
    });
});
