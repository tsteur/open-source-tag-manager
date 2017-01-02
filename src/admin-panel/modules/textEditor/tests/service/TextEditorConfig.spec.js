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


describe('Unit: clearcode.tm.textEditor.TextEditorConfig', () => {
    var TextEditorConfig, tagTemplateLinter, validateResult;

    beforeEach(module('clearcode.tm.textEditor', ($provide) => {
        validateResult = [];

        tagTemplateLinter = {
            validate: jasmine.createSpy('validate').and.returnValue(validateResult)
        };

        $provide.value('clearcode.tm.textEditor.TagTemplateLinter', tagTemplateLinter);
    }));

    beforeEach(inject([
        'clearcode.tm.textEditor.TextEditorConfig',
        (textEditorConfig) => {
            TextEditorConfig = textEditorConfig;
        }
    ]));

    it('should be defined', () => {
        expect(TextEditorConfig).toBeDefined();
    });

    describe('when call getConfig method', () => {
        it('should return config object if no overrides were provided', () => {
            var config = TextEditorConfig.getConfig();
            expect(config).toBeDefined();
        });

        it('should return config object if overrides are of incorrect type', () => {
            var config = TextEditorConfig.getConfig('config');
            expect(config).toBeDefined();
        });

        it('should return config object with overriden values if were provided', () => {
            var overrides = {
                    lineNumber: false
                },
                config = TextEditorConfig.getConfig(overrides);

            expect(config.lineNumber).toEqual(overrides.lineNumber);
        });

        it('should return config object with default values if they were not overriden', () => {
            var overrides = {
                    lineNumber: false
                },
                config = TextEditorConfig.getConfig(overrides);

            expect(config.styleActiveLine).toBeTruthy();
        });

        it('should set custom linter', () => {
            var config = TextEditorConfig.getConfig();
            config.lint.getAnnotations();
            expect(tagTemplateLinter.validate).toHaveBeenCalled();
        });
    });
});
