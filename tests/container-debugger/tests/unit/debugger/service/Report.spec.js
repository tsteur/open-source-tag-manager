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

describe('Unit: Report service', () => {

    const MODULE_NAME = 'stg.debugger',
          ARTIFICIAL_ARRAY_PROPERTY = 'ARTIFICIAL_ARRAY_PROPERTY';

    const tagTree = [
        {
            id: 1,
            name: 'testTag1',
            code: '<script>console.log(1)</script>',
            triggers: [
                {
                    id: 1,
                    name: 'testTrigger1',
                    conditions: [
                        {
                            variable: 'event',
                            action: 'equals',
                            value: 'customEvent'
                        },
                        {
                            variable: 'event',
                            action: 'equals',
                            value: 'customEvent'
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'testTag2',
            code: '<script>console.log(2)</script>',
            triggers: [
                {
                    id: 1,
                    name: 'testTrigger1',
                    conditions: [
                        {
                            variable: 'event',
                            action: 'equals',
                            value: 'customEvent'
                        },
                        {
                            variable: 'event',
                            action: 'equals',
                            value: 'customEvent'
                        }
                    ]
                }
            ]
        }
    ];

    let $report, firedTagsFilterMock, notFiredTagsFilterMock;

    beforeEach(angular.mock.module(MODULE_NAME));

    beforeEach(() => {
        Array.prototype[ARTIFICIAL_ARRAY_PROPERTY] = ARTIFICIAL_ARRAY_PROPERTY;

        let $debugger = {
            getTagTree: jasmine.createSpy('getTagTree').and.returnValue(tagTree),
            getDataLayerStates: jasmine.createSpy('getDataLayerStates').and.returnValue([
                {
                    tags: [{
                        id: 1,
                        name: 'testTag1',
                        code: '<script>console.log(1)</script>',
                        resolved: true,
                        triggers: [
                            {
                                id: 1,
                                name: 'testTrigger1',
                                resolved: true,
                                conditions: [
                                    {
                                        variable: 'event',
                                        action: 'equals',
                                        value: 'customEvent',
                                        resolved: true
                                    },
                                    {
                                        variable: 'event',
                                        action: 'equals',
                                        value: 'customEvent',
                                        resolved: true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: 'testTag2',
                        code: '<script>console.log(2)</script>',
                        resolved: false,
                        triggers: [
                            {
                                id: 1,
                                name: 'testTrigger1',
                                resolved: false,
                                conditions: [
                                    {
                                        variable: 'event',
                                        action: 'equals',
                                        value: 'customEvent',
                                        resolved: true
                                    },
                                    {
                                        variable: 'event',
                                        action: 'equals',
                                        value: 'customEvent',
                                        resolved: false
                                    }
                                ]
                            }
                        ]
                    }]
                }
            ]),
            addListenerContainerStates: jasmine.createSpy('addListenerContainerStates')
        };

        firedTagsFilterMock = jasmine.createSpy('firedTags');
        notFiredTagsFilterMock = jasmine.createSpy('notFiredTags');

        angular.mock.module(($provide) => {
            $provide.value(`${MODULE_NAME}.debugger`, $debugger);
            $provide.value('firedTagsFilter', firedTagsFilterMock);
            $provide.value('notFiredTagsFilter', notFiredTagsFilterMock);
        });

        angular.mock.inject(function($injector) {
            $report = $injector.get(`${MODULE_NAME}.report`);
        });
    });

    afterEach(() => {
        delete Array.prototype[ARTIFICIAL_ARRAY_PROPERTY];
    });


    it('should be defined', () => {

        expect($report).toBeDefined();

    });

    it('should create state summary on init', () => {
        var tagSummaryCollection = $report.stateSummary.tagSummaryCollection;

        expect(tagSummaryCollection[1]).toBeDefined();
        expect(tagSummaryCollection[ARTIFICIAL_ARRAY_PROPERTY.id]).toBeUndefined();

    });

    it('should have first tag fired', () => {

        expect($report.stateSummary.getTagSummary(1).firedCount).toBe(1);

    });

    describe('method "updateSummary"', () => {

        it('should be defined', () => {

            expect($report.updateSummary).toBeDefined();

        });

        it('should update summary about state', () => {
            $report.updateSummary();

            expect($report.stateSummary.getTagSummary(1).firedCount).toBe(1);
            expect($report.stateSummary.tagSummaryCollection[ARTIFICIAL_ARRAY_PROPERTY.id]).toBeUndefined();
        });

    });

    describe('method "getFiredTags"', () => {

        it('should be defined', () => {

            expect($report.getFiredTags).toBeDefined();

        });

        it('should call firedTags filter', () => {

            $report.getFiredTags();

            expect(firedTagsFilterMock).toHaveBeenCalled();
        });

    });

    describe('method "getNotFiredTags"', () => {

        it('should be defined', () => {

            expect($report.getNotFiredTags).toBeDefined();

        });

        it('should call firedTags filter', () => {

            $report.getNotFiredTags();

            expect(notFiredTagsFilterMock).toHaveBeenCalled();
        });

    });
});
