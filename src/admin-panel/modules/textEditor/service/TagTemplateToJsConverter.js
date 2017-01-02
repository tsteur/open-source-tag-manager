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

const TAG_TEMPLATE_VARIABLE_START = '{{';
const TAG_TEMPLATE_VARIABLE_END = '}}';


class TagTemplateToJsConverter {
    convert (textLines, options) {
        if (!options || !options.variables) {
            return textLines;
        }

        let variables = this.getVariables(options),
            lineIdx = 0;

        while (!this.isCursorAfterTheEndOfText(textLines.length, lineIdx)) {
            let line = textLines[lineIdx],
                lineContainsVariable = line.indexOf(TAG_TEMPLATE_VARIABLE_START) !== -1;

            if (lineContainsVariable) {
                textLines[lineIdx] = this.replaceVariablesExpressions(variables, line);
            }

            ++lineIdx;
        }

        return textLines;
    }

    isCursorAfterTheEndOfText (totalLines, line) {
        return line >= totalLines
    }

    getVariables (options) {
        let variables = [];

        for (let i = 0; i < options.variables.length; i++) {
            let variable = options.variables[i],
                words = variable.name.trim().split(/\s+/),
                variableObj = {
                    name: variable.name,
                    pattern: this.createVariableSearchPattern(variable.name),
                    replacement: `'${words.join('_')}'`
                };

            variables.push(variableObj);
        }

        return variables;
    }

    createVariableSearchPattern (variableName) {
        let whitespace = '[\\s]',
            words = variableName.split(/[\s]+/),
            regexStr = words.join(`${whitespace}+`);

        regexStr = `${TAG_TEMPLATE_VARIABLE_START}${whitespace}*${regexStr}${whitespace}*${TAG_TEMPLATE_VARIABLE_END}`;

        return new RegExp(regexStr, 'g');
    }

    replaceVariablesExpressions (variables, line) {
        for (let i = 0; i < variables.length; i++) {
            let variable = variables[i];
            line = line.replace(variable.pattern, variable.replacement);
        }

        return line;
    }
}

export default TagTemplateToJsConverter;
