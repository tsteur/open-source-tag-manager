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

describe('Unit: doNotTrackDetector', function () {

    var doNotTrackDetector;
    var windowMock;
    var utils = {
        inArray: function (element, array) {
            var len, coreArray = [], indicator = 0;

            if ( array ) {
                if ( coreArray.indexOf ) {
                    return coreArray.indexOf.call( array, element );
                }

                len = array.length;

                for ( ; indicator < len; indicator++ ) {
                    // Skip accessing in sparse arrays
                    if ( indicator in array && array[ indicator ] === element ) {
                        return indicator;
                    }
                }
            }

            return -1;
        }
    };

    describe('in Gecko 32 Firefox', function () {

        it('should set dnt property when enabled', function() {

            windowMock = {
                navigator: {
                    doNotTrack: 'yes'
                }
            };

            var DoNotTrackDetectorClass = window.sevenTag.$injector.get('DoNotTrackDetector');
            doNotTrackDetector = new DoNotTrackDetectorClass(windowMock, utils);

            expect(doNotTrackDetector.detect()).toBeTruthy();

        });

        it('shouldn\'t set dnt property when disabled', function() {

            windowMock = {
                navigator: {
                    doNotTrack: 'no'
                }
            };

            var DoNotTrackDetectorClass = window.sevenTag.$injector.get('DoNotTrackDetector');
            doNotTrackDetector = new DoNotTrackDetectorClass(windowMock, utils);

            expect(doNotTrackDetector.detect()).toBeFalsy();

        });

        it('shouldn\'t set dnt property when doNotTrack is invalid', function() {

            windowMock = {
                navigator: {
                    doNotTrack: 'test'
                }
            };

            var DoNotTrackDetectorClass = window.sevenTag.$injector.get('DoNotTrackDetector');
            doNotTrackDetector = new DoNotTrackDetectorClass(windowMock, utils);

            expect(doNotTrackDetector.detect()).toBeFalsy();

        });


    });

    describe('in IE 9-10', function () {

        it('should set dnt property when enabled', function() {

            windowMock = {
                navigator: {
                    msDoNotTrack: true
                }
            };

            var DoNotTrackDetectorClass = window.sevenTag.$injector.get('DoNotTrackDetector');
            doNotTrackDetector = new DoNotTrackDetectorClass(windowMock, utils);

            expect(doNotTrackDetector.detect()).toBeTruthy();

        });

        it('shouldn\'t set dnt property when disabled', function() {

            windowMock = {
                navigator: {
                    msDoNotTrack: 0
                }
            };

            var DoNotTrackDetectorClass = window.sevenTag.$injector.get('DoNotTrackDetector');
            doNotTrackDetector = new DoNotTrackDetectorClass(windowMock, utils);

            expect(doNotTrackDetector.detect()).toBeFalsy();

        });

    });

    describe('in IE 11 and Safari 7.1.3+', function () {

        it('should set dnt property when enabled', function() {

            windowMock = {
                doNotTrack: true
            };

            var DoNotTrackDetectorClass = window.sevenTag.$injector.get('DoNotTrackDetector');
            doNotTrackDetector = new DoNotTrackDetectorClass(windowMock, utils);

            expect(doNotTrackDetector.detect()).toBeTruthy();

        });

        it('shouldn\'t set dnt property when disabled', function() {

            windowMock = {
                doNotTrack: false
            };

            var DoNotTrackDetectorClass = window.sevenTag.$injector.get('DoNotTrackDetector');
            doNotTrackDetector = new DoNotTrackDetectorClass(windowMock, utils);

            expect(doNotTrackDetector.detect()).toBeFalsy();

        });

    });

});
