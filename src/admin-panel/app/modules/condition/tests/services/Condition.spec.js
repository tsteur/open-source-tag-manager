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

describe('Unit: Condition service', () => {
    var CONDITION_MODULE_NAME = 'clearcode.tm.condition',
        condition,
        conditionResource,
        CONTAINER_ID = 1,
        injector,
        conditions = [
            {
                type: 0,
                name: 'Page View',
                actions: [
                    {
                        type: 'contains',
                        name: 'Contains'
                    },
                    {
                        type: 'not_contains',
                        name: 'Not contains'
                    },
                    {
                        type: 'start_with',
                        name: 'Start with'
                    },
                    {
                        type: 'ends_with',
                        name: 'End with'
                    },
                    {
                        type: 'equals',
                        name: 'Equals'
                    },
                    {
                        type: 'not_equals',
                        name: 'Not equals'
                    },
                    {
                        type: 'regexp',
                        name: 'Regexp'
                    },
                    {
                        type: 'not_start_with',
                        name: 'Doesn\'t start with'
                    },
                    {
                        type: 'not_ends_with',
                        name: 'Doesn\'t end with'
                    },
                    {
                        type: 'not_regexp',
                        name: 'Regexp not equals'
                    }
                ],
                variables: [
                    {
                        type: 'url',
                        name: 'Page Url',
                        options: {
                            required: false
                        }
                    },
                    {
                        type: 'path',
                        name: 'Page Path',
                        options: {
                            required: false
                        }
                    },
                    {
                        type: 'hostname',
                        name: 'Page Hostname',
                        options: {
                            required: false
                        }
                    },
                    {
                        type: 'referer',
                        name: 'Referer',
                        options: {
                            required: false
                        }
                    }
                ]
            },
            {
                type: 2,
                name: 'Event',
                actions: [
                    {
                        type: 'contains',
                        name: 'Contains'
                    },
                    {
                        type: 'not_contains',
                        name: 'Not contains'
                    },
                    {
                        type: 'start_with',
                        name: 'Start with'
                    },
                    {
                        type: 'ends_with',
                        name: 'End with'
                    },
                    {
                        type: 'equals',
                        name: 'Equals'
                    },
                    {
                        type: 'not_equals',
                        name: 'Not equals'
                    },
                    {
                        type: 'regexp',
                        name: 'Regexp'
                    },
                    {
                        type: 'not_start_with',
                        name: 'Doesn\'t start with'
                    },
                    {
                        type: 'not_ends_with',
                        name: 'Doesn\'t end with'
                    },
                    {
                        type: 'not_regexp',
                        name: 'Regexp not equals'
                    }
                ],
                variables: [
                    {
                        type: 'event',
                        name: 'Event',
                        options: {
                            required: true
                        }
                    },
                    {
                        type: 'url',
                        name: 'Page Url',
                        options: {
                            required: false
                        }
                    },
                    {
                        type: 'path',
                        name: 'Page Path',
                        options: {
                            required: false
                        }
                    },
                    {
                        type: 'hostname',
                        name: 'Page Hostname',
                        options: {
                            required: false
                        }
                    },
                    {
                        type: 'referer',
                        name: 'Referer',
                        options: {
                            required: false
                        }
                    }
                ]
            },
            {
                type: 3,
                name: 'Test type',
                actions: [
                    {
                        type: 'contains',
                        name: 'Contains'
                    },
                    {
                        type: 'not_contains',
                        name: 'Not contains'
                    },
                    {
                        type: 'start_with',
                        name: 'Start with'
                    },
                    {
                        type: 'ends_with',
                        name: 'End with'
                    },
                    {
                        type: 'equals',
                        name: 'Equals'
                    },
                    {
                        type: 'not_equals',
                        name: 'Not equals'
                    },
                    {
                        type: 'regexp',
                        name: 'Regexp'
                    },
                    {
                        type: 'not_start_with',
                        name: 'Doesn\'t start with'
                    },
                    {
                        type: 'not_ends_with',
                        name: 'Doesn\'t end with'
                    },
                    {
                        type: 'not_regexp',
                        name: 'Regexp not equals'
                    }
                ],
                variables: [
                    {
                        type: 'event',
                        name: 'Event',
                        options: {
                            required: true
                        }
                    },
                    {
                        type: 'url',
                        name: 'Page Url',
                        options: {
                            required: false
                        }
                    },
                    {
                        type: 'path',
                        name: 'Page Path',
                        options: {
                            required: false
                        }
                    },
                    {
                        type: 'hostname',
                        name: 'Page Hostname',
                        options: {
                            required: false
                        }
                    },
                    {
                        type: 'referer',
                        name: 'Referer',
                        options: {
                            required: false
                        }
                    },
                    {
                        type: 'test',
                        name: 'Test',
                        options: {
                            required: false
                        }
                    }
                ]
            }
        ];

    beforeEach(angular.mock.module(CONDITION_MODULE_NAME));

    beforeEach(angular.mock.inject([
        '$injector',
        '$httpBackend',
        'clearcode.tm.tagContainer.currentContainer',
        (_$injector_, $httpBackend, currentContainer) => {
            injector = _$injector_;
            spyOn(currentContainer, 'getId').and.returnValue(CONTAINER_ID);
            $httpBackend.whenGET(/\/api\/containers\/(.*)\/conditions/).respond(conditions);

            condition = injector.get(`${CONDITION_MODULE_NAME}.condition`);
        }
    ]));

    it('should have Condition defined', () => {
        expect(condition).toBeDefined();
    });

    describe(' allVariables() method', () => {
        it('should have properly merged response', () => {
            condition.allVariables().then((resp) => {
                expect(resp.length).toBe(6);
            });
        });
    });

    describe(' getArrayOfTypes() method', () => {
        it('should have 3 types of condtions', () => {
            condition.getArrayOfTypes().then((resp) => {
                expect(resp.length).toBe(3);
            });
        });

        it('should index elements properly', () => {
            condition.getArrayOfTypes().then((resp) => {
                expect(resp[1]).toBe(undefined);
            });
        });
    });

    describe('getVariables(type) method', () => {
        it('should return all four conditions from Page View trigger', () => {
            condition.getVariables(0).then((resp) => {
                expect(resp.length).toBe(4);
            });
        });

        it('should not return all conditions from Event trigger', () => {
            condition.getVariables(2).then((resp) => {
                expect(resp.length).not.toBe(conditions[1].variables.length);
            });
        });
    });

    describe('getRequired(type) method', () => {
        it('should not return any conditions from Page View trigger', () => {
            condition.getRequired(0).then((resp) => {
                expect(resp.length).toBe(0);
            });
        });

        it('should return only one condition from Event trigger', () => {
            condition.getRequired(2).then((resp) => {
                expect(resp.length).toBe(1);
            });
        });
    });

    describe('getActions(type) method', () => {
        it('should return all 10 actions', () => {
            condition.getActions(0).then((resp) => {
                expect(resp.length).toBe(10);
            });
        });
    });

    describe('refresh() method', () => {
        beforeEach(inject([
            `${CONDITION_MODULE_NAME}.conditionResource`,
            ($conditionResource) => {
                conditionResource = $conditionResource;

                spyOn(conditionResource, 'query').and.callFake((parameter) => {
                    return parameter;
                });
            }
        ]));

        it('should call query method from conditionResource', () => {
            condition.refresh();

            expect(conditionResource.query).toHaveBeenCalledWith(CONTAINER_ID);
        });
    });
});
