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

describe('Unit: WebsiteResource', () => {
    /* eslint-disable */
    var response = {
        data: [
            {
                id: 132,
                parameter_type: 1,
                url: 'http://google.com'
            }
        ]
    };
    /* eslint-enable */

    var entity = {
        url: 'http://google.com'
    };

    var httpFailMessage = 'Something went wrong';
    var websiteResource, $httpBackend;

    beforeEach(angular.mock.module('clearcode.tm.debug'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.debug.websiteResource',
        '$httpBackend',
        (_websiteResource_, _$httpBackend_) => {
            websiteResource = _websiteResource_;
            $httpBackend = _$httpBackend_;
        }
    ]));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call getEntityObject method', () => {
        it('should return an object', () => {
            var website = websiteResource.getEntityObject();
            expect(website).toEqual(jasmine.any(Object));
        });
    });

    describe('when call put method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenPUT(/api\/containers\/(.*)\/websites/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);
            var respondedObject = websiteResource.put(1, entity);

            respondedObject.then( (resp) => {
                expect(resp[0].url).toBe(entity.url);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);
            var respondedObject = websiteResource.put(1, entity);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call query method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/api\/containers\/(.*)\/websites/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(response);
            var respondedObject = websiteResource.query(1);

            respondedObject.then( (resp) => {
                expect(resp.data[0].url).toBe(entity.url);
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);
            var respondedObject = websiteResource.query(1);

            respondedObject.catch( (resp) => {
                expect(resp).toBe(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
