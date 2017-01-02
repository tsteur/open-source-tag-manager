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

import BaseController from './BaseController.js';

/**
 * @type {String}
 */
const BREADCRUMB_TEXT = 'Add a user';

/**
 * @type {String}
 */
const BREADCRUMB_GLOBAL = 'Users';
/**
 * @type {String}
 */
const ACTIVATION_EMAIL = 'ACTIVATION_EMAIL';

/**
 * @type {String}
 */
const ACTIVATION_SET_PASSWORD = 'ACTIVATION_SET_PASSWORD';

/**
 * @type {String}
 */
const ROLE_USER = 'ROLE_USER';

let scope;
let translate;

/**
 * @name CreateController
 */
class CreateController extends BaseController {
    /**
     * @param {UserResource} userResource
     * @param {Alert} alert
     * @param {PageInfo} PageInfo
     * @param {$state} state
     * @param {$scope} $scope
     * @param {$translate} $translate
     * @param {RefreshAlert} RefreshAlert
     */
    constructor (userResource, alert, PageInfo, state, $scope, $translate, RefreshAlert) {
        super(userResource, alert, PageInfo, state, $translate, RefreshAlert);

        scope = $scope;
        translate = $translate;

        this.activation = ACTIVATION_EMAIL;
        this.role = ROLE_USER;

        this.password = {
            first: '',
            second: ''
        };

        translate([BREADCRUMB_TEXT, BREADCRUMB_GLOBAL])
            .then((translations) => {
                PageInfo.clear()
                    .add(translations[BREADCRUMB_GLOBAL], 'users')
                    .add(translations[BREADCRUMB_TEXT])
                    .broadcast();
            });
    }

    /**
     * Display error if form is invalid
     */
    createUserFormValidation () {
        var isValid = false;

        scope.createUserForm.first.$dirty = true;
        scope.createUserForm.second.$dirty = true;

        if (this.password.first !== this.password.second) {
            scope.createUserForm.first.$invalid = true;
            scope.createUserForm.second.$invalid = true;

            translate(['Passwords have to be identical'])
                .then((translations) => {
                    scope.createUserForm.first.$error.first = [translations['Passwords have to be identical']];
                });

            scope.createUserForm.second.$error.second = [];
            isValid = false;
        } else if (this.password.first.length < 8 || this.password.second.length < 8) {
            scope.createUserForm.first.$invalid = true;
            scope.createUserForm.second.$invalid = true;

            translate(['Password needs to have minimum 8 characters'])
                .then((translations) => {
                    scope.createUserForm.first.$error.first = [translations['Password needs to have minimum 8 characters']];
                });

            scope.createUserForm.second.$error.second = [];

            isValid = false;
        } else if (this.activation === ACTIVATION_SET_PASSWORD) {
            isValid = true;
        }

        if (!scope.createUserForm.$valid) {
            isValid = false
        }

        if (scope.createUserForm.$valid && this.activation === ACTIVATION_EMAIL) {
            isValid = true;
        }

        if (!isValid) {
            this.alert.error('user.invalid');
        }

        return isValid;
    }

    submitForm (user) {
        user.roles = [this.role];

        if (this.role === this.ROLE_USER && this.createContainerRole) {
            user.roles.push(this.ROLE_CONTAINERS_CREATE);
        }

        if (this.activation === ACTIVATION_SET_PASSWORD) {
            user.plainPassword = this.password;
        }

        this.userPromise = user.save();

        this.userPromise.then(
            () => {
                this.alert.success('user.save');
                this.state.go('users');
            },
            () => {
                this.alert.error('user.invalid');
            }
        );
    }
}

export default CreateController;
