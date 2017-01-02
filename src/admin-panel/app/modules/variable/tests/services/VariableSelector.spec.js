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

describe('Unit: VariableSelector', () => {
    let selector, variable;

    beforeEach(angular.mock.module('clearcode.tm.variable', () => {
        variable = {
            name: 'testVariable'
        };
    }));
    beforeEach(angular.mock.inject([
        'clearcode.tm.variable.variableSelector',
        ($selector) => {
            selector = $selector;
        }
    ]));

    describe('when call getTemplate', () => {
        it('should return selector template', () => {
            expect(selector.getTemplate()).toEqual(jasmine.any(String));
        });
    });

    describe('when call getElementWrapper', () => {
        it('should return wrappers template', () => {
            expect(selector.getElementWrapper()).toEqual(jasmine.any(String));
        });
    });

    describe('when call addVariablePrompt', () => {
        it('shouldn\'t add anything', () => {
            let element = 'test {{';
            expect(selector.addVariablePrompt(element)).toBe('test {{');
        });

        it('should add {{ if not opened', () => {
            let element = 'test';
            expect(selector.addVariablePrompt(element)).toBe('test {{');
        });
    });

    describe('when call selectVariable', () => {
        it('should add variable and close the statement', () => {
            let element = 'test {{';
            expect(selector.selectVariable(element, variable)).toBe('test {{ testVariable }}');
        });
    });

    describe('when call removeVariablePrompt', () => {
        it('should remove {{ if ended with {{ and list is opened', () => {
            let element = 'test {{';
            expect(selector.removeVariablePrompt(element)).toBe('test');
        });


        it('should\'t remove {{ if not ended with {{ and list is opened', () => {
            let element = 'test {{ test';
            expect(selector.removeVariablePrompt(element)).toBe('test {{ test');
        });
    });
});