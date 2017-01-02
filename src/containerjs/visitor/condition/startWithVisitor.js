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
    var StartWithVisitor = function() {
        this.accept = function (target) {
            return target.action === 'starts_with' || target.action === 'does_not_start_with';
        };

        this.visit = function (target, variables) {
            if (typeof variables[target.variable] === 'undefined') {
                return false;
            }

            if (target.action === 'starts_with') {
                return startWithVisit(target, variables);
            }

            return notStartWithVisit(target, variables);
        };

        var startWithVisit = function (target, variables) {
            var value = target.value;

            return value === variables[target.variable].substr(0, value.length);
        };

        var notStartWithVisit = function (target, variables) {
            var value = target.value;

            return value !== variables[target.variable].substr(0, value.length);
        };

        return this;
    };

    StartWithVisitor.$inject = [];

    sevenTag.service(MODULE_NAME, StartWithVisitor);
})(window.sevenTag, '$startWithVisitor');
