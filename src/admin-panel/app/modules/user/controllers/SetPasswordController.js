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
 * @type {UserResource}
 */
var userResource;

/**
 * @type {$state}
 */
var state;

/**
 * @type {$stateParams}
 */
var stateParams;

/**
 * @type {Alert}
 */
var alert;

/**
 * @type {String}
 */
const BREADCRUMB_TEXT = 'Change your password';

/**
 * @type {$scope}
 */
var scope;

/**
 * @name security#ChangePasswordController
 * @description Controller for change password view
 */
class ChangePasswordController {
    /**
     * @param {UserResource} $userResource
     * @param {$state} $state
     * @param {$stateParams} $stateParams
     * @param {Alert} $alert
     * @param {PageInfo} PageInfo
     * @param {$scope} $scope
     * @param {$translate} $translate
     */
    constructor ($userResource, $state, $stateParams, $alert, PageInfo, $scope, $translate) {
        this.new = {
            first: undefined,
            second: undefined
        };

        this.validationForce = false;
        this.changePasswordPromise = undefined;
        this.translate = $translate;

        userResource = $userResource;
        state = $state;
        stateParams = $stateParams;
        alert = $alert;
        scope = $scope;

        if (stateParams.token === '') {
            state.go('signIn');
            alert.error('changePassword.token');
        }

        this
            .translate([BREADCRUMB_TEXT])
            .then((translations) => {
                PageInfo.clear()
                    .add(translations[BREADCRUMB_TEXT])
                    .broadcast();
            });
    }

    /**
     * @param {Object} newPassword
     */
    submitForm (newPassword) {
        var password = {
            plainPassword: newPassword
        };

        this.changePasswordPromise = userResource.setPassword(password, stateParams.token);

        this.changePasswordPromise.then(
            () => {
                state.go('signIn');
                alert.success('changePassword.success');
            },
            () => {
                alert.error('changePassword.error');
            }
        );
    }

    /**
     * Display error if form is invalid
     * @param {Object} newPassword
     */
    displayInvalidFormMessage (newPassword) {
        this.validationForce = true;

        if (newPassword.first !== newPassword.second) {
            scope.resetPasswordForm.first.$invalid = true;
            scope.resetPasswordForm.second.$invalid = true;

            this
                .translate(['Passwords have to be identical'])
                .then((translations) => {
                    scope.resetPasswordForm.first.$error.first = [translations['Passwords have to be identical']];
                });

            scope.resetPasswordForm.second.$error.second = [];
        } else if (newPassword.first === undefined || newPassword.second === undefined) {
            alert.error('password.both');
        }
    }
}

export default ChangePasswordController;
