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

// 3-rd part libraries
var gulp = require('gulp'),
    karma = require('gulp-karma'),
    path = require('path'),
    config = require('../package.json').config,
    fs = require('fs');

var CONTAINER_TEMP_DIR = '../src/containerjs',
    TEST_DIR = '../tests/containerjs',
    CODE_COVERAGE_DIR = 'build/coverage',
    CODE_COVERAGE_REPORT_FILE = 'coverage-containerjs.xml';

process.env.PHANTOMJS_BIN = '../node_modules/.bin/phantomjs';

// settings
var sourceFiles = [
    TEST_DIR + '/mock/tagTree.js',
    'node_modules/postscribe/htmlParser/htmlParser.js',
    'node_modules/postscribe/dist/postscribe.js',
    CONTAINER_TEMP_DIR + '/init.js',
    CONTAINER_TEMP_DIR + '/dependencyInjection/injector.js',
    CONTAINER_TEMP_DIR + '/dependencyInjection/dependencyInjection.js',
    CONTAINER_TEMP_DIR + '/eventHandler/element.js',
    CONTAINER_TEMP_DIR + '/services.js',
    TEST_DIR + '/mock/services.mock.js',
    CONTAINER_TEMP_DIR + '/utils.js',
    CONTAINER_TEMP_DIR + '/http/jsonp.js',
    CONTAINER_TEMP_DIR + '/http/Http.js',
    CONTAINER_TEMP_DIR + '/cookie/cookie.js',
    CONTAINER_TEMP_DIR + '/privacy/doNotTrackDetector.js',
    CONTAINER_TEMP_DIR + '/privacy/doNotTrack.js',
    CONTAINER_TEMP_DIR + "/privacy/optOut.js",
    CONTAINER_TEMP_DIR + '/debugParam/debugParamFilter.js',
    CONTAINER_TEMP_DIR + '/debugParam/debugParamDetector.js',
    CONTAINER_TEMP_DIR + '/debugger/breakpointManager.js',
    CONTAINER_TEMP_DIR + '/debugger/debugger.js',
    CONTAINER_TEMP_DIR + "/visitorStrategy/conditionVisitorStrategy.js",
    CONTAINER_TEMP_DIR + "/visitorStrategy/tagVisitorStrategy.js",
    CONTAINER_TEMP_DIR + '/visitor/privacy/doNotTrackVisitor.js',
    CONTAINER_TEMP_DIR + "/visitor/privacy/optOutVisitor.js",
    CONTAINER_TEMP_DIR + '/visitor/condition/startWithVisitor.js',
    CONTAINER_TEMP_DIR + '/visitor/condition/containsVisitor.js',
    CONTAINER_TEMP_DIR + '/visitor/condition/notContainsVisitor.js',
    CONTAINER_TEMP_DIR + '/visitor/condition/endsWithVisitor.js',
    CONTAINER_TEMP_DIR + '/visitor/condition/equalsVisitor.js',
    CONTAINER_TEMP_DIR + '/visitor/condition/regexpVisitor.js',
    CONTAINER_TEMP_DIR + '/visitorManager/visitorManager.js',
    CONTAINER_TEMP_DIR + '/visitorManager/conditionVisitorManager.js',
    CONTAINER_TEMP_DIR + '/decisionStrategy/factory/decisionStrategyFactory.js',
    CONTAINER_TEMP_DIR + '/decisionStrategy/conjunctionDecisionStrategy.js',
    CONTAINER_TEMP_DIR + '/decisionStrategy/disjunctionDecisionStrategy.js',
    CONTAINER_TEMP_DIR + '/decisionStrategy/debug/conjunctionDecisionStrategy.js',
    CONTAINER_TEMP_DIR + '/decisionStrategy/debug/disjunctionDecisionStrategy.js',
    CONTAINER_TEMP_DIR + '/decisionStrategy/conditionDecisionStrategy.js',
    CONTAINER_TEMP_DIR + '/visitor/trigger/triggerVisitor.js',
    CONTAINER_TEMP_DIR + '/visitorManager/tagVisitorManager.js',
    CONTAINER_TEMP_DIR + '/visitorManager/triggerVisitorManager.js',
    CONTAINER_TEMP_DIR + '/decisionStrategy/triggerDecisionStrategy.js',
    CONTAINER_TEMP_DIR + '/decisionStrategy/tagDecisionStrategy.js',
    CONTAINER_TEMP_DIR + '/resolver/resolver.js',
    CONTAINER_TEMP_DIR + '/eventHandler/eventHandler.js',
    CONTAINER_TEMP_DIR + '/collectors/collector/*.js',
    CONTAINER_TEMP_DIR + '/collectors/stgCollectors.js',
    CONTAINER_TEMP_DIR + '/variables/VariablesHistory.js',
    CONTAINER_TEMP_DIR + '/renderer/Parser.js',
    CONTAINER_TEMP_DIR + '/renderer/renderer.js',
    CONTAINER_TEMP_DIR + '/renderer/renderer.sync.js',
    CONTAINER_TEMP_DIR + '/variables/CollectorProvider.js',
    CONTAINER_TEMP_DIR + '/variables/VariablesManager.js',
    CONTAINER_TEMP_DIR + "/handler/LinkClickCallbackFactory.js",
    CONTAINER_TEMP_DIR + "/handler/*.js",
    CONTAINER_TEMP_DIR + '/collectors.js',
    CONTAINER_TEMP_DIR + '/stg.js'
];

var testFiles = sourceFiles.concat([
    TEST_DIR + '/unit/**/*.spec.js',
    TEST_DIR + '/integration/**/*.spec.js'
]);

testFiles.splice(sourceFiles.length - 2, 0, TEST_DIR + '/mock/services.mock.js');

gulp.task('tests:unit', function () {

    testFiles.splice(sourceFiles.length - 4, 0, TEST_DIR + '/mock/jsonp.mock.js');
    var fileToInstrument = '**/' + CONTAINER_TEMP_DIR + '/**/*.js',
        preprocessors = {};
    preprocessors[fileToInstrument] = ['coverage'];

    return gulp.src(testFiles)
        .pipe(karma({
            configFile: '../unit.conf.js',
            preprocessors: preprocessors,
            coverageReporter: {
                type: 'clover',
                dir: CODE_COVERAGE_DIR,
                subdir: '.',
                basePath: '..',
                file: CODE_COVERAGE_REPORT_FILE,
            },
            action: 'run'
        }))
        .on('error', function (err) {
            throw err;
        });
});

gulp.task('tests:unit:multiBrowsers', function () {

    return gulp.src(testFiles)
        .pipe(karma({
            configFile: '../containers-ci.conf.js',
            action: 'run'
        }))
        .on('error', function (err) {
            throw err;
        });

});
