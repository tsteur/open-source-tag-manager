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


describe('Unit: OAuthResource', () => {
/* eslint-disable */
    let response = {
        access_token: 'Y2FhN2IwY2U1YzI2ODU2M2FkMzMxMGM2NDQ0ODkxODJlYTkzZTllNmZhZmZkZmE3Yjc5ZTVkMTE3ZmNhMmM0Mw',
        expires_in: 3600,
        token_type: 'bearer',
        scope: 'user',
        refresh_token: 'NzYxMGExYzU2MzQzZjNkYTc4Y2E4MjY4OTM1NmVhNzMxNzZlMzJkNGYxNjU2ODA3ZWQ4MWUzZDI0MmVhZjNhZQ'
    };

    let httpFailMessage = 'Something went wrong';
/* eslint-enable */

    let oauthResource, $httpBackend, tokenStorage;

    beforeEach(module('clearcode.tm.security', ($provide) => {
        tokenStorage = {
            add: jasmine.createSpy('add').and.returnValue({}),
            remove: jasmine.createSpy('remove').and.returnValue({}),
            getItem: jasmine.createSpy('getItem').and.returnValue({}),
            getToken: jasmine.createSpy('getItem').and.returnValue({})
        };

        $provide.value('clearcode.tm.security.tokenStorage', tokenStorage);
    }));

    beforeEach(inject([
        'clearcode.tm.security.oauthResource',
        '$httpBackend',
        (_oauthResource_, _$httpBackend_) => {
            oauthResource = _oauthResource_;
            $httpBackend = _$httpBackend_;
        }
    ]));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call post method', () => {
        let httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST(/\/api\/oauth\/v2\/token/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            let respondedObject = oauthResource.post('test_user', 'test_password');

            respondedObject.then( (resp) => {
                expect(resp.accessToken).toBe(response.access_token);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            let respondedObject = oauthResource.post('test_user', 'test_password');

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call logout method', () => {
        let httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/users\/me\/logout/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(true);

            let respondedObject = oauthResource.logout();

            respondedObject.then( (resp) => {
                expect(resp).toBeTruthy();
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            let respondedObject = oauthResource.logout();

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call refreshToken method', () => {
        let httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST(/\/api\/oauth\/v2\/token/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            let respondedObject = oauthResource.refreshToken(response.access_token);

            respondedObject.then( (resp) => {
                expect(resp.accessToken).toBe(response.access_token);
            });

            $httpBackend.flush();
        });

        it('should return raw response object if response contains errors', () => {
            httpRequestHandler.respond({ error: httpFailMessage });

            let respondedObject = oauthResource.refreshToken(response.access_token);

            respondedObject.then( (resp) => {
                expect(resp.error).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            let respondedObject = oauthResource.refreshToken(response.access_token);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
