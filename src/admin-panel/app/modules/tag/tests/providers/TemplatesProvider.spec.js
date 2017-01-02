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


describe('Unit: TemplatesProvider', () => {
    let templatesProvider;

    beforeEach(angular.mock.module('clearcode.tm.tag'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.tag.$template',
        ($templates) => {
            templatesProvider = $templates;
        }
    ]));

    it('should be defined', () => {
        expect(templatesProvider).toBeDefined();
    });

    describe('Function: add()', () => {
        it('should add object into providers collection', () => {
            templatesProvider.add('test_id', 'test_name');

            expect(templatesProvider.collection.length).toBe(1);
            expect(templatesProvider.collection[0].id).toBe('test_id');
        });

        it('should notify listeners', (done) => {
            templatesProvider.setListener(() => {
                done();
            });
            templatesProvider.add('test_id', 'test_name');
        });
    });

    describe('Function: get()', () => {
        it('should returns object from providers collection', () => {
            templatesProvider.add('test_id', 'test_name');
            let template = templatesProvider.get('test_id');

            expect(template.name).toBe('test_name');
        });

        it('should returns false if not found template', () => {
            let template = templatesProvider.get('fake_id');

            expect(template.name).toBeFalsy();
        });
    });

    describe('Function: getAll()', () => {
        it('should returns providers collection', () => {
            templatesProvider.add('test_id', 'test_name');
            templatesProvider.add('test_id2', 'test_name2');

            let templates = templatesProvider.getAll();

            expect(templates.length).toBe(2);
        });
    });
});
