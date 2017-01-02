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


describe('Unit: TriggerResource', () => {
/* eslint-disable */
    var response = {
        data: {
            id: 1,
            name: 'Trigger 0_1',
            created_at: new Date(1428997828000),
            updated_at: new Date(1428997828000),
            type: 0,
            container: 0,
            conditions: [{
                id: 1,
                variable: 'path',
                condition: 'contains',
                value: 'wykop.p',
                created_at: new Date(1428997828000),
                updated_at: new Date(1428997828000)
            }, {
                id: 2,
                variable: 'path',
                condition: 'contains',
                value: 'mirko',
                created_at: new Date(1428997828000),
                updated_at: new Date(1428997828000)
            }],
            tags_count: 11
        }
    };

    var responseArray = {
        data: [
            {
                id: 2,
                name: 'Trigger 0_2',
                created_at: new Date(1428997828000),
                updated_at: new Date(1428997828000),
                type: 0,
                container: 0,
                conditions: [{
                    id: 1,
                    variable: 'path',
                    condition: 'contains',
                    value: 'wykop.p',
                    created_at: new Date(1428997828000),
                    updated_at: new Date(1428997828000)
                }, {
                    id: 2,
                    variable: 'path',
                    condition: 'contains',
                    value: 'mirko',
                    created_at: new Date(1428997828000),
                    updated_at: new Date(1428997828000)
                }],
                tags_count: 11
            },
            {
                id: 3,
                name: 'Trigger 0_3',
                created_at: new Date(1428997828000),
                updated_at: new Date(1428997828000),
                type: 0,
                container: 0,
                conditions: [{
                    id: 1,
                    variable: 'path',
                    condition: 'contains',
                    value: 'wykop.p',
                    created_at: new Date(1428997828000),
                    updated_at: new Date(1428997828000)
                },
                {
                    id: 2,
                    variable: 'path',
                    condition: 'contains',
                    value: 'mirko',
                    created_at: new Date(1428997828000),
                    updated_at: new Date(1428997828000)
                }],
                tags_count: 11
            }
        ]
    };

    var httpFailMessage = 'Something went wrong';
/* eslint-enable */

    var triggerResource, $httpBackend;

    beforeEach(angular.mock.module('clearcode.tm.trigger'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.trigger.triggerResource',
        '$httpBackend',
        (_triggerResource_, _$httpBackend_) => {
            triggerResource = _triggerResource_;
            $httpBackend = _$httpBackend_;
        }
    ]));

    afterEach( () => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call getEntityObject method', () => {
        it('should return an object', () => {
            var trigger = triggerResource.getEntityObject();

            expect(trigger).toEqual(jasmine.any(Object));
        });
    });

    describe('when call get method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/triggers\/(.*)/);
        });

        it('should return proper amount of objects', () => {
            httpRequestHandler.respond(response);

            var respondedObject = triggerResource.get(1);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = triggerResource.get(1);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call query method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/containers\/(.+)\/triggers/);
        });

        it('should return proper amount of objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = triggerResource.query(1);

            respondedObject.then( (resp) => {
                expect(resp.data.length).toBe(2);
            });

            $httpBackend.flush();
        });

        it('should return objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = triggerResource.query(1);

            respondedObject.then( (resp) => {
                expect(resp.data[1]).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = triggerResource.query(1);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call delete method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenDELETE(/\/api\/triggers\/(.*)/);
        });

        it('should return promise object', () => {
            httpRequestHandler.respond({});

            var respondedObject = triggerResource.delete(1);

            respondedObject.then((resp) => {
                expect(resp).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should return promise object', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = triggerResource.delete(1);

            respondedObject.then((resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call post method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST(/\/api\/containers\/(.+)\/triggers/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = triggerResource.post(1, response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = triggerResource.post(1, response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call put method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPUT(/\/api\/triggers\/(.+)/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = triggerResource.put(2, response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = triggerResource.put(response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
