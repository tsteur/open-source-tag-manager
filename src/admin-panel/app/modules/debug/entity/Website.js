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

var websiteFactory = () => {
    const DEBUG_PARAM_NAME = '_stg_debug';
    const URL_MIN_LENGTH = 10;

    /**
     * @name Website
     * @description Website entity
     */
    class Website {
        constructor () {
            /**
             * @type {string}
             */
            this.url = '';

            /**
             * @type {Integer}
             */
            this.parameterType = 0;
        }

        /**
         * @returns {string}
         */
        getUrlWithParameter () {
            if (this.hasUrl() === false) {
                return '';
            }

            return this.url + this.getSeparator() + DEBUG_PARAM_NAME;
        }

        /**
         * @returns {string}
         */
        getSeparator () {
            var separator = this.parameterType === 1 ? '#' : '?';

            if (this.hasUrl() === false) {
                return separator;
            }

            return this.url.indexOf(separator) === -1 ? separator : '&';
        }

        hasUrl () {
            return this.url !== undefined && this.url.length > URL_MIN_LENGTH;
        }
    }

    return Website;
};

export default websiteFactory;
