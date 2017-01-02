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

let security;
let state;

/**
 * @name security#Authorization
 * @description
 * Service for authorization
 */
class Authorization {
    constructor ($security, $state) {
        security = $security;
        state = $state;
    }

    authorize (roles) {
        return security.getUser()
            .then(() => {
                if (doNotEnter(roles)) {
                    state.go('signIn');
                }
            });
    }
}

function doNotEnter (roles) {
    let isAuthenticated = security.isAuthenticated();

    return roles && roles.length > 0 && !security.hasAnyRole(roles) && !isAuthenticated;
}

export default Authorization;
