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


describe('Unit: Container resource', () => {
/* eslint-disable */
    var response = {
        data: {
            code: '<script>some script</script>',
            created_at: '2015-06-24T10:00:50+0000',
            description: null,
            has_unpublished_changes: true,
            id: 1,
            name: 'test',
            published_at: '2015-06-25T07:04:37+0000',
            tags: [
                {
                    id: 3,
                    name: 'test 1'
                }
            ],
            triggers: [
                {
                    id: 2,
                    name: 'test 8'
                }
            ],
            updated_at: '2015-06-25T07:04:47+0000',
            version: {
                id: 1
            },
            permissions: ['view', 'edit'],
            websites: [
                {
                    url: 'http://google.com'
                }
            ]
        }
    };

    var responseArray = {
        data: [
            {
                code: '<script>some script</script>',
                created_at: '2015-06-24T10:00:50+0000',
                description: null,
                has_unpublished_changes: true,
                id: 1,
                name: 'test',
                published_at: '2015-06-25T07:04:37+0000',
                tags: [
                    {
                        id: 3,
                        name: 'test 1'
                    }
                ],
                triggers: [
                    {
                        id: 2,
                        name: 'test 8'
                    }
                ],
                updated_at: '2015-06-25T07:04:47+0000',
                version: {
                    id: 1
                },
                permissions: ['view', 'operator'],
                websites: []
            },
            {
                code: '<script>some script</script>',
                created_at: '2015-06-24T10:00:50+0000',
                description: null,
                has_unpublished_changes: true,
                id: 2,
                name: 'test 2',
                published_at: '2015-06-25T07:04:37+0000',
                tags: [
                    {
                        id: 3,
                        name: 'test 1'
                    }
                ],
                triggers: [
                    {
                        id: 2,
                        name: 'test 8'
                    }
                ],
                updated_at: '2015-06-25T07:04:47+0000',
                version: {
                    id: 1
                },
                permissions: [],
                websites: []
            }
        ]
    };

    var httpFailMessage = 'Something went wrong';
/* eslint-enable */

    var containerResource, $httpBackend;

    beforeEach(angular.mock.module('clearcode.tm.tagContainer'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.tagContainer.containerResource',
        '$httpBackend',
        (_containerResource_, _$httpBackend_) => {
            containerResource = _containerResource_;
            $httpBackend = _$httpBackend_;
        }
    ]));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call getEntityObject method', () => {
        it('should return an object', () => {
            var container = containerResource.getEntityObject();

            expect(container).toEqual(jasmine.any(Object));
        });
    });

    describe('when call get method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/containers\/(.+)/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = containerResource.get(1);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400);

            var done = false,
                respondedObject = containerResource.get(1);

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
            httpRequestHandler = $httpBackend.whenGET(/\/api\/containers/);
        });

        it('should return proper amount of objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = containerResource.query();

            respondedObject.then( (resp) => {
                expect(resp.data.length).toBe(2);
            });

            $httpBackend.flush();
        });

        it('should return objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = containerResource.query();

            respondedObject.then( (resp) => {
                expect(resp.data[1]).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = containerResource.query();

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call delete method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenDELETE(/\/api\/containers\/(.*)/);
        });

        it('should return promise object', () => {
            httpRequestHandler.respond({});

            var respondedObject = containerResource.delete(1);

            respondedObject.then((resp) => {
                expect(resp).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should return promise object', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = containerResource.delete(1);

            respondedObject.then((resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call post method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST(/\/api\/containers/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = containerResource.post(response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = containerResource.post(response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });
    });

    describe('when call put method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPUT(/\/api\/containers/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = containerResource.put(response.data);

            respondedObject.then( (resp) => {
                expect(resp.id).toBe(response.data.id);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = containerResource.put(response.data);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });
    });

    describe('when call publishVersion method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST(/\/api\/containers\/(.+)\/version-publish/);
        });

        it('should call http function', () => {
            httpRequestHandler.respond(response);

            var respondedObject = containerResource.publishVersion(1);

            respondedObject.then( (resp) => {
                expect(resp.data.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = containerResource.publishVersion(1);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call restoreVersion method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPOST(/\/api\/containers\/(.+)\/version-restore/);
        });

        it('should call http function', () => {
            httpRequestHandler.respond(response);

            var respondedObject = containerResource.restoreVersion(1);

            respondedObject.then( (resp) => {
                expect(resp.data.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = containerResource.restoreVersion(1);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call getPrivacyOptOut method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/containers\/(.+)\/privacy/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);

            var respondedObject = containerResource.getPrivacyOptOut(1);

            respondedObject.then( (resp) => {
                expect(resp.data.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = containerResource.getPrivacyOptOut(1);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
