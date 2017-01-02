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

var containerFactory = (resource) => {
    /**
     * @name Container
     * @description Container entity
     */
    class Container {
        constructor () {
            this.id;
            this.name;
            this.code;
            this.codeSynchronous;
            this.version;
            this.hasUnpublishedChanges;
            this.publishedAt;
            this.permissions;
            this.delay;
            this.websites;
        }

        /**
         * @returns {deferred.promise}
         */
        save () {
            var result = {}, promise;
            var excludedProperty = ['id', 'code', 'codeSynchronous', 'version', 'hasUnpublishedChanges', 'publishedAt', 'permissions', 'websites'];

            for (var property in this) {
                if (
                    !angular.isFunction(this[property]) &&
                    this.hasOwnProperty(property) &&
                    excludedProperty.indexOf(property) === -1
                ) {
                    result[property] = this[property];
                }
            }

            if (this.id === undefined) {
                delete result.delay;
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

        hasPermission (permission) {
            return this.permissions.indexOf(permission) !== -1;
        }

        /**
         * Get permission
         */
        getPermission () {
            let permissionsPrioritiedArray = [{
                value: 'operator',
                text: 'Owner'
            }, {
                value: 'publish',
                text: 'Publish'
            }, {
                value: 'edit',
                text: 'Edit'
            }, {
                value: 'view',
                text: 'View'
            }];

            for (let permissionIndex in permissionsPrioritiedArray) {
                if (this.permissions.indexOf(permissionsPrioritiedArray[permissionIndex].value) !== -1) {
                    return permissionsPrioritiedArray[permissionIndex].text;
                }
            }
        }
    }

    return Container;
};

export default containerFactory;
