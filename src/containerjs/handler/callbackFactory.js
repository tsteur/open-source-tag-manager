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

(function(sevenTag, MODULE_NAME) {
    var CallbackFactory = function ($utils, linkClickCallbackFactory, DELAY) {
        this.get = function (eventName, event) {
            if (eventSkipsDefaultBrowserAction(event)) {
                return undefined;
            }

            var callback,
                targetElement = getClickTarget(event),
                anchorElement = findParentElementOfType(targetElement, ['a']),
                clickedOnLink = eventName === 'click' && anchorElement !== undefined;

            if (clickedOnLink) {
                callback = linkClickCallbackFactory.get(event, anchorElement, invokeDelayed);
            } else if (eventName === 'submit') {
                callback = createSubmitCallback(eventName, event, targetElement);
            }

            return callback;
        };

        function eventSkipsDefaultBrowserAction (event) {
            return event.defaultPrevented || event.returnValue === false;
        }

        function getClickTarget (event) {
            return event.target ? event.target : event.srcElement;
        }

        function findParentElementOfType (node, nodeTypes) {
            var MAX_ITERATIONS = 100;

            for (var i = 0; node && !isOfRequiredType(node) && i < MAX_ITERATIONS; i++) {
                node = node.parentElement;
            }

            return isOfRequiredType(node) ? node : undefined;

            function isOfRequiredType (node) {
                if (!node || !node.tagName){
                    return false;
                }

                var tagName = node.tagName.toLowerCase();
                return $utils.inArray(tagName, nodeTypes) !== -1;
            }
        }

        function createSubmitCallback (eventName, event, targetElement) {
            event.preventDefault();

            return function(dataLayerElement, tagResolved, skipBrowserHandler) {
                if (!skipBrowserHandler) {
                    invokeDelayed(dataLayerElement, function () {
                        targetElement.submit();
                    });
                }
            };
        }

        function invokeDelayed (dataLayerElement, callback) {
            $utils.timeout(callback, getDelay(dataLayerElement));
        }

        function getDelay (dataLayerElement) {
            var delayRawValue = dataLayerElement.eventCallbackTimeout === undefined ? DELAY : dataLayerElement.eventCallbackTimeout;
            return parseInt(delayRawValue, 10);
        }

        return this;
    };

    CallbackFactory.$inject = [
        '$utils',
        '$linkClickCallbackFactory',
        'DELAY'
    ];

    sevenTag.service(MODULE_NAME, CallbackFactory);
})(window.sevenTag, '$callbackFactory');
