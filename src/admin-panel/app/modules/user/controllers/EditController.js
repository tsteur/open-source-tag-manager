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
const BREADCRUMB_TEXT = 'Edit user';

/**
 * @type {String}
 */
const BREADCRUMB_GLOBAL = 'Users';

let scope;
let state;
let translate;

/**
 * @name EditController
 */
class EditController extends BaseController {
    /**
     * @param {UserResource} userResource
     * @param {stateParams} stateParams
     * @param {Alert} alert
     * @param {PageInfo} PageInfo
     * @param {$state} $state
     * @param {$scope} $scope
     * @param {$translate} $translate
     * @param {refreshAlert} refreshAlert
     * @param {security} security
     */
    constructor (userResource, stateParams, alert, PageInfo, $state, $scope, $translate, refreshAlert, security) {
        super(userResource, alert, PageInfo, $state, $translate, refreshAlert);

        scope = $scope;
        state = $state;
        translate = $translate;
        this.security = security;

        if (state.includes('editProfile')) {
            this.setUser();
        } else {
            this.activation = this.ACTIVATION_SET_PASSWORD;

            this.password = {
                first: '',
                second: ''
            };

            this.setUser(stateParams.userId);


            translate([BREADCRUMB_TEXT, BREADCRUMB_GLOBAL])
                .then((translations) => {
                    PageInfo.clear()
                        .add(translations[BREADCRUMB_GLOBAL], 'users')
                        .add(translations[BREADCRUMB_TEXT])
                        .broadcast();
                });
        }
    }

    /**
     * Display error if form is invalid
     */
    editUserFormValidation () {
        scope.editUserForm.first.$dirty = true;
        scope.editUserForm.second.$dirty = true;

        if (this.password.first === '' && this.password.second === '') {
            return true;
        }

        if (this.password.first !== this.password.second) {
            scope.editUserForm.first.$invalid = true;
            scope.editUserForm.second.$invalid = true;

            translate(['Passwords have to be identical'])
                .then((translations) => {
                    scope.editUserForm.first.$error.first = [translations['Passwords have to be identical']];
                });

            scope.editUserForm.second.$error.second = [];

            return false;
        } else if (this.password.first.length < 8 || this.password.second.length < 8) {
            scope.editUserForm.first.$invalid = true;
            scope.editUserForm.second.$invalid = true;

            translate(['Password needs to have minimum 8 characters'])
                .then((translations) => {
                    scope.editUserForm.first.$error.first = [translations['Password needs to have minimum 8 characters']];
                });

            scope.editUserForm.second.$error.second = [];

            return false;
        }

        return scope.editUserForm.$valid;
    }

    submitForm (user) {
        user.roles = [this.role];

        if (this.role === this.ROLE_USER && this.createContainerRole) {
            user.roles.push(this.ROLE_CONTAINERS_CREATE);
        }

        if (this.hasOwnProperty('password')) {
            if (this.password.first !== '') {
                user.plainPassword = this.password;
            }
        }


        if (state.includes('editProfile')) {
            this.userPromise = user.saveMe();
        } else {
            this.userPromise = user.save();
        }

        this.userPromise.then(
            () => {
                this.security.getUser(true);
                this.alert.success('user.save');

                if (!state.includes('editProfile')) {
                    state.go('users');
                }
            },
            () => {
                this.alert.error('user.invalid');
            }
        );
    }
}

export default EditController;
