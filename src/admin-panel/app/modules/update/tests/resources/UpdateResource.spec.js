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


describe('Unit: UpdateResource', () => {
/* eslint-disable */
    var responseSetSession = {
        url: 'example.php'
    };

    var responseGetLatest = {
        version: '1.0.1'
    };

    var httpFailMessage = 'Something went wrong';
/* eslint-enable */

    var updateResource, $httpBackend;

    beforeEach(angular.mock.module('clearcode.tm.update'));
    beforeEach(angular.mock.inject([
        'clearcode.tm.update.updateResource',
        '$httpBackend',
        (_updateResource_, _$httpBackend_) => {
            updateResource = _updateResource_;
            $httpBackend = _$httpBackend_;
        }
    ]));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when call setSession method', () => {
        var httpRequestHandler;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/admin-tools\/update/);
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(responseSetSession);

            var respondedObject = updateResource.setSession();

            respondedObject.then( (resp) => {
                expect(resp.url).toBe('example.php');
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = updateResource.setSession();

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });

    describe('when call getLatest method', () => {
        var httpRequestHandler, currentVersion;

        beforeEach(() => {
            httpRequestHandler = $httpBackend.whenGET(/\/\/download.7tag.org\/version.json?(.*)/);
            currentVersion = '1.0.0';
        });

        it('should return proper object', () => {
            httpRequestHandler.respond(responseGetLatest);

            var respondedObject = updateResource.getLatest(currentVersion);

            respondedObject.then( (resp) => {
                expect(resp.version).toBe('1.0.1');
            });

            $httpBackend.flush();
        });

        it('should reject the promise if http call fails', () => {
            httpRequestHandler.respond(400, httpFailMessage);

            var respondedObject = updateResource.getLatest(currentVersion);

            respondedObject.catch( (resp) => {
                expect(resp).toEqual(httpFailMessage);
            });

            $httpBackend.flush();
        });
    });
});
