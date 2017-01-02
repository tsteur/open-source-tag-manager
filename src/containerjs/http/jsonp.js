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
    var JSONP = function ($window, $document) {
        this.CALLBACK_PATTERN = 'SevenTag_TagTreeCallback';
        this.callbackCounter = 0;

        this.fetch = function (url, callback) {
            var callbackName = this.CALLBACK_PATTERN + '_' + this.callbackCounter++;

            $window[callbackName] = this.eval(callback);
            url = url.replace('=callback', '=' + callbackName);

            var script = $document.createElement('SCRIPT'),
                headElement = $document.head || $document.getElementsByTagName('head')[0];
            script.src = url;
            headElement.appendChild(script);
        };

        this.eval = function (callback) {
            return function (resp) {
                var validJSON = false;

                if (typeof resp == 'string') {
                    try {
                        validJSON = JSON.parse(resp);
                    } catch (ex) {
                        /* invalid JSON */
                    }
                } else {
                    validJSON = JSON.parse(JSON.stringify(resp));
                }

                if (validJSON) {
                    callback(validJSON);
                } else {
                    throw ('JSONP call returned invalid or empty JSON');
                }
            };
        };

        return this;
    };

    JSONP.$inject = [
        '$window',
        '$document'
    ];

    sevenTag.service(MODULE_NAME, JSONP);
})(window.sevenTag, '$jsonp');
