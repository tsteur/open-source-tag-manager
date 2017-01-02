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


describe('Unit: clearcode.tm.form.ClipboardDirective', () => {
    var $compile,
        $rootScope,
        $document,
        scope,
        templateString,
        buttonTemplateString,
        parentElement,
        copyCodeButton,
        directiveElement;

    beforeEach(module('clearcode.tm.clipboard', ($provide) => {
        buttonTemplateString = '<div><button class="btn btn-copyToClipboard" clip-copy="copyToClipboard()"><i class="icon-copy"></button></div>';

        $document = [{
            getElementById: () => {}
        }];

        spyOn($document[0], 'getElementById').and.returnValue(buttonTemplateString);

        $provide.value('$document', $document);
    }));

    beforeEach(inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        templateString = '<textarea cc-clipboard></textarea>';
        directiveElement = getCompiledElement(templateString, scope);
        parentElement = directiveElement.parent();
        copyCodeButton = parentElement.find('button');
    }));

    function getCompiledElement (templateString, scope) {
        let element = angular.element(templateString),
            compiledElement = $compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    it('should wrap directive properly', () => {
        expect(parentElement.hasClass('cc-clipboard')).toBeTruthy();
    });

    it('should initially hide the copy code button', () => {
        expect(copyCodeButton.hasClass('hidden')).toBeTruthy();
    });
});
