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

describe('Unit: variable history push and get', function () {

    var variablesHistory;

    beforeEach(function () {
        variablesHistory = window.sevenTag.$injector.get('$variablesHistory');
    });

    it('should be defined', function() {
        expect(variablesHistory).toBeDefined();
    });

    it('history should have possibility to execute push and provide variable', function() {

        var contextId = '40bd001563085fc35165329ea1ff5c5ecbdbbeef';
        var variables = {
            'prop1' : 123
        };


        expect(variablesHistory.get(contextId, 'prop1')).toBeUndefined();
        variablesHistory.push(contextId, variables);
        expect(variablesHistory.get(contextId, 'prop1')).toBe(123);
    });

});
