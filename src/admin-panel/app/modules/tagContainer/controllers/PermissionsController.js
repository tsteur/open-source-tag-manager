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

let permissionsResource;
let currentContainer;
let alert;

/**
 * @name PermissionsController
 */
class PermissionsController {
    constructor (TableParams, paramConverter, $currentContainer, $alert, $permissionsResource) {
        this.permissionsPromise = undefined;
        permissionsResource = $permissionsResource;
        currentContainer = $currentContainer;
        alert = $alert;

        this.usersTable = new TableParams({
            page: 1,
            count: 10,
            sorting: {
                name: 'asc'
            }
        }, {
            total: 0,
            getData: ($defer, params) => {
                permissionsResource.query(currentContainer.$container.id, paramConverter.list(params.url())).then(
                    (resp) => {
                        params.total(resp.total);
                        $defer.resolve(resp.data);
                    }
                );
            }
        });
    }

    setPermission (permission, value) {
        var tempRequest = angular.copy(permission);
        tempRequest.permissions = value;
        this.permissionsPromise = tempRequest.save(currentContainer.$container.id);

        this.permissionsPromise.then(
            (resp) => {
                permission.permissions = resp.permissions;
            },
            () => {
                alert.error('permissions.error');
            }
        );
    }

    isValid (permission, value) {
        if (permission.permissions === value || permission.user.roles.indexOf('ROLE_SUPER_ADMIN') !== -1) {
            return false;
        }

        return true;
    }
}

export default PermissionsController;
