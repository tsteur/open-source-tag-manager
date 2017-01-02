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
describe('Unit: disjunction decision strategy', function () {

    var strategy;
    var manager;

    beforeEach(function () {
        manager = {
            visit: function () {
            }
        };

        spyOn(manager, 'visit').andCallFake(function (target) {

            return target % 2 === 0;

        });

        var DisjunctionDecisionStrategy = window.sevenTag.$injector.get('DisjunctionDecisionStrategy');
        strategy = new DisjunctionDecisionStrategy(manager);
    });

    it('should be defined', function () {
        expect(strategy).toBeDefined();
    });

    it('should return true if at least one visitor pass', function () {
        expect(strategy.decision([2, 4, 3], [])).toEqual(true);
    });

    it('should return false if all visitors not pass', function () {
        expect(strategy.decision([1, 7, 3], [])).toEqual(false);
    });

});
