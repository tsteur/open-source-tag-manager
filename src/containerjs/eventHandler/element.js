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
    var Element = function(domElement) {
        var bind = function (eventName, functionCallback) {
            if (domElement.addEventListener) { // modern browsers including IE9+
                domElement.addEventListener(eventName, functionCallback, false);
            } else if (domElement.attachEvent) { // IE8 and below
                domElement.attachEvent('on' + eventName, functionCallback);
            } else {
                domElement['on' + eventName] = functionCallback;
            }
        };

        var unbind = function (eventName, functionCallback) {
            if (domElement.removeEventListener) {
                domElement.removeEventListener(eventName, functionCallback, false);
            } else if (domElement.detachEvent) {
                domElement.detachEvent('on' + eventName, functionCallback);
            } else {
                domElement['on' + eventName] = null;
            }
        };

        var stop = function (event) {
            var e = event || domElement.event;

            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        };

        var appendChild = function(child) {
            return domElement.appendChild(child);
        };

        return {
            bind: bind,
            unbind: unbind,
            stop: stop,
            appendChild: appendChild
        };
    };

    Element.$inject = [];

    sevenTag.provider(MODULE_NAME, function() {
        return Element;
    });
})(window.sevenTag, 'Element');
