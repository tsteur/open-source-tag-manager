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
        platform: 'Mac 10.11',
        version: '48'
    },
    'edge': {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
        platform: 'Windows 10',
        version: '13.10586'
    },
    'ie11': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '11'
    },
    'ie10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '10'
    },
    'ie9': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9'
    },
    'ie8': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '8'
    },
    'ie7': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows XP',
        version: '7'
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
            testName: 'seventag/containerjs unit tests'
        },
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: Object.keys(customLaunchers),

        reporters: ['dots', 'saucelabs'],
        singleRun: true
    });
};
