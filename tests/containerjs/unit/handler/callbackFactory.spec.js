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

describe('Unit: callback factory', function () {

    var callbackFactory, linkClickCallbackFactory, $utils;

    beforeEach(function () {
        callbackFactory = window.sevenTag.$injector.get('$callbackFactory');
        $utils = window.sevenTag.$injector.get('$utils');
        linkClickCallbackFactory = window.sevenTag.$injector.get('$linkClickCallbackFactory');
    });

    it('should be defined', function () {
        expect(callbackFactory).toBeDefined();
    });

    it('should return no callback if event prevents all default actions', function () {
        var event = {
            defaultPrevented: true
        };
        expect(callbackFactory.get('click', event)).toBeUndefined();
        expect(callbackFactory.get('submit', event)).toBeUndefined();
    });

    it('should return no callback if other event callbacks return false on older browsers', function () {
        var event = {
            returnValue: false
        };
        expect(callbackFactory.get('click', event)).toBeUndefined();
        expect(callbackFactory.get('submit', event)).toBeUndefined();
    });

    it('should return undefined if event is not click/submit', function () {
        var event = {};
        expect(callbackFactory.get('toggle', event)).toBeUndefined();
        expect(callbackFactory.get('drag', event)).toBeUndefined();
    });

    it('should return callback on form submission', function () {
        var event = {
            preventDefault: function () {}
        };
        expect(callbackFactory.get('submit', event)).toBeDefined();
    });

    describe('when clicked on link', function () {

        var event, anchorElement;

        beforeEach(function() {
            anchorElement = {
                tagName: 'A'
            };
            event = {};

            spyOn(linkClickCallbackFactory, 'get').andCallFake(function () {
                return true;
            });
        });

        it('should call linkClickCallbackFactory', function () {
            event.target = anchorElement;

            callbackFactory.get('click', event);

            expect(linkClickCallbackFactory.get).toHaveBeenCalled();
        });

        it('should detect link click if clicked on anchor element', function () {
            event.target = anchorElement;

            var callback = callbackFactory.get('click', event);

            expect(callback).toBeDefined();
        });

        it('should detect link click if clicked child of anchor element', function () {
            event.target = {
                tagName: 'img',
                parentElement: anchorElement
            };

            var callback = callbackFactory.get('click', event);

            expect(callback).toBeDefined();
        });
    });

    describe('when calling submit click callback', function() {

        var submitTarget, submitCallback, dataLayerElement;

        beforeEach(function() {
            submitTarget = {
                target: {
                    submit: function () {}
                },
                preventDefault: function() {}
            };

            dataLayerElement = {

            };

            spyOn(submitTarget.target, 'submit').andCallFake(function () {
                return true;
            });

            submitCallback = callbackFactory.get('submit', submitTarget);
        });

        it('should submit the form', function () {
            spyOn($utils, 'timeout').andCallFake(function (callback, delay) {
                callback();
            });

            submitCallback(dataLayerElement);

            expect(submitTarget.target.submit).toHaveBeenCalled();
        });
    });

});
