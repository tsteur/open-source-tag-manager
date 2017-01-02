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


describe('Unit: Permission resource', () => {
/* eslint-disable */

    var responseArray = {
        data: [
            {
                user: {
                    id: 1,
                    firstName: 'test',
                    lastName: 'test'
                },
                permissions: ['view', 'publish']
            },
            {
                user: {
                    id: 2,
                    firstName: 'test',
                    lastName: 'test'
                },
                permissions: ['view', 'edit', 'publish']
            },
            {
                user: {
                    id: 3,
                    firstName: 'test',
                    lastName: 'test'
                },
                permissions: ['view', 'publish']
            }
        ]
    };

    var httpFailMessage = 'Something went wrong';
/* eslint-enable */

    var permissionResource, $httpBackend, permission;

    beforeEach(angular.mock.module('clearcode.tm.tagContainer'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.tagContainer.permissionResource',
        '$httpBackend',
        (_permissionResource_, _$httpBackend_) => {
            permissionResource = _permissionResource_;
            $httpBackend = _$httpBackend_;
        }
    ]));

    afterEach( () => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call getEntityObject method', () => {
        it('should return an object', () => {
            permission = permissionResource.getEntityObject();

            expect(permission).toEqual(jasmine.any(Object));
        });
    });

    describe('when call query method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/containers\/(.+)\/permissions/);
        });

        it('should return proper amount of objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = permissionResource.query(1);

            respondedObject.then( (resp) => {
                expect(resp.data.length).toBe(3);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = permissionResource.query(1);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call put method', () => {
        var httpRequestHandler, entity;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPUT(/api\/containers\/(.+)\/permissions/);
            entity = {
                data: responseArray.data[0]
            }
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(entity);

            var respondedObject = permissionResource.put(1, entity);

            respondedObject.then( (resp) => {
                expect(resp.user.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = permissionResource.put(1, entity);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
