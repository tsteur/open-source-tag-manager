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


describe('Unit: ParamConverter service', () => {
    var paramConverter, converted;

    beforeEach(angular.mock.module('clearcode.tm.tagContainer'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.tagContainer.paramConverter',
        (_paramConverter_) => {
            paramConverter = _paramConverter_;
        }
    ]));

    it('should be defined', () => {
        expect(paramConverter).toBeDefined();
    });

    describe('when call list method', () => {
        beforeEach(() => {
            var params = {
                count: 10,
                page: 3
            };

            converted = paramConverter.list(params);
        });

        it('should return propare limit value', () => {
            expect(converted.limit).toBe(10);
        });

        it('should return propare offset value', () => {
            expect(converted.offset).toBe(20);
        });
    });
});
