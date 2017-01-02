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

const BREADCRUMB_SECTION = 'My account';

/**
 * @name BaseController
 */
class BaseController {
    constructor (userResource, alert, PageInfo, state, $translate, refreshAlert) {
        this.ACTIVATION_SET_PASSWORD = 'ACTIVATION_SET_PASSWORD';
        this.ROLE_API = 'ROLE_API';
        this.ROLE_USER = 'ROLE_USER';
        this.ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';
        this.ROLE_CONTAINERS_CREATE = 'ROLE_CONTAINERS_CREATE';

        this.alert = alert;
        this.state = state;
        this.userResource = userResource;
        this.userPromise = undefined;
        this.user = userResource.getEntity();

        $translate([BREADCRUMB_SECTION])
            .then((translations) => {
                PageInfo.clear()
                    .add(translations[BREADCRUMB_SECTION])
                    .broadcast();
            });

        refreshAlert.success('LANGUAGE_CHANGE_MESSAGE', 'user.change_language');
    }

    displayRoleSectionForUser () {
        return !this.state.includes('editProfile');
    }

    displayPasswordSection () {
        if (!this.activation) {
            return false;
        }

        return this.activation === this.ACTIVATION_SET_PASSWORD;
    }

    setUser (id) {
        if (this.state.includes('editProfile')) {
            this.userPromise = this.userResource.getMe();
        } else {
            this.role = undefined;
            this.createContainerRole = undefined;
            this.userPromise = this.userResource.get(id);
        }

        this.userPromise.then((resp) => {
            this.user = resp;
            this.role = this.getUserRole();
            this.createContainerRole = this.user.roles.indexOf(this.ROLE_CONTAINERS_CREATE) !== -1;
        });
    }

    getUserRole () {
        if (this.user.hasRole(this.ROLE_SUPER_ADMIN)) {
            return this.ROLE_SUPER_ADMIN;
        }

        if (this.user.hasRole(this.ROLE_API)) {
            return this.ROLE_API;
        }

        return this.ROLE_USER;
    }

    setRole (role) {
        let roleIndex = this.user.roles.indexOf(role);

        if (roleIndex !== -1) {
            this.user.roles.splice(roleIndex, 1);

            return false;
        } else {
            this.user.roles.push(role);

            return true;
        }
    }

    submitForm (user) {
        if (this.state.includes('editProfile')) {
            this.userPromise = user.saveMe();
        } else {
            user.roles = [this.role];

            if (this.role === this.ROLE_USER && this.createContainerRole) {
                user.roles.push(this.ROLE_CONTAINERS_CREATE);
            }

            this.userPromise = user.save();
        }

        this.userPromise.then(
            () => {
                this.alert.success('user.save');

                if (!this.state.includes('editProfile')) {
                    this.state.go('users');
                }
            },
            () => {
                this.alert.error('user.invalid');
            }
        );
    }

    displayInvalidFormMessage () {
        this.alert.error('error.invalid');
    }
}

export default BaseController;
