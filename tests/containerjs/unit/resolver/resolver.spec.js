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

describe('Unit: stg resolver module', function () {

    var tagTree = [
        {
            name: 'TagTreeBuilder Tag Name 1',
            code: '<code>TagTreeBuilder Tag 1</code>',
            respectVisitorsPrivacy: true,
            triggers: [
                {
                    name: 'TagTreeBuilder Trigger name 1',
                    conditions: [
                        {
                            variable: 'domain',
                            condition: 'starts_with',
                            value: 'google'
                        },
                        {
                            variable: 'path',
                            condition: 'contains',
                            value: '/search'
                        },
                        {
                            variable: 'hostname',
                            condition: 'ends_with',
                            value: '.pl'
                        }
                    ]
                }
            ]
        },
        {
            name: 'TagTreeBuilder Tag Name 2',
            code: '<code>TagTreeBuilder Tag 2</code>',
            respectVisitorsPrivacy: true,
            triggers: [
                {
                    name: 'TagTreeBuilder Trigger name 2',
                    conditions: [
                        {
                            variable: 'domain',
                            condition: 'starts_with',
                            value: 'google'
                        },
                        {
                            variable: 'path',
                            condition: 'contains',
                            value: '/search'
                        },
                        {
                            variable: 'hostname',
                            condition: 'ends_with',
                            value: '.pl'
                        }
                    ]
                }
            ]
        },
        {
            name: 'TagTreeBuilder Tag Name 2',
            code: '<code>TagTreeBuilder Tag 2</code>',
            respectVisitorsPrivacy: false,
            triggers: [
                {
                    name: 'TagTreeBuilder Trigger name 2',
                    conditions: [
                        {
                            variable: 'domain',
                            condition: 'starts_with',
                            value: 'google'
                        },
                        {
                            variable: 'path',
                            condition: 'contains',
                            value: '/search'
                        },
                        {
                            variable: 'hostname',
                            condition: 'ends_with',
                            value: '.pl'
                        }
                    ]
                }
            ]
        }
    ];

    var triggerStrategy, tagStrategy;
    var variables = {};
    var resolver;

    beforeEach(function () {
        triggerStrategy = {
            decision: function () {
            }
        };

        tagStrategy = {
            decision: function () {
            }
        };

        spyOn(triggerStrategy, 'decision').andCallFake(function (target) {

            if (target === tagTree[0].triggers) {
                return true;
            }

            return false;
        });

        spyOn(tagStrategy, 'decision').andCallFake(function (target) {
            return tagTree[0].respectVisitorsPrivacy;
        });

        var ResolverClass = window.sevenTag.$injector.get('Resolver');
        resolver = new ResolverClass(triggerStrategy, tagStrategy);
    });

    it('should be defined', function() {
        expect(resolver).toBeDefined();
    });

    it('creates spies for each requested function', function () {
        expect(triggerStrategy.decision).toBeDefined();
    });

    it('resolve tags by using by triggerStrategy', function() {

        var resolved = resolver.resolve(tagTree, variables);

        expect(resolved.length).toBe(3);
        expect(resolved[0].resolved).toBe(true);
        expect(resolved[1].resolved).toBe(false);
        expect(resolved[2].resolved).toBe(false);

        expect(tagStrategy.decision).toHaveBeenCalled();
        expect(triggerStrategy.decision).toHaveBeenCalledWith(tagTree[0].triggers, variables);
        expect(triggerStrategy.decision).toHaveBeenCalledWith(tagTree[1].triggers, variables);

    });

});
