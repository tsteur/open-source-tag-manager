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

let StateSummary;
let TagSummary;
/**
 * @name Report
 */
class Report {
    constructor ($debugger, $StateSummary, $TagSummary, $dataLayerLimitedStack, $filter) {
        StateSummary = $StateSummary;
        TagSummary = $TagSummary;

        this.$filter = $filter;
        this.$debugger = $debugger;
        this.$dataLayerLimitedStack = $dataLayerLimitedStack;
        this.stateSummary = new StateSummary();

        let tagTree = $debugger.getTagTree();

        let tagSummary;

        for (let i = 0; i < tagTree.length; i++) {
            let tag = tagTree[i];

            tagSummary = new TagSummary();
            tagSummary.id = tag.id;
            tagSummary.name = tag.name;
            tagSummary.code = tag.code;
            tagSummary.firedTriggers = tag.triggers;
            tagSummary.disableInDebugMode = tag.disableInDebugMode;
            tagSummary.respectVisitorsPrivacy = tag.respectVisitorsPrivacy;

            this.stateSummary.addTagSummary(tagSummary);
        }

        this.updateSummary();

        $debugger.addListenerContainerStates(() => {
            this.updateSummary();
        });
    }

    /**
     * Update report summary about states
     */
    updateSummary () {
        let states = this.$debugger.getDataLayerStates(),
            tagSummary;

        while (states.length) {
            let state = states.shift();
            let tags = state.tags;
            let summary = new StateSummary();

            summary.dataLayerElement = state.dataLayerElement;
            summary.variableCollection = state.variableCollection;

            for (let i = 0; i < tags.length; i++) {
                let tag = tags[i];

                tagSummary = new TagSummary();
                tagSummary.id = tag.id;
                tagSummary.name = tag.name;
                tagSummary.code = tag.code;
                tagSummary.firedTriggers = tag.triggers;
                tagSummary.resolved = tag.resolved;
                tagSummary.disableInDebugMode = tag.disableInDebugMode;
                tagSummary.respectVisitorsPrivacy = tag.respectVisitorsPrivacy;

                summary.addTagSummary(tagSummary);

                if (tag.resolved) {
                    if (tag.id !== undefined) {
                        let resolvedTriggersIds = [];

                        for (let i = 0; i < tag.triggers.length; i++) {
                            let trigger = tag.triggers[i];

                            if (trigger.resolved) {
                                resolvedTriggersIds.push(trigger.id);
                            }
                        }

                        this.stateSummary.getTagSummary(tag.id)
                            .increaseFiredCount()
                            .markResolvedTriggers(resolvedTriggersIds);
                    }
                }
            }

            this.$dataLayerLimitedStack.push(summary);
        }
    }

    /**
     * Returns fired tags list
     *
     * @returns {Array}
     */
    getFiredTags () {
        return this.$filter('firedTags')(
            this.stateSummary
                .getTagSummaryCollection()
        );
    }

    /**
     * Returns tags which are fired but disabled
     *
     * @returns {Array}
     */
    getDisabledFiredTags () {
        return this.$filter('firedDisabledTags')(
            this.stateSummary
                .getTagSummaryCollection()
        );
    }

    /**
     * Returns not fired tags list
     *
     * @returns {*}
     */
    getNotFiredTags () {
        return this.$filter('notFiredTags')(
            this.stateSummary
                .getTagSummaryCollection()
        );
    }

    /**
     * @returns {DataLayerLimitedStack}
     */
    get dataLayerLimitedStack () {
        return this.$dataLayerLimitedStack;
    }
}

Report.$inject = [
    'stg.debugger.debugger',
    'stg.debugger.StateSummary',
    'stg.debugger.TagSummary',
    'stg.debugger.dataLayerLimitedStack',
    '$filter'
];

angular
    .module('stg.debugger')
    .service('stg.debugger.report', Report);
