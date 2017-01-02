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

describe('Unit: debugParamFilter service', function () {

    var filter, DEBUG_PARAM_NAME;

    beforeEach(function () {

        filter = window.sevenTag.$injector.get('$debugParamFilter');
        DEBUG_PARAM_NAME = window.sevenTag.$injector.get('DEBUG_PARAM_NAME');

    });

    it('should be defined', function () {

        expect(filter).toBeDefined();

    });

    describe('with method "filterFromHash" which', function () {

        it('should be defined', function () {

            expect(filter.filterFromHash).toBeDefined();

        });

        it('should return empty string when pass correct debug parameter', function () {

            expect(filter.filterFromHash('#' + DEBUG_PARAM_NAME)).toBe('');

        });

        it('should return same hash string when pass hash without parameter', function () {

            var hash = '#someHash';

            expect(filter.filterFromHash(hash)).toBe(hash);

        });

    });

    describe('with method "filterFromQuery" which', function () {

        it('should be defined', function () {

            expect(filter.filterFromQuery).toBeDefined();

        });

        it('should return same query string when pass query without parameter', function () {

            var query = '?query=1&test=2';

            expect(filter.filterFromQuery(query)).toBe(query);

        });

        it('should return query without parameter when pass only one query param with debug', function () {

            expect(filter.filterFromQuery('?' + DEBUG_PARAM_NAME + '=true')).toBe('');

        });

        it('should return same url string when pass url without parameter', function () {

            var url = 'http://7tag.dev/?query=1&test=2';

            expect(filter.filterFromQuery(url)).toBe(url);

        });

        it('should return url with filter debug parameter when pass few parameters and debug parameter', function () {

            expect(filter.filterFromQuery('http://7tag.dev/?query=1&' + DEBUG_PARAM_NAME + '=true&test=2'))
                .toBe('http://7tag.dev/?query=1&test=2');

        });

    });

});
