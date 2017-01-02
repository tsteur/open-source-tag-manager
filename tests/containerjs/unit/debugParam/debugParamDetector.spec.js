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

describe('Unit: debugParamDetector service', function () {

    var detector, DEBUG_PARAM_NAME;

    beforeEach(function () {

        detector = window.sevenTag.$injector.get('$debugParamDetector');
        DEBUG_PARAM_NAME = window.sevenTag.$injector.get('DEBUG_PARAM_NAME');

        detector.location = {
            search: '?' + DEBUG_PARAM_NAME + '=true',
            hash: '#' + DEBUG_PARAM_NAME
        };

    });

    it('should be defined', function () {

        expect(detector).toBeDefined();

    });

    describe('with method "hasParamInHash" which', function () {

        it('should be defined', function () {

            expect(detector.hasParamInHash).toBeDefined();

        });

        it('should return true when parameter is present in URL after #', function () {

            expect(detector.hasParamInHash()).toBeTruthy();

        });

        it('should return false when parameter is not present in URL after #', function () {

            detector.location = {
                hash: '#otherParameter'
            };

            expect(detector.hasParamInHash()).toBeFalsy();

        });

    });

    describe('with method "hasParamInQuery" which', function () {

        it('should be defined', function () {

            expect(detector.hasParamInQuery).toBeDefined();

        });

        it('should return true when parameter is present in URL query string', function () {

            expect(detector.hasParamInQuery()).toBeTruthy();

        });

        it('should return false when parameter is not present in URL query string', function () {

            detector.location = {
                search: '?someProperty=true&param2=false'
            };

            expect(detector.hasParamInQuery()).toBeFalsy();

        });

    });

    describe('with method "hasParam" which', function () {

        it('should be defined', function () {

            expect(detector.hasParam).toBeDefined();

        });

        it('should return true when parameter is present in URL query or hash string', function () {

            expect(detector.hasParam()).toBeTruthy();

        });

        it('should return false when parameter is not present in URL query or hash string', function () {

            detector.location = {
                search: '?someProperty=true&param2=false',
                hash: '#property'
            };

            expect(detector.hasParam()).toBeFalsy();

        });

    });

});
