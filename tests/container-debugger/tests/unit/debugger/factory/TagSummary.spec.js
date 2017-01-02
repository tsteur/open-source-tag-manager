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

describe('Unit: TagSummary class', () => {

    let ARTIFICIAL_ARRAY_PROPERTY = 'ARTIFICIAL_ARRAY_PROPERTY';

    let TagSummary;

    beforeEach(module('stg.debugger'), () => {
        Array.prototype[ARTIFICIAL_ARRAY_PROPERTY] = ARTIFICIAL_ARRAY_PROPERTY;
    });

    beforeEach(inject([

        'stg.debugger.TagSummary',

        (_TagSummary_) => {
            TagSummary = _TagSummary_;
        }
    ]));

    afterEach(() => {
        delete Array.prototype[ARTIFICIAL_ARRAY_PROPERTY];
    });

    it('should be defined', () => {

        expect(TagSummary).toBeDefined();

    });

    describe('method "name"', () => {

        it('should be defined', () => {

            let tagSummary = new TagSummary();

            expect(tagSummary.name).toBeDefined();

        });
    });

    describe('method "code"', () => {

        it('should be defined', () => {

            let tagSummary = new TagSummary();

            expect(tagSummary.code).toBeDefined();

        });
    });

    describe('method "firedCount"', () => {

        it('should be defined', () => {

            let tagSummary = new TagSummary();

            expect(tagSummary.firedCount).toBeDefined();

        });

        it('should return 0 when tag not fired', () => {

            let tagSummary = new TagSummary();

            expect(tagSummary.firedCount).toBe(0);

        });

    });

    describe('method "firedTriggers"', () => {

        var firedTriggers;

        beforeEach(() => {
            firedTriggers = [
                {
                    conditions: [
                        {
                            action: 'equals',
                            resolved: true,
                            value: 'stg.pageView',
                            variable: 'event'
                        }
                    ],
                    id: 974,
                    name: 'All Pages',
                    resolved: false
                },
                {
                    conditions: [
                        {
                            action: 'equals',
                            resolved: true,
                            value: 'stg.click',
                            variable: 'event'
                        }
                    ],
                    id: 975,
                    name: 'Click',
                    resolved: false
                }
            ]
        });

        it('should be defined', () => {
            let tagSummary = new TagSummary();

            expect(tagSummary.firedTriggers).toBeDefined();
        });

        it('should return empty array when none of trigged resolved', () => {
            let tagSummary = new TagSummary();

            tagSummary.firedTriggers = firedTriggers;

            expect(tagSummary.firedTriggers.length).toBe(0);

        });

        it('should return 2 elements when all triggers resolved', () => {
            let tagSummary = new TagSummary();

            firedTriggers[0].resolved = true;
            firedTriggers[1].resolved = true;

            tagSummary.firedTriggers = firedTriggers;

            expect(tagSummary.firedTriggers.length).toBe(2);

        });
    });

    describe('method "notFiredTriggers"', () => {

        var triggers;

        beforeEach(() => {
            triggers = [
                {
                    conditions: [
                        {
                            action: 'equals',
                            resolved: true,
                            value: 'stg.pageView',
                            variable: 'event'
                        }
                    ],
                    id: 974,
                    name: 'All Pages',
                    resolved: false
                },
                {
                    conditions: [
                        {
                            action: 'equals',
                            resolved: true,
                            value: 'stg.click',
                            variable: 'event'
                        }
                    ],
                    id: 975,
                    name: 'Click',
                    resolved: false
                }
            ]
        });

        it('should be defined', () => {
            let tagSummary = new TagSummary();

            expect(tagSummary.notFiredTriggers).toBeDefined();
        });

        it('should return empty array when all triggers resolved', () => {
            let tagSummary = new TagSummary();

            triggers[0].resolved = true;
            triggers[1].resolved = true;

            tagSummary.firedTriggers = triggers;

            expect(tagSummary.notFiredTriggers.length).toBe(0);

        });

        it('should return 2 elements when none of the triggers resolved', () => {
            let tagSummary = new TagSummary();

            tagSummary.firedTriggers = triggers;

            expect(tagSummary.notFiredTriggers.length).toBe(2);

        });
    });

    describe('method "increaseFiredCount"', () => {

        it('should be defined', () => {

            let tagSummary = new TagSummary();

            expect(tagSummary.increaseFiredCount).toBeDefined();

        });

        it('should increase firedCount by 1', () => {

            let tagSummary = new TagSummary();

            tagSummary.increaseFiredCount();

            expect(tagSummary.firedCount).toBe(1);
        });

    });

    describe('should check if tag fired more than once', () => {

        it('should return false when not fired', () => {

            let tagSummary = new TagSummary();

            expect(tagSummary.isFiredMoreThenOnce()).toBeFalsy();

        });

        it('should return false when fired less then two', () => {

            let tagSummary = new TagSummary();

            tagSummary.increaseFiredCount();

            expect(tagSummary.isFiredMoreThenOnce()).toBeFalsy();

        });

        it('should return true when fired two times', () => {

            let tagSummary = new TagSummary();

            tagSummary.increaseFiredCount();
            tagSummary.increaseFiredCount();

            expect(tagSummary.isFiredMoreThenOnce()).toBeTruthy();

        });

    });

    describe('should check if tag fired once', () => {

        it('should return false when not fired', () => {

            let tagSummary = new TagSummary();

            expect(tagSummary.isFiredOnce()).toBeFalsy();

        });

        it('should return true when fired once', () => {

            let tagSummary = new TagSummary();

            tagSummary.increaseFiredCount();

            expect(tagSummary.isFiredOnce()).toBeTruthy();

        });

        it('should return true when fired once but disabled', () => {

            let tagSummary = new TagSummary();

            tagSummary.increaseFiredCount();
            tagSummary.disableInDebugMode = true;

            expect(tagSummary.isFiredOnce()).toBeFalsy();

        });

        it('should return false when fired two times', () => {

            let tagSummary = new TagSummary();

            tagSummary.increaseFiredCount();
            tagSummary.increaseFiredCount();

            expect(tagSummary.isFiredOnce()).toBeFalsy();

        });

    });

    describe('should check if tag fired', () => {

        it('should return false when not fired', () => {

            let tagSummary = new TagSummary();

            expect(tagSummary.isFired()).toBeFalsy();

        });

        it('should return true when fired once', () => {

            let tagSummary = new TagSummary();

            tagSummary.increaseFiredCount();

            expect(tagSummary.isFired()).toBeTruthy();

        });

        it('should return true when fired once but disabled', () => {

            let tagSummary = new TagSummary();

            tagSummary.increaseFiredCount();
            tagSummary.disableInDebugMode = true;

            expect(tagSummary.isFired()).toBeFalsy();

        });

        it('should return false when fired two times', () => {

            let tagSummary = new TagSummary();

            tagSummary.increaseFiredCount();
            tagSummary.increaseFiredCount();

            expect(tagSummary.isFired()).toBeTruthy();

        });

    });

    describe('should check if tag disabled', () => {

        it('should return false when not disabled', () => {

            let tagSummary = new TagSummary();

            expect(tagSummary.isDisabled()).toBeFalsy();

        });

        it('should return true when disabled', () => {

            let tagSummary = new TagSummary();
            tagSummary.disableInDebugMode = true;

            expect(tagSummary.isDisabled()).toBeTruthy();

        });

    });

    describe('should check if tag respect visitors privacy', () => {

        it('should return true when DNT enabled and tag respects visitors privacy', () => {

            let doNotTrack = true;
            let tagSummary = new TagSummary();

            tagSummary.respectVisitorsPrivacy = true;

            expect(tagSummary.isRespectVisitorsPrivacy(doNotTrack)).toBeTruthy();

        });

        it('should return true when DNT enabled and tag doesn\'t respects visitors privacy', () => {

            let doNotTrack = true;
            let tagSummary = new TagSummary();

            tagSummary.respectVisitorsPrivacy = false;

            expect(tagSummary.isRespectVisitorsPrivacy(doNotTrack)).toBeFalsy();

        });

        it('should return true when DNT disabled and tag respects visitors privacy', () => {

            let doNotTrack = false;
            let tagSummary = new TagSummary();

            tagSummary.respectVisitorsPrivacy = true;

            expect(tagSummary.isRespectVisitorsPrivacy(doNotTrack)).toBeFalsy();

        });

    });

});
