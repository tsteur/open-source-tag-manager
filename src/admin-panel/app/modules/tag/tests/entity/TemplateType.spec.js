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

/* global describe: false, jasmine: false, beforeEach: false, it: false, expect: false */

describe('Unit: TemplateType entity', () => {
    let template, type;

    beforeEach(angular.mock.module('clearcode.tm.tag'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.tag.$template',
        ($template) => {
            template = $template.add('template_id');
        }
    ]));

    it('should create Template object with id and name defined', () => {
        type = template.addType('test_1', 'test 1');

        expect(type.id).toBe('test_1');
        expect(type.name).toBe('test 1');
    });

    it('should create Template object with id defined', () => {
        type = template.addType('test_1');

        expect(type.id).toBe('test_1');
        expect(type.name).not.toBeDefined();
    });

    it('should create empty Template object', () => {
        type = template.addType();

        expect(type).toBeDefined();
        expect(type.id).not.toBeDefined();
        expect(type.name).not.toBeDefined();
    });

    describe('Function: addTextField', () => {
        beforeEach(() => {
            type = template.addType('test_1');
        });

        it('should add field with defined options', () => {
            type.addTextField({
                name: 'id',
                label: 'Track Id',
                placeholder: 'Set track id',
                roles: {
                    required: true
                }
            });

            expect(type.fields.length).toBe(1);
        });

        it('should add field without any options', () => {
            type.addTextField();

            expect(type.fields.length).toBe(1);
            expect(type.fields[0].id).not.toBeDefined();
            expect(type.fields[0].type).toBe('text');
        });
    });

    describe('Function: addTemplateUrl', () => {
        it('should add templateUrl into Template', () => {
            type = template.addType('test_1');
            type.addTemplateUrl('/my-template.html');

            expect(type.templateUrl).toBe('/my-template.html');
        });
    });
});
