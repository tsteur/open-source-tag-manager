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

/* global describe: false, jasmine: false, beforeEach: false, it: false, expect: false */


describe('Unit: User resource', () => {
/* eslint-disable */
    var response = {
        data: {
            id: 1,
            username: 'test@test.com',
            firstName: 'test',
            lastName: 'tester'
        }
    };

    var responseArray = {
        data: [{
                id: 2,
                username: 'test2@test.com',
                firstName: 'test',
                lastName: 'tester'
            },
                {
                id: 3,
                username: 'test3@test.com',
                firstName: 'test',
                lastName: 'tester'
            }
        ]
    };

    var httpFailMessage = 'Something went wrong';
/* eslint-enable */

    var userResource, $httpBackend;

    beforeEach(angular.mock.module('clearcode.tm.user'));
    beforeEach(angular.mock.inject([
        'clearcode.tm.user.userResource',
        '$httpBackend',
        (_userResource_, _$httpBackend_) => {
            userResource = _userResource_;
            $httpBackend = _$httpBackend_;
        }
    ]));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call getEntity method', () => {
        it('should return an object', () => {
            var user = userResource.getEntity();
            expect(user).toEqual(jasmine.any(Object));
        });
    });

    describe('when call get method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/users\/(.+)/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);
            var respondedObject = userResource.get(1);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400);

            var done = false,
                respondedObject = userResource.get(1);

            respondedObject.catch( () => {
                done = true;
            });

            $httpBackend.flush();
            expect(done).toBeTruthy();
        });
    });

    describe('when call post method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST(/\/api\/users/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = userResource.post(response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = userResource.post(response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call put method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPUT(/\/api\/users\/(.+)/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = userResource.put(response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = userResource.put(response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call query method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/users/);
        });

        it('should return proper amount of objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = userResource.query();

            respondedObject.then( (resp) => {
                expect(resp.data.length).toBe(2);
            });

            $httpBackend.flush();
        });

        it('should return objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = userResource.query();

            respondedObject.then( (resp) => {
                expect(resp.data[1]).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = userResource.query();

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call delete method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenDELETE(/\/api\/users\/(.*)/);
        });

        it('should return promise object', () => {
            httpRequestHandler.respond({});

            var respondedObject = userResource.delete(1);

            respondedObject.then((resp) => {
                expect(resp).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should return promise object', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = userResource.delete(1);

            respondedObject.then((resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call getMe method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/users\/me/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = userResource.getMe();

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400);

            var respondedObject = userResource.getMe(),
                done = false;

            respondedObject.catch( () => {
                done = true;
            });

            $httpBackend.flush();

            expect(done).toBeTruthy();
        });
    });

    describe('when call putMe method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPUT(/\/api\/users\/me/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = userResource.putMe(response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = userResource.putMe(response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call othersSettingsMe method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPUT(/\/api\/users\/me\/others-settings/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = userResource.othersSettingsMe(response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = userResource.othersSettingsMe(response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call changePassword method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST('/api/users/me/change-password');
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = userResource.changePassword(response.data);

            respondedObject.then( (resp) => {
                expect(resp.data.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = userResource.changePassword(response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call resetPassword method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST('/api/reset-password/request');
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = userResource.resetPassword(response.data);

            respondedObject.then( (resp) => {
                expect(resp.data.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = userResource.resetPassword(response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call setPassword method', () => {
        var httpRequestHandler, token;

        beforeEach(() => {
            token = 1234;
            httpRequestHandler = $httpBackend.whenPOST(`/api/reset-password/token/${token}`);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = userResource.setPassword(response.data, token);

            respondedObject.then( (resp) => {
                expect(resp.data.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = userResource.setPassword(response.data, token);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
