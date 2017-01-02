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
    var MS_BUTTON_LEFT = 1,
        MS_BUTTON_MIDDLE = 4,
        MS_BUTTON_RIGHT = 2;
    var WHICH_BUTTON_LEFT = 1,
        WHICH_BUTTON_MIDDLE = 2,
        WHICH_BUTTON_RIGHT = 3;

    var ListenersHandler = function (Element, $eventHandler, $utils, $documentElement, $callbackFactory) {
        var getTargetElement = function (event) {
            return typeof event.target !== 'undefined' ? event.target : event.srcElement;
        };

        function isIE () {
            return navigator.userAgent.match(/MSIE/) !== null;
        }

        this.handle = function(dataLayer) {
            // IE does not provide which button information for click events
            var clickEventName = !isIE() ? 'click' : 'mousedown';

            $eventHandler.addListener(clickEventName, $documentElement, clickListener);
            $eventHandler.addListener('submit', $documentElement, submitListener);

            $eventHandler.run();

            function clickListener (event) {
                var target = getTargetElement(event);

                event.which = getMouseButton(event);

                if (shouldHandleClick(event)) {
                    dataLayer.push({
                        'event': 'stg.click',
                        'eventCallback': $callbackFactory.get('click', event),
                        'element': target,
                        'elementId': target.id,
                        'elementClasses': target.className,
                        'elementUrl': target.href
                    });
                }

                function shouldHandleClick (event) {
                    return event.which === WHICH_BUTTON_LEFT || event.which === WHICH_BUTTON_MIDDLE;
                }
            }

            function getMouseButton (event) {
                var button;

                if (event.which) {
                    button =  event.which;
                } else {
                    /* eslint-disable */
                    // fix for IE9, see http://www.quirksmode.org/js/events_properties.html#button
                    if ((event.button & MS_BUTTON_LEFT) > 0) {
                        button = WHICH_BUTTON_LEFT;
                    } else if ((event.button & MS_BUTTON_MIDDLE) > 0) {
                        button = WHICH_BUTTON_MIDDLE;
                    } else if ((event.button & MS_BUTTON_RIGHT) > 0) {
                        button = WHICH_BUTTON_RIGHT;
                    }
                    /* eslint-enable */
                }

                return button;
            }

            function submitListener (event) {
                var target = getTargetElement(event);

                dataLayer.push({
                    'event': 'stg.formSubmit',
                    'eventCallback': $callbackFactory.get('submit', event),
                    'element': target,
                    'elementId': target.id,
                    'elementClasses': target.className,
                    'elementUrl': target.action
                });
            }
        };

        return this;
    };

    ListenersHandler.$inject = [
        'Element',
        '$eventHandler',
        '$utils',
        '$documentElement',
        '$callbackFactory'
    ];

    sevenTag.service(MODULE_NAME, ListenersHandler);
})(window.sevenTag, '$listenersHandler');
