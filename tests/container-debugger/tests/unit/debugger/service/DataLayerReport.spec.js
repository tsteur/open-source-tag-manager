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

describe('Unit: DataLayerReport service', () => {

    const MODULE_NAME = 'stg.debugger',
          TRIGGERS_NOT_FIRED = [],
          TRIGGERS_FIRED = [1, 2];

    let $dataLayerReport, addTagSummary, summary;

    beforeEach(module(MODULE_NAME));

    beforeEach(() => {

        summary = {
            tagSummaryCollection: []
        };

        addTagSummary = (firedTriggers, disableInDebugMode) => {
            summary.tagSummaryCollection.push({
                firedTriggers: firedTriggers,
                disableInDebugMode: disableInDebugMode
            });
        }

        inject(($injector) => {
            $dataLayerReport = $injector.get(`${MODULE_NAME}.DataLayerReport`);
        });

    });

    it('should be defined', () => {

        expect($dataLayerReport).toBeDefined();

    });

    describe('method getFiredTags', () => {

        it('should return all tags that have at least one trigger fired and are not disabled', () => {
            addTagSummary(TRIGGERS_NOT_FIRED);
            addTagSummary(TRIGGERS_FIRED);
            addTagSummary(TRIGGERS_FIRED);
            addTagSummary(TRIGGERS_FIRED, true);

            var result = $dataLayerReport.getFiredTags(summary);

            expect(result.length).toBe(2);
        });
    });

    describe('method getDisabledFiredTags', () => {

        it('should return all tags that have at least one trigger fired and are disabled', () => {
            addTagSummary(TRIGGERS_NOT_FIRED);
            addTagSummary(TRIGGERS_FIRED);
            addTagSummary(TRIGGERS_FIRED, true);
            addTagSummary(TRIGGERS_FIRED, true);

            var result = $dataLayerReport.getDisabledFiredTags(summary);

            expect(result.length).toBe(2);
        });
    });

    describe('method getNotFiredTags', () => {

        it('should return all tags that have no triggers fired', () => {
            addTagSummary(TRIGGERS_NOT_FIRED);
            addTagSummary(TRIGGERS_FIRED);
            addTagSummary(TRIGGERS_NOT_FIRED);
            addTagSummary(TRIGGERS_FIRED, true);

            var result = $dataLayerReport.getNotFiredTags(summary);

            expect(result.length).toBe(2);
        });
    });

});
