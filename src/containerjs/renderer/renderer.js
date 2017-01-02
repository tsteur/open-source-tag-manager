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
'use strict';

(function(sevenTag, MODULE_NAME) {
    var Renderer = function($window, $postscribe, $parser) {
        this.render = function(element, tag, variables, contextId) {
            tag.code = $parser.parse(tag.code, variables, contextId);

            var appendTo = element;
            var wrapper = $window.document.createElement('div');
            wrapper.innerHTML = 'A' + tag.code;

            if(tag.documentWrite) {
                var documentWriteWrapper = $window.document.createElement('div');
                documentWriteWrapper.style.display = 'none';
                documentWriteWrapper.style.visibility = 'hidden';
                element.appendChild(documentWriteWrapper);
                appendTo = documentWriteWrapper;
            }

            for (var i = 1; i < wrapper.childNodes.length; i++) {
                if (wrapper.childNodes.item(i).nodeType) {
                    if (wrapper.childNodes.item(i).tagName === 'SCRIPT') {
                        var script = $window.document.createElement('SCRIPT');

                        for (var attr in wrapper.childNodes.item(i).attributes) {
                            if (!isNaN(parseInt(attr))) {
                                script[wrapper.childNodes.item(i).attributes[attr].name] = wrapper.childNodes.item(i).attributes[attr].value;
                            }
                        }

                        script.type = 'text/javascript';
                        script.defer = false;
                        script.text = wrapper.childNodes.item(i).text;

                        wrapper.replaceChild(script, wrapper.childNodes.item(i));
                    }

                    if(!tag.documentWrite) {
                        appendTo.appendChild(wrapper.childNodes.item(i));
                    }
                }
            }

            if(tag.documentWrite) {
                wrapper.removeChild(wrapper.childNodes[0]);
                $postscribe(appendTo, wrapper.innerHTML);
            }
        };

        return this;
    };

    Renderer.$inject = [
        '$window',
        '$postscribe',
        '$parser'
    ];

    sevenTag.service(MODULE_NAME, Renderer);
})(window.sevenTag, '$renderer');
