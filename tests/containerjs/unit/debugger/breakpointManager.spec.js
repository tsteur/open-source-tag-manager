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

describe('Unit: BreakpointManager', function () {

    var breakpointObject, testCallback;

    beforeEach(function () {

        breakpointObject = window.sevenTag.$injector.get('$breakpointManager');

        testCallback = {
            someFunction: function () {
            }
        };

        spyOn(testCallback, 'someFunction').andCallFake(function () {
            return true;
        });

    });

    it('should be defined', function () {

        expect(breakpointObject).toBeDefined();

    });

    it('should change state enabled/disabled', function () {

        expect(breakpointObject.isEnabled()).toBeFalsy();
        breakpointObject.enabled = true;
        expect(breakpointObject.isEnabled()).toBeTruthy();

    });

    it('should set a callback', function () {

        expect(breakpointObject.callback).not.toBeDefined();

        breakpointObject.setCallback(testCallback.someFunction);

        expect(breakpointObject.callback).toBeDefined();

    });

    it('should check if a callback is defined', function () {

        breakpointObject.setCallback(undefined);

        expect(breakpointObject.hasCallback()).toBeFalsy();

        breakpointObject.setCallback(testCallback.someFunction);

        expect(breakpointObject.hasCallback()).toBeTruthy();

    });

});
