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
 * @name form#CheckboxDirective
 * @namespace clearcode.tm.form
 */
/* eslint-disable */
var RadioButtonDirective = () => {

    return {
        restrict: 'A',
        require: '?ccRadioModel',
        scope: {
            ccRadioModel: '=',
            ccDisabled: '='
        },
        link: (scope, element, attrs) => {

            element.wrap('<div class="cc-radio"></div>');

            if (scope.ccRadioModel !== undefined) {

                if(scope.ccDisabled) {

                    element.parent().addClass('radioDisabled');

                }

                if (scope.ccRadioModel === element[0].defaultValue) {

                    element.parent().addClass('radioSelected');

                } else {

                    element.parent().removeClass('radioSelected');

                }

            }

            scope.$watch('ccRadioModel', (value) => {

                if (value === element[0].defaultValue) {

                    element.parent().addClass('radioSelected');

                } else {

                    element.parent().removeClass('radioSelected');

                }

            });

        }
    };

};
/* eslint-enable */

export default RadioButtonDirective;
