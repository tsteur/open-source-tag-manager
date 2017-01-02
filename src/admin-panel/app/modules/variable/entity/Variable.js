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

let variableFactory = (resource) => {
    /**
     * @name Variable
     * @description Variable entity
     */
    class Variable {
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
            this.description = undefined;

            /**
             * @type {string}
             */
            this.type = undefined;

            /**
             * @type {string}
             */
            this.value = undefined;

            /**
             * @type {Object}
             */
            this.options = [];

            /**
             * @type {string}
             */
            this.updatedAt = undefined;
        }

        save (containerId) {
            let result = {},
                promise,
                excludedProperty = ['id', 'updatedAt'];

            for (let property in this) {
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
                promise = resource.post(containerId, result);
            } else {
                promise = resource.put(this.id, result);
            }

            return promise;
        }

        remove () {
            if (this.id === undefined) {
                return false;
            }

            return resource.delete(this.id);
        }
    }

    return Variable;
};


export default variableFactory;
