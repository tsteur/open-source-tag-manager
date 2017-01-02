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


describe('Unit: VariableTypeResource', () => {
    /* eslint-disable */
    var responseArray = {
        data: [
            {
                id: 1,
                name: 'DataLayer'
            }, {
                id: 2,
                name: 'Constant'
            }
        ]
    };

    var httpFailMessage = 'Something went wrong';
    /* eslint-enable */

    var variableTypeResource, $httpBackend;

    beforeEach(angular.mock.module('clearcode.tm.variable'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.variable.variableTypeResource',
        '$httpBackend',
        (_variableTypeResource_, _$httpBackend_) => {
            variableTypeResource = _variableTypeResource_;
            $httpBackend = _$httpBackend_;
        }

    ]));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call getEntityObject method', () => {
        it('should return an object', () => {
            var variable = variableTypeResource.getEntityObject();
            expect(variable).toEqual(jasmine.any(Object));
        });
    });

    describe('when call query method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/variable-types/);
        });

        it('should return proper amount of objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = variableTypeResource.query();

            respondedObject.then( (resp) => {
                expect(resp.data.length).toBe(2);
            });

            $httpBackend.flush();
        });

        it('should return objects', () => {
            httpRequestHandler.respond(responseArray);

            var respondedObject = variableTypeResource.query();

            respondedObject.then( (resp) => {
                expect(resp.data[1]).toEqual(jasmine.any(Object));
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = variableTypeResource.query();

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
