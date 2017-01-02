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
        /^I go to Debug tab$/,
        function (callback) {


            var option = '#sidebar-nav-links-debug';
            var activatePreviewDebugMode = scenario.context(
                /^I click "(.*)" element$/,
                option

            );

            activatePreviewDebugMode.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see Preview and Debug navbar$/,
        function (callback) {

            var debugPanel = '.navbar-nav';

            var debugModePanel = scenario.context(
                /^I should see an "(.*)" element$/,
                debugPanel
            );

            debugModePanel.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see Preview and Debug navbar$/,
        function (callback) {

            var debugPanel = '.navbar-nav.shown';

            var debugModePanel = scenario.context(
                /^I should not see an "(.*)" element$/,
                debugPanel
            );

            debugModePanel.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I click Add website button$/,
        function (callback) {

            var addWebsiteButton = '#webite-add-button';
            var addWebsites = scenario.context(
                /^I click "(.*)" element$/,
                addWebsiteButton
            );

            addWebsites.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I click website form submit button$/,
        function (callback) {

            var clickSaveWebsiteButton = '#website-form-submit-button';
            var saveWebsitesForm = scenario.context(
                /^I click "(.*)" element$/,
                clickSaveWebsiteButton
            );

            saveWebsitesForm.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I fill website url field with "(.*)"$/,
        function (website_url, callback) {

            var inputWebsiteUrl = '#website-form-0-input-value';
            var fillWebsiteUrl = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                inputWebsiteUrl,
                website_url
            );

            fillWebsiteUrl.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I click Publish container button$/,
        function (callback) {

            var publishButton = '#top-version-publish';
            var clickPublishButton = scenario.context(
                /^I click "(.*)" element$/,
                publishButton
            );

            clickPublishButton.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notification about add new website$/,
        function (callback) {

            var deleteContainerAlert = '#alert-message-0-success';
            var deleteContainerNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                deleteContainerAlert
            );

            deleteContainerNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notification about error new website form$/,
        function (callback) {

            var deleteContainerAlert = '#alert-message-0-danger';
            var deleteContainerNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                deleteContainerAlert
            );

            deleteContainerNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see required field$/,
        function (callback) {

            var deleteContainerAlert = '.error.ng-scope';
            var deleteContainerNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                deleteContainerAlert
            );

            deleteContainerNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see disabled Debug button$/,
        function (callback) {

                var saveContainerButton = '.btn.btn-default.btn-md';
                var disabledSaveNewContainerPromise = scenario.context(
                    /^I should see disabled "(.*)" element$/,
                    saveContainerButton
                );

                disabledSaveNewContainerPromise.then(function () {

                    callback();

                });

            });

    scenario.define(
        /^I should see enabled Debug button$/,
        function (callback) {

            var locator = '.btn.btn-default.btn-md';
            var enabledElement = element(by.css(locator));

            enabledElement.getAttribute('disabled').then(function (isEnabled) {

                if (isEnabled === null) {

                    callback();

                } else {

                    throw new Error('is disabled');

                }

            });

        }
    );

    scenario.define(
        /^I click add another website button$/,
        function (callback) {

            var addNextWebsiteButton = '#website-form-0-add-button';
            var clickNextWebsiteButton = scenario.context(
                /^I click "(.*)" element$/,
                addNextWebsiteButton
            );

            clickNextWebsiteButton.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I can add second website/,
        function (callback) {

            var disabledButtonPromise = scenario.context(/^I should see disabled "(.*)" element$/,
                '#website-form-1-debug-button'
            );

            disabledButtonPromise.then(function () {

                var websitePromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                '#website-form-1-input-value',
                'http://wp.pl'
                );

                websitePromise.then(function () {

                    var submitPromise = scenario.context(/^I press "(.*)" button$/,
                    '#website-form-submit-button'

                    );

                    submitPromise.then(function () {

                        var waitForLoadPagePromise = scenario.context(/^I should see "(.*)" element$/,
                        '#alert-message-0-success'
                        );

                        submitPromise.then(function () {
                        setTimeout(callback, 3000);
                    });



                });

                });

            });


        }
    );

    scenario.define(
        /^I click remove second website button$/,
        function (callback) {

            var removeWebsiteButton = '#website-form-1-remove-button';
            var clickRemoveWebsiteButton = scenario.context(
                /^I click "(.*)" element$/,
                removeWebsiteButton
            );

            clickRemoveWebsiteButton.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see second website on the list$/,
        function (callback) {

            var secondWebsiteInput = '#website-form-1-input-value';
            var notSeeSEcondWebsite = scenario.context(
                /^I should not see an "(.*)" element$/,
                secondWebsiteInput
            );

            notSeeSEcondWebsite.then(function () {

                callback();

            });

        }
    );

};
