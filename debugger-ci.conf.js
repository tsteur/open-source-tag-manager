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

var customLaunchers = {
    'firefox': {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 8.1',
        version: '38'
    },
    'opera': {
        base: 'SauceLabs',
        browserName: 'opera',
        platform: 'Windows 7',
        version: '12'
    },
    'safari': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'Mac 10.9',
        version: '7'
    },
    'chrome': {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 7',
        version: '46'
    },
    'ie': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '11'
    }
};

module.exports = function (config) {
    config.set({

        frameworks: ['jasmine'],

        customLaunchers: customLaunchers,

        browserNoActivityTimeout: 500000,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        sauceLabs: {
            testName: 'unit tests for debugger'
        },
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: Object.keys(customLaunchers),

        reporters: ['dots', 'saucelabs'],
        singleRun: true
    });
};