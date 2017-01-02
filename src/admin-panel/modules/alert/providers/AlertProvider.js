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
 * @name alert#AlertProvider
 * @namespace clearcode.tm.alert
 */
/* eslint-disable */
class AlertProvider {
    constructor () {
        this.interval = 6000;
        this.messagePatterns = {};
    }

    /**
     * @description Add message pattern
     *
     * @param {String} id
     * @param {String} pattern
     * @returns {AlertProvider}
     */
    addMessagePattern (id, pattern) {
        if (this.messagePatterns[id] !== undefined) {
            throw new Error('Pattern with provided id already exist');
        }

        this.messagePatterns[id] = pattern;

        return this;
    }

    /**
     * @description Add message patterns from array of objects
     *
     * @param {Array} patterns
     * @returns {AlertProvider}
     */
     addMessagesPattern (patterns) {
        if (!angular.isArray(patterns)) {
            throw new Error(
                `AlertProvider.addMessagesPattern expects
                 first argument to be Array but received ${(typeof patterns)}`
            );
        }

        angular.forEach(patterns, (obj) => {
            if (angular.isObject(obj)) {
                angular.forEach(obj, (elem, key) => {
                    this.addMessagePattern(key, elem);
                });
            }
        });

        return this;
    }

    /**
     * @description Get specific message pattern by id
     *
     * @param {String} id
     * @returns {String|Boolean}
     */
    getMessagePattern (id) {
        if (this.messagePatterns[id] !== undefined) {
            return this.messagePatterns[id];
        }

        return false;
    }

    $get () {
        return this;
    }
}
/* eslint-enable */
export default AlertProvider;
