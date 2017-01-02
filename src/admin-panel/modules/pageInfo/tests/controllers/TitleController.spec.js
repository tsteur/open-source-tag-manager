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


describe('Unit: clearcode.tm.pageInfo.TitleController', () => {
    beforeEach(module('clearcode.tm.pageInfo'));

    var injector, rootScope, $scope, controller, PageInfo, TitleController, breadcrumbFirst, breadcrumbSecond;

    beforeEach(inject(($rootScope, $controller, _$injector_) => {
        injector = _$injector_;
        rootScope = $rootScope;
        controller = $controller;
        $scope = rootScope.$new();

        breadcrumbSecond = {
            name: 'test 1',
            state: 'testState2',
            params: {
                containerId: 1
            }
        };

        breadcrumbFirst = {
            name: 'test 2',
            state: 'testState1',
            params: {
                containerId: 1
            }
        };

        PageInfo = injector.get('clearcode.tm.pageInfo.pageInfo');

        TitleController = controller('clearcode.tm.pageInfo.TitleController', {
            $scope: $scope,
            PageInfo: PageInfo
        });
    }));

    describe('Unit: contstructor testing', () => {
        it('should be defined', () => {
            expect(TitleController).toBeDefined();
        });
    });

    describe('Unit: setTitle', () => {
        beforeEach(() => {
            TitleController.info.push(breadcrumbFirst);
            TitleController.info.push(breadcrumbSecond);

            it('should return proper title form', () => {
                TitleController.setTitle();

                expect(TitleController.title).toBe('test 1 : test 2');
            });
        });
    });
});
