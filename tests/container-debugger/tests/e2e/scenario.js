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

var expect = require('expect');
var Q = require('q');
var scenario = require('./lib/scenario');
/* eslint-disable */
var should = require('should');
/* eslint-enable */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

module.exports = function () {

    scenario.use(this);

    /* eslint-disable */
    this.BeforeFeature(function (event, callback) {
        callback();
    });

    this.BeforeScenario(function (event, callback) {

        browser.driver.manage().window().maximize();

        var exec = require('child_process').exec,
            child;

        exec('bin/console d:s:d --force', function () {

            exec('bin/console d:s:c', function () {

                exec('bin/console d:f:l --fixtures=src/SevenTag/Api/TestBundle/DataFixtures/e2e --no-interaction', function () {

                    callback();

                });

            });

        });



    });

    this.AfterScenario(function (event, callback) {
        callback();
    });

    this.BeforeStep(function (event, callback) {
        callback();
    });
    /* eslint-enable */

    scenario.define(
        /^I go to page "(.*)"$/, function iGoToPage(url, callback) {

            browser.get(url).then(function () {
                var shouldBeOnPage = scenario.context(
                    /^I should be on page "(.*)"$/,
                    url
                );

                shouldBeOnPage.then(function () {
                    callback();
                });
            });
        });

    scenario.define(
        /^I go to homepage$/,
        function iGoToHomepage(callback) {

            var url = browser.baseUrl;
            var splitUrl = url.replace(browser.baseUrl, '');

            var homepagePromise = scenario.context(
                /^I go to page "(.*)"$/,
                splitUrl + '#/sign-in'
            );

            homepagePromise.then(function () {
                callback();
            });
        });

    scenario.define(
        /^I should be on page "(.*)"$/,
        function iShouldBeOnPage(url, callback) {
            browser.getCurrentUrl().then(function (result) {
                result.should.equal(browser.baseUrl + url);
                callback();
            });
        });

    scenario.define(/^I should not be on page "(.*)"$/,
        function iShouldBeOnPage(url, callback) {
            browser.getCurrentUrl().then(function (result) {
                result.should.notEqual(browser.baseUrl + url);
                callback();
            });
        });

    scenario.define(
        /^I fill in "(.*)" with "(.*)"$/,
        function iFillInWith(locator, text, callback) {
            browser.findElement(by.css(locator)).then(function (result) {
                result.clear().then(function () {
                    result.sendKeys(text).then(function () {
                        callback();
                    });
                });
            });
        });

    scenario.define(/^I click "(.*)" element$/,
        function iClickElement(locator, callback) {
            browser.findElement(by.css(locator)).then(function (result) {
                result.click().then(function () {
                    callback();
                });
            });
        });

    scenario.define(/^I press "(.*)" button$/,
        function iPressButton(locator, callback) {

            var buttonPromise = scenario.context(/^I click "(.*)" element$/,
                locator
            );
            buttonPromise.then(function () {
                callback();
            });
        });

    scenario.define(/^I follow "(.*)" link$/,
        function iFollowLink(locator, callback) {

            var buttonPromise = scenario.context(/^I click "(.*)" element$/,
                locator
            );
            buttonPromise.then(function () {
                callback();
            });
        });

    scenario.define(/^I follow "(.*)" link to "(.*)"$/,
        function iFollowLinkTo(locator, url, callback) {

            var buttonPromise = scenario.context(/^I follow "(.*)" link$/,
                locator
            );

            buttonPromise.then(function () {
                var pagePromise = scenario.context(/^I should be on page "(.*)"$/,
                    url
                );
                pagePromise.then(function () {
                    callback();
                });
            });
        });

    scenario.define(/^I should see an "(.*)" element$/,
        function iShouldSeeElement(locator, callback) {

            browser.isElementPresent(by.css(locator)).then(function(result){
                result.should.equal(true);
                callback();
            });
        });

    scenario.define(/^I should not see an "(.*)" element$/,
        function iShouldNotSeeElement(locator, callback) {

            browser.isElementPresent(by.css(locator)).then(function(result){

                result.should.equal(false);
                callback();
            });
        });

    scenario.define(/^I select "(.*)" from "(.*)"$/,
        function iSelectFrom(optionNum, locator, callback) {

            browser.findElements(by.css(locator + '-dropdown li')).then(function(options){

                options[optionNum].click().then(function(){
                    callback();
                });
            });
        }
    );

    scenario.define(/^I should see "(.*)" text$/,
        function iShouldSeeText(text, callback) {

            browser.findElements(by.xpath('//*[contains(text(),"' + text + '")]')).then(function () {
                callback();
            });
        });

    scenario.define(
        /^I should see "(.*)" text in element "(.*)"$/,
        function iShouldSeeTextInElement(text, locator, callback) {

            var elementWithText = element(by.css(locator));

            elementWithText.getText().then(function (resultText) {
                resultText = resultText.replace(/\.\.\.$/, '');
                expect(text).toContain(resultText);
                callback();
            });
        }
    );

    scenario.define(
        /^I should not see "(.*)" text in element "(.*)"$/,
        function iShouldSeeTextInElement(text, locator, callback) {

            var elementWithText = element(by.css(locator));
            elementWithText.getText().then(function (resultText) {
                resultText = resultText.replace(/\.\.\.$/, '');
                expect(text).not.toContain(resultText);
                callback();
            });
        }
    );

    scenario.define(/^I am logged in as a "(.*)"/,
        function (userType, callback) {

            var usernamePromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                '#signin-form-login',
                userType
            );
            var passwordPromise = scenario.context(
                /^I fill in "(.*)" with "(.*)"$/,
                '#signin-form-password',
                'testing'
            );

            Q.all([
                usernamePromise,
                passwordPromise
            ]).then(function () {
                var submitPromise = scenario.context(/^I press "(.*)" button$/,
                    '#signin-form-submit'
                );

                submitPromise.then(function () {
                    scenario.context(/^I should be on page "(.*)"$/,
                        '#/containers'
                    );
                    callback();
                });
            });
        });

    scenario.define(
        /^the checkbox "(.*)" should (?:be unchecked|not be checked)$/,
        function (locator, callback) {
            var checkbox = element(by.css(locator));

            checkbox.isSelected().then(function (value) {
                if (value === false) {
                    callback();
                } else {
                    throw new Error('is not checked');
                }
            });
        }
    );

    scenario.define(/^the checkbox "(.*)" should be checked$/,
        function (locator, callback) {
            var checkbox = element(by.css(locator));

            checkbox.isSelected().then(function (value) {
                if (value === true) {
                    callback();
                } else {
                    throw new Error('is checked');
                }
            });
        });

    scenario.define(/^I check "(.*)"$/,
        function (locator, callback) {

            var checkboxPromise = scenario.context(/^the checkbox "(.*)" should (?:be unchecked|not be checked)$/,
                locator
            );

            checkboxPromise.then(function () {

                var checkedPromise = scenario.context(/^I click "(.*)" element$/,
                    locator
                );

                checkedPromise.then(function () {
                    callback();
                });
            });
        });

    scenario.define(/^I uncheck "(.*)"$/,
        function (locator, callback) {

            var checkboxPromise = scenario.context(/^the checkbox "(.*)" should be checked$/,
                locator
            );

            checkboxPromise.then(function () {

                var checkedPromise = scenario.context(/^I click "(.*)" element$/,
                    locator
                );

                checkedPromise.then(function () {
                    callback();
                });
            });
        });


    scenario.define(/^I should see disabled "(.*)" button$/,
        function (locator, callback) {

            var button = element.all(by.css(locator + ':disabled'));

            button.count().then(function (count) {
                if (count > 0) {
                    callback();
                } else {
                    throw new Error('button is enabled');
                }
            });
        });

    scenario.define(/^I should see disabled "(.*)" link/,
        function (locator, callback) {

            var button = element.all(by.css(locator + '[disabled]'));

            button.count().then(function (count) {
                if (count > 0) {
                    callback();
                } else {
                    throw new Error('link is enabled');
                }
            });
        }
    );

    scenario.define(/^I select "(.*)" option from "(.*)"$/,
        function (optionId, selectId, callback) {

            var chooseConditionVariablePromise = scenario.context(
                /^I click "(.*)" element$/,
                selectId
            );

            chooseConditionVariablePromise.then(function() {

                var chooseOptionFromConditionVariablePromise = scenario.context(
                    /^I click "(.*)" element$/,
                    optionId
                );

                chooseOptionFromConditionVariablePromise.then(function() {
                    callback();
                });
            });
        });

    scenario.define(/^I should not see hidden "(.*)" element$/,
        function (locator, callback) {

            var hiddenElement = element(by.css(locator));

            hiddenElement.isDisplayed().then(function (isVisible) {
                if (isVisible === false) {
                    callback();
                } else {
                    throw new Error('is visible');
                }
            });
        });

    scenario.define(/^I should see page view fired tag "(.*)"$/,
        function (tagName, callback) {

            var elementId;

            switch (tagName) {
                case 'page url contains index.html':
                    elementId = '#tag-fired-count-0 div:nth-of-type(1) span';
                    break;
                case 'page view':
                    elementId = '#tag-fired-count-4 div:nth-of-type(1) span';
                    break;
                case 'page hostname contains 7tag':
                    elementId = '#tag-fired-count-5 div:nth-of-type(1) span';
                    break;
                case 'page path does not contains referrer':
                    elementId = '#tag-fired-count-6 div:nth-of-type(1) span';
                    break;
                case 'page referrer does not contains referrer':
                    elementId = '#tag-fired-count-7 div:nth-of-type(1) span';
                    break;
                default:
                    break;
            }

            var iSeePageViewFiredTagsPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                "1 time",
                elementId
            );

            iSeePageViewFiredTagsPromise.then(function() {
                callback();
            });
        });


    scenario.define(/^I should see page view not fired tag "(.*)"$/,
        function (tagName, callback) {

            var elementId;

            switch (tagName) {
                case 'page url contains index.html':
                    elementId = '#tag-fired-count-0 div:nth-of-type(1) span';
                    break;
                case 'page referrer does not contains referrer':
                    elementId = '#tag-fired-count-7 div:nth-of-type(1) span';
                    break;
                default:

            }

            var iSeePageViewNotFiredTagsPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                "Not fired",
                elementId
            );

            iSeePageViewNotFiredTagsPromise.then(function() {
                callback();
            });
        });


    scenario.define(/^I should see click not fired tag "(.*)"$/,
        function (tagName, callback) {

            var elementId;

            switch (tagName) {
                case 'click':
                    elementId = '#tag-fired-count-3 div:nth-of-type(1) span';
                    break;

                case 'click class contain simple-btn':
                    elementId = '#tag-fired-count-2 div:nth-of-type(1) span';
                    break;

            }

            var iSeeClickNotFiredTagsPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                "Not fired",
                elementId
            );

            iSeeClickNotFiredTagsPromise.then(function() {
                callback();
            });
        });


    scenario.define(/^I should see click fired tag "(.*)"$/,
        function (tagName, callback) {

            var elementId;

            switch (tagName) {
                case 'click':
                    elementId = '#tag-fired-count-3 div:nth-of-type(1) span';
                    break;

                case 'click class contain simple-btn':
                    elementId = '#tag-fired-count-2 div:nth-of-type(1) span';
                    break;

            }

            var iSeeClickFiredTagsPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                "1 time",
                elementId
            );

            iSeeClickFiredTagsPromise.then(function() {
                callback();
            });
        });

    scenario.define(/^I click Be Awesome button$/,
        function (callback) {
            var iClickLinkPromise = scenario.context(
                /^I click "(.*)" element$/,
                '#test-button'
            );

            iClickLinkPromise.then(function() {
                callback();
            });
        });

    scenario.define(/^I should see event fired tag "(.*)"$/,
        function (tagName, callback) {

            var elementId;

            switch (tagName) {
                case 'event contains customEvent':
                    elementId = '#tag-fired-count-8 div:nth-of-type(1) span';
                    break;

            }

            var iSeeEventFiredTagsPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                "1 time",
                elementId
            );

            iSeeEventFiredTagsPromise.then(function() {
                callback();
            });
        });

    scenario.define(/^I should see event not fired tag "(.*)"$/,
        function (tagName, callback) {

            var elementId;

            switch (tagName) {
                case 'event contains customEvent2':
                    elementId = '#tag-fired-count-9 div:nth-of-type(1) span';
                    break;

            }

            var iSeeEventNotFiredTagsPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                "Not fired",
                elementId
            );

            iSeeEventNotFiredTagsPromise.then(function() {
                callback();
            });
        });

    scenario.define(/^I click login button in form$/,
        function (callback) {
            var iClickLoginButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                '#submit-button'
            );

            iClickLoginButtonPromise.then(function() {
                callback();
            });
        });

    scenario.define(/^I click breakpoint button$/,
        function (callback) {
            var iClickBreakpointButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                '#breakpoints-toggle'
            );

            iClickBreakpointButtonPromise.then(function() {
                callback();
            });
        });




    scenario.define(/^I should see submit forms fired tag "(.*)"$/,
        function (tagName, callback) {

            var elementId;

            switch (tagName) {
                case 'form classess contains form-class':
                    elementId = '#tag-fired-count-1 div:nth-of-type(1) span';
                    break;

                case 'form id contains test-form':
                    elementId = '#fired-tag-692';
                    break;

                case 'form url contains http://localhost:3000/index.test.html?user=&pass=#/report/summary':
                    elementId = '#fired-tag-693';
                    break;

            }

            var iSeeSubmitFormsFiredTagsPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                "1 time",
                elementId
            );

            iSeeSubmitFormsFiredTagsPromise.then(function() {
                callback();
            });
        });

    scenario.define(/^I should see submit forms not fired tag "(.*)"$/,
        function (tagName, callback) {

            var elementId;

            switch (tagName) {
                case 'form classess contains form-class':
                    elementId = '#tag-fired-count-1 div:nth-of-type(1) span';
                    break;

                case 'form id contains test-form':
                    elementId = '#not-fired-tag-692';
                    break;

                case 'form url contains http://localhost:3000/index.test.html?user=&pass=#/report/summary':
                    elementId = '#not-fired-tag-693';
                    break;

            }

            var iSeeSubmitFormsNotFiredTagsPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                "Not fired",
                elementId
            );

            iSeeSubmitFormsNotFiredTagsPromise.then(function() {
                callback();
            });
        });

    scenario.define(/^I follow first fired tags on the list$/,
        function (callback) {
            var iClickFirstFiredTagPromise = scenario.context(
                /^I click "(.*)" element$/,
                'tbody tr.ng-scope.status-not-fired:nth-of-type(1) td.ng-binding'
            );

            iClickFirstFiredTagPromise.then(function() {
                callback();
            });
        });


    scenario.define(/^I should see html tag content$/,
        function (callback) {

            var iSeeHtmlTagContentTagsPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                '#overview-tag-details-code-preview pre'
            );

            iSeeHtmlTagContentTagsPromise.then(function() {
                callback();
            });
        });

    scenario.define(/^I should see fired tags$/,
        function (callback) {

            var iSeeFiredTagsPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                '#overview-tag-details-status'
            );

            iSeeFiredTagsPromise.then(function() {
                callback();
            });
        });

    scenario.define(/^I should see fired triggers$/,
        function (callback) {

            var iSeeFiredTriggersPromise = scenario.context(
                /^I should see an "(.*)" element$/,
                '#overview-tag-details-triggers'
            );

            iSeeFiredTriggersPromise.then(function() {
                callback();
            });
        });


    scenario.define(/^I follow first not fired tags on the list$/,
        function (callback) {
            var iClickFirstNotFiredTagPromise = scenario.context(
                /^I click "(.*)" element$/,
                '#not-fired-tag-564'
            );

            iClickFirstNotFiredTagPromise.then(function() {
                callback();
            });
        });

    scenario.define(
        /^I should see hint about "(.*)"$/,
        function (option, callback) {

            var infoButton;

            switch (option) {
                case 'fired_tags':
                    infoButton = 'div.row.ng-scope:nth-of-type(1) div.col-md-12 header h4.page-header i.help-tooltip.ng-isolate-scope img.help-icon';
                    break;
                case 'not_fired_tags':
                    infoButton = 'div.row.ng-scope:nth-of-type(2) div.col-md-12 header h4.page-header i.help-tooltip.ng-isolate-scope img.help-icon';
                    break;
                case 'available_triggers':
                    infoButton = 'i.help-tooltip.ng-isolate-scope img.help-icon';
                    break;

            }

            var seeInfoButtonPromise = scenario.context(
                /^I click "(.*)" element$/,
                infoButton
            );

            seeInfoButtonPromise.then(function () {
                callback();

            });

        }
    );

    scenario.define(
        /^I press link$/,
        function (callback) {

            var saveContainerButton = '#referrer';
            var saveContainerPromise = scenario.context(
                /^I press "(.*)" button$/,
                saveContainerButton
            );

            saveContainerPromise.then(function () {

                setTimeout(callback, 5000);

            });

        });


    scenario.define(
        /^I should see "(.*)" element$/,
        function (locator, callback) {

            var Element = element(by.css(locator));
            browser.wait(function() {
                return Element.isPresent();

            });
            setTimeout(callback, 3000);
        }
    );


    scenario.define(/^I should see event "(.*)" on the event log list$/,
        function (eventName, callback) {

            var elementId;

            switch (eventName) {
                case 'stg.pageLoad':
                    elementId = '#event-name-0';
                    break;
                case 'stg.domReady':
                    elementId = '#event-name-1';
                    break;
                case 'stg.pageView':
                    elementId = '#event-name-2';
                    break;
                case 'customEvent':
                    elementId = '#event-name-3';
                    break;
                case 'stg.click':
                    elementId = '#event-name-0';
                    break;

            }

            var iSeeEventOnTheListPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                eventName,
                elementId
            );

            iSeeEventOnTheListPromise.then(function() {
                callback();
            });
        });




    scenario.define(/^I should see not fired tag with enabled DNT$/,
        function (callback) {

            var iSeeDntTagOnListPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                'Disabled',
                '#tag-fired-count-10 div:nth-of-type(1) span'
            );

            iSeeDntTagOnListPromise.then(function () {
                callback();
            });

        });


    scenario.define(
        /^I click Event Log tab$/,
        function (callback) {

            var clickEventLogTab = '#navigation ul li:nth-of-type(2) a';
            var clickEventLogTabPromise = scenario.context(
                /^I press "(.*)" button$/,
                clickEventLogTab
            );

            clickEventLogTabPromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I click first state on the event log list$/,
        function (callback) {

            var clickFirstState = '#event-name-0';
            var clickFirstStatePromise = scenario.context(
                /^I press "(.*)" button$/,
                clickFirstState
            );

            clickFirstStatePromise.then(function () {

                callback();

            });

        });

    scenario.define(
        /^I click variables tab$/,
        function (callback) {

            var clickVariablesTab = '#event-details div#event-tabs ul li:nth-of-type(3) a';
            var clickVariablesTabPromise = scenario.context(
                /^I press "(.*)" button$/,
                clickVariablesTab
            );

            clickVariablesTabPromise.then(function () {

                callback();

            });

        });


    scenario.define(/^I should see variable "(.*)" on the event log list$/,
        function (variableName, callback) {

            var variablesValueSelector;
            var valueVariable;
            var variablesNameSelector;
            var nameVariable;


            switch (variableName) {
                case 'urlVariable':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(18) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '"7tag.test.com"';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(18) td.size-30';
                    var nameVariable = 'url variable';
                    break;
                case 'pageUrl':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(11) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '"http://7tag.dev/container-debugger/index.test.html#/overview/tags"';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(11) td.size-30';
                    var nameVariable = 'Page Url';
                    break;
                case 'pageHostname':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(9) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '"7tag.dev"';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(9) td.size-30';
                    var nameVariable = 'Page Hostname';
                    break;
                case 'pagePath':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(10) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '"7tag.dev"';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(10) td.size-30';
                    var nameVariable = 'Page Path';
                    break;
                case 'clickUrl':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(4) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '"http://7tag.dev/container-debugger/index.test.html#/events-log/list"';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(4) td.size-30';
                    var nameVariable = 'Click Url';
                    break;
                case 'campaign':
                    var variablesValueSelector = 'table tbody tr.ng-scope:nth-of-type(1) td.size-70 span.ng-scope';
                    var valueVariable = '"undefined"';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(1) td.size-30';
                    var nameVariable = 'Campaign';
                    break;
                case 'clickClasses':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(2) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '""';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(2) td.size-30';
                    var nameVariable = 'Click Classes';
                    break;
                case 'event':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(5) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '"stg.click"';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(5) td.size-30';
                    var nameVariable = 'Event';
                    break;
                case 'referrer':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(12) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '""';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(12) td.size-30';
                    var nameVariable = 'Referrer';
                    break;
                case 'constant':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(13) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '"const_test"';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(13) td.size-30';
                    var nameVariable = 'constant';
                    break;
                case 'cookie':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(14) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '"1"';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(14) td.size-30';
                    var nameVariable = 'cookie';
                    break;
                case 'dataLayer':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(15) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '"stg.click"';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(15) td.size-30';
                    var nameVariable = 'dataLayer';
                    break;
                case 'document':
                    var variablesValueSelector = 'tbody tr.ng-scope:nth-of-type(16) td.size-70 span.ng-binding.ng-scope';
                    var valueVariable = '"http://7tag.dev/container-debugger/index.test.html#/overview/tags"';
                    var variablesNameSelector = 'tbody tr.ng-scope:nth-of-type(16) td.size-30';
                    var nameVariable = 'document';
                    break;
            }

            var iSeeVariableNameOnTheListPromise = scenario.context(
                /^I should see "(.*)" text in element "(.*)"$/,
                nameVariable,
                variablesNameSelector
            );

                iSeeVariableNameOnTheListPromise.then(function() {

                    var iSeeVariableValueOnTheListPromise = scenario.context(
                    /^I should see "(.*)" text in element "(.*)"$/,
                    valueVariable,
                    variablesValueSelector
                    );

                    iSeeVariableValueOnTheListPromise.then(function() {
                    callback();
                    });
                });
        });

    scenario.define(
        /^I click referrer link$/,
        function (callback) {

            var goToLink = '#referrer';
            var goToLinkPromise = scenario.context(
                /^I follow "(.*)" link$/,
                goToLink
            );

            goToLinkPromise.then(function () {

                setTimeout(callback, 3000);

            });

        });



};
