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


describe('Unit: Templates service', () => {
    let templatesStorage, templatesFields, templates, template;

    beforeEach(angular.mock.module('clearcode.tm.tag'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.tag.templatesStorage',
        'clearcode.tm.tag.$template',
        ($templatesStorage, $templatesProvider) => {
            $templatesProvider.add('test_1', 'Test 1')
                .addTextField({
                    test: 'test'
                })
                .addTemplateUrl('www.test.test');

            $templatesProvider.add('test_2', 'Test 2')
                .addType('testType')
                    .addTextField({
                        testTypeField: 'testTypeField'
                    });

            $templatesProvider.add('test_3', 'Test 3')
                .addType('testType')
                    .addTemplateUrl('www.test.type');

            $templatesProvider.add('test_4', 'Test 4');

            templatesStorage = $templatesStorage;
        }
    ]));

    it('should be defined', () => {
        expect(templatesStorage).toBeDefined();
    });

    describe('Function: getAll()', () => {
        it('should returns collection of Template', () => {
            templates = templatesStorage.getAll();

            expect(templates.length).toBe(4);
        });
    });

    describe('Function: get()', () => {
        it('should returns Template', () => {
            template = templatesStorage.get('test_1');

            expect(template.name).toBe('Test 1');
        });

        it('should returns false because of looking for undefind Template', () => {
            template = templatesStorage.get('fake_1');

            expect(template).toBeFalsy();
        });
    });

    describe('Function: getOptions()', () => {
        it('should returns collection of Templates fields', () => {
            templatesFields = templatesStorage.getOptions('test_1');

            expect(templatesFields.length).toBe(1);
            expect(templatesFields[0].test).toBe('test');
        });

        it('should returns collection of Type fields', () => {
            templatesFields = templatesStorage.getOptions('test_2', 'testType');

            expect(templatesFields.length).toBe(1);
            expect(templatesFields[0].testTypeField).toBe('testTypeField');
        });

        it('should returns empty array if Type isn\'t got any fields', () => {
            templatesFields = templatesStorage.getOptions('test_3', 'testType');

            expect(templatesFields.length).toBe(0);
        });

        it('should returns empty array if Template isn\'t got any fields', () => {
            templatesFields = templatesStorage.getOptions('test_4');

            expect(templatesFields.length).toBe(0);
        });

        it('should returns false if Template is undefined', () => {
            templatesFields = templatesStorage.getOptions('test_5');

            expect(templatesFields).toBeFalsy();
        });

        it('should returns false if Type is undefined', () => {
            templatesFields = templatesStorage.getOptions('test_4', 'type_8');

            expect(templatesFields).toBeFalsy();
        });
    });

    describe('Function: getTemplateUrl()', () => {
        it('should returns templateUrl', () => {
            var templateUrl = templatesStorage.getTemplateUrl('test_1');

            expect(templateUrl).toBe('www.test.test');
        });

        it('should returns false because of looking for undefind Template', () => {
            var templateUrl = templatesStorage.getTemplateUrl('fake_1');

            expect(templateUrl).toBeFalsy();
        });

        it('should returns templateUrl of Type', () => {
            var templateUrl = templatesStorage.getTemplateUrl('test_3', 'testType');

            expect(templateUrl).toBe('www.test.type');
        });
    });
});
