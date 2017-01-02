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


describe('Unit: TagResource', () => {
/* eslint-disable */
    var response = {
        data: {
            id: 0,
            name: 'Tag name 0_0',
            code: '<div>0_0<\/div>',
            created_at: new Date(1428997828000),
            updated_at: new Date(1428997828000),
            container: 0,
            priority: 10,
            triggers: [
                {id: 0},
                {id: 1},
                {id: 2}
            ],
            document_write: true,
            disable_in_debug_mode: true,
            respect_visitors_privacy: false,
            is_synchronous: false
        }
    };

    var responseArray = {
        data: [
            {
                id: 1,
                name: 'Tag name 0_1',
                code: '<div>0_0<\/div>',
                created_at: new Date(1428997828000),
                updated_at: new Date(1428997828000),
                container: 0,
                priority: 11,
                triggers: [
                    {id: 2},
                    {id: 1}
                ],
                document_write: false,
                disable_in_debug_mode: true,
                respect_visitors_privacy: false,
                is_synchronous: false
            }, {
                id: 2,
                name: 'Tag name 0_2',
                code: '<div>0_0<\/div>',
                created_at: new Date(1428997828000),
                updated_at: new Date(1428997828000),
                container: 0,
                priority: 12,
                triggers: [
                    {id: 0},
                    {id: 2}
                ],
                document_write: false,
                disable_in_debug_mode: true,
                respect_visitors_privacy: false,
                is_synchronous: false
            }
        ]
    };
    var httpFailMessage = 'Something went wrong';
/* eslint-enable */

    var tagResource, $httpBackend;

    beforeEach(angular.mock.module('clearcode.tm.tag'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.tag.tagResource',
        '$httpBackend',
        (_tagResource_, _$httpBackend_) => {
            tagResource = _tagResource_;
            $httpBackend = _$httpBackend_;
        }
    ]));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call getEntityObject method', () => {
        it('should return an object', () => {
            var tag = tagResource.getEntityObject();

            expect(tag).toEqual(jasmine.any(Object));
        });
    });

    describe('when call get method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/tags\/1/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = tagResource.get(1);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(0);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = tagResource.get(1);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call query method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/containers\/(.*)\/tags/);
        });

        it('should return proper amount of objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = tagResource.query(1);

            respondedObject.then( (resp) => {
                expect(resp.data.length).toBe(2);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = tagResource.query();

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call delete method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenDELETE(/\/api\/tags\/(.*)/);
        });

        it('should return promise object', () => {
            httpRequestHandler.respond({});

            var respondedObject = tagResource.delete(1);

            respondedObject.then((resp) => {
                expect(resp).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = tagResource.delete(1);

            respondedObject.then((resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call post method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST(/\/api\/containers\/(.*)\/tags/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = tagResource.post(response.data.id, response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = tagResource.post(response.data.id, response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call put method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPUT(/\/api\/tags\/(.*)/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = tagResource.put(response.data.id, response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = tagResource.put(response.data.id, response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
