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

describe('Unit: listeners module', function () {

    var MS_BUTTON_LEFT = 1,
        MS_BUTTON_MIDDLE = 4,
        MS_BUTTON_RIGHT = 2;
    var WHICH_BUTTON_LEFT = 1,
        WHICH_BUTTON_MIDDLE = 2,
        WHICH_BUTTON_RIGHT = 3;

    var ListenersHandler, $eventHandler, $callbackFactory, registeredHandlers, $utils;

    beforeEach(function () {
        registeredHandlers = {};

        ListenersHandler = window.sevenTag.$injector.get('$listenersHandler');
        $eventHandler = window.sevenTag.$injector.get('$eventHandler');
        $utils = window.sevenTag.$injector.get('$utils');
        $callbackFactory = window.sevenTag.$injector.get('$callbackFactory');

        spyOn($eventHandler, 'run').andCallFake(function () {});

        spyOn($eventHandler, 'addListener').andCallFake(function (eventName, element, callback) {
            registeredHandlers[eventName] = callback;
        });

        spyOn($callbackFactory, 'get').andCallFake(function () {});
    });

    it('should be defined', function () {
        expect(ListenersHandler).toBeDefined();
    });

    describe('calling handle method', function () {

        it('should add listeners to event handler', function () {
            ListenersHandler.handle([]);

            var clickListener = registeredHandlers['click'] || registeredHandlers['mousedown'];
            expect(clickListener).toBeDefined();
            expect(registeredHandlers['submit']).toBeDefined();
        });

        it('should start event handler', function () {
            ListenersHandler.handle([]);

            expect($eventHandler.run).toHaveBeenCalled();
        });
    });

    describe('event handler', function () {

        var dataLayer, event, $window;

        beforeEach(function () {
            dataLayer = [];

            event = {
                target: {}
            }

            ListenersHandler.handle(dataLayer);
        });

        it('should push stg.formSubmit event on submit event', function () {
            var listener = registeredHandlers['submit'];

            listener(event);

            expect(dataLayer.length).toBe(1);
            expect(dataLayer[0].event).toBe('stg.formSubmit');
        });

        it('should push stg.click event on left mouse button click event', function () {
            event.which = WHICH_BUTTON_LEFT;

            var listener = registeredHandlers['click'] || registeredHandlers['mousedown'];
            listener(event);

            expect(dataLayer.length).toBe(1);
            expect(dataLayer[0].event).toBe('stg.click');
        });

        it('should push stg.click event on middle mouse button click event', function () {
            event.which = WHICH_BUTTON_MIDDLE;

            var listener = registeredHandlers['click'] || registeredHandlers['mousedown'];
            listener(event);

            expect(dataLayer.length).toBe(1);
            expect(dataLayer[0].event).toBe('stg.click');
        });

        it('should fix IE9 button numeration for left button', function () {
            event.button = MS_BUTTON_LEFT;

            var listener = registeredHandlers['click'] || registeredHandlers['mousedown'];
            listener(event);

            expect(event.which).toBe(WHICH_BUTTON_LEFT);
        });

        it('should fix IE9 button numeration for middle button', function () {
            event.button = MS_BUTTON_MIDDLE;

            var listener = registeredHandlers['click'] || registeredHandlers['mousedown'];
            listener(event);

            expect(event.which).toBe(WHICH_BUTTON_MIDDLE);
        });

        it('should fix IE9 button numeration for right button', function () {
            event.button = MS_BUTTON_RIGHT;

            var listener = registeredHandlers['click'] || registeredHandlers['mousedown'];
            listener(event);

            expect(event.which).toBe(WHICH_BUTTON_RIGHT);
        });
    });

});
