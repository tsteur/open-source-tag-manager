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
        /^I confirm delete container$/,
        function (callback) {

            var confirmDeleteButton = '#confirm-option-yes';
            var clickConfirmDeletePromise = scenario.context(
                /^I press "(.*)" button$/,
                confirmDeleteButton
            );

            clickConfirmDeletePromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notification about delete container$/,
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
        /^I should see notification about edit container$/,
        function (callback) {

            var editContainerAlert = '#alert-message-0-success';
            var editContainerNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                editContainerAlert
            );

            editContainerNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see edited container "(.*)" on the list$/,
        function (text, callback) {

            var editedContainer = '#container-list-row-0-name a';
            var seeEditContainerPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                text,
                editedContainer
            );

            seeEditContainerPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see created container "(.*)" on the list$/,
        function (text, callback) {

            var newContainer = '#container-list-row-0-name a';
            var seeNewContainerPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                text,
                newContainer
            );

            seeNewContainerPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see created container on the list$/,
        function (callback) {

            var newContainer = '#container-list-row-0-name';
            var seeNewContainerPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                newContainer
            );

            seeNewContainerPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see deleted container on the list$/,
        function (callback) {

            var deletedContainer = '#container-list-row-0-name';
            var notSeeDeletedContainerPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                deletedContainer
            );

            notSeeDeletedContainerPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notification about create new container$/,
        function (callback) {

            var createContainerNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                '#alert-message-0-success'
            );

            createContainerNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see notification about create new container$/,
        function (callback) {

            var createContainerNotifyPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                '#alert-message-0-success'
            );

            createContainerNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see validation message$/,
        function (callback) {

            var seeValidationNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                '#container-form-name-validation-message'
            );

            seeValidationNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I switch container list to next page$/,
        function (callback) {

            var nextPaginationButton = '#pagination-next-button';
            var clickNextPageButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                nextPaginationButton
            );

            clickNextPageButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I switch container list to the previous page$/,
        function (callback) {

            var previousPaginationButton = '#pagination-prev-button';
            var clickPreviousPageButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                previousPaginationButton
            );

            clickPreviousPageButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I switch container list to the last page$/,
        function (callback) {

            var lastPaginationButton = '#pagination-last-button';
            var clickLastPageButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                lastPaginationButton
            );

            clickLastPageButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I switch container list to the first page$/,
        function (callback) {

            var firstPaginationButton = '#pagination-first-button';
            var clickFirstPageButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                firstPaginationButton
            );

            clickFirstPageButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see first container "(.*)" on list$/,
        function (text, callback) {

            var firstContainerOnList = '#container-list-row-0-name';
            var seeFirstContainerOnListPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                text,
                firstContainerOnList
            );

            seeFirstContainerOnListPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see first container "(.*)" on list$/,
        function (text, callback) {

            var firstContainerOnList = '#container-list-row-0-name';
            var notSeeFirstContainerOnListPromise = scenario.context(
                /^I should not see "(.*)" text in element "(.*)"$/,
                text,
                firstContainerOnList
            );

            notSeeFirstContainerOnListPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I should see "(.*)" in counter container$/,
        function (text, callback) {

            var containerCountPagination = '#pagination-total-counter';
            var containerCountPaginationPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                text,
                containerCountPagination
            );

            containerCountPaginationPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I follow Edit container link$/,
        function (callback) {

            var editContainerLink = '#container-list-row-0-edit';
            var editContainerPromise = scenario.context(
                /^I follow "(.*)" link$/,
                editContainerLink
            );

            editContainerPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I follow Delete container link$/,
        function (callback) {

            var deleteContainerLink = '#container-list-row-0-delete a';
            var deleteContainerPromise = scenario.context(
                /^I follow "(.*)" link$/,
                deleteContainerLink
            );

            deleteContainerPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I press Delete container button$/,
        function (callback) {

            var deleteContainerButton = '#container-form-delete-button a';
            var pressDeleteContainerButtonPromise = scenario.context(
                /^I follow "(.*)" link$/,
                deleteContainerButton
            );

            pressDeleteContainerButtonPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I fill in container name field with "(.*)"$/,
        function (text, callback) {

            var nameFieldContainer = '#container-form-name';
            var fillNameFieldContainerPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldContainer,
                text
            );

            fillNameFieldContainerPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I press Save container button$/,
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

    scenario.define(
        /^I press Create New Container button$/,
        function (callback) {

            var newContainerButton = '#container-list-create-link';
            var createNewContainerPromise = scenario.context(
                /^I press "(.*)" button$/,
                newContainerButton
            );

            createNewContainerPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I should see disabled Save container button$/,
        function (callback) {

            var saveContainerButton = '#container-form-submit-button';
            var disabledSaveNewContainerPromise = scenario.context(
                /^I should see disabled "(.*)" button$/,
                saveContainerButton
            );

            disabledSaveNewContainerPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I press show action container button$/,
        function (callback) {

            var actionContainerButton = '.dots';
            var showActionContainerButtonPromise = scenario.context(
                /^I press "(.*)" button$/,
                actionContainerButton
            );

            showActionContainerButtonPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I should not see Create new container button$/,
        function (callback) {

            var newContainerButton = '#container-list-create-link';
            var notSeeNewContainerButtonPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                newContainerButton
            );

            notSeeNewContainerButtonPromise.then(function () {

                callback();

            });

        }
    );

};
