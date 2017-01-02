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

let localStorage;

/**
 * @name TokenStorage
 */
class TokenStorage {
    constructor ($localStorage) {
        localStorage = $localStorage;
    }

    getItem () {
        let accessToken = localStorage.accessToken;

        if (undefined !== accessToken) {
            accessToken = JSON.parse(accessToken);
        }

        return accessToken;
    }

    getToken () {
        let authToken = this.getItem();

        return `${TokenStorage.capitalizeFirstLetter(authToken.tokenType)} ${authToken.accessToken}`;
    }

    static capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    addItem (authToken) {
        localStorage.accessToken = JSON.stringify(authToken);

        return authToken;
    }

    removeItem () {
        localStorage.removeItem('accessToken');
    }
}

export default TokenStorage;
