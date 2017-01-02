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

describe('Unit: Template entity', () => {
    let template, templateProvider;

    beforeEach(angular.mock.module('clearcode.tm.tag'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.tag.$template',
        ($template) => {
            templateProvider = $template;
        }
    ]));

    it('should create Template object with id and name defined', () => {
        template = templateProvider.add('test_1', 'test 1');

        expect(template.id).toBe('test_1');
        expect(template.name).toBe('test 1');
    });

    it('should create Template object with id defined', () => {
        template = templateProvider.add('test_1');

        expect(template.id).toBe('test_1');
        expect(template.name).not.toBeDefined();
    });

    it('should create empty Template object', () => {
        template = templateProvider.add();

        expect(template).toBeDefined();
        expect(template.id).not.toBeDefined();
        expect(template.name).not.toBeDefined();
    });

    describe('Function: addTextField', () => {
        beforeEach(() => {
            template = templateProvider.add('test_1');
        });

        it('should add field with defined options', () => {
            template.addTextField({
                name: 'id',
                label: 'Track Id',
                placeholder: 'Set track id',
                roles: {
                    required: true
                }
            });

            expect(template.fields.length).toBe(1);
        });

        it('should add field without any options', () => {
            template.addTextField();

            expect(template.fields.length).toBe(1);
            expect(template.fields[0].id).not.toBeDefined();
            expect(template.fields[0].type).toBe('text');
        });
    });

    describe('Function: addSelectField', () => {
        beforeEach(() => {
            template = templateProvider.add('test_1');
        });

        it('should add select field with defined options', () => {
            template.addSelectField({
                name: 'event',
                label: 'Event',
                placeholder: 'Set event type',
                values: [
                    {id: '1', name: 'test1'},
                    {id: '2', name: 'test2'},
                    {id: '3', name: 'test3'}
                ],
                value: 1,
                roles: {
                    required: true
                }
            });

            expect(template.fields.length).toBe(1);
        });
    });

    describe('Function: addType', () => {
        beforeEach(() => {
            template = templateProvider.add('test_1');
        });

        it('should add type and return Types object', () => {
            var type = template.addType('type_id', 'Test type');

            expect(type).toBeDefined();
            expect(template.types.length).toBe(1);
            expect(type).toEqual(jasmine.any(Object));
            expect(template.types[0].id).toBe('type_id');
        });
    });

    describe('Function: addBrand', () => {
        beforeEach(() => {
            template = templateProvider.add('test_1');
        });

        it('should add brandUrl into Template', () => {
            template.addBrand('www.test.test');

            expect(template.brandUrl).toBe('www.test.test');
        });
    });

    describe('Function: addTemplateUrl', () => {
        beforeEach(() => {
            template = templateProvider.add('test_1');
        });

        it('should add templateUrl into Template', () => {
            template.addTemplateUrl('/my-template.html');

            expect(template.templateUrl).toBe('/my-template.html');
        });
    });

    describe('Function: setSynchronous', () => {
        beforeEach(() => {
            template = templateProvider.add('test_1');
        });

        it('should set isSynchronous into Template', () => {
            template.setSynchronous(true);

            expect(template.isSynchronous).toBe(true);
        });
    });
});
