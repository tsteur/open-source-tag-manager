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


describe('Unit: clearcode.tm.form.SelectDirective', () => {
    var $compile,
        $rootScope,
        scopeParent,
        scopeChild,
        templateParent,
        templateChild,
        elementParent,
        elementChild,
        condition = {},
        triggerForm = [];

    condition.variable = 1;

    triggerForm.variables = [
        {
            value: 2,
            text: 'variable 2'
        },
        {
            value: 3,
            text: 'variable 3'
        }
    ];

    beforeEach(module('clearcode.tm.form'));

    beforeEach(inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scopeChild = $rootScope.$new();
        scopeParent = $rootScope.$new();

        templateChild = '<select class="form-control" ng-model="condition.variable"' +
		' cc-select="cc-select" cc-select-options="triggerForm.variables"' +
        ' cc-select-value="value" cc-select-label="text"></select>';

        elementChild = $compile(templateChild)(scopeChild);
        elementChild.addClass('ng-hide');

        templateParent = '<div class="cc-select"></div>';
        elementChild.wrap(angular.element(templateParent));

        elementParent = $compile(templateParent)(scopeParent);

        scopeParent.$digest();
        scopeChild.$digest();
    }));

    it('should wrap directive properly', () => {
        expect(elementParent.hasClass('cc-select')).toBeTruthy();
    });

    it('should create my directive properly', () => {
        expect(elementChild.attr('cc-select')).toBe('cc-select');
    });

    it('should check if select is hidden', () => {
        expect(elementChild.hasClass('ng-hide')).toBeTruthy();
    });
});
