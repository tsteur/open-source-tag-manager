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

(function(sevenTag, MODULE_NAME, SERVICE_NAME) {
    var IE6_MAX_RETRIES = 140,
        IE6_RETIRES_DELAY = 50;

    function PageViewHandler($eventHandler, $utils, $document, $documentElement, $windowElement) {
        var ie6Retires = 0,
            domReadyFired = false;

        function isIE6 () {
            return $document.createEventObject !== undefined;
        }

        this.handle = function(dataLayer) {
            var domReadyCallback = createDomReadyCallback(dataLayer);

            if (!isIE6()) {
                addDomReadyHandler(domReadyCallback);
            } else {
                addDomReadyHandlerForIE6(domReadyCallback);
            }

            dataLayer.push({
                'event': 'stg.pageView',
                'start': new Date().getTime()
            });

            addAllResourcesDownloadedHandler(createAllResourcesDownloadedCallback(dataLayer));
        };

        function addDomReadyHandler (callback) {
            var readyState = $document.readyState,
                pageWasAlreadyLoaded = readyState === 'interactive' || readyState === 'complete';

            if (pageWasAlreadyLoaded) {
                callback();
            } else {
                $eventHandler.addListener('readystatechange', $documentElement, callback);
                $eventHandler.addListener('DOMContentLoaded', $documentElement, callback);
            }
        }

        function createDomReadyCallback (dataLayer) {
            return function () {
                if (domReadyFired){ return; }

                domReadyFired = true;

                dataLayer.push({
                    'event': 'stg.domReady',
                    'start': new Date().getTime()
                });
            }
        }

        function addAllResourcesDownloadedHandler (callback) {
            var allResourcesAlreadyLoaded = $document.readyState === 'complete';

            if (allResourcesAlreadyLoaded) {
                callback();
            } else {
                $eventHandler.addListener('load', $windowElement, callback);
            }
        }

        function createAllResourcesDownloadedCallback (dataLayer) {
            return function () {
                dataLayer.push({
                    'event': 'stg.pageLoad',
                    'start': new Date().getTime()
                });
            }
        }

        function addDomReadyHandlerForIE6 (callback) {
            if (domReadyFired || ie6Retires >= IE6_MAX_RETRIES){ return; }

            ++ie6Retires;

            try {
                $document.documentElement.doScroll('left');
                callback();
            } catch (e) {
                var retryDomReadyIE6check = function () {
                    addDomReadyHandlerForIE6(callback);
                };
                $utils.timeout(retryDomReadyIE6check,  IE6_RETIRES_DELAY);
            }
        }

        return this;
    };

    sevenTag.provider(MODULE_NAME, function() {
        return PageViewHandler;
    });

    var PageViewHandlerFactory = function(PageViewHandlerClass, $eventHandler, $utils, $document, $documentElement, $windowElement) {
        return new PageViewHandlerClass($eventHandler, $utils, $document, $documentElement, $windowElement);
    };

    PageViewHandlerFactory.$inject = [
        'PageViewHandler',
        '$eventHandler',
        '$utils',
        '$document',
        '$documentElement',
        '$windowElement'
    ];

    sevenTag.service(SERVICE_NAME, PageViewHandlerFactory);
})(window.sevenTag, 'PageViewHandler', '$pageViewHandler');
