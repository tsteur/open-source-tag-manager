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
        /^I should see "(.*)"$/,
        function (element, callback) {

            var elementPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                element
            );

            elementPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see "(.*)"$/,
        function (element, callback) {

            var elementPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                element
            );

            elementPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I click permissions tab$/,
        function (callback) {

            var permissionsTab = '#container-options-permissions';
            var clickPermissionsTabPromise = scenario.context(
                /^I press "(.*)" button$/,
                permissionsTab
            );

            clickPermissionsTabPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see permissions tab$/,
            function (callback) {

                var locator = '#container-options-permissions';

                var button = element.all(by.css(locator));

                button.count().then(function (count) {

                    if (count === 1) {

                        callback();

                    } else {

                        throw new Error('Permission tab isnt show up');

                    }

                });

            }
        );

    scenario.define(
        /^I should not see permissions tab$/,
        function (callback) {

            var locator = '#container-options-permissions';

            var button = element.all(by.css(locator));

            button.count().then(function (count) {

                if (count === 0) {

                    callback();

                } else {

                    throw new Error('Permission tab is show up');

                }

            });

        }
    );

    scenario.define(
        /^I should see permission view$/,
        function (callback) {

            var elementPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                'View',
                '#container-list-row-0-permissions'
            );

            elementPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see permission edit$/,
        function (callback) {

            var elementPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                'Edit',
                '#container-list-row-0-permissions'
            );

            elementPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see permission owner$/,
        function (callback) {

            var elementPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                'Owner',
                '#container-list-row-0-permissions'
            );

            elementPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see permission publish$/,
        function (callback) {

            var elementPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                'Publish',
                '#container-list-row-0-permissions'
            );

            elementPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I set view permission for user$/,
        function (callback) {

            var permissionsTab = '#user-2-radio-view';
            var clickPermissionsTabPromise = scenario.context(
                /^I press "(.*)" button$/,
                permissionsTab
            );

            clickPermissionsTabPromise.then(function () {

                setTimeout(callback, 2000);

            });

        }
    );

    scenario.define(
        /^I set owner permission for user$/,
        function (callback) {

            var permissionsTab = '#user-2-radio-owner';
            var clickPermissionsTabPromise = scenario.context(
                /^I press "(.*)" button$/,
                permissionsTab
            );

            clickPermissionsTabPromise.then(function () {

                setTimeout(callback, 2000);

            });

        }
    );

    scenario.define(
        /^I set edit permission for user$/,
        function (callback) {

            var permissionsTab = '#user-2-radio-edit';
            var clickPermissionsTabPromise = scenario.context(
                /^I press "(.*)" button$/,
                permissionsTab
            );

            clickPermissionsTabPromise.then(function () {

                setTimeout(callback, 2000);

            });

        }
    );

    scenario.define(
        /^I set publish permission for user$/,
        function (callback) {

            var permissionsTab = '#user-2-radio-publish';
            var clickPermissionsTabPromise = scenario.context(
                /^I press "(.*)" button$/,
                permissionsTab
            );

            clickPermissionsTabPromise.then(function () {

                setTimeout(callback, 2000);

            });

        }
    );

    scenario.define(
        /^I should not see Publish button$/,
        function (callback) {

            var locator = '#top-version-publish';

                var button = element.all(by.css(locator));

                button.count().then(function (count) {

                    if (count === 0) {

                        callback();

                    } else {

                        throw new Error('Publish button is show up');

                    }

                });

            }
    );

    scenario.define(
        /^I should see Publish button$/,
        function (callback) {

            var locator = '#top-version-publish';

            var button = element.all(by.css(locator));

            button.count().then(function (count) {

                if (count === 1) {

                    callback();

                } else {

                    throw new Error('Publish button isnt show up');

                }

            });

        }
    );

    scenario.define(
        /^I should not change tag name$/,
        function (callback) {

            var disabledInputPromise = scenario.context(
                /^I should see disabled "(.*)" element$/,
                '#tag-form-name'

            );

            disabledInputPromise.then(function () {
            callback();
            });

        }
    );


    scenario.define(
        /^I should not see Save button$/,
        function (callback) {

            var notSeeSaveButton = scenario.context(
                /^I should not see "(.*)" element$/,
                '#tag-form-submit-button'
            );

            notSeeSaveButton.then(function () {
                callback();
            });

        }
    );

    scenario.define(
        /^I should see Save button$/,
        function (callback) {

            var notSeeSaveButton = scenario.context(
                /^I click "(.*)" element$/,
                '#tag-form-submit-button'
            );

            notSeeSaveButton.then(function () {
                callback();
            });

        }
    );

    scenario.define(
        /^I should not enabled document write$/,
        function (callback) {

            var disabledDocumentWriteCheckboxPromise = scenario.context(
                /^I should see disabled "(.*)" element$/,
                '#tag-form-documentWrite'
            );

            disabledDocumentWriteCheckboxPromise.then(function () {
                callback();
            });

        }
    );


    scenario.define(
        /^I should not enabled DNT in debug mode$/,
        function (callback) {

            var disabledDNTCheckboxPromise = scenario.context(
                /^I should see disabled "(.*)" element$/,
                '#tag-form-documentWrite'
            );

            disabledDNTCheckboxPromise.then(function () {
                callback();
            });

        }
    );

    scenario.define(
        /^I click Advanced settings$/,
        function (callback) {

            var disabledDNTCheckboxPromise = scenario.context(
                /^I press "(.*)" button$/,
                '.stepper-step-advanced-label.control-label.ng-scope'
            );

            disabledDNTCheckboxPromise.then(function () {
                callback();
            });

        }
    );

    scenario.define(
        /^I should not enabled Respect visitor privacy$/,
        function (callback) {

            var disabledRespectPrivacyCheckboxPromise = scenario.context(
                /^I should see disabled "(.*)" element$/,
                '#tag-form-respectVisitorsPrivacy'
            );

            disabledRespectPrivacyCheckboxPromise.then(function () {
                callback();
            });

        }
    );




    scenario.define(
        /^I click edit Trigger$/,
        function (callback) {

            var notSeeSaveButton = scenario.context(
                /^I should see "(.*)" element$/,
                '#trigger-list-row-1-name'
            );

            notSeeSaveButton.then(function () {
                var notSeeSaveButton = scenario.context(
                    /^I press "(.*)" button$/,
                    '#trigger-list-row-1-name'
                );

                notSeeSaveButton.then(function () {
                    callback();
                });
            });

        }
    );

    scenario.define(
        /^I should not change trigger name$/,
        function (callback) {

            var disabledInputPromise = scenario.context(
                /^I should see disabled "(.*)" element$/,
                '#trigger-form-name'

            );

            disabledInputPromise.then(function () {
                callback();
            });

        }
    );

    scenario.define(
        /^I should not change trigger type$/,
        function (callback) {

            var disabledInputPromise = scenario.context(
                /^I should see disabled "(.*)" element$/,
                '#trigger-form-1-type'

            );

            disabledInputPromise.then(function () {
                callback();
            });

        }
    );


    scenario.define(
        /^I should not change conditions$/,
        function (callback) {

            var disabledConditionVariablePromise = scenario.context(
                /^I should not see "(.*)" element$/,
                '#condition-form-0-select-variable-dropdown'

            );

            disabledConditionVariablePromise.then(function () {

                var disabledConditionPromise = scenario.context(
                    /^I should not see "(.*)" element$/,
                    '#condition-form-0-select-condition'

                );

                disabledConditionPromise.then(function () {

                    var disabledConditionValuePromise = scenario.context(
                        /^I should see disabled "(.*)" element$/,
                        '#condition-form-0-input-value'

                    );
                    disabledConditionValuePromise.then(function () {
                       callback();
                    });

                });



            });

        }
    );

    scenario.define(
        /^I should not change container name$/,
        function (callback) {

            var disabledInputPromise = scenario.context(
                /^I should see disabled "(.*)" element$/,
                '#container-form-name'

            );

            disabledInputPromise.then(function () {
                callback();
            });

        }
    );

    scenario.define(
        /^I should not change delay setting$/,
        function (callback) {

            var disabledInputPromise = scenario.context(
                /^I should see disabled "(.*)" element$/,
                '#container-form-delay'

            );

            disabledInputPromise.then(function () {
                callback();
            });

        }
    );


    scenario.define(
        /^I check Respect visitor privacy$/,
        function (callback) {

            var setRespectPrivacyCheckboxPromise = scenario.context(
                /^I press "(.*)" button$/,
                '#tag-form-respectVisitorsPrivacy'
            );

            setRespectPrivacyCheckboxPromise.then(function () {
                callback();
            });

        }
    );

    scenario.define(
        /^I check document write$/,
        function (callback) {

            var disabledDocumentWriteCheckboxPromise = scenario.context(
                /^I press "(.*)" button$/,
                '#tag-form-documentWrite'
            );

            disabledDocumentWriteCheckboxPromise.then(function () {
                callback();
            });

        }
    );


    scenario.define(
        /^I check DNT in debug mode$/,
        function (callback) {

            var disabledDNTCheckboxPromise = scenario.context(
                /^I press "(.*)" button$/,
                '#tag-form-documentWrite'
            );

            disabledDNTCheckboxPromise.then(function () {
                callback();
            });

        }
    );

    scenario.define(
        /^I change delay setting$/,
        function (callback) {

            var disabledInputPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                '#container-form-delay',
                '1000'

            );

            disabledInputPromise.then(function () {
                callback();
            });

        }
    );

    scenario.define(
        /^I change container name$/,
        function (callback) {

            var disabledInputPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                '#container-form-name',
                'test2'

            );

            disabledInputPromise.then(function () {
                callback();
            });

        }
    );




};
