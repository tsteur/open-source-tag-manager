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
    function Resolver(triggerStrategy, tagStrategy) {
        this.resolve = function (tagTree, variables) {
            var tagsResult = [];

            for (var i = 0; i < tagTree.length; i++) {
                var tag = tagTree[i];
                if(tagStrategy.decision(tag)) {
                    tag.resolved = triggerStrategy.decision(tag.triggers, variables);
                    tagsResult.push(tag);
                }
            }

            return tagsResult;
        };
    }

    sevenTag.provider(MODULE_NAME, function() {
        return Resolver;
    });

    var ResolverFactory = function($triggerDecisionStrategy, $tagDecisionStrategy, ResolverClass){
        return new ResolverClass($triggerDecisionStrategy, $tagDecisionStrategy);
    };

    ResolverFactory.$inject = [
        '$triggerDecisionStrategy',
        '$tagDecisionStrategy',
        'Resolver'
    ];

    sevenTag.service(SERVICE_NAME, ResolverFactory);
})(window.sevenTag, 'Resolver', '$resolver');
