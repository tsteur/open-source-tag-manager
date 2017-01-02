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

const template = `
    <span class="input-group-addon" ng-click="selectorCtrl.toggleVariablesList($event)" style="cursor: pointer;">
        <i class="icon-variable-insert"></i>
    </span>`;

const elementWrapper = '<div class="input-group cc-select"></div>';

/**
 * @name VariableSelector
 */
class VariableSelector {
    getTemplate () {
        return template;
    }

    getElementWrapper () {
        return elementWrapper;
    }

    addVariablePrompt (elementValue) {
        let text = !isVariablePromptOpen(elementValue)
            ? openVariablePrompt(elementValue)
            : elementValue;

        return text;
    }

    selectVariable (elementValue, variable) {
        return `${elementValue} ${variable.name} }}`.trim();
    }

    removeVariablePrompt (elementValue) {
        return isVariablePromptOpen(elementValue)
            ? removeVariablePrompt(elementValue)
            : elementValue;
    }

    static selectorFactory () {
        return new VariableSelector();
    }
}

function isVariablePromptOpen (elementValue) {
    return elementValue.slice(-2) === '{{';
}

function openVariablePrompt (elementValue) {
    return `${elementValue} {{`.trim();
}

function removeVariablePrompt (elementValue) {
    return elementValue.substring(0, elementValue.length - 2).trim();
}
export default VariableSelector;
