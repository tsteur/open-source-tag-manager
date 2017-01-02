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
    var DebugParamDetector = function($location, DEBUG_PARAM_NAME) {
        this.location = $location;

        /**
         * Check if url contains debug parameter
         *
         * @returns {boolean}
         */
        this.hasParam = function () {
            return this.hasParamInHash() || this.hasParamInQuery();
        };

        /**
         * Check if url hash contains debug parameter
         *
         * @returns {boolean}
         */
        this.hasParamInHash = function () {
            return this.location.hash.indexOf(DEBUG_PARAM_NAME) !== -1;
        };

        /**
         * Check if url query contains debug parameter
         *
         * @returns {boolean}
         */
        this.hasParamInQuery = function () {
            return this.location.search.indexOf(DEBUG_PARAM_NAME) !== -1;
        };

        return this;
    };

    DebugParamDetector.$inject = [
        '$location',
        'DEBUG_PARAM_NAME'
    ];

    sevenTag.service(MODULE_NAME, DebugParamDetector);
})(window.sevenTag, '$debugParamDetector');
