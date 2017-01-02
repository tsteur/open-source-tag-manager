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

describe('Unit: StateSummary class', () => {

    let StateSummary, TagSummary;

    beforeEach(module('stg.debugger'));

    beforeEach(inject([

        'stg.debugger.StateSummary',
        'stg.debugger.TagSummary',

        (_StateSummary_, _TagSummary_) => {
            StateSummary = _StateSummary_;
            TagSummary = _TagSummary_;
        }
    ]));

    it('should be defined', () => {

        expect(StateSummary).toBeDefined();

    });

    describe('method "getTagSummary"', () => {

        it('should be defined', () => {

            let stateSummary = new StateSummary();

            expect(stateSummary.getTagSummary).toBeDefined();

        });

        it('should return false when tag summary not exist', () => {

            let stateSummary = new StateSummary();

            expect(stateSummary.getTagSummary(12)).toBeFalsy();

        });

        it('should return tag summary when exist', () => {
            let stateSummary = new StateSummary(),
                tagSummary = new TagSummary();
            tagSummary.id = 12;
            stateSummary.tagSummaryCollection.push(tagSummary);

            expect(stateSummary.getTagSummary(12) instanceof TagSummary).toBeTruthy();
        });

    });

    describe('method "addTagSummary"', () => {

        it('should be defined', () => {
            let stateSummary = new StateSummary();

            expect(stateSummary.addTagSummary).toBeDefined();
        });

        it('should add new tag summary to state summary', () => {
            let stateSummary = new StateSummary(),
                tagSummary = new TagSummary();
            tagSummary.id = 12;

            stateSummary.addTagSummary(tagSummary);

            expect(stateSummary.getTagSummary(12)).toBe(tagSummary);
        });
    });
});
