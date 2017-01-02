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

describe('Unit: OptOutVisitor', function () {

    var optOutVisitor, optOutMock, target;

    beforeEach(function () {

        optOutMock = {
            isEnabled: function () {
            }
        };

        var OptOutVisitor = window.sevenTag.$injector.get('OptOutVisitor');
        optOutVisitor = new OptOutVisitor(optOutMock);

        target = {

            respectVisitorsPrivacy: false

        };

    });

    it('should be defined', function() {

        expect(optOutVisitor).toBeDefined();

    });

    describe('when calling visit method', function () {

        it('should return true if both optout and respectVisitorsPrivacy are disabled', function () {

            target.respectVisitorsPrivacy = false;

            spyOn(optOutMock, 'isEnabled').andCallFake(function () {
                return false;
            });

            expect(optOutVisitor.visit(target)).toBeTruthy();

        });

        it('should return true if respectVisitorsPrivacy is disabled', function () {

            target.respectVisitorsPrivacy = false;

            spyOn(optOutMock, 'isEnabled').andCallFake(function () {
                return true;
            });

            expect(optOutVisitor.visit(target)).toBeTruthy();

        });

        it('should return true if optOut is disabled', function () {

            target.respectVisitorsPrivacy = true;

            spyOn(optOutMock, 'isEnabled').andCallFake(function () {
                return false;
            });

            expect(optOutVisitor.visit(target)).toBeTruthy();

        });

        it('should return false if both optout and respectVisitorsPrivacy are enabled', function () {

            target.respectVisitorsPrivacy = true;

            spyOn(optOutMock, 'isEnabled').andCallFake(function () {
                return true;
            });

            expect(optOutVisitor.visit(target)).toBeFalsy();

        });

    });

});
