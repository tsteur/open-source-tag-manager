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

(function(sevenTag, MODULE_NAME, SERVICE_NAME) {
    function TriggerVisitor(decisionStrategy) {
        var strategy = decisionStrategy;

        this.accept = function(target) {
            return typeof target.conditions !== 'undefined';
        };

        this.visit = function(target, variable) {
            return strategy.decision(target.conditions, variable);
        };

        return this;
    }

    sevenTag.provider(MODULE_NAME, function() {
        return TriggerVisitor;
    });

    var TriggerVisitorFactory = function(TriggerVisitorClass, $conditionDecisionStrategy) {
        return new TriggerVisitorClass($conditionDecisionStrategy);
    };

    TriggerVisitorFactory.$inject = [
        'TriggerVisitor',
        '$conditionDecisionStrategy'
    ];

    sevenTag.service(SERVICE_NAME, TriggerVisitorFactory);
})(window.sevenTag, 'TriggerVisitor', '$triggerVisitor');
