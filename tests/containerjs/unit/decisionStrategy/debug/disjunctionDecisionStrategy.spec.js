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
describe('Unit: debug disjunction decision strategy', function () {

    var strategy;
    var manager;

    beforeEach(function () {
        manager = {
            visit: function () {
            }
        };

        spyOn(manager, 'visit').andCallFake(function (target) {

            return target.value % 2 === 0;

        });

        var DisjunctionDecisionStrategyDebug = window.sevenTag.$injector.get('DisjunctionDecisionStrategyDebug');
        strategy = new DisjunctionDecisionStrategyDebug(manager);
    });

    it('should be defined', function () {
        expect(strategy).toBeDefined();
    });

    it('should return true if at least one visitor pass', function () {
        var collection = [
            {value: 2},
            {value: 4},
            {value: 3}
        ];

        expect(strategy.decision(collection, [])).toEqual(true);
        expect(collection[0].resolved).toEqual(true);
        expect(collection[1].resolved).toEqual(true);
        expect(collection[2].resolved).toEqual(false);
    });

    it('should return false if all visitors not pass', function () {
        var collection = [
            {value: 1},
            {value: 7},
            {value: 3}
        ];

        expect(strategy.decision(collection, [])).toEqual(false);
        expect(collection[0].resolved).toEqual(false);
        expect(collection[1].resolved).toEqual(false);
        expect(collection[2].resolved).toEqual(false);
    });

});
