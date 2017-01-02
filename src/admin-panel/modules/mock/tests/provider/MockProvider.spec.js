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
/* global describe: false, beforeEach: false, inject: false, it: false, expect: false */

describe('Unit: clearcode.tm.mock.$mock', () => {
    beforeEach(module('clearcode.tm.mock'));

    var $injector, MockProvider, mockData;

    beforeEach(inject((_$injector_) => {
        $injector = _$injector_;
        MockProvider = $injector.get('clearcode.tm.mock.$mock');

        mockData = [
            {
                'table 0': [
                    {
                        id: 0,
                        name: 'element 0'
                    },
                    {
                        id: 1,
                        name: 'element 1'
                    }
                ]
            },
            {
                'table 1': [
                    {
                        id: 2,
                        name: 'element 2'
                    },
                    {
                        id: 3,
                        name: 'element 3'
                    }
                ]
            },
            {
                'table 2': [
                    {
                        id: 4,
                        name: 'element 4'
                    },
                    {
                        id: 5,
                        name: 'element 5'
                    }
                ]
            }
        ];
    }));

    it('should be defined', () => {
        expect(MockProvider).toBeDefined();
    });

    it('should have collection and collection copy parameters', () => {
        expect(MockProvider.collection).toBeDefined();
        expect(MockProvider.collectionCopy).toBeDefined();

        expect(Object.keys(MockProvider.collection).length).toBe(0);
        expect(Object.keys(MockProvider.collectionCopy).length).toBe(0);
    });

    it('should add table into collection object', () => {
        MockProvider.init('table 0', mockData['table 0']);
        expect(Object.keys(MockProvider.collection).length).toBe(1);

        MockProvider.init('table 1', mockData['table 1']);
        expect(Object.keys(MockProvider.collection).length).toBe(2);
    });

    describe('after copy collection', () => {
        beforeEach(() => {
            MockProvider.init('table 0', mockData['table 0']);
            MockProvider.init('table 1', mockData['table 1']);
            MockProvider.copy();
        });

        it('should create copy of collection', () => {
            expect(Object.keys(MockProvider.collectionCopy).length).toBe(2);
        });

        it('should add another element', () => {
            MockProvider.init('table 5', mockData['table 2']);
            expect(Object.keys(MockProvider.collection).length).toBe(3);
        });

        it('should restore collection', () => {
            MockProvider.restore();
            expect(Object.keys(MockProvider.collection).length).toBe(2);
        });
    });
});
