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

(function(sevenTag, MODULE_NAME, SERVICE_NAME) {
    var WHICH_BUTTON_MIDDLE = 2;

    var TARGET_NEW_WINDOW = ['_blank'],
        TARGET_SAME_WINDOW = ['_self', '_parent', '_top', ''];

    var LinkClickCallbackFactory = function ($utils, $window) {
        this.get = function (event, anchorElement, invokeDelayed) {
            var url = anchorElement.href;

            return function (dataLayerElement, tagResolved, skipBrowserHandler) {
                if (shouldSkipEventHandler(event, skipBrowserHandler, tagResolved, url)) {
                    return;
                }

                var forceOpenInNewWindow = eventRequiresToOpenLinkInNewPage(event),
                    targetAttribute = getWindowTargetAttribute(anchorElement, forceOpenInNewWindow),
                    targetWindow = getWindowToOpenLinkIn(url, targetAttribute);

                if (targetWindow) {
                    // allow for handling all tag operations before proceeding with the event action
                    preventDefault (event);

                    invokeDelayed(dataLayerElement, function () {
                        targetWindow.location.href = url;
                    });
                }
            };
        };

        function shouldSkipEventHandler (event, skipBrowserHandler, tagResolved, url) {
            if (skipBrowserHandler) {
                preventDefault (event);
            }

            return skipBrowserHandler || !tagResolved || !url;
        }

        function preventDefault (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }

        function eventRequiresToOpenLinkInNewPage (event) {
            var isMiddleMouseButton = event.which === WHICH_BUTTON_MIDDLE;
            return isMiddleMouseButton || event.shiftKey || event.ctrlKey || event.metaKey;
        }

        function getWindowToOpenLinkIn (url, targetAttribute) {
            var useSameWindow = $utils.inArray(targetAttribute, TARGET_SAME_WINDOW) !== -1,
                useNewWindow = $utils.inArray(targetAttribute, TARGET_NEW_WINDOW) !== -1;

            if (useNewWindow) {
                // will open new window in the background while processing all tags on current page
                return;
            }

            if (useSameWindow) {
                var targetAttributeNoUnderscore = targetAttribute.substring(1);
                return $window.frames ? $window.frames[targetAttributeNoUnderscore] : $window[targetAttributeNoUnderscore];
            } else {
                return $window.frames[targetAttribute] ? $window.frames[targetAttribute] : $window.open('', targetAttribute);
            }
        }

        function getWindowTargetAttribute (element, forceOpenInNewWindow) {
            var target,
                tagName = element.tagName ? element.tagName.toLowerCase() : '';

            if (forceOpenInNewWindow) {
                target = TARGET_NEW_WINDOW[0];
            } else if (element.target) {
                target = element.target;
            } else if ($utils.inArray(tagName, ['a', 'area', 'form']) !== -1) {
                target = TARGET_SAME_WINDOW[0];
            }

            if (!target) {
                target = TARGET_SAME_WINDOW[0];
            }

            return target;
        }

        return this;
    };

    sevenTag.provider(MODULE_NAME, function() {
        return LinkClickCallbackFactory;
    });

    var LinkClickCallbackFactoryService = function ($utils, $window) {
        return new LinkClickCallbackFactory($utils, $window);
    }

    LinkClickCallbackFactoryService.$inject = [
        '$utils',
        '$window'
    ];

    sevenTag.service(SERVICE_NAME, LinkClickCallbackFactoryService);
    sevenTag[SERVICE_NAME] = sevenTag.$injector.get(SERVICE_NAME);
})(window.sevenTag, 'LinkClickCallbackFactory', '$linkClickCallbackFactory');
