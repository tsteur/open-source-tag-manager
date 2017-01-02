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

/**
 * @name DataLayerReport
 */
class DataLayerReport {
    getFiredTags (summary) {
        let tags = [];

        for (let i = 0; i < summary.tagSummaryCollection.length; i++) {
            let tagSummary = summary.tagSummaryCollection[i];

            if (tagSummary.firedTriggers.length > 0 && !tagSummary.disableInDebugMode) {
                tags.push(tagSummary);
            }
        }

        return tags;
    }

    getDisabledFiredTags (summary) {
        let tags = [];

        for (let i = 0; i < summary.tagSummaryCollection.length; i++) {
            let tagSummary = summary.tagSummaryCollection[i];

            if (tagSummary.firedTriggers.length > 0 && tagSummary.disableInDebugMode) {
                tags.push(tagSummary);
            }
        }

        return tags;
    }

    getNotFiredTags (summary) {
        let tags = [];

        for (let i = 0; i < summary.tagSummaryCollection.length; i++) {
            let tagSummary = summary.tagSummaryCollection[i];

            if (tagSummary.firedTriggers.length === 0) {
                tags.push(tagSummary);
            }
        }

        return tags;
    }
}

DataLayerReport.$inject = [];

angular
    .module('stg.debugger')
    .service('stg.debugger.DataLayerReport', DataLayerReport);
