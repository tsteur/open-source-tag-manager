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

const STACK_LIMIT = 300;

/**
 * @name DataLayerLimitedStack
 */
class DataLayerLimitedStack {
    constructor ($limit) {
        this.setLimit($limit);
        this.$stack = [];
    }

    /**
     * @param $limit
     */
    setLimit ($limit) {
        this.$limit = this.isLimitDefined($limit) ? $limit : STACK_LIMIT;
    }

    /**
     * @param $limit
     * @returns {boolean}
     */
    isLimitDefined ($limit) {
        return $limit !== undefined;
    }

    /**
     * @returns {boolean}
     */
    isLimitExceeded () {
        return this.$stack.length >= this.$limit;
    }

    /**
     * @param element
     */
    push (element) {
        if (this.isLimitExceeded()) {
            this.$stack.shift();
        }

        this.$stack.push(element);
    }

    /**
     * @returns {Array}
     */
    get stack () {
        return this.$stack;
    }

    /**
     * @returns {Object|boolean}
     */
    get (id) {
        return this.$stack[id] !== undefined ? this.$stack[id] : false;
    }
}

DataLayerLimitedStack.$inject = [];

angular
    .module('stg.debugger')
    .service('stg.debugger.dataLayerLimitedStack', DataLayerLimitedStack);
