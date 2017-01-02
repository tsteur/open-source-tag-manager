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

(function (sevenTag, MODULE_NAME, MODULE_NAME_BREAKPOINT) {
    /**
     * @constructor
     */
    var BreakpointManager = function () {
        this.enabled = false;
        this.callback = undefined;

        this.isEnabled = function () {
            return this.enabled;
        };

        this.setCallback = function (callback) {
            this.callback = callback;
        };

        this.hasCallback = function () {
            return this.callback !== undefined;
        };

        return this;
    };

    BreakpointManager.$inject = [];

    sevenTag.service(MODULE_NAME, BreakpointManager);
    sevenTag[MODULE_NAME_BREAKPOINT] = sevenTag.$injector.get(MODULE_NAME);
})(window.sevenTag, '$breakpointManager', 'breakpointManager');
