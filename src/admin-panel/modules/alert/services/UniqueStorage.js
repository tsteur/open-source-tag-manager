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

import AlertStorage from './AlertStorage.js';

/**
 * @name alert#UniqueStorage
 * @namespace clearcode.tm.alert
 */
class UniqueStorage extends AlertStorage {
    /**
     * @description Add alert to collection
     *
     * @param {String} type
     * @param {String} message
     * @returns {Number}
     */
    add (type, message) {
        if (this.has(type, message)) {
            return -1;
        }
        return super.add(type, message);
    }
}

export default UniqueStorage;
