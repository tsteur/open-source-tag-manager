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

describe('Unit: conjunction decision strategy', function () {

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

        var ConjunctionDecisionStrategy = window.sevenTag.$injector.get('ConjunctionDecisionStrategy');
        strategy = new ConjunctionDecisionStrategy(manager);
    });

    it('should be defined', function () {
        expect(strategy).toBeDefined();
    });

    it('should return true if all visitors pass', function () {
        expect(strategy.decision([2, 4, 6], [])).toEqual(true);
    });

    it('should return false if at least one visitor not pass', function () {
        expect(strategy.decision([2, 4, 3], [])).toEqual(false);
    });

});
