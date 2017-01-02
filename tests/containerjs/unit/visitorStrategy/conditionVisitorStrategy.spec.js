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

describe('Unit: ConditionVisitorStrategy', function () {

    var conditionVisitorStrategy, visitors, addVisitor;

    beforeEach(function () {

        conditionVisitorStrategy = window.sevenTag.$injector.get('ConditionVisitorStrategy');

        visitors = [];

        addVisitor = function (acceptReturnValue, visitReturnValue) {

            var visitor = {

                accept: function () {
                    return acceptReturnValue;
                },

                visit: function () {
                    return visitReturnValue;
                }

            };

            visitors.push(visitor);
        }

    });

    it('should be defined', function () {
        expect(conditionVisitorStrategy).toBeDefined();
    });

    describe('when calling visit method', function () {

        it('should return false if there are no visitors', function () {

            var visitResult = conditionVisitorStrategy.visit(visitors, undefined, undefined);

            expect(visitResult).toBeFalsy();

        });

        it('should return false if no visitor accepts target', function () {

            addVisitor(false, true);
            addVisitor(false, true);

            var visitResult = conditionVisitorStrategy.visit(visitors, undefined, undefined);

            expect(visitResult).toBeFalsy();

        });

        it('should return false if first visitor that accepts target also returns false from the visit method', function () {

            addVisitor(false, true);
            addVisitor(true, false);
            addVisitor(true, true);

            var visitResult = conditionVisitorStrategy.visit(visitors, undefined, undefined);

            expect(visitResult).toBeFalsy();
        });

        it('should return true if first visitor that accepts target also returns true from the visit method', function () {

            addVisitor(false, true);
            addVisitor(true, true);
            addVisitor(true, false);

            var visitResult = conditionVisitorStrategy.visit(visitors, undefined, undefined);

            expect(visitResult).toBeTruthy();
        });

    })


});
