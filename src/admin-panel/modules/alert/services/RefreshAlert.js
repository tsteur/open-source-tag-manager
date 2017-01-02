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

import Alert from './Alert.js';

/**
 * @name alert#RefreshAlert
 * @namespace clearcode.tm.alert
 */
class RefreshAlert extends Alert {
    constructor ($timeout, storage, provider, $translate, $window) {
        super($timeout, storage, provider, $translate);
        this.window = $window;
    }

    /**
     * Add success message after refresh page
     *
     * @param localStorageKey
     * @param message
     */
    success (localStorageKey, message) {
        if (this.window.localStorage[localStorageKey]) {
            super.success(message);
            this.window.localStorage.removeItem(localStorageKey);
        }
    }
}

export default RefreshAlert;
