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

let tagFactory = (resource) => {
    /**
     * @name Variable
     * @description Variable entity
     */
    class Tag {
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
            this.code = undefined;

            /**
             * @type {Array}
             */
            this.triggers = [];

            /**
             * @type {string}
             */
            this.updatedAt = undefined;

            /**
             * @type {number}
             */
            this.priority = 0;

            /**
             * @type {boolean}
             */
            this.documentWrite = false;

            /**
             * @type {boolean}
             */
            this.disableInDebugMode = false;

            /**
             * @type {boolean}
             */
            this.respectVisitorsPrivacy = false;

            /**
             * @type {boolean}
             */
            this.isSynchronous = false;

            /**
             * @type {boolean}
             */
            this.isActive = true;

            /**
             * @type {string}
             */
            this.template = null;

            /**
             * @type {Object}
             */
            this.templateOptions = {};

            /**
             * @type {boolean}
             */
            this.statusChangePending = false;
        }

        /**
         * @param {Trigger} trigger
         */
        addTrigger (trigger) {
            this.triggers.push(trigger);
        }

        /**
         * @param {Trigger} trigger
         */
        editTrigger (trigger) {
            let index = this.triggers.length;

            while (index--) {
                if (this.triggers[index].id === trigger.id) {
                    this.triggers[index] = trigger;

                    return true;
                }
            }

            return false;
        }

        /**
         * @param {Trigger} trigger
         */
        removeTrigger (trigger) {
            var index = this.triggers.indexOf(trigger);

            if (index > -1) {
                this.triggers.splice(index, 1);

                return true;
            }

            return false;
        }

        /**
         * @param {Number} id
         */
        removeTriggerById (id) {
            var index = this.triggers.length;

            while (index--) {
                if (this.triggers[index].id === id) {
                    this.triggers.splice(index, 1);

                    return true;
                }
            }

            return false;
        }

        /**
         * @param {number} containerId
         *
         * @returns {deferred.promise}
         */
        save (containerId) {
            var result = {}, promise;
            var excludedProperty = ['id', 'updatedAt', 'createdAt', 'statusChangePending'];

            if (this.template === undefined) {
                excludedProperty.push('templateOptions');
            } else {
                excludedProperty.push('code');
                excludedProperty.push('documentWrite');
            }

            for (var property in this) {
                if (
                    !angular.isFunction(this[property]) &&
                    this.hasOwnProperty(property) &&
                    excludedProperty.indexOf(property) === -1
                ) {
                    if (property === 'triggers') {
                        var collection = [];

                        for (var index in this[property]) {
                            if (this[property][index] instanceof Object) {
                                collection.push(this[property][index].id);
                            }
                        }

                        result[property] = collection;
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

        /**
         * @returns {deferred.promise|Boolean}
         */
        remove () {
            if (this.id === undefined) {
                return false;
            }

            return resource.delete(this.id);
        }

        /**
         * @param containerId
         * @returns {deferred.promise}
         */
        changeStatus (containerId) {
            let tag = angular.copy(this);
            tag.isActive = !tag.isActive;
            this.statusChangePending = true;

            let promise = tag.save(containerId).then(
                (tag) => {
                    this.isActive = !this.isActive;
                    this.updatedAt = tag.updatedAt;
                }
            ).finally(
                () => {
                    this.statusChangePending = false;
                }
            );

            return promise;
        }
    }

    return Tag;
};

export default tagFactory;
