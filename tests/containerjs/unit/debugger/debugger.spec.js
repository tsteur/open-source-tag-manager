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

describe('Unit: debugger', function () {

    var ARTIFICIAL_ARRAY_PROPERTY = 'ARTIFICIAL_ARRAY_PROPERTY';

    var debuggerObject, listeners;

    beforeEach(function () {
        Array.prototype[ARTIFICIAL_ARRAY_PROPERTY] = ARTIFICIAL_ARRAY_PROPERTY;

        debuggerObject = window.sevenTag.$injector.get('$debugger');

        listeners = {
            listen: function () {
            }
        };

        spyOn(listeners, 'listen').andCallFake(function () {
            return true;
        });
    });

    afterEach(function () {
        delete Array.prototype[ARTIFICIAL_ARRAY_PROPERTY];
    });

    it('should be defined', function () {
        expect(debuggerObject).toBeDefined();
    });

    it('should change state enabled/disabled', function () {
        expect(debuggerObject.isEnabled()).toEqual(false);
        expect(debuggerObject.start()).toEqual(true);
        expect(debuggerObject.isEnabled()).toEqual(true);
        expect(debuggerObject.stop()).toEqual(true);
        expect(debuggerObject.isEnabled()).toEqual(false);
    });

    it('should add/remove listener', function () {
        var listener = function() {};

        expect(debuggerObject.addListener(listener)).toEqual(true);
        expect(debuggerObject.hasListener(listener)).toEqual(true);
    });

    it('should remove listener', function () {
        var listener = function() {};
        debuggerObject.addListener(listener);

        expect(debuggerObject.hasListener(listener)).toEqual(true);
        expect(debuggerObject.removeListener(listener)).toEqual(true);
        expect(debuggerObject.removeListener(listener)).toEqual(false);
        expect(debuggerObject.hasListener(listener)).toEqual(false);
    });

    it('should remove all listeners', function () {
        var listener = function() {};
        debuggerObject.addListener(listener);

        expect(debuggerObject.hasListener(listener)).toEqual(true);
        expect(debuggerObject.removeListeners()).toEqual(true);
        expect(debuggerObject.hasListener(listener)).toEqual(false);
    });

    it('run callbacks if is enabled', function () {
        var data = {};
        debuggerObject.start();
        debuggerObject.addListener(listeners.listen);

        debuggerObject.push(data);
        debuggerObject.debug();

        expect(listeners.listen).toHaveBeenCalledWith(debuggerObject.stack);
    });

    it('does not run callbacks if is disabled', function () {
        var data = {};
        debuggerObject.stop();
        debuggerObject.addListener(listeners.listen);

        debuggerObject.push(data);
        debuggerObject.debug();

        expect(listeners.listen.calls.length).toEqual(0);
    });

    it('should not have properties of prototype object', function () {
        expect(debuggerObject.hasListener(ARTIFICIAL_ARRAY_PROPERTY)).toBeFalsy();
    });

    it('should not call properties of prototype object as if it was debug listener', function () {
        var invokeDebug = function () {
            debuggerObject.start();
            debuggerObject.debug();
        };

        expect(invokeDebug).not.toThrow();
    });

});
