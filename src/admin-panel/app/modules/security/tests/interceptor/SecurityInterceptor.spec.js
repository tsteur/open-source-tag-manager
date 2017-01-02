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

    let interceptor, tokenStorage, state;

    beforeEach(module('clearcode.tm.security', ($provide) => {
        tokenStorage = {
            getItem: () =>  true,
            getToken: jasmine.createSpy('getToken').and.returnValue({
                then: () => 'testToken'
            }),
            removeItem: jasmine.createSpy('removeItem').and.returnValue({
                then: () => 'removeItem'
            })
        };

        state = {
            go: jasmine.createSpy('go').and.returnValue({
                then: () => 'testToken'
            })
        };

        $provide.value('$state', state);
        $provide.value('clearcode.tm.security.tokenStorage', tokenStorage);
    }));

    beforeEach(inject([
        `${MODULE_NAME}.securityInterceptor`,
        (_securityInterceptor_) => {
            interceptor = _securityInterceptor_;
        }
    ]));

    it('should have securityInterceptor service be defined', () => {
        expect(interceptor).toBeDefined();
    });

    describe('request method', () => {
        it('should not set config property', () => {
            var config = {
                url: 'www.test.css',
                headers: {
                    Authorization: ''
                }
            };

            interceptor.request(config);

            expect(tokenStorage.getToken).not.toHaveBeenCalled();
        });

        it('should set config property', () => {
            var config = {
                url: 'www.test.com',
                headers: {
                    Authorization: ''
                }
            };

            interceptor.request(config);

            expect(tokenStorage.getToken).toHaveBeenCalled();
        });
    });

    describe('responseError method', () => {
        it('should logout property', () => {
            var rejection = {
                status: 400,
                data: {
                    error: 'invalid_request'
                }
            };

            interceptor.responseError(rejection);

            expect(tokenStorage.removeItem).toHaveBeenCalled();
        });

        it('should redirect to access-denied property', () => {
            var rejection = {
                status: 403,
                data: {
                    error: 'invalid_request'
                }
            };

            interceptor.responseError(rejection);

            expect(state.go).toHaveBeenCalled();
        });
    });
});
