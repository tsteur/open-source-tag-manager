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

var integrationFactory = (resource) => {
    /**
     * @name Integration
     * @description Integration entity
     */
    class Integration {
        constructor () {
            /**
             * @type {number}
             */
            this.id = undefined;

            /**
             * @type {string}
             */
            this.name = undefined;

            /**
             * @type {string}
             */
            this.clientId = undefined;

            /**
             * @type {string}
             */
            this.clientSecret = undefined;

            /**
             * @type {string}
             */
            this.createdAt = undefined;
            /**
             * @type {string}
             */
            this.updatedAt = undefined;
            /**
             * @type {Object}
             */
            this.user = undefined;
        }

        /**
         * @returns {deferred.promise}
         */
        save () {
            var result = {}, promise;

            var excludedProperty = ['id', 'updatedAt', 'createdAt', 'clientId', 'clientSecret', 'user'];

            for (var property in this) {
                if (
                    !angular.isFunction(this[property]) &&
                    this.hasOwnProperty(property) &&
                    excludedProperty.indexOf(property) === -1
                ) {
                    if (property === 'type') {
                        result[property] = this[property].id;
                    } else {
                        result[property] = this[property];
                    }
                }
            }

            if (this.id === undefined) {
                if (this.user.email) {
                    result.user = {};
                    result.user.email = this.user.email;
                }

                promise = resource.post(result);
            } else {
                promise = resource.put(this.id, result);
            }

            return promise;
        }

        /**
         * @returns {deferred.promise|Boolean}
         */
        remove () {
            if (this.id === undefined) {
                return false;
            }

            return resource.delete(this.id);
        }
    }

    return Integration;
};

export default integrationFactory;
