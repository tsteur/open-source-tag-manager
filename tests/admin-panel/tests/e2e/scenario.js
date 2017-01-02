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
    scenario = require('./lib/scenario'),
    /* eslint-disable */
    should = require('should'),
    /* eslint-enable */
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function () {

    scenario.use(this);

    scenario.define(
        /^I go to page "(.*)"$/, function iGoToPage (url, callback) {

            browser.get(url).then(function () {

                var shouldBeOnPage = scenario.context(
                    /^I should be on page "(.*)"$/,
                    url
                );

                shouldBeOnPage.then(function () {

                    setTimeout(callback, 3000);

                });

            });

        });

    scenario.define(
        /^I go to homepage$/,
        function iGoToHomepage (callback) {

            var url = browser.baseUrl;
            var splitUrl = url.replace(browser.baseUrl, '');

            var homepagePromise = scenario.context(
                /^I go to page "(.*)"$/,
                splitUrl + '#/sign-in'
            );

            homepagePromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should be on page "(.*)"$/,
        function iShouldBeOnPage (url, callback) {

            browser.getCurrentUrl().then(function (result) {

                result.should.equal(browser.baseUrl + url);
                callback();

            });

        }
    );

    scenario.define(
        /^I should not be on page "(.*)"$/,
        function iShouldBeOnPage (url, callback) {

            browser.getCurrentUrl().then(function (result) {

                result.should.notEqual(browser.baseUrl + url);
                callback();

            });

        }
    );

    scenario.define(
        /^I fill in "(.*)" with "(.*)"$/,
        function iFillInWith (locator, text, callback) {

            browser.findElement(by.css(locator)).then(function (result) {

                result.clear().then(function () {

                    result.sendKeys(text).then(function () {

                        callback();

                    });

                });

            });

        }
    );

    scenario.define(
        /^I click "(.*)" element$/,
        function iClickElement (locator, callback) {

            browser.findElement(by.css(locator)).then(function (result) {

                result.click().then(function () {

                    callback();

                });

            });

        }
    );

    scenario.define(
        /^I press "(.*)" button$/,
        function iPressButton (locator, callback) {

            var buttonPromise = scenario.context(
                /^I click "(.*)" element$/,
                locator
            );

            buttonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(/^I follow "(.*)" link$/,
        function iFollowLink (locator, callback) {

            var buttonPromise = scenario.context(
                /^I click "(.*)" element$/,
                locator
            );

            buttonPromise.then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I follow "(.*)" link to "(.*)"$/,
        function iFollowLinkTo (locator, url, callback) {

            var buttonPromise = scenario.context(
                /^I follow "(.*)" link$/,
                locator
            );

            buttonPromise.then(function () {

                var pagePromise = scenario.context(
                    /^I should be on page "(.*)"$/,
                    url
                );

                pagePromise.then(function () {

                    callback();

                });

            });

        }
    );

    scenario.define(/^I should see an "(.*)" element$/,
        function iShouldSeeElement (locator, callback) {

            browser.isElementPresent(by.css(locator)).then(function (result) {

                result.should.equal(true);
                callback();

            });

        }
    );

    scenario.define(
        /^I should not see an "(.*)" element$/,
        function iShouldNotSeeElement (locator, callback) {

            browser.isElementPresent(by.css(locator)).then(function (result) {

                result.should.equal(false);
                callback();

            });


        }
    );

    scenario.define(
        /^I select "(.*)" from "(.*)"$/,
        function iSelectFrom (optionNum, locator, callback) {

            browser.findElements(by.css(locator + '-dropdown li')).then(function (options) {

                options[optionNum].click().then(function () {

                    callback();

                });

            });

        }
    );

    scenario.define(
        /^I should see "(.*)" text$/,
        function iShouldSeeText (text, callback) {

            browser.findElements(by.xpath('//*[contains(text(),"' + text + '")]')).then(function () {

                callback();

            });

        }
    );

    scenario.define(
        /^I should see "(.*)" text in element "(.*)"$/,
        function iShouldSeeTextInElement (text, locator, callback) {

            var elementWithText = element(by.css(locator));

            elementWithText.getText().then(function (resultText) {

                resultText.should.equal(text);
                callback();

            });

        }
    );

    scenario.define(
        /^I should not see "(.*)" text in element "(.*)"$/,
        function iShouldSeeTextInElement (text, locator, callback) {

            var elementWithText = element(by.css(locator));

            elementWithText.getText().then(function (resultText) {
                resultText.should.not.equal(text);
                callback();

            });

        }
    );

    scenario.define(
        /^I am logged in as a "(.*)"/,
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

                    var waitForLoadPagePromise = scenario.context(/^I should see "(.*)" element$/,
                        '#container-list'
                    );

                    waitForLoadPagePromise.then(function () {

                        scenario.context(/^I should be on page "(.*)"$/,
                            '#/containers'
                        );

                    });

                    callback();

                });

            });

        }
    );

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

    scenario.define(
        /^the checkbox "(.*)" should be checked$/,
        function (locator, callback) {

            var checkbox = element(by.css(locator));

            checkbox.isSelected().then(function (value) {

                if (value === true) {

                    callback();

                } else {

                    throw new Error('is checked');

                }

            });

        }
    );

    scenario.define(
        /^I check "(.*)"$/,
        function (locator, callback) {

            var checkboxPromise = scenario.context(
                /^the checkbox "(.*)" should (?:be unchecked|not be checked)$/,
                locator
            );

            checkboxPromise.then(function () {

                var checkedPromise = scenario.context(
                    /^I click "(.*)" element$/,
                    locator
                );

                checkedPromise.then(function () {

                    callback();

                });

            });

        }
    );

    scenario.define(
        /^I uncheck "(.*)"$/,
        function (locator, callback) {

            var checkboxPromise = scenario.context(
                /^the checkbox "(.*)" should be checked$/,
                locator
            );

            checkboxPromise.then(function () {

                var checkedPromise = scenario.context(
                    /^I click "(.*)" element$/,
                    locator
                );

                checkedPromise.then(function () {

                    callback();

                });

            });

        }
    );


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

        }
    );

    scenario.define(
        /^I should see disabled "(.*)" link/,
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

    scenario.define(
        /^I select "(.*)" option from "(.*)"$/,
       function (optionId, selectId, callback) {

           var chooseConditionVariablePromise = scenario.context(
               /^I click "(.*)" element$/,
               selectId
           );

           chooseConditionVariablePromise.then(function () {

               var chooseOptionFromConditionVariablePromise = scenario.context(
                   /^I click "(.*)" element$/,
                   optionId
               );

               chooseOptionFromConditionVariablePromise.then(function () {

                   callback();

               });

           });

       }
   );

    scenario.define(
        /^I should not see hidden "(.*)" element$/,
        function (locator, callback) {

            var hiddenElement = element(by.css(locator));

            hiddenElement.isDisplayed().then(function (isVisible) {
                console.log(is);

                if (isVisible === false) {

                    callback();

                } else {

                    throw new Error('is visible');

                }

            });

        }
    );

    scenario.define(/^I should see "(.*)" element$/,
           function (locator, callback) {

               var button = element.all(by.css(locator));

               button.count().then(function (count) {

                   if (count == 1) {

                       callback();

                   } else {

                       throw new Error('element is not visible');

                   }

               });

        }
    );


    scenario.define(
        /^I should see disabled "(.*)" element$/,
        function (locator, callback) {

            var disabledElement = element(by.css(locator));

            disabledElement.getAttribute('disabled').then(function (isDisabled) {

                if (isDisabled) {

                    callback();

                } else {

                    throw new Error('is enabled');

                }

            });

        }
    );

    scenario.define(
        /^I should see enabled "(.*)" element$/,
        function (locator, callback) {

            var disabledElement = element(by.css(locator));

            disabledElement.getAttribute('disabled').then(function (isDisabled) {

                if (!isDisabled) {

                    callback();

                } else {

                    throw new Error('is disabled');

                }

            });

        }
    );

    scenario.define(
        /^I should not see "(.*)" element$/,
        function (locator, callback) {

            var button = element.all(by.css(locator));

            button.count().then(function (count) {

                if (count === 0) {

                    callback();

                } else {

                    throw new Error(locator + 'Element is showing up');

                }

            });

        }
    );




};
