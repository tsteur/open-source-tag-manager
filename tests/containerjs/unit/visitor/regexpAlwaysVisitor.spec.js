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

describe('Unit: regexp visitor fire all', function () {

    var visitor;
    var conditions = [
        {
            variable: 'url',
            action: 'regexp',
            value: '.*'
        },
        {
            variable: 'formId',
            action: 'regexp',
            value: '.*'
        },
        {
            variable: 'clickId',
            action: 'regexp',
            value: '.*'
        }
    ];

    beforeEach(function () {
        visitor = window.sevenTag.$injector.get('$regexpVisitor');
    });

    it('should be defined', function() {
        expect(visitor).toBeDefined();
    });

    it('visit condition regexp and pass on all pages', function () {
        expect(visitor.visit(conditions[0], { url: ''})).toEqual(true);
    });

    it('visit condition regexp and pass on all forms submissions', function () {
        expect(visitor.visit(conditions[1], { formId: ''})).toEqual(true);
    });

    it('visit condition regexp and pass on all forms submissions', function () {
        expect(visitor.visit(conditions[2], { clickId: ''})).toEqual(true);
    });

});
