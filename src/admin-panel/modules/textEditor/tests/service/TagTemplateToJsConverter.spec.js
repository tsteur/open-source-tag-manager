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


describe('Unit: clearcode.tm.textEditor.TagTemplateToJsConverter', () => {
    var TagTemplateToJsConverter, createVariable, options;

    beforeEach(module('clearcode.tm.textEditor', () => {
        createVariable = (name) => {
            return {
                name: name
            };
        };

        options = {
            variables: []
        };
    }));

    beforeEach(inject([
        'clearcode.tm.textEditor.TagTemplateToJsConverter',
        (tagTemplateToJsConverter) => {
            TagTemplateToJsConverter = tagTemplateToJsConverter;
        }
    ]));

    it('should be defined', () => {
        expect(TagTemplateToJsConverter).toBeDefined();
    });

    describe('when calling convert method', () => {
        var convertTagTemplateTextToJSWithVariables;
        beforeEach(() => {
            convertTagTemplateTextToJSWithVariables = (lines, variables) => {
                for (var i = 0; i < variables.length; i++) {
                    options.variables.push(createVariable(variables[i]));
                }

                return TagTemplateToJsConverter.convert(lines, options);
            };
        });

        it('should check if options were provided', () => {
            var convertedTagTemplateLines = TagTemplateToJsConverter.convert(undefined, undefined)

            expect(convertedTagTemplateLines).toBe(undefined);
        });

        it('should check if variables were provided', () => {
            var convertedTagTemplateLines = TagTemplateToJsConverter.convert(undefined, {})

            expect(convertedTagTemplateLines).toBe(undefined);
        });

        it('should replace variable in single line', () => {
            var text = [
                    'aa {{ VARIABLE 1}}',
                    'bb {{VARIABLE 2 }}',
                    'cc {{ VARIABLE 3 }}',
                    'dd {{VARIABLE 4}}',
                ],
                variables = [
                    'VARIABLE 1',
                    'VARIABLE 2',
                    'VARIABLE 3',
                    'VARIABLE 4',
                ],
                convertedTagTemplateLines = convertTagTemplateTextToJSWithVariables(text, variables)

            expect(convertedTagTemplateLines[0]).toBe("aa 'VARIABLE_1'");
            expect(convertedTagTemplateLines[1]).toBe("bb 'VARIABLE_2'");
            expect(convertedTagTemplateLines[2]).toBe("cc 'VARIABLE_3'");
            expect(convertedTagTemplateLines[3]).toBe("dd 'VARIABLE_4'");
        });

        it('should replace multiple variables in lines', () => {
            var text = 'dd {{ VARIABLE 5 }}{{ VARIABLE 6 }}',
                convertedTagTemplateLines = convertTagTemplateTextToJSWithVariables([text], ['VARIABLE 5', 'VARIABLE 6']);

            expect(convertedTagTemplateLines[0]).toBe("dd 'VARIABLE_5''VARIABLE_6'");
        });

        it('should not replace any character if there is not variable in line', () => {
            var text = 'dd aaa dd a s',
                convertedTagTemplateLines = convertTagTemplateTextToJSWithVariables([text], ['VARIABLE 5', 'VARIABLE 6']);

            expect(convertedTagTemplateLines[0]).toBe(text);
        });

        it('should ignore variable parsing errors', () => {
            var text = 'var a ; {{',
                convertedTagTemplateLines = convertTagTemplateTextToJSWithVariables([text], ['VARIABLE 5', 'VARIABLE 6']);

            expect(convertedTagTemplateLines[0]).toBe(text);
        });

        it('should ignore variable tag if such variable does not exist', () => {
            var text = 'var a ; {{ some variable }}',
                convertedTagTemplateLines = convertTagTemplateTextToJSWithVariables([text], ['VARIABLE 5', 'VARIABLE 6'])

            expect(convertedTagTemplateLines[0]).toBe(text);
        });
    });
});
