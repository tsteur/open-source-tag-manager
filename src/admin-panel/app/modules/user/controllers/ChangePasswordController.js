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

let userResource;
let alert;
let state;
let scope;
let translate;

class ChangePasswordController {
    constructor ($userResource, $alert, $state, PageInfo, $scope, $translate) {
        userResource = $userResource;
        alert = $alert;
        state = $state;
        scope = $scope;
        translate = $translate;
        this.validationForce = false;
        this.changePasswordPromise = undefined;
        this.translate = $translate;
        this.currentPassword = '';
        this.plainPassword = {
            first: '',
            second: ''
        };

        translate([BREADCRUMB_SECTION])
            .then((translations) => {
                PageInfo.clear()
                    .add(translations[BREADCRUMB_SECTION])
                    .broadcast();
            });
    }

    submitForm (currentPassword, newPassword) {
        let data = {
            /* eslint-disable */
            current_password: currentPassword,
            /* eslint-enable */
            plainPassword: newPassword
        };

        this.changePasswordPromise = userResource.changePassword(data);

        this.changePasswordPromise.then(
            () => {
                alert.success('password.change');
                state.go('container');
            },
            () => {
                alert.error('error.invalid');
            }
        );
    }

    displayInvalidFormMessage (newPassword) {
        this.validationForce = true;

        if (newPassword.first !== newPassword.second) {
            scope.changePasswordForm.first.$invalid = true;
            scope.changePasswordForm.second.$invalid = true;

            translate(['Passwords have to be identical'])
                .then((translations) => {
                    scope.changePasswordForm.first.$error.first = [translations['Passwords have to be identical']];
                });

            scope.changePasswordForm.second.$error.second = [];
            alert.error('error.invalid');
        } else if (newPassword.first === undefined || newPassword.second === undefined) {
            alert.error('password.both');
        } else {
            alert.error('error.invalid');
        }
    }
}

export default ChangePasswordController;
