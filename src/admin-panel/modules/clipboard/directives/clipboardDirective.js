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

var clipboardDirective = ($compile, $document) => {
    return {
        restrict: 'A',
        scope: {
            ngModel: '='
        },
        link: (scope, element) => {
            element.wrap('<div class="cc-clipboard"></div>');

            let template = angular.element($document[0].getElementById('clipboard.html')).html(),
                tplElement = $compile(template)(scope),
                clipboard = element.parent();

            clipboard.append(tplElement);

            let button = clipboard.find('button');

            button.addClass('hidden');

            clipboard.on('mouseenter', setCopyButtonVisible(true))
                .on('mouseleave', setCopyButtonVisible(false));

            scope.copyToClipboard = () => scope.ngModel;

            function setCopyButtonVisible (setVisible) {
                return (event) => {
                    if (!eventTriggeredOverTextArea(event)) {
                        return;
                    }

                    if (setVisible) {
                        button.removeClass('hidden');
                    } else {
                        button.addClass('hidden');
                    }
                }
            }

            function eventTriggeredOverTextArea (event) {
                let target = event.target || event.srcElement;
                return target && target.nodeName === 'TEXTAREA';
            }
        }
    };
};

export default clipboardDirective;
