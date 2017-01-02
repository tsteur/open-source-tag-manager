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
 * @name Security
 * @description
 * Store information about current user access token
 */
class Security {
    constructor ($q, $timeout, tokenStorage, userResource, oauthResource, $translate) {
        this.q = $q;
        this.timeout = $timeout;
        this.user = undefined;
        this.authenticated = false;
        this.tokenStorage = tokenStorage;
        this.userResource = userResource;
        this.oauthResource = oauthResource;
        this.translate = $translate;
        this.checked = false;
    }

    isAuthenticated () {
        return this.authenticated;
    }

    isChecked () {
        return this.checked;
    }

    isSuperAdmin () {
        return this.user.roles.indexOf('ROLE_SUPER_ADMIN') !== -1;
    }

    hasRole (roleString) {
        if (!this.authenticated || roleString === undefined) {
            return false;
        }

        return this.user.roles.indexOf(roleString) !== -1 || this.isSuperAdmin();
    }

    hasAnyRole (roles) {
        if (!this.authenticated || roles === undefined) {
            return false;
        }

        for (let i = 0; i < roles.length; i++) {
            if (this.hasRole(roles[i])) {
                return true;
            }
        }

        return false;
    }

    authenticate (user) {
        this.user = user;
        this.authenticated = true;
        this.translate.use(user.language);
    }

    logout () {
        let deferred = this.q.defer();

        this.oauthResource.logout().then(
            () => {
                this.user = undefined;
                this.authenticated = false;
                this.tokenStorage.removeItem();

                deferred.resolve();
            },
            (err) => {
                deferred.reject(err);
            }
        );

        return deferred.promise;
    }

    getUser (force) {
        let deferred = this.q.defer();

        if (force) {
            this.reloadUser();
        }

        if (this.user !== undefined) {
            deferred.resolve(this.user);
            this.authenticate(this.user);

            return deferred.promise;
        }

        if (undefined !== this.tokenStorage.getItem()) {
            if (!this.isAuthenticated()) {
                this.reloadUser();
            }
        } else {
            this.checked = true;
            deferred.reject();
        }

        return deferred.promise;
    }

    reloadUser () {
        let deferred = this.q.defer();

        this.userResource.getMe().then(
            (resp) => {
                this.checked = true;

                this.authenticate(resp);
                deferred.resolve(this.user);
            },
            () => {
                this.checked = true;
            }
        );
    }
}

export default Security;
