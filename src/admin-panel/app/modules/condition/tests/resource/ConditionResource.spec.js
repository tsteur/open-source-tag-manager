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

describe('Unit: ConditionResource', () => {
/* eslint-disable */

var conditions = [
{
    type: 0,
    name: 'Page View',
    actions: [
        {
            type: 'contains',
            name: 'Contains'
        }
    ],
    variables: [
        {
            type: 'url',
            name: 'Page Url',
            options: {
                required: false
            }
        }
    ]
},
{
    type: 2,
    name: 'Event',
    actions: [
        {
            type: 'contains',
            name: 'Contains'
        }
    ],
    variables: [
        {
            type: 'event',
            name: 'Event',
            options: {
                required: true
            }
        }
    ]
}
];
/* eslint-enable */

    var conditionResource, $httpBackend, httpFailMessage;

    beforeEach(module('clearcode.tm.condition'), () => {
        httpFailMessage = 'Something went wrong';
    });

    beforeEach(inject([
        'clearcode.tm.condition.conditionResource',
        '$httpBackend',
        (_conditionResource_, _$httpBackend_) => {
            conditionResource = _conditionResource_;
            $httpBackend = _$httpBackend_;
        }
    ]));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call getEntityObject method', () => {
        it('should return an object', () => {
            var condition = conditionResource.getEntityObject();

            expect(condition).toEqual(jasmine.any(Object));
        });
    });

    describe('when call query method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/api\/(.*)\/conditions/);
        });

        it('should return proper amount of objects', () => {
            httpRequestHandler.respond(conditions);

            var respondedObject = conditionResource.query();

            respondedObject.then( (resp) => {
                expect(resp.length).toBe(2);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = conditionResource.query();

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
