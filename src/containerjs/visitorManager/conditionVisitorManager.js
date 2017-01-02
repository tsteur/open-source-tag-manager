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

(function($sevenTag, MANAGER) {
    var VisitorsCollection = function() {
        return Array.prototype.slice.call(arguments);
    };

    VisitorsCollection.$inject = [
        '$containsVisitor',
        '$endsWithVisitor',
        '$equalsVisitor',
        '$regexpVisitor',
        '$startWithVisitor'
    ];

    var ConditionVisitorManagerFactory = function (VisitorManager, $visitorsCollection, $visitorStrategy) {
        var manager = new VisitorManager($visitorStrategy);

        for(var i = 0; i < $visitorsCollection.length; i++) {
            manager.add($visitorsCollection[i]);
        }

        return manager;
    };

    ConditionVisitorManagerFactory.$inject = [
        'VisitorManager',
        '$conditionVisitorManagerVisitorsCollection',
        'ConditionVisitorStrategy'
    ];

    $sevenTag.service(MANAGER + 'VisitorsCollection', VisitorsCollection);
    $sevenTag.service(MANAGER, ConditionVisitorManagerFactory);
})(window.sevenTag, '$conditionVisitorManager');
