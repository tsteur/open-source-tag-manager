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
    var DebugParamFilter = function(DEBUG_PARAM_NAME) {
        /**
         * Filter url hash from debug parameter
         *
         * @param {string} url
         *
         * @returns {string}
         */
        this.filterFromHash = function (url) {
            return url.replace('#' + DEBUG_PARAM_NAME, '');
        };

        /**
         * Filter url query from debug parameter
         *
         * @param {string} url
         *
         * @returns {string}
         */
        this.filterFromQuery = function (url) {
            if (!url) {
                return '';
            }

            var parts = url.split('?');

            if (parts.length < 2) {
                return '';
            }

            // Split url to parts like protocol, url ect.
            var urlBase = parts.shift();
            var queryString = parts.join('?');
            var prefix = encodeURIComponent(DEBUG_PARAM_NAME);
            var pars = queryString.split(/[&;]/g);

            // Get every parameter to parameters pair
            for (var i = pars.length; i-- > 0; ) {
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            // Join parts to whole url
            url = urlBase + (pars.length > 0 ? '?' + pars.join('&') : '');

            return url;
        };

        return this;
    };

    DebugParamFilter.$inject = [
        'DEBUG_PARAM_NAME'
    ];

    sevenTag.service(MODULE_NAME, DebugParamFilter);
})(window.sevenTag, '$debugParamFilter');
