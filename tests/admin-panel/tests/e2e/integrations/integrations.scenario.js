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
        /^I click Create Integration button$/,
        function (callback) {

            var newIntegrationButton = '#integration-list-create-link';
            var clickNewIntegrationButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                newIntegrationButton
            );

            clickNewIntegrationButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I fill in integration name field with "(.*)"$/,
        function (name, callback) {

            var nameIntegrationField = '#integration-form-name';
            var nameIntegrationFieldPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameIntegrationField,
                name
            );

            nameIntegrationFieldPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I fill in integration user email field with "(.*)"$/,
        function (email, callback) {

            var emailIntegrationField = '#integration-form-user-email';
            var emailIntegrationFieldPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                emailIntegrationField,
                email
            );

            emailIntegrationFieldPromise.then(function () {

                callback();

            });

        }
    );


    scenario.define(
        /^I should see notification about created integration$/,
        function (callback) {

            var createIntegrationNotification = '#alert-message-0-success';
            var createIntegrationNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                createIntegrationNotification
            );

            createIntegrationNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see empty integration list$/,
        function (callback) {

            var addUserButton = '#integration-list-create-link';
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
        /^I click Save Integration button$/,
        function (callback) {

            var saveIntegrationButton = '#user-form-submit-button';
            var clickSaveNewIntegrationButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                saveIntegrationButton
            );

            clickSaveNewIntegrationButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see disabled integration clientId$/,
        function (callback) {

            var integrationClientId = '#integration-form-client-id';
            var integrationClientIdPromise = scenario.context(
                /^I should see disabled "(.*)" element$/,
                integrationClientId
            );

            integrationClientIdPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see disabled integration clientSecret$/,
        function (callback) {

            var integrationClientSecret = '#integration-form-client-secret';
            var integrationClientSecretPromise = scenario.context(
                /^I should see disabled "(.*)" element$/,
                integrationClientSecret
            );

            integrationClientSecretPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see disabled integration email$/,
        function (callback) {

            var integrationEmail = '#integration-form-user-email';
            var integrationEmailPromise = scenario.context(
                /^I should see disabled "(.*)" element$/,
                integrationEmail
            );

            integrationEmailPromise.then(function () {

                callback();

            });

        }
    );



    scenario.define(
        /^I should see integration user on container permission list$/,
        function (callback) {

            var integrationUser = '#user-3-row .col-md-3 span';
            var integrationUserOnTheListPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                "Integration integration_test",
                integrationUser

            );

            integrationUserOnTheListPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see integration user on users list$/,
        function (callback) {

            var integrationUser = '#user-list-row-0-user span';
            var integrationUserOnTheListPromise = scenario.context(
                /^I should not see "(.*)" text in element "(.*)"$/,
                "Integration integration_test",
                integrationUser

            );

            integrationUserOnTheListPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see added integration on the list$/,
        function (callback) {

            var integrationUser = "#integration-list-row-0-user"
            var integrationUserOnTheListPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                "integration_test",
                integrationUser


            );

            integrationUserOnTheListPromise.then(function () {

                callback();

            });

        }
    );

};
