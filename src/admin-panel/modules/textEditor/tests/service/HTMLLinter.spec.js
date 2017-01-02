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


describe('Unit: clearcode.tm.textEditor.HTMLLinter', () => {
    var HTMLLinter, $window, htmlHint, lintRules, lintResult;

    beforeEach(module('clearcode.tm.textEditor', ($provide) => {
        $window = {};
        lintResult = [1, 2];
        lintRules = {
            eqeqeq: true
        };
        htmlHint = {
            verify: jasmine.createSpy('verify').and.returnValue(lintResult)
        };

        $provide.value('$window', $window);
    }));

    beforeEach(inject([
        'clearcode.tm.textEditor.HTMLLinter',
        (htmlLinter) => {
            HTMLLinter = htmlLinter;
        }
    ]));

    it('should be defined', () => {
        expect(HTMLLinter).toBeDefined();
    });

    describe('when calling lint', () => {
        it('should check if HTMLHint is defined', () => {
            expect(HTMLLinter.lint().length).toBe(0);
        });

        it('should call verify method of HTMLHint object', () => {
            $window.HTMLHint = htmlHint;
            HTMLLinter.lint('abc', lintRules);

            expect(htmlHint.verify).toHaveBeenCalledWith('abc', lintRules);
        });

        it('should return result of HTMLHint', () => {
            $window.HTMLHint = htmlHint;
            var result = HTMLLinter.lint('abc', lintRules);

            expect(result).toBe(lintResult);
        });
    });
});
