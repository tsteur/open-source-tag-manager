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
     * @constructor
     */
    var Cookie = function ($document) {
        /**
         * @param name
         * @param value
         * @param expires - time to expire in seconds
         * @param path
         */
        this.add = function (name, value, expires, path) {
            var expiresAttr = '';

            path = path === undefined ? '/' : path;

            if (expires) {
                var date = new Date();
                date.setTime(date.getTime() + (expires * 1000));
                expiresAttr = '; expires=' + date.toGMTString();
            }

            $document.cookie = name + '=' + value + expiresAttr + '; path=' + path;
        };

        /**
         * @param name
         * @returns {*}
         */
        this.get = function (name) {
            var cookies = $document.cookie ? $document.cookie.split('; ') : [],
                i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookieName = parts[0].replace(/^\s+|\s+$/gm, '');

                if (cookieName === name) {
                    // value also might contain "=" sign
                    var value = parts.slice(1).join('=');

                    if (value.charAt(0) === '"') {
                        value = value.slice(1, -1);
                    }

                    return value;
                }
            }

            return undefined;
        };

        /**
         * @param name
         */
        this.remove = function (name) {
            this.add(name, '', -86400);
        };

        return this;
    };

    Cookie.$inject = [
        '$document'
    ];

    sevenTag.service(MODULE_NAME, Cookie);
})(window.sevenTag, '$cookie');
