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

'use strict';

var scenario = require('../lib/scenario'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function () {

    scenario.use(this);


    scenario.define(
        /^I should see notification about save new password$/,
        function (callback) {

            var changeNewPasswordNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                '#alert-message-0-success'
            );

            changeNewPasswordNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I fill in my current password field with "(.*)"$/,
        function (text, callback) {

            var fieldCurrentPass = '#profile-edit-current-pass';

            var fillCurrentPasswordPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                fieldCurrentPass,
                text
            );

            fillCurrentPasswordPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I fill in new password with "(.*)"$/,
        function (text, callback) {

            var fieldNewPass = '#profile-edit-new-password';
            var fillNewPasswordPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                fieldNewPass,
                text
            );

            fillNewPasswordPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I fill in repeat new password with "(.*)"$/,
        function (text, callback) {

            var fieldConfirmNewPass = '#profile-edit-confirm-new-password';
            var fillConfirmNewPasswordPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                fieldConfirmNewPass,
                text
            );

            fillConfirmNewPasswordPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I choose Change Password tab$/,
        function (callback) {

            var saveContainerButton = '#profile-change-password';
            var saveContainerPromise = scenario.context(
                /^I press "(.*)" button$/,
                saveContainerButton
            );

            saveContainerPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I press Save Edit Profile button$/,
        function (callback) {

            var saveContainerButton = '#container-form-submit-button';
            var saveContainerPromise = scenario.context(
                /^I press "(.*)" button$/,
                saveContainerButton
            );

            saveContainerPromise.then(function () {

                callback();

            });

        });

};
