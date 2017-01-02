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

describe('Unit: trigger visitor', function () {

    var strategy;
    var visitor;
    var triggers = [
        {
            name: 'TagTreeBuilder Trigger name 1',
            conditions: [
                {
                    variable: 'domain',
                    action: 'starts_with',
                    value: 'google'
                }
            ]
        },
        {
            name: 'TagTreeBuilder Trigger name 2',
            conditions: [
                {
                    variable: 'domain',
                    action: 'starts_with',
                    value: 'example'
                }
            ]
        }
    ];
    var variables = {};

    beforeEach(function () {
        strategy = {
            decision: function () {
            }
        };

        spyOn(strategy, 'decision').andCallFake(function (target) {

            return target[0].value === 'google';

        });

        var TriggerVisitor = window.sevenTag.$injector.get('TriggerVisitor');
        visitor = new TriggerVisitor(strategy);
    });

    it('should be defined', function() {
        expect(visitor).toBeDefined();
    });

    it('accept conditions', function () {
        expect(visitor.accept(triggers[0])).toEqual(true);
        expect(visitor.accept({})).toEqual(false);
    });

    it('visit conditions', function () {
        expect(visitor.visit(triggers[0], variables)).toEqual(true);
        expect(visitor.visit(triggers[1], variables)).toEqual(false);

        expect(strategy.decision).toHaveBeenCalledWith(triggers[0].conditions, variables);
        expect(strategy.decision).toHaveBeenCalledWith(triggers[1].conditions, variables);

    });

});
