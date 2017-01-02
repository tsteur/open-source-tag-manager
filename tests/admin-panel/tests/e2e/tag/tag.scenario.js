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

var Q = require('q'),
    scenario = require('../lib/scenario'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

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
        /^I confirm delete tag$/,
        function (callback) {

            var deleteConfirmTagButton = '#confirm-option-yes';
            var confirmDeleteTagPromise = scenario.context(
                /^I press "(.*)" button$/,
                deleteConfirmTagButton
            );

            confirmDeleteTagPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should see notification about delete tag$/,
        function (callback) {

            var deleteTagNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                '#alert-message-0-success'
            );

            deleteTagNotifyPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should see notification about edit tag$/,
        function (callback) {

            var editTagNotifyPromise = scenario.context(
                /^I should see "(.*)" element$/,
                '#alert-message-0-success'
            );

            editTagNotifyPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see notification about create new tag$/,
        function iSeeNewTagNotify (callback) {

            var locator = '#alert-message-0-success';
            var seeNewTagNotifyPromise = scenario.context(
                /^I should see "(.*)" element$/,
                locator
            );

            seeNewTagNotifyPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should see notification about error form$/,
        function iSeeNewTagNotify (callback) {

            var locator = '#alert-message-0-danger';
            var seeNewTagNotifyPromise = scenario.context(
                /^I should see "(.*)" element$/,
                locator
            );

            seeNewTagNotifyPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should see created tag "(.*)" on the list$/,
        function iShouldSeeNewTag (text, callback) {

            var locator = '#tag-list-row0-name a';

            var shouldSeeNewTagOnListPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                text,
                locator
            );

            shouldSeeNewTagOnListPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Add New Tag button$/,
        function iClickAddNewTagButton (callback) {

            var addNewTagButton = '#tag-list-create-link';
            var clickAddNewTagButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                addNewTagButton
            );

            clickAddNewTagButtonPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill tag name field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTag = '#tag-form-name';
            var fillNameFieldTagPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTag,
                text
            );

            fillNameFieldTagPromise.then(function () {

                callback();

            });

        });
    scenario.define(
    /^I click at Variables$/,
        function (callback) {

            var htmlVariables = '.label.label-default.text-left.link.ng-binding:nth(0)';
            var clickhtmlVariables = scenario.context(
                /^I click "(.*)" element$/,
                htmlVariables
            );

            clickhtmlVariables.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I fill html code with "(.*)"$/,
        function (text, callback) {

            browser.executeScript("document.querySelector('.cm-s-stg > div').style.height = '50px';");
            var htmlCodeTagField = '.cm-s-stg > div > textarea';

            var fillHtmlCodeTagFieldPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                htmlCodeTagField,
                text
            );

            fillHtmlCodeTagFieldPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I press Save Tag button$/,
        function iClickAddNewTagButton (callback) {

            var addNewTagButton = '#tag-form-submit-button';


            var seeSaveTagButtonPromise = scenario.context(
                /^I should see "(.*)" element$/,
                addNewTagButton
            );

            seeSaveTagButtonPromise.then(function () {
                var clickAddNewTagButtonPromise = scenario.context(
                    /^I click "(.*)" element$/,
                    addNewTagButton
                );

                clickAddNewTagButtonPromise.then(function () {

                    callback();

                });

            });


        }
    );
    scenario.define(
        /^I should see disabled Save tag button$/,
        function (callback) {

            var saveTagButton = '#tag-form-submit-button';
            var disabledSaveNewTagPromise = scenario.context(
                /^I should see disabled "(.*)" button$/,
                saveTagButton
            );

            disabledSaveNewTagPromise.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I press Show Actions button$/,
        function iClickShowActionTag (callback) {

            var actionButton = '#tag-list-row-0-action a';
            var clickShowTagActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                actionButton
            );

            clickShowTagActionButtonPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Show Actions button for tag click tale$/,
        function iClickShowActionTagClickTale (callback) {

            var actionButtonClickTale = '#tag-list-row-9-action a';
            var clickShowTagActionButtonClickTale = scenario.context(
                /^I click "(.*)" element$/,
                actionButtonClickTale
            );

            clickShowTagActionButtonClickTale.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Show Actions button for tag crazyegg$/,
        function iClickShowActionTagCrazyegg (callback) {

            var actionButtonCrazyegg = '#tag-list-row-6-action a';
            var clickShowTagActionButtonCrazyegg = scenario.context(
                /^I click "(.*)" element$/,
                actionButtonCrazyegg
            );

            clickShowTagActionButtonCrazyegg.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Show Actions button for tag facebook$/,
        function iClickShowActionTagFacebook (callback) {

            var actionButtonFacebook = '#tag-list-row-4-action a';
            var clickShowTagActionButtonFacebook = scenario.context(
                /^I click "(.*)" element$/,
                actionButtonFacebook
            );

            clickShowTagActionButtonFacebook.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Show Actions button for tag Google AdWords$/,
        function iClickShowActionTagAdWords (callback) {

            var actionButtonGoogleAdWords = '#tag-list-row-1-action a';
            var clickShowTagActionButtonGoogleAdWords = scenario.context(
                /^I click "(.*)" element$/,
                actionButtonGoogleAdWords
            );

            clickShowTagActionButtonGoogleAdWords.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Show Actions button for tag Google Analytics$/,
        function iClickShowActionTagAnalytics (callback) {

            var actionButtonGoogleAnalytics = '#tag-list-row-3-action a';
            var clickShowTagActionButtonGoogleAnalytics = scenario.context(
                /^I click "(.*)" element$/,
                actionButtonGoogleAnalytics
            );

            clickShowTagActionButtonGoogleAnalytics.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Show Actions button for tag Marketo$/,
        function iClickShowActionTagMarketo (callback) {

            var actionButtonMarketo = '#tag-list-row-2-action a';
            var clickShowTagActionButtonMarketo = scenario.context(
                /^I click "(.*)" element$/,
                actionButtonMarketo
            );

            clickShowTagActionButtonMarketo.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Show Actions button for tag Qualaroo$/,
        function iClickShowActionTagQualaroo (callback) {

            var actionButtonQualaroo = '#tag-list-row-5-action a';
            var clickShowTagActionButtonQualaroo = scenario.context(
                /^I click "(.*)" element$/,
                actionButtonQualaroo
            );

            clickShowTagActionButtonQualaroo.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Show Actions button for tag Sales Manago$/,
        function iClickShowActionTagSalesManago (callback) {

            var actionButtonSalesManago = '#tag-list-row-7-action a';
            var clickShowTagActionButtonSalesManago = scenario.context(
                /^I click "(.*)" element$/,
                actionButtonSalesManago
            );

            clickShowTagActionButtonSalesManago.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Show Actions button for tag Optimizely$/,
        function iClickShowActionTagOptimizely (callback) {

            var actionButtonOptimizely = '#tag-list-row-1-action a';
            var clickShowTagActionButtonOptimizely = scenario.context(
                /^I click "(.*)" element$/,
                actionButtonOptimizely
            );

            clickShowTagActionButtonOptimizely.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Show Actions button for tag VWO$/,
        function iClickShowActionTagVWO (callback) {

            var actionButtonVWO = '#tag-list-row-0-action a';
            var clickShowTagActionButtonVWO = scenario.context(
                /^I click "(.*)" element$/,
                actionButtonVWO
            );

            clickShowTagActionButtonVWO.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Show Actions button for tag Custom Synchronous$/,
        function iClickShowActionTagVWO (callback) {

            var actionButtonCustomSynchronous = '#tag-list-row-2-action a';
            var clickShowTagActionButtonCustomSynchronous = scenario.context(
                /^I click "(.*)" element$/,
                actionButtonCustomSynchronous
            );

            clickShowTagActionButtonCustomSynchronous.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I go down page$/,
        function IGoDownPage (callback) {

            browser.executeScript('window.scrollTo(0, document.body.scrollHeight)').then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button$/,
        function iClickEditTagAction (callback) {

            var editActionButton = '#tag-list-row-0-edit';
            var clickEditTagActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                editActionButton
            );

            clickEditTagActionButtonPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button for tag click tale$/,
        function iClickEditTagAction (callback) {

            var editActionButtonClickTale = '#tag-list-row-9-edit';
            var clickEditTagActionButtonClickTale = scenario.context(
                /^I click "(.*)" element$/,
                editActionButtonClickTale
            );

            clickEditTagActionButtonClickTale.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button for tag crazyegg$/,
        function iClickEditTagActionCrazyegg (callback) {

            var editActionButtonCrazyegg = '#tag-list-row-6-edit';
            var clickEditTagActionButtonCrazyegg = scenario.context(
                /^I click "(.*)" element$/,
                editActionButtonCrazyegg
            );

            clickEditTagActionButtonCrazyegg.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button for tag facebook$/,
        function iClickEditTagActionFacebook (callback) {

            var editActionButtonFacebook = '#tag-list-row-4-edit';
            var clickEditTagActionButtonFacebook = scenario.context(
                /^I click "(.*)" element$/,
                editActionButtonFacebook
            );

            clickEditTagActionButtonFacebook.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button for tag Google AdWords$/,
        function iClickEditTagActionAdWords (callback) {

            var editActionButtonGoogleAdWords = '#tag-list-row-1-edit';
            var clickEditTagActionButtonGoogleAdWords = scenario.context(
                /^I click "(.*)" element$/,
                editActionButtonGoogleAdWords
            );

            clickEditTagActionButtonGoogleAdWords.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button for tag Google Analytics$/,
        function iClickEditTagActionAnalytics (callback) {

            var editActionButtonGoogleAnalytics = '#tag-list-row-3-edit';
            var clickEditTagActionButtonGoogleAnalytics = scenario.context(
                /^I click "(.*)" element$/,
                editActionButtonGoogleAnalytics
            );

            clickEditTagActionButtonGoogleAnalytics.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button for tag Marketo$/,
        function iClickEditTagActionMarketo (callback) {

            var editActionButtonMarketo = '#tag-list-row-2-edit';
            var clickEditTagActionButtonMarketo = scenario.context(
                /^I click "(.*)" element$/,
                editActionButtonMarketo
            );

            clickEditTagActionButtonMarketo.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button for tag Qualaroo$/,
        function iClickEditTagActionQualaroo (callback) {

            var editActionButtonQualaroo = '#tag-list-row-5-edit';
            var clickEditTagActionButtonQualaroo = scenario.context(
                /^I click "(.*)" element$/,
                editActionButtonQualaroo
            );

            clickEditTagActionButtonQualaroo.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button for tag Sales Manago$/,
        function iClickEditTagActionSalesManago (callback) {

            var editActionButtonSalesManago = '#tag-list-row-7-edit';
            var clickEditTagActionButtonSalesManago = scenario.context(
                /^I click "(.*)" element$/,
                editActionButtonSalesManago
            );

            clickEditTagActionButtonSalesManago.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button for tag Optimizely$/,
        function iClickEditTagActionOptimizely (callback) {

            var editActionButtonOptimizely = '#tag-list-row-1-edit';
            var clickEditTagActionButtonOptimizely = scenario.context(
                /^I click "(.*)" element$/,
                editActionButtonOptimizely
            );

            clickEditTagActionButtonOptimizely.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button for tag VWO$/,
        function iClickEditTagActionVOW (callback) {

            var editActionButtonVWO = '#tag-list-row-0-edit';
            var clickEditTagActionButtonVWO = scenario.context(
                /^I click "(.*)" element$/,
                editActionButtonVWO
            );

            clickEditTagActionButtonVWO.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Edit Tag button for tag Custom Synchronous$/,
        function iClickEditTagActionCustomSynchronous (callback) {

            var editActionButtonCustomSynchronous = '#tag-list-row-2-edit';
            var clickEditTagActionButtonCustomSynchronous = scenario.context(
                /^I click "(.*)" element$/,
                editActionButtonCustomSynchronous
            );

            clickEditTagActionButtonCustomSynchronous.then(function () {

                callback();

            });

        }
    );


    scenario.define(
        /^I press Delete Tag button$/,
        function iClickDeleteTagAction (callback) {

            var deleteActionButton = '#tag-list-row-0-delete a';
            var clickDeleteTagActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                deleteActionButton
            );

            clickDeleteTagActionButtonPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should see required validation message "(.*)" field in tag form$/,
        function (field, callback) {

            var validationMessage = element.all(by.css('p.error.ng-scope'));

            validationMessage.getText().then(function (value) {

                var expected;

                switch (field) {
                    case 'tag_name':
                        expected = ['Required', '', '', '', ''];

                        if (compare(value, expected) === true) {

                            callback();

                        } else {

                            throw new Error('Required message not show');

                        }
                        break;
                    case 'html_code':
                        expected = ['', 'Required', '', '', ''];

                        if (compare(value, expected) === true) {

                            callback();

                        } else {

                            throw new Error('Required message not show');

                        }
                        break;
                    case 'both':
                        expected = ['Required', 'Required', '', '', ''];

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
        /^I should see edited tag "(.*)" on the list$/,
        function (text, callback) {

            var editedTag = '#tag-list-row0-name a';
            var seeEditedTagPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                text,
                editedTag
            );

            seeEditedTagPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Add Existing trigger button$/,
        function (callback) {

            var existingTriggerActionButton = '#trigger-add-existing-trigger-button';
            var clickExistingTriggerActionButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                existingTriggerActionButton
            );

            clickExistingTriggerActionButtonPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I check first existing trigger$/,
        function (callback) {

            var checkboxExistingTriggerButton = '#trigger-existing-23-checkbox';
            var checkFirstExistingTriggerActionButtonPromise = scenario.context(
                /^I check "(.*)"$/,
                checkboxExistingTriggerButton
            );

            checkFirstExistingTriggerActionButtonPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I uncheck first existing trigger$/,
        function (callback) {

            var checkboxExistingTriggerButton = '#trigger-existing-0-checkbox';
            var checkFirstExistingTriggerActionButtonPromise = scenario.context(
                /^I uncheck "(.*)"$/,
                checkboxExistingTriggerButton
            );

            checkFirstExistingTriggerActionButtonPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Add button$/,
        function iClickAddExistingTriggerAction (callback) {

            var addExistingTriggerButton = '#trigger-existing-add-button';
            var clickAddExistingTriggerButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                addExistingTriggerButton
            );

            clickAddExistingTriggerButtonPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Cancel button$/,
        function iClickAddExistingTriggerAction (callback) {

            var addExistingTriggerButton = '#trigger-existing-cancel-button';
            var clickAddExistingTriggerButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                addExistingTriggerButton
            );

            clickAddExistingTriggerButtonPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should see added trigger inside the tag$/,
        function (callback) {

            var locator = '#trigger-list-row-23-name';
            var shouldSeeNewTriggerOnListPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                locator
            );

            shouldSeeNewTriggerOnListPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Add Existing trigger button I should not see already choosen triggers on list$/,
        function (callback) {

            var ERROR_MESSAGE = 'Already added triggers has been found on Add existing Trigger list';
            var alreadyAddedTriggers = element.all(by.repeater('trigger in view.tag.triggers'));

            alreadyAddedTriggers.then(function (triggers) {

                var getTriggersIdAndPressAddExistingTriggerButton = triggers[0].getAttribute('id');

                getTriggersIdAndPressAddExistingTriggerButton.then(function (triggerId) {

                    return /\d+/g.exec(triggerId)[0];

                })
                .then(function (alreadyAddedTriggersId) {

                    var shouldSeeExistingListPromise = scenario.context(
                        /^I press Add Existing trigger button$/
                    );

                    shouldSeeExistingListPromise.then(function () {

                        var existingTriggers = element.all(by.repeater('trigger in view.triggers'));

                        existingTriggers.then(function (existing) {

                            var existingTriggersIndex = existing.length;

                            var existingTriggerHandler = function (existingTriggerId) {

                                if (/\d+/g.exec(existingTriggerId)[0] === alreadyAddedTriggersId) {

                                    throw new Error(ERROR_MESSAGE);

                                }

                            };

                            while (existingTriggersIndex--) {

                                var existingTriggerPromise = existing[existingTriggersIndex].getAttribute('id');

                                existingTriggerPromise.then(existingTriggerHandler);

                            }

                            callback();

                        });

                    });

                });

            });

        }
    );
    scenario.define(
        /^I should not see deleted tag "(.*)" on the list$/,
        function (text, callback) {

            var editedTag = '#tag-list-row0-name a';
            var seeEditedTagPromise = scenario.context(
                /^I should not see "(.*)" text in element "(.*)"$/,
                text,
                editedTag
            );

            seeEditedTagPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should see trigger "(.*)" on the list$/,
        function (text, callback) {

            var nameTag = '#tag-list-row0-name a';
            var seeNameTagPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                text,
                nameTag
            );

            seeNameTagPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I click on Custom Html Tag$/,
        function (callback) {

            var tag_template = 'div.row.stg-tag-templates div.col-md-4 div.stg-tag-template.stg-tag-template-btn.ng-scope.active';
            var clickCustomTagPromise = scenario.context(
                /^I click "(.*)" element$/,
                tag_template

            );

            clickCustomTagPromise.then(function () {

                setTimeout(callback, 2000);

            });

        }
    );
    scenario.define(
        /^I choose click tale type template$/,
        function (callback) {

            var tag_template_clicktale = '#tag-template-click_tale';
            var clickTagClicktale = scenario.context(
                /^I click "(.*)" element$/,
                tag_template_clicktale

            );

            clickTagClicktale.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill partition field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagPartition = '[name="partition"]';
            var fillNameFieldTagPartition = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagPartition,
                text
            );

            fillNameFieldTagPartition.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I fill project GUID field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagGUID = '[name="guid"]';
            var fillNameFieldTagGUID = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagGUID,
                text
            );

            fillNameFieldTagGUID.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I click button Add new tigger$/,
        function ( callback) {

            var TagButtonAddTigger = '#trigger-create-new-trigger-button';
            var clickTagButtonAddTigger = scenario.context(
                /^I click "(.*)" element$/,
                TagButtonAddTigger

            );

            clickTagButtonAddTigger.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I click button Page View"$/,
        function ( callback) {

            var TagButtonPageView = '#trigger-form-0-type';
            var clickTagButtonPageView = scenario.context(
                /^I click "(.*)" element$/,
                TagButtonPageView

            );

            clickTagButtonPageView.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I click button Click"$/,
        function ( callback) {

            var TagButtonClick = '#trigger-form-1-type';
            var clickTagButtonClick = scenario.context(
                /^I click "(.*)" element$/,
                TagButtonClick

            );

            clickTagButtonClick.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I click button Event"$/,
        function ( callback) {

            var TagButtonEvent = '#trigger-form-2-type';
            var clickTagButtonEvent = scenario.context(
                /^I click "(.*)" element$/,
                TagButtonEvent

            );

            clickTagButtonEvent.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I click button Form submission"$/,
        function ( callback) {

            var TagButtonFormSubmission = '#trigger-form-3-type';
            var clickTagButtonFormSubmission = scenario.context(
                /^I click "(.*)" element$/,
                TagButtonFormSubmission

            );

            clickTagButtonFormSubmission.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I click button Add condition"$/,
        function ( callback) {

            var TagButtonAddCondition = '#condition-add-button';
            var clickTagButtonAddCondition = scenario.context(
                /^I click "(.*)" element$/,
                TagButtonAddCondition

            );

            clickTagButtonAddCondition.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I select in dropdown Conditions variable"(.*)"$/,
        function (optionNum, callback) {

            var TagButtonConditionsVariable = '#condition-form-0-select-variable';
            var clickTagButtonConditionsVariable = scenario.context(
                /^I select "(.*)" from "(.*)"$/,
                TagButtonConditionsVariable,
                optionNum
            );

            clickTagButtonConditionsVariable.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I select in dropdown Conditions "(.*)"$/,
        function (optionNum, callback) {

            var TagButtonConditions = ' ';
            var clickTagButtonConditions = scenario.context(
                /^I select "(.*)" from "(.*)"$/,
                TagButtonConditions,
                optionNum
            );

            clickTagButtonConditions.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I fill in Conditions with "(.*)"$/,
        function (text, callback) {

            var TagButtonConditionsValue = ' #condition-form-0-input-value';
            var clickTagButtonConditionsValue = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                TagButtonConditionsValue,
                text
            );

            clickTagButtonConditionsValue.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I click button add Conditions"$/,
        function ( callback) {

            var TagButtonAddConditions = '#condition-form-0-add-button';
            var clickTagButtonAddConditions = scenario.context(
                /^I click "(.*)" element$/,
                TagButtonAddConditions
            );

            clickTagButtonAddConditions.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I click button remove Conditions"$/,
        function ( callback) {

            var TagButtonrRemoveConditions = '#condition-form-0-remove-button';
            var clickTagButtonRemoveConditions = scenario.context(
                /^I click "(.*)" element$/,
                TagButtonrRemoveConditions
            );

            clickTagButtonRemoveConditions.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I click button add trigger"$/,
        function ( callback) {

            var TagButtonAddTrigger = '#trigger-form-add-related-tag-button';
            var clickTagButtonAddTrigger = scenario.context(
                /^I click "(.*)" element$/,
                TagButtonAddTrigger
            );

            clickTagButtonAddTrigger.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I click button cancel trigger"$/,
        function ( callback) {

            var TagButtonCancelTrigger = '#trigger-form-add-related-tag-button';
            var clickTagButtonCancelTrigger = scenario.context(
                /^I click "(.*)" element$/,
                TagButtonCancelTrigger
            );

            clickTagButtonCancelTrigger.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I choose crazyegg type template$/,
        function (callback) {

            var tag_template_crazyegg = '#tag-template-crazy_egg';
            var clickTagCrazyegg = scenario.context(
                /^I click "(.*)" element$/,
                tag_template_crazyegg

            );

            clickTagCrazyegg.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill account number field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagAccountNumber = '[name="accountNumber"]';
            var fillNameFieldTagAccountNumber = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagAccountNumber,
                text
            );

            fillNameFieldTagAccountNumber.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I should see notification "(.*)"$/,
        function iSeeNewNotify (text, callback) {

            var locator = '';
            var seeNewNotifyPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                text
            );

            seeNewNotifyPromise.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I choose facebook type template$/,
        function (callback) {

            var tag_template_facebook = '#tag-template-facebook_retargeting_pixel';
            var clickTagFacebook = scenario.context(
                /^I click "(.*)" element$/,
                tag_template_facebook

            );

            clickTagFacebook.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill pixel Id field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagpixelId = '[name="pixelId"]';
            var fillNameFieldTagpixelId = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagpixelId,
                text
            );

            fillNameFieldTagpixelId.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I choose Google AdWords type template$/,
        function (callback) {

            var tag_template_AdWords = '#tag-template-google_adwords';
            var clickTagAdWords = scenario.context(
                /^I click "(.*)" element$/,
                tag_template_AdWords

            );

            clickTagAdWords.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill conversion Id field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagConversionId = '[name="conversionId"]';
            var fillNameFieldTagConversionId = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagConversionId,
                text
            );

            fillNameFieldTagConversionId.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I fill conversion label field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagConversionLabel = '#conversion-label-1 input';
            var fillNameFieldTagConversionLabel = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagConversionLabel,
                text
            );

            fillNameFieldTagConversionLabel.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I fill conversion value field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagConversionLabel = '#conversion-label-2 input';
            var fillNameFieldTagConversionLabel = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagConversionLabel,
                text
            );

            fillNameFieldTagConversionLabel.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I choose Google Analytics type template$/,
        function (callback) {

            var tag_template_Analytics = '#tag-template-google_analytics';
            var clickTagAnalytics = scenario.context(
                /^I click "(.*)" element$/,
                tag_template_Analytics

            );

            clickTagAnalytics.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill track id field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagAnalyticsId = '[name="id"]';
            var fillNameFieldTagAnalyticsId = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagAnalyticsId,
                text
            );

            fillNameFieldTagAnalyticsId.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I choose Marketo type template$/,
        function (callback) {

            var tag_template_Marketo = '#tag-template-marketo';
            var clickTagMarketo = scenario.context(
                /^I click "(.*)" element$/,
                tag_template_Marketo

            );

            clickTagMarketo.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill Marketo Account Id field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagMarketoId = '[name="accountId"]';
            var fillNameFieldTagMarketoId = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagMarketoId,
                text
            );

            fillNameFieldTagMarketoId.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I choose Qualaroo type template$/,
        function (callback) {

            var tag_template_Qualaroo = '#tag-template-qualaroo';
            var clickTagQualaroo = scenario.context(
                /^I click "(.*)" element$/,
                tag_template_Qualaroo

            );

            clickTagQualaroo.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill Customer id field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagQualarooId = '[name="customerId"]';
            var fillNameFieldTagQualarooId = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagQualarooId,
                text
            );

            fillNameFieldTagQualarooId.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I fill Site token field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagQualaroositeToken = '[name="siteToken"]';
            var fillNameFieldTagQualaroositeToken = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagQualaroositeToken,
                text
            );

            fillNameFieldTagQualaroositeToken.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I choose Sales Manago type template$/,
        function (callback) {

            var tag_template_SalesManago = '#tag-template-sales_manago';
            var clickTagSalesManago = scenario.context(
                /^I click "(.*)" element$/,
                tag_template_SalesManago

            );

            clickTagSalesManago.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill Sales Manago field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagsmid = '[name="smid"]';
            var fillNameFieldTagsmid = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagsmid,
                text
            );

            fillNameFieldTagsmid.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I fill name of tigger field with "(.*)"$/,
        function (text, callback) {

            var nameFieldTagTiggerName = '#trigger-form-name';
            var fillNameFieldTagTiggerName = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                nameFieldTagTiggerName,
                text
            );

            fillNameFieldTagTiggerName.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I select tigger loads Page View$/,
        function (callback) {

            var clickSelectTiggerLoadsPageView = scenario.context(
                /^I click "(.*)" element$/,
                '#trigger-form-0-type'
            );
            clickSelectTiggerLoadsPageView.then(function () {
                callback();

            });

        }
    );
    scenario.define(
        /^I select tigger loads Click$/,
        function (callback) {

            var clickSelectTiggerLoadsClick = scenario.context(
                /^I click "(.*)" element$/,
                '#trigger-form-1-type'

            );

            clickSelectTiggerLoadsClick.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I select tigger loads Event$/,
        function (callback) {

            var clickSelectTiggerLoadsEvent = scenario.context(
                /^I click "(.*)" element$/,
                '#trigger-form-2-type'

            );

            clickSelectTiggerLoadsEvent.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I select tigger loads Form submission$/,
        function (callback) {

            var clickSelectTiggerLoadsFormSubmission = scenario.context(
                /^I click "(.*)" element$/,
                '#trigger-form-3-type'

            );

            clickSelectTiggerLoadsFormSubmission.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I click button Add Tigger$/,
        function (callback) {

            var clickButtonAddTigger = '#trigger-form-add-related-tag-button';
            var TagclickButtonAddTigger = scenario.context(
                /^I press "(.*)" button$/,
                clickButtonAddTigger
            );

            TagclickButtonAddTigger.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I click button Cancel Tigger$/,
        function (callback) {

            var clickButtonCancelTigger = '#trigger-form-cancel-button';
            var TagclickButtonCancelTigger = scenario.context(
                /^I press "(.*)" button$/,
                clickButtonCancelTigger
            );

            TagclickButtonCancelTigger.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I select Conditions$/,
        function (callback) {

            var ConditionsFormTigger = scenario.context(
                /^I select "(.*)" option from "(.*)"$/,
                '#condition-form-0-select-variable-1-options',
                '#condition-form-0-select-variable-dropdown'
            );
            var ConditionsTigger = scenario.context(
                /^I select "(.*)" option from "(.*)"$/,
                '#condition-form-0-select-condition-2-options',
                '#condition-form-0-select-condition-dropdown'
            );
            var ConditionsValueTigger =scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                '#condition-form-0-input-value',
                'something'
            );
            Q.all([
                ConditionsFormTigger,
                ConditionsTigger,
                ConditionsValueTigger
            ]).then(function () {

                setTimeout(callback(),1000);

            });

        }
    );
    scenario.define(
        /^I click button plus conditions$/,
        function (callback) {

            var TagclickButtonAddAConditions = scenario.context(
                /^I press "(.*)" button$/,
                '#condition-form-0-add-button'
            );

            TagclickButtonAddAConditions.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I click button minus conditions$/,
        function (callback) {

            var clickButtonAddAConditions = '#condition-form-0-remove-button';
            var TagclickButtonAddAConditions = scenario.context(
                /^I press "(.*)" button$/,
                clickButtonAddAConditions
            );

            TagclickButtonAddAConditions.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I click button Add a conditions$/,
        function (callback) {

            var clickButtonAddAConditions = '#condition-add-button';
            var TagclickButtonAddAConditions = scenario.context(
                /^I press "(.*)" button$/,
                clickButtonAddAConditions
            );

            TagclickButtonAddAConditions.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Conversion tracking button$/,
        function (callback) {

            var clickButtonConversionAdWords = '#template-view-0';
            var TagclickButtonConversionAdWords = scenario.context(
                /^I press "(.*)" button$/,
                clickButtonConversionAdWords
            );

            TagclickButtonConversionAdWords.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I press Remarketing button$/,
        function (callback) {

            var clickButtonRemarketingAdWords = '#template-view-1';
            var TagclickButtonRemarketingAdWords = scenario.context(
                /^I press "(.*)" button$/,
                clickButtonRemarketingAdWords
            );

            TagclickButtonRemarketingAdWords.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should be on page Tags at first containers$/,
        function (callback) {

            var url = browser.baseUrl;
            var splitUrl = url.replace(browser.baseUrl, '');

            var clickPageTags = scenario.context(
                 /^I should be on page "(.*)"$/,
                 splitUrl + '#/containers/1/tags'
            );

            clickPageTags.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should be on page tag create$/,
        function (callback) {

            var url = browser.baseUrl;
            var splitUrl = url.replace(browser.baseUrl, '');

            var clickPageTags = scenario.context(
                /^I should be on page "(.*)"$/,
                splitUrl + '#/containers/1/tag-create'
            );

            clickPageTags.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should be on page create Tags$/,
        function (callback) {

            var url = browser.baseUrl;
            var splitUrl = url.replace(browser.baseUrl, '');

            var clickPageTags = scenario.context(
                /^I should be on page "(.*)"$/,
                splitUrl + '#/containers/1/tag-create'
            );

            clickPageTags.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I select event Search$/,
        function (callback) {

            var dropdown = '#-dropdown';
            var option = '-1-options';

            var clickEvent = scenario.context(
                /^I click "(.*)" element$/,
                dropdown
            );

            clickEvent.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I click icon arrow to open advanced settings$/,
        function (callback) {

            var iconArrow = '.stepper-step-disabled .icon-arrow-down';

            var clickIconArrow = scenario.context(
                /^I click "(.*)" element$/,
                iconArrow
            );

            clickIconArrow.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill priority field with "(.*)"$/,
        function (text, callback) {

            var fillPriority = '[name="priority"]';
            var fillfillPriorityField = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                fillPriority,
                text
            );

            fillfillPriorityField.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I click checkbox Activate tag$/,
        function (callback) {

            var checkboxActivate = '#tag-form-deactivate';
            var checkFirstActivate = scenario.context(
                /^I click "(.*)" element$/,
                checkboxActivate
            );

            checkFirstActivate.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I click checkbox Do not fire in a debug mode$/,
        function (callback) {

            var checkboxDisableInDebugMode = '#tag-form-disableInDebugMode';
            var checkFirstDisableInDebugMode = scenario.context(
                /^I click "(.*)" element$/,
                checkboxDisableInDebugMode
            );

            checkFirstDisableInDebugMode.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I click checkbox Respect visitors privacy$/,
        function (callback) {

            var checkboxRespectVisitorsPrivacy = '#tag-form-respectVisitorsPrivacy';
            var checkFirstRespectVisitorsPrivacy = scenario.context(
                /^I click "(.*)" element$/,
                checkboxRespectVisitorsPrivacy
            );

            checkFirstRespectVisitorsPrivacy.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I choose Optimizely type template$/,
        function (callback) {

            var tag_template_optimizely = '#tag-template-optimizely';
            var clickTagOptimizely = scenario.context(
                /^I click "(.*)" element$/,
                tag_template_optimizely

            );

            clickTagOptimizely.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I choose synchronous type tag template$/,
        function (callback) {

            var synchronous_tag_template = '#tag-templates-sync';
            var clickSynchronousTag = scenario.context(
                /^I click "(.*)" element$/,
                synchronous_tag_template

            );

            clickSynchronousTag.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill Project id field with "(.*)"$/,
        function (text, callback) {

            var projectIdFieldTagOptimizely = '[name="projectId"]';
            var fillProjectIdFieldTagOptimizely = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                projectIdFieldTagOptimizely,
                text
            );

            fillProjectIdFieldTagOptimizely.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I should see disabled checkbox Respect visitors privacy$/,
        function (callback) {

            var checkboxRespectVisitorsPrivacy = '#tag-form-respectVisitorsPrivacy';
            var checkFirstRespectVisitorsPrivacy = scenario.context(
                /^I should see disabled "(.*)" element$/,
                checkboxRespectVisitorsPrivacy
            );

            checkFirstRespectVisitorsPrivacy.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should see check Respect visitors privacy$/,
        function (callback) {

            var checkboxRespectVisitorsPrivacy = '#checkbox-respectVisitorsPrivacy div.cc-checkbox.cc-checkbox-checked';
            var checkFirstRespectVisitorsPrivacy = scenario.context(
                /^I should see enabled "(.*)" element$/,
                checkboxRespectVisitorsPrivacy
            );

            checkFirstRespectVisitorsPrivacy.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I should see uncheck Respect visitors privacy$/,
        function (callback) {

            var checkboxRespectVisitorsPrivacy = '#checkbox-respectVisitorsPrivacy div.cc-checkbox.cc-checkbox-checked';
            var checkFirstRespectVisitorsPrivacy = scenario.context(
                /^I should not see "(.*)" element$/,
                checkboxRespectVisitorsPrivacy
            );

            checkFirstRespectVisitorsPrivacy.then(function () {

                callback();

            });

        }
    );


    scenario.define(
        /^I click next page pagination button$/,
        function (callback) {

            var next_page_pagination_button = '#pagination-next-button';
            var clickNaxtPageButton = scenario.context(
                /^I click "(.*)" element$/,
                next_page_pagination_button

            );

            clickNaxtPageButton.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I choose VWO type template$/,
        function (callback) {

            var tag_template_vwo = '#tag-template-visual_website_optimizer';
            var clickTagVWO = scenario.context(
                /^I click "(.*)" element$/,
                tag_template_vwo

            );

            clickTagVWO.then(function () {

                callback();

            });

        }
    );
    scenario.define(
        /^I fill Account id field with "(.*)"$/,
        function (text, callback) {

            var accountIdFieldTagVWO = '[name="accountId"]';
            var fillAccountIdFieldTagVWO = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                accountIdFieldTagVWO,
                text
            );

            fillAccountIdFieldTagVWO.then(function () {

                callback();

            });

        });
    scenario.define(
        /^I choose Custom Synchronous type template$/,
        function (callback) {

            var tag_template_custom_synchro = '.stg-tag-template.stg-tag-template-btn.stg-custom-tag-template.active';
            var clickTagCustomSynchro = scenario.context(
                /^I click "(.*)" element$/,
                tag_template_custom_synchro

            );

            clickTagCustomSynchro.then(function () {

                callback();

            });

        }
    );

};
