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

describe('Unit: stg condition visitor manager module', function () {

    var ARTIFICIAL_ARRAY_PROPERTY = 'ARTIFICIAL_ARRAY_PROPERTY',
        MANAGER = '$conditionVisitorManager';

    var conditionVisitorManager, VisitorsCollection, utils;

    beforeEach(function () {
        Array.prototype[ARTIFICIAL_ARRAY_PROPERTY] = 1;

        utils = window.sevenTag.$injector.get('$utils');
        conditionVisitorManager = window.sevenTag.$injector.get(MANAGER);
        VisitorsCollection = window.sevenTag.$injector.get(MANAGER + 'VisitorsCollection');
    });

    afterEach(function () {
        Array.prototype[ARTIFICIAL_ARRAY_PROPERTY] = ARTIFICIAL_ARRAY_PROPERTY;
    });

    it('should be defined', function () {
        expect(conditionVisitorManager).toBeDefined();
    });

    it('should return manager that contains all visitors from VisitorsCollection', function () {
        var visitorsFromManager = conditionVisitorManager.getVisitors();
        expect(visitorsFromManager.length).toBe(VisitorsCollection.length);

        for(var i = 0; i < VisitorsCollection.length; i++){
            var expectedVisitor = VisitorsCollection[i];
            expect(containsVisitor(expectedVisitor)).toBeTruthy();
        }

        function containsVisitor (visitor) {
            var idx = utils.inArray(visitor, visitorsFromManager);
            return idx !== -1;
        }
    });

});
