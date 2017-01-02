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

var xml = require('xml'),
    fs = require('fs'),
    reportDir = process.env.TEST_RESULTS_DIR || process.cwd() + '/reports/junit',
    reportFilePath = reportDir + '/cucumber-test-results.xml',
    testResult = [];


var reporterHooks = function () {

    // save feature output
    this.registerHandler('BeforeFeature', function (event, callback) {

        var feature = event.getPayloadItem('feature');

        feature.scenarios = [];

        testResult.push(
            {
                id: feature.getName().replace(/ /g, '-'),
                name: feature.getName(),
                tests: 0,
                failures: 0,
                errors: 0,
                skipped: 0,
                timestamp: (new Date()).toUTCString(),
                time: 0,
                elements: []
            }
        );

        callback();

    });

    // save scenario output
    this.registerHandler('BeforeScenario', function (event, callback) {

        var scenario = event.getPayloadItem('scenario');

        var parentFeature = testResult[testResult.length - 1];

        parentFeature.elements.push(
            {
                name: scenario.getName(),
                classname: scenario.getName().replace(/ /g, '-'),
                time: 0,
                status: '',
                elements: []
            }
        );

        callback();

    });

    // save scenario output
    this.registerHandler('AfterScenario', function (event, callback) {

        var parentFeature = testResult[testResult.length - 1];
        var scenario = parentFeature.elements[parentFeature.elements.length - 1];

        if (scenario.status === 'failed') {

            parentFeature.failures++;

        }

        parentFeature.tests++;
        parentFeature.time += scenario.time;

        callback();

    });


    // save steps output
    this.registerHandler('StepResult', function (event, callback) {

        var stepResult = event.getPayloadItem('stepResult');
        var step = stepResult.getStep();

        var parentFeature = testResult[testResult.length - 1];
        var parentScenario = parentFeature.elements[parentFeature.elements.length - 1];

        if (stepResult.getDuration()) {

            parentScenario.time += stepResult.getDuration() / 10000000000;

        }

        if (stepResult.isSuccessful()) {

            parentScenario.status = 'passed';

        } else if (stepResult.isFailed()) {

            parentScenario.status = 'failed';
            var failureMessage = stepResult.getFailureException();

            if (failureMessage) {

                parentScenario.elements.push(
                    'Step ' + step.getName() + '\n' +
                    (failureMessage.stack || failureMessage)
                );

            }

        }

        callback();

    });

    // output testResult
    this.registerHandler('AfterFeatures', function (event, callback) {

        var testSuitesNode = [];

        testResult.forEach(function (feature) {

            var testSuiteNode = [];

            testSuiteNode.push(
                {
                    _attr: {
                        id: feature.id,
                        name: feature.name,
                        tests: feature.tests,
                        failures: feature.failures,
                        errors: 0,
                        skipped: 0,
                        timestamp: feature.timestamp,
                        time: feature.time
                    }
                }
            );

            feature.elements.forEach(function (scenario) {

                var testCaseNode = [];

                testCaseNode.push(
                    {
                        _attr: {
                            name: scenario.name,
                            classname: scenario.classname,
                            time: scenario.time,
                            status: scenario.status
                        }
                    }
                );

                scenario.elements.forEach(function (error) {

                    testCaseNode.push(
                        {
                            failure: [
                                {
                                    _attr: {
                                        message: error.split('\n').shift()
                                    }
                                }, error
                            ]
                        }
                    );

                });

                testSuiteNode.push({
                    testcase: testCaseNode
                });

            });

            testSuitesNode.push({
                testsuite: testSuiteNode
            });

        });

        var xmlResult = {
            testsuites: testSuitesNode
        };

        xmlResult = xml(xmlResult, { indent: '    ' });

        try {

            var file = fs.openSync(reportFilePath, 'w+');

            fs.writeSync(file, xmlResult);

        } catch (e) {

            throw e;

        }

        callback();

    });

};

module.exports = reporterHooks;
