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

let variableSelector,
    scope,
    compile;

class SelectorController {
    constructor ($compile, $scope, $variableSelector, condition) {
        compile = $compile;
        scope = $scope;
        variableSelector = $variableSelector;

        condition.allVariables().then(resp => {
            this.variables = resp;
        });
    }

    init ($element, $ngModel) {
        this.element = $element;
        this.ngModel = $ngModel;

        let listElement = compileListView();
        this.ulElement = listElement.children();

        createWrapper(this.element, listElement);
    }

    toggleVariablesList (event) {
        let elementValue = this.element.val().trim();

        this.isVariablesListVisible()
            ? this.element.val(variableSelector.removeVariablePrompt(elementValue))
            : this.element.val(variableSelector.addVariablePrompt(elementValue));

        this.ulElement.toggleClass('show');
        stopBubblingEvent(event);
    }

    addVariable (variable) {
        let elementValue = this.element.val().trim();
        this.ulElement.removeClass('show');

        this.ngModel.$setViewValue(variableSelector.selectVariable(elementValue, variable));
        this.ngModel.$render();
        this.element[0].focus();
    }

    closeVariablePrompt (event) {
        let elementValue = this.element.val().trim();

        if (!this.isVariablesListVisible()) {
            return;
        }

        this.ulElement.removeClass('show');
        this.element.val(variableSelector.removeVariablePrompt(elementValue));
        stopBubblingEvent(event);
    }

    isVariablesListVisible () {
        return this.ulElement.hasClass('show');
    }
}

function stopBubblingEvent (event) {
    event.stopPropagation();
    event.cancelBubble = true;
}

function compileListView () {
    let listTemplate = angular.element(document.getElementById('variables-list.html')).html();

    return compile(listTemplate)(scope);
}

function createWrapper (element, listElement) {
    let btnElement = compile(variableSelector.getTemplate())(scope),
        inputGroupWrapper;

    element.wrap(variableSelector.getElementWrapper());

    inputGroupWrapper = element.parent();
    inputGroupWrapper.append(btnElement);
    inputGroupWrapper.append(listElement);
}

export default SelectorController;