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
        /^I should see created user "(.*)" on the list$/,
        function (text, callback) {

            var newUser = '#user-list-row-0-name';
            var seeNewUserPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                text,
                newUser
            );

            seeNewUserPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see created user on the list$/,
        function (callback) {

            var newUser = '#user-list-row-0-name';
            var seeNewUserPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                newUser
            );

            seeNewUserPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notification about create new user$/,
        function (callback) {

            var createUserNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                '#alert-message-0-success'
            );

            createUserNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see notification about create new user$/,
        function (callback) {

            var createUserNotifyPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                '#alert-message-0-success'
            );

            createUserNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I fill in user email field with "(.*)"$/,
        function (text, callback) {

            var emailFieldUser = '#user-form-email';
            var fillEmailFieldUserPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                emailFieldUser,
                text
            );

            fillEmailFieldUserPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I fill in user first name field with "(.*)"$/,
        function (text, callback) {

            var firstNameFieldUser = '#user-form-firstName';
            var fillFirstNameFieldUserPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                firstNameFieldUser,
                text
            );

            fillFirstNameFieldUserPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I fill in user last name field with "(.*)"$/,
        function (text, callback) {

            var lastNameFieldUser = '#user-form-lastName';
            var fillLastNameFieldUserPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                lastNameFieldUser,
                text
            );

            fillLastNameFieldUserPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I press Save user button$/,
        function (callback) {

            var saveUserButton = '#user-form-submit-button';
            var saveUserPromise = scenario.context(
                /^I press "(.*)" button$/,
                saveUserButton
            );

            saveUserPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I press Create New User button$/,
        function (callback) {

            var newUserButton = '#user-list-create-link';
            var createNewUserPromise = scenario.context(
                /^I press "(.*)" button$/,
                newUserButton
            );

            createNewUserPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I press Show Users Actions button$/,
        function iClickShowActionTag (callback) {

            var actionButton = '#user-list-row-0-action a';
            var clickShowUserActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                actionButton
            );

            clickShowUserActionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Edit User button$/,
        function iClickEditUserAction (callback) {

            var editActionButton = '#user-list-row-0-edit';
            var clickEditUserActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                editActionButton
            );

            clickEditUserActionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Delete User button$/,
        function iClickDeleteUserAction (callback) {

            var deleteActionButton = '#user-list-row-0-delete';
            var clickDeleteUserActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                deleteActionButton
            );

            clickDeleteUserActionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see edited user "(.*)" on the list$/,
        function (text, callback) {

            var editedUser = '#user-list-row-0-user';
            var seeEditedUserPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                text,
                editedUser
            );

            seeEditedUserPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see user "(.*)" on the list$/,
        function (text, callback) {

            var userEmail = '#user-list-row-0-email';
            var seeUserPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                text,
                userEmail
            );

            seeUserPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see deleted user "(.*)" on the list$/,
        function (text, callback) {

            var userEmail = '#user-list-row-0-email';
            var seeUserPromise = scenario.context(
                /^I should not see "(.*)" text in element "(.*)"$/,
                text,
                userEmail
            );

            seeUserPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see empty list$/,
        function (callback) {

            var addUserButton = '#user-list-create-link';
            var textEmptyList = 'h2.text-center strong.ng-scope';
            var seeEmptyUserListPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                addUserButton
            );

            seeEmptyUserListPromise.then(function () {

                    var seeHeaderEmptyUserListPromise = scenario.context(
                        /^I should see "(.*)" text in element "(.*)"$/,
                        'Your list is empty',
                        textEmptyList
                    );

                        seeHeaderEmptyUserListPromise.then(function () {
                            callback();

                        });
            });

        }
    );


    scenario.define(
        /^I should see notification about edit user$/,
        function (callback) {

            var editUserNotification = '#alert-message-0-success';
            var editTagNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                editUserNotification
            );

            editTagNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I confirm delete user$/,
        function (callback) {

            var deleteConfirmUserButton = '#confirm-option-yes';
            var confirmDeleteUserPromise = scenario.context(
                /^I press "(.*)" button$/,
                deleteConfirmUserButton
            );

            confirmDeleteUserPromise.then(function () {

                callback();

            });

        }
    );

};
