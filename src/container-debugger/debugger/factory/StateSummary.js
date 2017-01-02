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
 * @name StateSummary
 */
class StateSummary {
    constructor () {
        this.tagSummaryCollection = [];
        this.dataLayerElement = undefined;
        this.variableCollection = undefined;
    }

    /**
     * Add tag summary to state summary
     *
     * @param {number} id
     * @param {TagSummary} tagSummary
     */
    addTagSummary (tagSummary) {
        this.tagSummaryCollection.push(tagSummary);
        return tagSummary.id;
    }

    /**
     * Get tag summary
     *
     * @param {number} id
     * @returns {TagSummary|Boolean} tagSummary
     */
    getTagSummary (id) {
        let result = false;
        for (var i = 0; i < this.tagSummaryCollection.length; i++) {
            let tagSummary = this.tagSummaryCollection[i];
            if (tagSummary.id === id) {
                result = tagSummary;
            }
        }
        return result;
    }

    /**
     * @returns {StateSummary.tagSummaryCollection}
     */
    getTagSummaryCollection () {
        return this.tagSummaryCollection;
    }
}

angular
    .module('stg.debugger')
    .value('stg.debugger.StateSummary', StateSummary);
