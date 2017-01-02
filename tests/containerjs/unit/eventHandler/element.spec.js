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

describe('Unit: element', function () {

    var Element;

    beforeEach(function () {
        Element = window.sevenTag.$injector.get('Element');
    });

    it('should call method addEventListener', function () {
        var testedElement = {
            addEventListener: function () {}
        };
        var spy = spyOn(testedElement, 'addEventListener');
        var eventHandler = new Element(testedElement);

        eventHandler.bind('click', function () {});

        expect(spy).toHaveBeenCalled();
    });

    it('should call method attachEvent', function () {
        var testedElement = {
            attachEvent: function () {}
        };
        var spy = spyOn(testedElement, 'attachEvent');
        var eventHandler = new Element(testedElement);

        eventHandler.bind('click', function () {});

        expect(spy).toHaveBeenCalled();
    });

    it('should call method onclick', function () {
        var testedElement = {
            onclick: null
        };
        var eventHandler = new Element(testedElement);

        eventHandler.bind('click', 'someCallback');

        expect(testedElement.onclick).toBe('someCallback');
    });


    it('should call method removeEventListener', function () {
        var testedElement = {
            removeEventListener: function () {}
        };
        var eventHandler = new Element(testedElement);
        var spy = spyOn(testedElement, 'removeEventListener');

        eventHandler.unbind('click');

        expect(spy).toHaveBeenCalled();
    });

    it('should call method detachEvent', function () {
        var testedElement = {
            detachEvent: function () {}
        };

        var eventHandler = new Element(testedElement);
        var spy = spyOn(testedElement, 'detachEvent');

        eventHandler.unbind('click');

        expect(spy).toHaveBeenCalled();
    });

    it('should call method onclick', function () {
        var testedElement = {
            onclick: 'someCallback'
        };
        var eventHandler = new Element(testedElement);

        eventHandler.unbind('click');

        expect(testedElement.onclick).toBe(null);
    });

    it('should add element to dom', function () {
        var testedElement = new Element(window.document.body);
        var wrapper = window.document.createElement('div');
        wrapper.className = 'className';

        expect(testedElement.appendChild(wrapper)).toBe(wrapper);
    });

    it('should stop event from propagating', function () {
        var testedElement = new Element(window.document.body),
            customEvent = {
                cancelBubble: false,
                stopPropagation: function () {}
            };

        spyOn(customEvent, 'stopPropagation');

        testedElement.stop(customEvent);

        expect(customEvent.cancelBubble).toBeTruthy();
        expect(customEvent.stopPropagation).toHaveBeenCalled();
    });

});
