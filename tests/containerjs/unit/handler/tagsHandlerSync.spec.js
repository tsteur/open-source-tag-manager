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

describe('Unit: synchronous tags handler module', function () {

    var ARTIFICIAL_ARRAY_PROPERTY = 'ARTIFICIAL_ARRAY_PROPERTY';

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
                            variable: 'referrer',
                            condition: 'starts_with',
                            value: 'google'
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
                            variable: 'referrer',
                            condition: 'starts_with',
                            value: 'google'
                        }
                    ]
                }
            ]
        }
    ];

    var tagsHandler, $resolver, $debugger, $utils, $renderer, resolvedTags, isDebuggerEnabled, isDebuggerBreakpointEnabled;

    beforeEach(function () {
        Array.prototype[ARTIFICIAL_ARRAY_PROPERTY] = ARTIFICIAL_ARRAY_PROPERTY;

        resolvedTags = [];

        tagsHandler = window.sevenTag.$injector.get('$tagsHandlerSync');
        $resolver = window.sevenTag.$injector.get('$resolver');
        $debugger = window.sevenTag.$injector.get('$debugger');
        $utils = window.sevenTag.$injector.get('$utils');
        $renderer = window.sevenTag.$injector.get('$rendererSync');

        spyOn($resolver, 'resolve').andCallFake(function () {
            return resolvedTags;
        });

        spyOn($renderer, 'render').andCallFake(function () {});
        spyOn($debugger, 'isEnabled').andCallFake(function () {
            return isDebuggerEnabled;
        });

        spyOn($debugger.breakpoints, 'isEnabled').andCallFake(function () {
            return isDebuggerBreakpointEnabled;
        });
    });

    afterEach(function () {
        delete Array.prototype[ARTIFICIAL_ARRAY_PROPERTY];
    });

    describe('calling handle method', function () {

        it('should uses resolver to resolve the tagtree', function () {
            var layerElement = {},
                dataLayer = [layerElement];

            tagsHandler.handle(tagTree, dataLayer);

            expect($resolver.resolve).toHaveBeenCalled();
        });

        it('should render resolved tags', function () {
            var resolvedTag = $utils.clone(tagTree[0]),
                layerElement = {},
                dataLayer = [layerElement];

            resolvedTag.resolved = true;
            resolvedTags.push(resolvedTag);

            tagsHandler.handle(tagTree, dataLayer);

            expect($renderer.render).toHaveBeenCalled();
        });

        it('should not render resolved tags in debug mode if they are disabled', function () {
            isDebuggerEnabled = true;

            var resolvedTag = $utils.clone(tagTree[0]),
                layerElement = {},
                dataLayer = [layerElement];

            resolvedTag.resolved = true;
            resolvedTag.disableInDebugMode = true;
            resolvedTags.push(resolvedTag);

            tagsHandler.handle(tagTree, dataLayer);

            expect($renderer.render).not.toHaveBeenCalled();
        });

        describe('when providing datalayer event callback', function () {

            var layerElement;

            beforeEach(function () {
                layerElement = {
                    eventCallback: function () {},
                    element: {
                        onclick: 1
                    }
                };
            });

            it('should call the callback', function () {
                var dataLayer = [layerElement];

                spyOn(layerElement, 'eventCallback').andCallFake(function () {});

                tagsHandler.handle(tagTree, dataLayer);

                expect(layerElement.eventCallback).toHaveBeenCalled();
            });
        });
    });
});
