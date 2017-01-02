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
    var SevenTagFactory = function (
        $window,
        $utils,
        $pageViewHandler,
        $listenersHandler,
        $tagsHandler,
        $debugger,
        $http,
        $cookie,
        $location,
        DOMAIN,
        ID,
        DEBUG_PARAM_NAME,
        $debugParamDetector
    ) {
        var SevenTag = function() {
            var $dataLayer = [];

            this.bootstrap = function () {
                var hasSyncContainer = typeof $window.sevenTagSync !== 'undefined';
                var tagTree = $window.sevenTag.tagTree || {};
                var variables = $window.sevenTag.variables || [];
                var debugCookieValue;

                if ($debugParamDetector.hasParam()) {
                    debugCookieValue = true;
                    $cookie.add(DEBUG_PARAM_NAME, debugCookieValue);
                } else {
                    debugCookieValue = $cookie.get(DEBUG_PARAM_NAME);
                }

                // Initialize data layer
                $window.dataLayer = $window.dataLayer || [];

                var dataLayer = $window.dataLayer;

                var boot = function () {
                    // Run listeners on page view
                    $pageViewHandler.handle(dataLayer);

                    // Upgrade push method of Array object to observe every push on dataLayer
                    var push = dataLayer.push;

                    dataLayer.push = function () {
                        var args = [].slice.call(arguments, 0);

                        push.apply(dataLayer, args);

                        for ($dataLayer.push.apply($dataLayer, args); this.length > 300; ) {
                            this.shift();
                        }

                        $tagsHandler.handle($utils.clone(tagTree), $dataLayer);
                    };

                    // Run listeners on auto-events
                    $listenersHandler.handle(dataLayer);

                    // Clone dataLayer to temporary array
                    $dataLayer.push.apply($dataLayer, dataLayer.slice(0));

                    // Run flow for existing records in dataLayer array
                    $utils.timeout(function () {
                        $tagsHandler.handle($utils.clone(tagTree), $dataLayer);
                    });

                    sevenTag.emit('bootstrap');
                };

                if (!debugCookieValue) {
                    boot();
                } else {
                    $http({
                        async: true,
                        method: 'GET',
                        url: DOMAIN + '/containers/tagtree/' + ID + '.json'
                    }, function (resp) {
                        var debugOptions = resp.debug || { enabled: false, containerName: '' };

                        if (debugCookieValue) {
                            if (debugOptions.enabled === true) {
                                var tagTreeSync = hasSyncContainer ? $window.sevenTagSync.tagTree : {};
                                tagTree = resp.tagtree || {};
                                variables = resp.variables || [];
                                $window.sevenTag.tagTree = tagTree;
                                $window.sevenTag.variables = variables;
                                $window.sevenTag.debugOptions = debugOptions;

                                $debugger.isSync(hasSyncContainer);
                                $debugger.start(tagTree, tagTreeSync);
                            } else {
                                $cookie.remove(DEBUG_PARAM_NAME);
                            }

                            boot();
                        } else if (debugOptions.enabled === true) {
                            $cookie.add(DEBUG_PARAM_NAME, 1);
                            $location.reload();
                        }
                    });
                }
            };

            return this;
        };

        return SevenTag;
    };

    SevenTagFactory.$inject = [
        '$window',
        '$utils',
        '$pageViewHandler',
        '$listenersHandler',
        '$tagsHandler',
        '$debugger',
        '$http',
        '$cookie',
        '$location',
        'DOMAIN',
        'ID',
        'DEBUG_PARAM_NAME',
        '$debugParamDetector'
    ];

    sevenTag.provider(MODULE_NAME, SevenTagFactory);
})(window.sevenTag, 'SevenTag');
