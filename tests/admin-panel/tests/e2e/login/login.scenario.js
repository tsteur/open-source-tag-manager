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
        /^I fill in login field with "(.*)"$/,
        function (user, callback) {

            var loginField = '#signin-form-login';
            var loginFieldPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                loginField,
                user
            );

            loginFieldPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I fill in password field with "(.*)"$/,
        function (pass, callback) {

            var passField = '#signin-form-password';
            var passFieldPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                passField,
                pass
            );

            passFieldPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Submit button$/,
        function (callback) {

            var submitLoginButton = '#signin-form-submit';
            var submitLoginButtonPromise = scenario.context(
                /^I press "(.*)" button$/,
                submitLoginButton
            );

            submitLoginButtonPromise.then(function () {
                callback();

            });

        }
    );

    scenario.define(
        /^I press Logout button$/,
        function (callback) {

            var pressLogoutButton = '#top-profile-logout';
            var pressLogoutButtonPromise = scenario.context(
                /^I press "(.*)" button$/,
                pressLogoutButton
            );

            pressLogoutButtonPromise.then(function () {

                callback();

            });

        }
    );


    scenario.define(
        /^I press user menu button$/,
        function (callback) {

            var pressProfileOptionsButton = '#top-profile-opitons';
            var pressProfileOptionsButtonPromise = scenario.context(
                /^I press "(.*)" button$/,
                pressProfileOptionsButton
            );

            pressProfileOptionsButtonPromise.then(function () {

                callback();

            });

        }
    );

};
