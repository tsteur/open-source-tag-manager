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

describe('Unit: IntegrationResource', () => {
    /* eslint-disable */
    var response = {
        data: {
            id: 2,
            name: 'Integration 2',
            user: {
                id: 1,
                status: 1,
                email: 'a@gmail.com'
            }
        }
    };

    var responseArray = {
        data: [
            {
                id: 3,
                name: 'Integration 3'
            }, {
                id: 4,
                name: 'Integration 4'
            }
        ]
    };

    var httpFailMessage = 'Something went wrong';
    /* eslint-enable */

    var integrationResource, $httpBackend, respondedObject;

    beforeEach(angular.mock.module('clearcode.tm.integration'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.integration.IntegrationResource',
        '$httpBackend',
        '$rootScope',
        (_integrationResource_, _$httpBackend_) => {
            integrationResource = _integrationResource_;
            $httpBackend = _$httpBackend_;
        }
    ]));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call getEntityObject method', () => {
        it('should return an object', () => {
            var integration = integrationResource.getEntityObject();

            expect(integration).toEqual(jasmine.any(Object));
        });
    });

    describe('when call get method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/integration\/(.*)/)
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            respondedObject = integrationResource.get(2);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(2);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            respondedObject = integrationResource.get(2);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call query method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/integration/)
        });

        it('should return proper amount of objects', () => {
            httpRequestHandler.respond(responseArray);

            respondedObject = integrationResource.query();

            respondedObject.then( (resp) => {
                expect(resp.data.length).toBe(2);
            });

            $httpBackend.flush();
        });

        it('should return objects', () => {
            httpRequestHandler.respond(responseArray);

            respondedObject = integrationResource.query();

            respondedObject.then( (resp) => {
                expect(resp.data[1]).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            respondedObject = integrationResource.query();

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call delete method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenDELETE(/\/api\/integration\/(.*)/)
        });

        it('should return promise object', () => {
            httpRequestHandler.respond({});

            respondedObject = integrationResource.delete(2);

            respondedObject.then( () => {
                expect(respondedObject).toEqual(jasmine.any(Object));
                expect(respondedObject.then).toEqual(jasmine.any(Function));
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = integrationResource.delete(2);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call post method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST(/\/api\/integration/)
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            respondedObject = integrationResource.post(response);

            respondedObject.then( (resp) => {
                expect(resp.name).toBe(response.data.name);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = integrationResource.post(response);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call put method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPUT(/\/api\/integration\/(.*)/)
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            respondedObject = integrationResource.put(2, response);

            respondedObject.then( (resp) => {
                expect(resp.name).toBe(response.data.name);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = integrationResource.put(2, response);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
