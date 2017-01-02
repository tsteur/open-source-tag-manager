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
    var EqualsVisitor = function() {
        this.accept = function(target) {
            return target.action === 'equals' || target.action === 'does_not_equal';
        };

        this.visit = function(target, variables) {
            if(typeof variables[target.variable] === 'undefined') {
                return false;
            }

            if(target.action === 'equals') {
                return visitEquals(target, variables);
            }

            return visitNotEquals(target, variables);
        };

        var visitEquals = function(target, variables) {
            return target.value === variables[target.variable];
        };

        var visitNotEquals = function(target, variables) {
            return target.value !== variables[target.variable];
        };
        return this;
    };

    EqualsVisitor.$inject = [];

    sevenTag.service(MODULE_NAME, EqualsVisitor);
})(window.sevenTag, '$equalsVisitor');
