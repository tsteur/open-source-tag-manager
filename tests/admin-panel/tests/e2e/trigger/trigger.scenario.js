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
    chaiAsPromised = require('chai-as-promised'),
    Q = require('q');

chai.use(chaiAsPromised);

var compare = function (arr1, arr2) {

    if (arr1.length !== arr2.length) {

        return false;

    }

    for (var i = 0, len = arr1.length; i < len; i++) {

        if (arr1[i] !== arr2[i]) {

            return false;

        }

    }

    return true;

};

module.exports = function () {

    scenario.use(this);

    scenario.define(
        /^I switch triggers list to next page$/,
        function (callback) {

            var nextPaginationButton = '#trigger-list-next-page';
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
        /^I switch triggers list to the previous page$/,
        function (callback) {

            var previousPaginationButton = '#trigger-list-previous-page';
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
        /^I switch triggers list to the last page$/,
        function (callback) {

            var lastPaginationButton = '#trigger-list-last-page';
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
        /^I switch triggers to the first page$/,
        function (callback) {

            var firstPaginationButton = '#trigger-list-first-page';
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
        /^I should see "First trigger"$/,
        function (text, callback) {

            var firstTriggerOnList = '#trigger-list-tr-0-name';
            var seeFirstTriggerOnListPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                firstTriggerOnList,
                text
            );

            seeFirstTriggerOnListPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see "First trigger"$/,
        function (text, callback) {

            var firstTriggerOnList = '#trigger-list-tr-0-name';
            var notSeeFirstTriggerOnListPromise = scenario.context(
                /^I should not see "(.*)" text in element "(.*)"$/,
                firstTriggerOnList,
                text
            );

            notSeeFirstTriggerOnListPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I choose "Pages" trigger$/,
        function (callback) {

            var pageTrigger = '#trigger-page';
            var clickPageTriggerPromise = scenario.context(
                /^I click "(.*)" element$/,
                pageTrigger
            );

            clickPageTriggerPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notification about create new trigger$/,
        function iSeeNewTriggerNotify (callback) {

            var locator = '';
            var seeNewTriggerNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                locator
            );

            seeNewTriggerNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see notification about create new trigger$/,
        function iNotSeeNewTriggerNotify (callback) {

            var locator = '';
            var notSeeNewTriggerNotifyPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                locator
            );

            notSeeNewTriggerNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see created trigger on the list$/,
        function iShouldSeeNewTrigger (callback) {

            var createdTrigger = '#trigger-list-row-2-name';
            var shouldSeeNewTriggerOnListPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                createdTrigger
            );

            shouldSeeNewTriggerOnListPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see created trigger on the list$/,
        function iNotShouldSeeNewTrigger (callback) {

            var locator = '';
            var text = '';
            var shouldNotSeeNewTriggerOnListPromise = scenario.context(
                /^I should not see "(.*)" text in element "(.*)"$/,
                text,
                locator
            );

            shouldNotSeeNewTriggerOnListPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I confirm delete trigger$/,
        function (callback) {

            var deleteConfirmTriggerButton = '#confirm-option-yes';
            var confirmDeleteTriggerPromise = scenario.context(
                /^I press "(.*)" button$/,
                deleteConfirmTriggerButton
            );

            confirmDeleteTriggerPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notification about edit trigger$/,
        function (callback) {

            var editTriggerNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                '#alert-message-0-success'
            );

            editTriggerNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see edited trigger on the list$/,
        function (callback) {

            var editTriggerOnList = '#trigger-list-row-23-name';
            var triggerName = 'example_trigger';
            var seeEditTriggerPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                triggerName,
                editTriggerOnList
            );

            seeEditTriggerPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see delete condition$/,
        function (callback) {

            var deleteCondition = '#trigger-edit-condition-tr-0-name';
            var notSeeDeleteConditionPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                deleteCondition
            );

            notSeeDeleteConditionPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Delete Trigger button$/,
        function iClickDeleteTriggerAction (callback) {

            var deleteActionButton = '#trigger-list-row-23-delete a';
            var clickDeleteTriggerActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                deleteActionButton
            );

            clickDeleteTriggerActionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see deleted trigger related to tag$/,
        function notSeeDeletedTrigger (callback) {

            var deleteActionButton = '#trigger-list-row-1-name';
            var notSeeDeletedTriggerPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                deleteActionButton
            );

            notSeeDeletedTriggerPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Create New Trigger button$/,
        function iClickCreateNewTriggerAction (callback) {

            var createNewTriggerButton = '#trigger-create-new-trigger-button';

            var shouldSeeCreateNewTriggerButtonPromise = scenario.context(
                /^I should see "(.*)" element$/,
                createNewTriggerButton
            );

            shouldSeeCreateNewTriggerButtonPromise.then(function () {


                    var clickCreateNewTriggerButtonPromise = scenario.context(
                    /^I click "(.*)" element$/,
                    createNewTriggerButton
                    );

                    clickCreateNewTriggerButtonPromise.then(function () {

                        callback();

                    });

            });

        }
    );

    scenario.define(
        /^I fill trigger name field with "(.*)"$/,
        function (text, callback) {


            var nameFieldTrigger = '#trigger-form-name';

            var seeFillNameFieldTriggerPromise = scenario.context(
                /^I should see "(.*)" element$/,
                nameFieldTrigger
            );

            seeFillNameFieldTriggerPromise.then(function () {

                var fillNameFieldTriggerPromise = scenario.context(
                    /^I fill in "(.*)" with "(.*)"$/,
                    nameFieldTrigger,
                    text
                );

                fillNameFieldTriggerPromise.then(function () {

                    callback();

                });

            });



        }
    );

    scenario.define(
        /^I press Add New Condition button$/,
        function (callback) {

            var addConditionButton = '#condition-add-button';
            var clickAddConditionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                addConditionButton
            );

            clickAddConditionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press add next new condition button$/,
        function iClickCreateNewConditionAction (callback) {

            var createNewConditionButton = '#condition-form-0-add-button';
            var clickCreateNewConditionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                createNewConditionButton
            );

            clickCreateNewConditionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I select "(.*)" option from condition variable for the "(.*)" condition$/,
        function (option, number, callback) {

            var selectConditionVariable;

            switch (number) {
                case 'first':
                    selectConditionVariable = '#condition-form-0-select-variable-dropdown';
                    break;
                case 'second':
                    selectConditionVariable = '#condition-form-1-select-variable-dropdown';
                    break;
            }

            var chooseConditionVariablePromise = scenario.context(
                /^I click "(.*)" element$/,
                selectConditionVariable + ' ' + 'button'
            );

            chooseConditionVariablePromise.then(function () {

                var baseId = /(.*)-dropdown/g.exec(selectConditionVariable)[1];

                var selectOptionConditionVariable;

                switch (option) {
                    case 'first':
                        selectOptionConditionVariable = baseId + '-0-options';
                        break;
                    case 'second':
                        selectOptionConditionVariable = baseId + '-1-options';
                        break;
                    case 'third':
                        selectOptionConditionVariable = baseId + '-2-options';
                        break;
                    case 'fourth':
                        selectOptionConditionVariable = baseId + '-3-options';
                        break;
                }

                var chooseOptionFromConditionVariablePromise = scenario.context(
                    /^I click "(.*)" element$/,
                    selectOptionConditionVariable
                );

                chooseOptionFromConditionVariablePromise.then(function () {

                    callback();

                });

            });

        });

    scenario.define(
        /^I select "(.*)" option condition for the "(.*)" condition$/,
        function (option, number, callback) {

            var selectConditionCondition;

            switch (number) {
                case 'first':
                    selectConditionCondition = '#condition-form-0-select-condition-dropdown';
                    break;
                case 'second':
                    selectConditionCondition = '#condition-form-1-select-condition-dropdown';
                    break;
            }

            var chooseConditionVariablePromise = scenario.context(
                /^I click "(.*)" element$/,
                selectConditionCondition + ' ' + 'button'
            );

            chooseConditionVariablePromise.then(function () {

                var baseId = /(.*)-dropdown/g.exec(selectConditionCondition)[1];

                var selectOptionConditionCondition;

                switch (option) {
                    case 'first':
                        selectOptionConditionCondition = baseId + '-0-options';
                        break;
                    case 'second':
                        selectOptionConditionCondition = baseId + '-1-options';
                        break;
                    case 'third':
                        selectOptionConditionCondition = baseId + '-2-options';
                        break;
                    case 'fourth':
                        selectOptionConditionCondition = baseId + '-3-options';
                        break;
                }

                var chooseOptionFromConditionVariablePromise = scenario.context(
                    /^I click "(.*)" element$/,
                    selectOptionConditionCondition
                );

                chooseOptionFromConditionVariablePromise.then(function () {

                    callback();

                });

            });

        });

    scenario.define(
        /^I fill in value condition field with "(.*)" for the "(.*)" condition$/,
        function (text, number, callback) {

            var valueConditionInput;

            switch (number) {
                case 'first':
                    valueConditionInput = '#condition-form-0-input-value';
                    break;
                case 'second':
                    valueConditionInput = '#condition-form-1-input-value';
                    break;
            }

            var fillValueConditionPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                valueConditionInput,
                text
            );

            fillValueConditionPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I press Add Trigger button related to tag$/,
        function (callback) {

            var addTriggerButton = '#trigger-form-add-related-tag-button';
            var clickAddTriggerButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                addTriggerButton
            );

            clickAddTriggerButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Save Trigger button related to tag$/,
        function (callback) {

            var addTriggerButton = '#trigger-form-edit-button';
            var clickAddTriggerButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                addTriggerButton
            );

            clickAddTriggerButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Edit Trigger button$/,
        function (callback) {

            var editActionButton = '#trigger-list-row-23-edit';
            var clickEditTriggerActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                editActionButton
            );

            clickEditTriggerActionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Add Trigger button$/,
        function (callback) {

            var addActionButton = '#trigger-form-add-button';
            var clickAddTriggerActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                addActionButton
            );

            clickAddTriggerActionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Save Trigger button$/,
        function (callback) {

            var saveActionButton = '#trigger-form-save-button';
            var clickSaveTriggerActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                saveActionButton
            );

            clickSaveTriggerActionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press trigger action menu$/,
        function (callback) {

            var menuActionButton = '#trigger-list-row-23-action a';
            var clickMenuActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                menuActionButton
            );

            clickMenuActionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I edit first trigger related to tag$/,
        function (callback) {

            var firstTriggerButton = '#trigger-list-row-1-name span';
            var editTriggerButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                firstTriggerButton
            );

            editTriggerButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see added trigger on the list$/,
        function (callback) {

            var firstTriggerButton = '#trigger-list-row-25-name';
            var editTriggerButtonPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                'example_trigger',
                firstTriggerButton
            );

            editTriggerButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see edited condition on the list$/,
        function (callback) {

            var editConditionOnList = '#condition-form-0-input-value';
            var conditionName = 'url_example';
            var elementWithText = element(by.css(editConditionOnList));

            elementWithText.getAttribute('value').then(function (resultText) {

                resultText.should.equal(conditionName);
                callback();

            });

        }
    );

    scenario.define(
        /^I press Delete Trigger related to tag$/,
        function (callback) {

            var firstTriggerButton = '#trigger-list-row-24-action-delete';
            var deleteTriggerButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                firstTriggerButton
            );

            deleteTriggerButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see deleted condition on the list$/,
        function (callback) {

            var deletedConditionOnList = '#condition-form-2-input-value';
            var secondConditionOnList = '#condition-form-1-input-value';

            var notSeeDeletedConditionPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                deletedConditionOnList
            );

            var seeOtherRelatedConditionPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                secondConditionOnList
            );

            Q.all([
                notSeeDeletedConditionPromise,
                seeOtherRelatedConditionPromise
            ]).then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Delete first condition on the list$/,
        function (callback) {

            var firstConditionButton = '#condition-form-0-remove-button';
            var deleteConditionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                firstConditionButton
            );

            deleteConditionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see required validation message "(.*)" field in trigger form$/,
        function (field, callback) {

            var validationMessage = element.all(by.css('.error'));

            validationMessage.getText().then(function (value) {

                var expected;

                switch (field) {
                    case 'trigger_name':
                        expected = ['Required', ''];

                        if (compare(value, expected) === true) {

                            callback();

                        } else {

                            throw new Error('Required message not show');

                        }
                        break;
                    case 'condition_value':
                        expected = ['', 'Required'];

                        if (compare(value, expected) === true) {

                            callback();

                        } else {

                            throw new Error('Required message not show');

                        }
                        break;
                    case 'both':
                        expected = ['Required', 'Required'];

                        if (compare(value, expected) === true) {

                            callback();

                        } else {

                            throw new Error('Required message not show');

                        }
                        break;
                }

            });

        }
    );

    scenario.define(
        /^I choose "(.*)" trigger type$/,
        function (field, callback) {

            var triggerTypeButton;

            switch (field) {
                case 'page view':
                    triggerTypeButton = '#trigger-form-1-type';
                    break;
                case 'event':
                    triggerTypeButton = '#trigger-form-2-type';
                    break;
            }

            var clickTriggerTypeButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                triggerTypeButton
            );

            clickTriggerTypeButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I press Add Condition button$/,
        function (callback) {

            var addConditionButton = '#trigger-form-add-condition-button';
            var clickAddConditionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                addConditionButton
            );

            clickAddConditionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I fill event variable with "(.*)"$/,
        function (text, callback) {

            var eventVariable = '#condition-form-event-input-value';
            var fillEventVariableFieldTriggerPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                eventVariable,
                text
            );

            fillEventVariableFieldTriggerPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I press Add more condition button$/,
        function (callback) {

            var addConditionButton = '#condition-add-more-condition-button';
            var clickAddConditionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                addConditionButton
            );

            clickAddConditionButtonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see deleted trigger on the list$/,
        function notSeeDeletedTrigger (callback) {

            var deleteActionButton = '#trigger-list-row-0-name';
            var notSeeDeletedTriggerPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                deleteActionButton
            );

            notSeeDeletedTriggerPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see "(.*)" in counter triggers$/,
        function (text, callback) {

            var triggerCountPagination = '#pagination-total-counter';
            var triggerCountPaginationPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                text,
                triggerCountPagination
            );

            triggerCountPaginationPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I should see trigger name Trigger 0_0 on list$/,
        function (callback) {

            var firstTriggerOnList = '#trigger-list-row-0-name';
            var seeFirstTriggerOnListPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                firstTriggerOnList
            );

            seeFirstTriggerOnListPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should not see trigger name Trigger 0_0 on list$/,
        function (callback) {

            var firstTagOnList = '#trigger-list-row-0-name';
            var notSeeFirstTagOnListPromise = scenario.context(
                /^I should not see an "(.*)" element$/,
                firstTagOnList
            );

            notSeeFirstTagOnListPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notification about save tag$/,
        function (callback) {

            var saveTagNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                '#alert-message-0-success'
            );

            saveTagNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notification about save trigger$/,
        function (callback) {

            var saveTriggerNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                '#alert-message-0-success'
            );

            saveTriggerNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notification about delete trigger$/,
        function (callback) {

            var deleteTriggerNotifyPromise = scenario.context(
                /^I should see "(.*)" element$/,
                '#alert-message-0-success'
            );

            deleteTriggerNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notify about error form$/,
        function iSeeNotify (callback) {

            var locator = '#alert-message-0-danger';
            var seeNotifyPromise = scenario.context(
                /^I should see "(.*)" element$/,
                locator
            );

            seeNotifyPromise.then(function () {

                setTimeout(callback, 1000);

            });

        }
    );

    scenario.define(
        /^I should see notification about linked trigger to synchronous tags$/,
        function (callback) {

            var synchronousTagsNotifyPromise = scenario.context(
                /^I should see "(.*)" element$/,
                '.alert.alert-synchronous-tag-warning.ng-binding.ng-scope'
            );

            synchronousTagsNotifyPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should see only page view type$/,
        function (callback) {

            var clickTypeTriggerDisabled = scenario.context(
                /^I should not see "(.*)" element$/,
                'trigger-form-1-type'
            );

            clickTypeTriggerDisabled.then(function () {

                callback();

            });

        }
    );

};
