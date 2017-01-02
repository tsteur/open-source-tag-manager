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
 * @type {AlertForm}
 */
var alertForm;

/**
 * @type {String}
 */
const BREADCRUMB_TEXT = 'Forgot your password?';

/**
 * @name security#ResetRequestController
 * @description Controller for sending request for new password
 */
class ResetRequestController {
    /**
     * @param {UserResource} $userResource
     * @param {AlertForm} $alertForm
     * @param {Alert} $alert
     * @param {PageInfo} PageInfo
     * @param {$translate} $translate
     */
    constructor ($userResource, $alertForm, $alert, PageInfo, $translate) {
        this.email = '';
        this.translate = $translate;
        this.alert = $alert;
        userResource = $userResource;

        alertForm = $alertForm;
        alertForm.getStorage().clean();

        this.validationForce = false;

        this.resetPromise = undefined;

        this.success = false;

        this
            .translate([BREADCRUMB_TEXT])
            .then((translations) => {
                PageInfo.clear()
                    .add(translations[BREADCRUMB_TEXT])
                    .broadcast();
            });
    }

    /**
     *
     * @param {String} email
     */
    submitForm (email) {
        var data = {
            username: email
        };

        this.resetPromise = userResource.resetPassword(data);

        this.resetPromise.then(
            () => {
                alertForm.getStorage().clean();
                this.success = true;

                this
                    .translate(['The email with the activation link has been sent successfully.'])
                    .then((translations) => {
                        this.formTitle = translations['The email with the activation link has been sent successfully.'];
                    });
            },
            () => {
                alertForm.getStorage().clean();
                alertForm.error('request.error');
                this.alert.error('error.invalid');
            }
        );
    }

    /**
     * Display error if form is invalid
     */
    displayInvalidFormMessage () {
        this.validationForce = true;
        this.alert.error('error.invalid');
        alertForm.getStorage().clean();
        alertForm.error('invalid.email');
    }
}

export default ResetRequestController;
