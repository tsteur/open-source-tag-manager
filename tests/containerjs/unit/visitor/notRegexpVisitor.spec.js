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

describe('Unit: not regexp visitor', function () {

    var visitor;
    var conditions = [
        {
            variable: 'domain',
            action: 'does_not_regexp',
            value: 'http://google'
        },
        {
            variable: 'domain',
            action: 'contains',
            value: 'example.com'
        },
        {
            variable: 'domain',
            action: 'does_not_regexp',
            value: 'http://example.com'
        }
    ];
    var variables = {
        domain: 'http://google.com'
    };

    beforeEach(function () {
        visitor = window.sevenTag.$injector.get('$regexpVisitor');
    });

    it('should be defined', function() {
        expect(visitor).toBeDefined();
    });

    it('accept condition regexp', function () {
        expect(visitor.accept(conditions[0], variables)).toEqual(true);
        expect(visitor.accept(conditions[1], variables)).toEqual(false);
    });

    it('visit condition not regexp', function () {
        expect(visitor.visit(conditions[0], variables)).toEqual(false);
        expect(visitor.visit(conditions[0], {})).toEqual(false);
        expect(visitor.visit(conditions[2], variables)).toEqual(true);
    });

});
