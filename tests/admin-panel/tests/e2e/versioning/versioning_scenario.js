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
        /^I should see "(.*)" version$/,
        function (status, callback) {

            var versionStatus = '#top-version-status';
            var checkVersionStatusPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                status,
                versionStatus
            );

            checkVersionStatusPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I follow Edit Tag link$/,
        function (callback) {

            var tagLink = '#tag-list-row0-name a';
            var editTagLinkPromise = scenario.context(
                /^I follow "(.*)" link$/,
                tagLink
            );

            editTagLinkPromise.then(function () {

                callback();

            });

        }
    );


    scenario.define(
        /^I press Discard draft changes button$/,
        function (callback) {

            var discardDraftChangesNavbarMenuButton = '#top-version-restore';
            var pressDiscardDraftChangesNavbarMenuButtonPromise = scenario.context(
                /^I press "(.*)" button$/,
                discardDraftChangesNavbarMenuButton
            );

            pressDiscardDraftChangesNavbarMenuButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Publish button$/,
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
        /^I should see changed tag name$/,
        function (callback) {

            var editedTag = '#tag-list-row0-name a';
            var seeEditedTagPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                'edited_tag',
                editedTag
            );

            seeEditedTagPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see changed tag name$/,
        function (callback) {

            var editedTag = '#tag-list-row0-name';
            var notSeeEditedTagPromise = scenario.context(
                /^I should not see "(.*)" text in element "(.*)"$/,
                'edited_tag',
                editedTag
            );

            notSeeEditedTagPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see disabled Discard draft changes button$/,
        function (callback) {

            var discardDraftChangesButton = '#top-version-restore';
            var disabledDiscardDraftChangesButtonPromise = scenario.context(
                /^I should see disabled "(.*)" link/,
                discardDraftChangesButton
            );

            disabledDiscardDraftChangesButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I click first container on the list$/,
        function (callback) {

            var firstContainerOnList = '#container-list-row-0-name a';
            var seeFirstContainerOnListPromise = scenario.context(
                /^I click "(.*)" element$/,
                firstContainerOnList
            );

            seeFirstContainerOnListPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press All website button$/,
        function (callback) {

            var allWebsitesButton = '#top-website-visit';
            var clickAllWebsitesButton = scenario.context(
                /^I click "(.*)" element$/,
                allWebsitesButton
            );

            clickAllWebsitesButton.then(function () {

                callback();

            });

        }
    );

};
