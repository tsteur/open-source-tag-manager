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

describe('Unit: link click callback factory module', function () {

    var WHICH_BUTTON_MIDDLE = 2;

    var linkClickCallbackFactory, $utils, $window, event, anchorElement, invokeImmediate;

    beforeEach(function () {
        var LinkClickCallbackFactory = window.sevenTag.$injector.get('LinkClickCallbackFactory');

        $utils = window.sevenTag.$injector.get('$utils');

        $window = {
            location: {},
            open: function () {}
        };

        spyOn($window, 'open').andCallFake(function () {});

        linkClickCallbackFactory = new LinkClickCallbackFactory($utils, $window);

        event = {
            preventDefault: function () {}
        };

        spyOn(event, 'preventDefault').andCallFake(function () {});

        anchorElement = {
            tagName: 'a',
            href: 'http://7tag.dev.clearcode.cc/'
        };

        invokeImmediate = function (element, callback) {
            callback();
        }
    });

    it('should return a callback', function () {
        var callback = linkClickCallbackFactory.get(event, anchorElement);
        expect(callback).toBeDefined();
    });

    it('should not discard default browser callback if anchor element does not have href', function () {
        delete anchorElement.href;
        var callback = linkClickCallbackFactory.get(event, anchorElement);
        callback({}, true);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should prevent default browser callback if skipBrowserHandler is set to true', function () {
        var callback = linkClickCallbackFactory.get(event, anchorElement);
        callback({}, true, true);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not discard default browser callback if no tags have resolved for event', function () {
        var callback = linkClickCallbackFactory.get(event, anchorElement);
        callback({}, false);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    describe('when opening link in new window', function () {

        it('should be detected if clicked with middle mouse button', function () {
            event.which = WHICH_BUTTON_MIDDLE;

            var callback = linkClickCallbackFactory.get(event, anchorElement);
            callback({}, true);

            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        it('should be detected if clicked when holding control key', function () {
            event.ctrlKey = true;

            var callback = linkClickCallbackFactory.get(event, anchorElement);
            callback({}, true);

            expect(event.preventDefault).not.toHaveBeenCalled();
        });
    });

    describe('when opening link in same window', function () {

          var targetWindow;

          beforeEach(function () {
              targetWindow = {
                      location: {}
                  };
              $window['self'] = targetWindow;
          });

        it('should be detected if target for anchor was no provied', function () {
            var callback = linkClickCallbackFactory.get(event, anchorElement, invokeImmediate);
            callback({}, true);

            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should be detected if tag is not an anchor', function () {
            anchorElement.target = '';
            anchorElement.tagName = 'img';

            var callback = linkClickCallbackFactory.get(event, anchorElement, invokeImmediate);
            callback({}, true);

            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should be detected if target is _self', function () {
            anchorElement.target = '_self';

            var callback = linkClickCallbackFactory.get(event, anchorElement, invokeImmediate);
            callback({}, true);

            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should wait for tags to resolve and then go to provided url', function () {
            anchorElement.target = '_self';

            spyOn($utils, 'timeout').andCallFake(function (callback, delay) {
                callback();
            });

            var callback = linkClickCallbackFactory.get(event, anchorElement, invokeImmediate);
            callback({}, true);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(targetWindow.location.href).toBe(anchorElement.href);
        });
    });
});
