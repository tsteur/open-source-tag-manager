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
    function EventHandler () {
        var LISTENER_PREFIX = 'stg._';
        var listeners = {};

        var getKey = function (key) {
            return LISTENER_PREFIX + key;
        };

        var getListener = function (key) {
            key = getKey(key);
            if (listeners[key] !== undefined) {
                return listeners[key];
            }

            return undefined;
        };

        var addListener = function (eventName, element, eventHandler) {
            var key = getKey(eventName);
            listeners[key] = function () {
                element.bind(eventName, eventHandler);
            };
        };

        var removeListener = function (key) {
            key = getKey(key);
            if (listeners[key]) {
                delete listeners[key];
            }
        };

        var run = function () {
            for (var listener in listeners) {
                if (listeners.hasOwnProperty(listener)) {
                    listeners[listener]();
                }
            }
        };

        return {
            getListener: getListener,
            addListener: addListener,
            removeListener: removeListener,
            run: run
        };
    }

    EventHandler.$inject = [];

    sevenTag.service(MODULE_NAME, EventHandler);
})(window.sevenTag, '$eventHandler');
