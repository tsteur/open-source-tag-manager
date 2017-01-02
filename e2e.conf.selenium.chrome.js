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

var protractorConfig = require('./node_modules/gulp-protractor/node_modules/protractor/config.json');

exports.config = {
    seleniumServerJar: './node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-' + protractorConfig.webdriverVersions.selenium + '.jar',
    chromeDriver: './node_modules/gulp-protractor/node_modules/protractor/selenium/chromedriver',
    seleniumPort: 4444,
    seleniumAddress: 'http://chrome:4444/wd/hub',
    framework: 'cucumber',
    restartBrowserBetweenTests: true,

    allScriptsTimeout: 500000,

    getPageTimeout: 20000,

    capabilities: {
        browserName: 'chrome',
        version: '',
        platform: 'ANY'
    },

    cucumberOpts: {
        require: [
            'tests/admin-panel/tests/e2e/**/*scenario.js',
            'tests/container-debugger/tests/e2e/**/*scenario.js',
            'tests/admin-panel/tests/e2e/support/*.js'
        ],
        tags: '~@skip'

    }
};
