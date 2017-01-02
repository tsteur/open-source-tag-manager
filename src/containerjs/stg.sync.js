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
        $tagsHandlerSync,
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
            this.bootstrap = function () {
                var tagTree = $window.sevenTagSync.tagTree || {};
                var debugCookieValue;

                if ($debugParamDetector.hasParam()) {
                    debugCookieValue = true;
                    $cookie.add(DEBUG_PARAM_NAME, debugCookieValue);
                } else {
                    debugCookieValue = $cookie.get(DEBUG_PARAM_NAME);
                }

                $window.dataLayer = $window.dataLayer || [];
                sevenTag.tagTreeSync = tagTree;

                var boot = function (tagTree) {
                    $tagsHandlerSync.handle($utils.clone(tagTree), $window.dataLayer);
                };

                $window.dataLayer.push({
                    'event': 'stg.pageView.sync',
                    'start': new Date().getTime()
                });

                boot(tagTree);
            };

            return this;
        };

        return SevenTag;
    };

    SevenTagFactory.$inject = [
        '$window',
        '$utils',
        '$tagsHandlerSync',
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
})(window.sevenTag, 'SevenTagSync');
