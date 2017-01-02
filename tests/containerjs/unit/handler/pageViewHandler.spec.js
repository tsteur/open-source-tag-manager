/**
 * Copyright (C) 2015 Digimedia Sp. z.o.o. d/b/a Clearcode
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distrubuted in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

describe('Unit: pageViewHandler module', function () {

    var pageViewHandler, listenerForEvent, dataLayer, eventHandler, utils, documentObject, windowObject, documentElement, windowElement;

    beforeEach(function () {
        dataLayer = [];
        utils = {};
        documentObject = {};
        windowObject = {};
        documentElement = {};
        windowElement = {};

        listenerForEvent = {};

        eventHandler = {
            addListener: function(){
            }
        };

        spyOn(eventHandler, 'addListener').andCallFake(function (eventName, element, callback) {
            listenerForEvent[eventName] = callback;
            return true;
        });

        var PageViewHandlerClass = window.sevenTag.$injector.get('PageViewHandler');
        pageViewHandler = new PageViewHandlerClass(eventHandler, utils, documentObject, windowObject, documentElement, windowElement);
    });

    it('should be defined', function () {
        expect(pageViewHandler).toBeDefined();
    });

    describe('when handle method is called', function () {

        it('should add pageView event to data layer', function () {
            pageViewHandler.handle(dataLayer);
            expect(dataLayer).toContain({event: 'stg.pageView', start: jasmine.any(Number)});
        });

        it('should register callback on dom ready event', function () {
            pageViewHandler.handle(dataLayer);

            expect(eventHandler.addListener).toHaveBeenCalled();
            var args = eventHandler.addListener.argsForCall[1];
            expect(args).toContain('DOMContentLoaded');
            expect(args).toContain(documentElement);
        });

        it('should register callback on page loaded event', function () {
            pageViewHandler.handle(dataLayer);

            expect(eventHandler.addListener).toHaveBeenCalled();
            var args = eventHandler.addListener.argsForCall[2];
            expect(args).toContain('load');
            expect(args).toContain(windowElement);
        });

        it('should add stg.domReady to datalayer if it was triggered in the past', function () {
            documentObject.readyState = 'interactive';
            pageViewHandler.handle(dataLayer);

            expect(dataLayer).toContain({event: 'stg.domReady', start: jasmine.any(Number)});
        });

        it('should add stg.pageLoad to datalayer if it was triggered in the past', function () {
            documentObject.readyState = 'complete';
            pageViewHandler.handle(dataLayer);

            expect(dataLayer).toContain({event: 'stg.pageLoad', start: jasmine.any(Number)});
        });
    });

    it('should add stg.pageLoad event to data layer when all resources are loaded', function(){
        pageViewHandler.handle(dataLayer);

        listenerForEvent['load']();

        expect(dataLayer).toContain({event: 'stg.pageLoad', start: jasmine.any(Number)});
    });

    it('should add stg.domReady event to data layer when HTML has been parsed', function(){
        pageViewHandler.handle(dataLayer);

        listenerForEvent['DOMContentLoaded']();

        expect(dataLayer).toContain({event: 'stg.domReady', start: jasmine.any(Number)});
    });

    it('should fire stg.domReady event only once', function(){
        pageViewHandler.handle(dataLayer);

        listenerForEvent['DOMContentLoaded']();
        listenerForEvent['DOMContentLoaded']();

        expect(dataLayer).toContain({event: 'stg.pageView', start: jasmine.any(Number)});
        expect(dataLayer).toContain({event: 'stg.domReady', start: jasmine.any(Number)});
        expect(dataLayer.length).toBe(2);
    });

});
