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
    var RegexpVisitor = function() {
        this.accept = function(target) {
            return target.action === 'regexp' || target.action === 'does_not_regexp';
        };

        this.visit = function(target, variables) {
            if(typeof variables[target.variable] === 'undefined') {
                return false;
            }

            if(target.action === 'regexp') {
                return visitRegexp(target, variables);
            }

            return visitNotRegexp(target, variables);
        };

        var visitRegexp = function(target, variables) {
            return regexp(target, variables) === true;
        };

        var visitNotRegexp = function(target, variables) {
            return regexp(target, variables) === false;
        };

        var regexp = function(target, variables) {
            var result = false;

            try {
                result = new RegExp(target.value).test(variables[target.variable]);
            }
            catch(err) {
                result = false;
            }

            return result;
        };

        return this;
    };

    RegexpVisitor.$inject = [];

    sevenTag.service(MODULE_NAME, RegexpVisitor);
})(window.sevenTag, '$regexpVisitor');
