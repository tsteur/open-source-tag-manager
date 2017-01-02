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
 * @name variable#VariableFormProvider
 * @namespace clearcode.tm.variable
 */
/* eslint-disable */
class VariableFormProvider {
    constructor () {
        this.collection = {};
    }

    addType (name, settings) {
        if (this.collection[name] !== undefined) {
            throw new Error('Form type with provided name already exist');
        }

        this.collection[name] = settings;

        return this;
    }

    getType (name) {
        if (this.collection[name] === undefined) {
            return false;
        }

        return this.collection[name];
    }

    $get () {
        return this;
    }
}
/* eslint-enable */
export default VariableFormProvider;
