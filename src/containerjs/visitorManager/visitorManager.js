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

(function($sevenTag, VISITOR_MANAGER) {
    function VisitorManager(visitorStrategy) {
        var visitors = [];

        this.add = function (visitor, priority) {
            if (typeof priority === 'undefined') {
                priority = 0;
            }

            visitors.push({'priority': +priority, 'visitor': visitor});

            return true;
        };

        this.has = function (visitor) {
            for (var index = 0; index < visitors.length; index++) {
                if(visitor === visitors[index].visitor) {
                    return true;
                }
            }

            return false;
        };

        this.remove = function (visitor) {
            for (var index = 0; index < visitors.length; index++) {
                if(visitor === visitors[index].visitor) {
                    visitors.splice(index, 1);

                    return true;
                }
            }

            return false;
        };

        this.removeAll = function () {
            visitors = [];

            return true;
        };

        this.getVisitors = function () {
            var sorted = [];

            visitors.sort(function(a, b) {
                return b.priority - a.priority;
            });

            for (var i = 0; i < visitors.length; i++) {
                sorted.push(visitors[i].visitor);
            }

            return sorted;
        };

        this.visit = function (target, variables) {
            return visitorStrategy.visit(this.getVisitors(), target, variables);
        };

        return this;
    }

    $sevenTag.provider(VISITOR_MANAGER, function() {
        return VisitorManager;
    });
})(window.sevenTag, 'VisitorManager');
