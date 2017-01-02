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


describe('Unit: clearcode.tm.alert.$alert', () => {
    beforeEach(module('clearcode.tm.alert'));

    var $injector, AlertProvider, mockData;

    beforeEach(inject((_$rootScope_, _$injector_) => {
        $injector = _$injector_;
        AlertProvider = $injector.get('clearcode.tm.alert.$alert');

        mockData = [
            {
                'success-added': '%s successful added',
                'success-deleted': '%s successful deleted'
            },
            {
                'error-added': '%s error added'
            }
        ];
    }));

    it('should be defined', () => {
        expect(AlertProvider).toBeDefined();
    });

    it('should have some parameters', () => {
        expect(AlertProvider.interval).toBeDefined();
        expect(AlertProvider.interval).toBe(6000);

        expect(AlertProvider.messagePatterns).toBeDefined();
        expect(Object.keys(AlertProvider.messagePatterns).length).toBe(0);
    });

    it('should add message patterns by addMessagePattern function', () => {
        AlertProvider.addMessagePattern('success-added', '%s successful added');
        expect(Object.keys(AlertProvider.messagePatterns).length).toBe(1);

        AlertProvider.addMessagePattern('success-deleted', '%s successful deleted');
        expect(Object.keys(AlertProvider.messagePatterns).length).toBe(2);
    });

    it('should add a few messages patterns by addMessagesPattern function', () => {
        AlertProvider.addMessagesPattern(mockData);
        expect(Object.keys(AlertProvider.messagePatterns).length).toBe(3);
    });

    describe('after add some patterns', () => {
        beforeEach(() => {
            AlertProvider.addMessagesPattern(mockData);
        });

        it('should be possibility to get message pattern by getMessagePattern function', () => {
            var pattern;

            pattern = AlertProvider.getMessagePattern('success-added');
            expect(pattern).toEqual('%s successful added');
            pattern = AlertProvider.getMessagePattern('error-added');
            expect(pattern).toEqual('%s error added');
        });
    });
});
