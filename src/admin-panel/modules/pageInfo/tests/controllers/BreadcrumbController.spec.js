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


describe('Unit: clearcode.tm.pageInfo.BreadcrumbController', () => {
    beforeEach(module('clearcode.tm.pageInfo'));

    var injector, rootScope, $scope, controller, PageInfo, BreadcrumbController, state, breadcrumb;

    beforeEach(inject(($rootScope, $controller, _$injector_) => {
        injector = _$injector_;
        rootScope = $rootScope;
        controller = $controller;
        $scope = rootScope.$new();

        state = {
            go: () => {}
        };

        breadcrumb = {
            name: 'test',
            state: 'testState',
            params: {
                containerId: 1
            }
        };

        PageInfo = injector.get('clearcode.tm.pageInfo.pageInfo');

        BreadcrumbController = controller('clearcode.tm.pageInfo.BreadcrumbController', {
            $scope: $scope,
            $state: state,
            PageInfo: PageInfo
        });

        spyOn(state, 'go');
    }));

    describe('Unit: contstructor testing', () => {
        it('should be defined', () => {
            expect(BreadcrumbController).toBeDefined();
        });

        it('should have empty breadcrumbs array', () => {
            expect(BreadcrumbController.breadcrumb.length).toBe(0);
        });
    });

    describe('Unit: stateGo', () => {
        it('should called state.go function', () => {
            BreadcrumbController.stateGo(breadcrumb);
            expect(state.go).toHaveBeenCalled();
        });
    });
});
