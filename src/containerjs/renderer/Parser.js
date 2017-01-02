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

(function (sevenTag, MODULE_NAME) {
    /**
     * Parser service
     *
     * @constructor
     */
    var Parser = function ($utils, $variablesHistory) {
        /**
         * @type {string}
         */
        var openTag = '{{';

        /**
         * @type {string}
         */
        var closeTag = '}}';

        /**
         * Escape template from special characters
         *
         * @param {string} str
         *
         * @returns {string}
         *
         * @private
         */
        var regExpEscape = function (str) {
            return String(str).replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
        };

        /**
         * Parse file to find interpolation tags
         * and replace them with provided variables
         *
         * @param {string} template
         * @param {Array} variables
         */
        this.parse = function (template, variables, contextId) {
            $variablesHistory.push(contextId, variables);

            var element = window.document.createElement('div');
            var matches, regex;

            if(element.addEventListener) {
                regex = regExpEscape(openTag) + '((?:.|[\r\n])+?)(?:' + regExpEscape(closeTag) + '|$)';
            } else {
                regex = '{{|}}';
            }

            matches = template.split(
                new RegExp(regex)
            );

            // Replace interpolation with variables values
            var buffer = [], replacement, variable, type;

            for (var i = 0; i < matches.length; i++) {
                replacement = variable = $utils.trim(matches[i]);

                // Get even matches to work only on matches with name of variable
                if (i % 2 === 1) {
                    replacement = variables[variable];
                    type = $utils.type(replacement);

                    if(replacement === null) {
                        type = '';
                        replacement = 'null';
                    }

                    if(replacement === undefined) {
                        type = '';
                        replacement = 'undefined';
                    }

                    // Add apostrophe when variable is string
                    if (type === 'string') {
                        replacement = '\'' + replacement + '\'';
                    }

                    if ($utils.inArray(type, ['object', 'array', 'function']) !== -1) {
                        replacement = '(function(){return window.sevenTag.$injector.get(\'$variablesHistory\').get(\''+ contextId +'\', \''+ variable +'\') })()';
                    }
                }

                buffer.push(replacement);
            }

            // Join buffer stack to get final result of template
            return buffer.join('');
        };

        return this;
    };

    Parser.$inject = [
        '$utils',
        '$variablesHistory'
    ];

    sevenTag.service(MODULE_NAME, Parser);
})(window.sevenTag, '$parser');