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

var variableClickOutside = ($document) => {
    return {
        restrict: 'A',
        require: 'variableSelector',
        link: (scope, element, attrs, selectorCtrl) => {
            $document.on('click', documentOnClick);
            scope.$on('$destroy', () => {
                $document.off('click', documentOnClick);
            });

            function documentOnClick (event) {
                let outside = !element[0].contains(event.target),
                    listVisible = selectorCtrl.isVariablesListVisible();

                if (outside && listVisible) {
                    element.val(selectorCtrl.closeVariablePrompt(event));
                }
            }
        }
    };
};

export default variableClickOutside;
