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


describe('Unit: VariableResource', () => {
    /* eslint-disable */
    var response = {
        data: {
            id: 1,
            name: 'Variable 1',
            created_at: new Date(1428997828000),
            updated_at: new Date(1428997828000),
            type: 1,
            container: 1,
            value: 'sdfsdfsdf',
            options: []
        }
    };

    var responseArray = {
        data: [
            {
                id: 1,
                name: 'Variable 1',
                created_at: new Date(1428997828000),
                updated_at: new Date(1428997828000),
                type: 1,
                container: 1,
                value: 'sdfsdfsdf',
                options: []
            }, {
                id: 2,
                name: 'Variable 2',
                created_at: new Date(1428997828000),
                updated_at: new Date(1428997828000),
                type: 1,
                container: 1,
                value: 'sdfsdfsdf',
                options: []
            }
        ]
    };

    var httpFailMessage = 'Something went wrong';
    /* eslint-enable */

    var variableResource, $httpBackend;

    beforeEach(angular.mock.module('clearcode.tm.variable'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.variable.variableResource',
        '$httpBackend',
        (_variableResource_, _$httpBackend_) => {
            variableResource = _variableResource_;
            $httpBackend = _$httpBackend_;
        }
    ]));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call getEntityObject method', () => {
        it('should return an object', () => {
            var variable = variableResource.getEntityObject();

            expect(variable).toEqual(jasmine.any(Object));
        });
    });

    describe('when call get method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/variables\/(.+)/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = variableResource.get(1);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400);

            var respondedObject = variableResource.get(1),
                done = false;

            respondedObject.catch( () => {
                done = true;
            });

            $httpBackend.flush();

            expect(done).toBeTruthy();
        });
    });

    describe('when call query method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/containers\/(.+)\/variables/);
        });

        it('should return proper amount of objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = variableResource.query();

            respondedObject.then( (resp) => {
                expect(resp.data.length).toBe(2);
            });

            $httpBackend.flush();
        });

        it('should return objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = variableResource.query();

            respondedObject.then( (resp) => {
                expect(resp.data[1]).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = variableResource.query();

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call queryAllAvailable method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/containers\/(.+)\/available-variables/);
        });

        it('should return proper amount of objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = variableResource.queryAllAvailable(1);

            respondedObject.then( (resp) => {
                expect(resp.data.length).toBe(2);
            });

            $httpBackend.flush();
        });

        it('should return objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = variableResource.queryAllAvailable(1);

            respondedObject.then( (resp) => {
                expect(resp.data[1]).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = variableResource.queryAllAvailable(1);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call delete method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenDELETE(/\/api\/variables\/(.*)/);
        });

        it('should return promise object', () => {
            httpRequestHandler.respond({});

            var respondedObject = variableResource.delete(1);

            respondedObject.then((resp) => {
                expect(resp).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should return promise object', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = variableResource.delete(1);

            respondedObject.then((resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call post method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST(/\/api\/containers\/(.+)\/variables/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = variableResource.post(2, response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = variableResource.post(2, response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call put method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPUT(/\/api\/variables\/(.+)/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = variableResource.put(2, response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = variableResource.put(2, response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
