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

/**
 * @name form#SelectDirective
 * @namespace clearcode.tm.form
 */

var SelectDirective = ($compile) => {
    return {
        restrict: 'A',
        priority: 1,
        scope: {
            ngModel: '=',
            ccSelectOptions: '=',
            ccSelectValue: '@',
            ccSelectLabel: '@'
        },
        link: (scope, element, attrs) => {
            /* eslint-disable */
            element.wrap('<div class="cc-select"></div>');
            /* eslint-enable */
            element.addClass('ng-hide');

            var template = angular.element(document.getElementById('select-template.html')).html();
            var tmpElement = $compile(template)(scope);

            element.parent().append(tmpElement);

            scope.id = attrs.id;

            var searchByValue = (value) => {
                for (var index in scope.ccSelectOptions) {
                    if (scope.ccSelectOptions[index][scope.ccSelectValue] === value) {
                        return index;
                    }
                }

                return false;
            };

            scope.getActiveOptionLabel = () => {
                var index = searchByValue(scope.ngModel);

                if (index !== false) {
                    return scope.ccSelectOptions[index][scope.ccSelectLabel];
                } else {
                    return '';
                }
            };

            scope.changeSelection = (element) => {
                scope.ngModel = element[scope.ccSelectValue];
            };
        }
    };
};

export default SelectDirective;
