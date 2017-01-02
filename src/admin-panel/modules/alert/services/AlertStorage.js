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

let indicator;

class AlertStorage {
    constructor () {
        indicator = 0;
        this.collection = {};
    }

    getAlerts () {
        return this.collection;
    }

    getAlert (id) {
        return this.collection[id];
    }

    add (type, message) {
        this.collection[indicator] = {
            type: type,
            message: message
        };

        return indicator++;
    }

    has (type, message) {
        for (var alert in this.collection) {
            if (type === this.collection[alert].type && message === this.collection[alert].message) {
                return true;
            }
        }

        return false;
    }

    remove (id) {
        if (this.collection[id] === undefined) {
            return false;
        }

        delete this.collection[id];

        return true;
    }

    clean () {
        this.collection = {};
    }
}

export default AlertStorage;
