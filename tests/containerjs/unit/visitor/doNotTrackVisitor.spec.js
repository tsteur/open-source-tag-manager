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

describe('Unit: doNotTrack', function () {

    var target;

    describe('visitor should', function () {
       
        var doNotTrack = {
            isEnabled: function () {
                return true;
            }
        };

        target = {
            respectVisitorsPrivacy: true
        }

        var DoNotTrackVisitor = window.sevenTag.$injector.get('DoNotTrackVisitor');
        var visitor = new DoNotTrackVisitor(doNotTrack);

        it('accept visitor', function() {
            expect(visitor.visit(target)).toBeFalsy();
        });

    });

    describe('visitor should\'t', function () {
        
        var visitor 

        beforeEach(function() {
            var doNotTrack = {
                isEnabled: function () {
                    return false;
                }
            };

            var DoNotTrackVisitor = window.sevenTag.$injector.get('DoNotTrackVisitor');
            visitor = new DoNotTrackVisitor(doNotTrack);
        });

        it('accept visitor when target defined properly', function() {
            target = {
                respectVisitorsPrivacy: false
            }

            expect(visitor.visit(target)).toBeTruthy();
        });

        it('accept visitor when target undefined', function() {
            target = {}

            expect(visitor.visit(target)).toBeTruthy();
        });

    });

});
