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

let $oauthResource;
let $tokenStorage;
let state;
let $alertForm;

const BREADCRUMB_TEXT = '7tag Welcome';

/**
 * @name security#LoginController
 * @description Controller for login view
 */
class LoginController {
    /**
     * @param {OAuthResource} oauthResource
     * @param {TokenStorage} tokenStorage
     * @param {$state} $state
     * @param {AlertForm} alertForm
     * @param {PageInfo} PageInfo
     *
     */
    constructor (oauthResource, tokenStorage, $state, alertForm, PageInfo) {
        this.auth = {
            identity: '',
            password: ''
        };
        this.loginPromise = undefined;

        $oauthResource = oauthResource;
        $tokenStorage = tokenStorage;
        state = $state;
        $alertForm = alertForm;

        $alertForm.getStorage().clean();

        PageInfo.clear()
            .add(BREADCRUMB_TEXT)
            .broadcast();
    }

    submitForm (auth) {
        this.loading = true;
        this.loginPromise = $oauthResource.post(auth.identity, auth.password);

        this.loginPromise.then(
            (resp) => {
                $alertForm.getStorage().clean();
                $tokenStorage.addItem(resp);
                state.go('container');
            },
            () => {
                this.loading = false;
            }
        );
    }

    displayInvalidLoginMessage () {
        $alertForm.error('login.invalid');
    }
}

export default LoginController;
