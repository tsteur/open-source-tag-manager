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

/* global describe: false, beforeEach: false, inject: false, it: false, expect: false */


describe('Unit: clearcode.tm.pageInfo.pageInfo', () => {
    beforeEach(module('clearcode.tm.pageInfo'));

    var injector, PageInfo, breadcrumbFirst;

    beforeEach(inject(($rootScope, _$injector_) => {
        injector = _$injector_;

        breadcrumbFirst = {
            name: 'test 1',
            state: 'testState2',
            params: {
                containerId: 1
            }
        };

        PageInfo = injector.get('clearcode.tm.pageInfo.pageInfo');
    }));

    describe('Unit: contstructor testing', () => {
        it('should be defined', () => {
            expect(PageInfo).toBeDefined();
        });

        it('should have empty navigation array', () => {
            expect(PageInfo.navigation.length).toBe(0);
        });
    });

    describe('Unit: add method', () => {
        beforeEach(() => {
            var info = PageInfo.add(breadcrumbFirst.name, breadcrumbFirst.state, breadcrumbFirst.params);

            it('should return Object', () => {
                expect(info).toEqual(jasmine.any(Object));
            });

            it('should add info into navigation array', () => {
                PageInfo.add(breadcrumbFirst.name, breadcrumbFirst.state, breadcrumbFirst.params);

                expect(info.navigation.length).toBe(1);
            });
        });
    });

    describe('Unit: clear method', () => {
        beforeEach(() => {
            var info = PageInfo.add(breadcrumbFirst.name, breadcrumbFirst.state, breadcrumbFirst.params);

            info.clear();

            it('should return Object', () => {
                expect(info).toEqual(jasmine.any(Object));
            });

            it('should clear navigation array', () => {
                expect(info.navigation.length).toBe(0);
            });
        });
    });
});
