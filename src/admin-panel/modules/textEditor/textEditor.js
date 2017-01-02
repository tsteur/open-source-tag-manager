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

import TextEditorConfig from './service/TextEditorConfig.js';
import TagTemplateLinter from './service/TagTemplateLinter.js';
import TagTemplateToJsConverter from './service/TagTemplateToJsConverter.js';
import LintingRules from './service/LintingRules.js';
import HTMLLinter from './service/HTMLLinter.js';

const MODULE_NAME = 'clearcode.tm.textEditor';

TextEditorConfig.$inject = [
    `${MODULE_NAME}.TagTemplateLinter`
];

TagTemplateLinter.$inject = [
    `${MODULE_NAME}.TagTemplateToJsConverter`,
    `${MODULE_NAME}.LintingRules`,
    `${MODULE_NAME}.HTMLLinter`
];

HTMLLinter.$inject = [
    '$window'
];


angular
    .module(MODULE_NAME, [])
    .service(`${MODULE_NAME}.LintingRules`, LintingRules)
    .service(`${MODULE_NAME}.HTMLLinter`, HTMLLinter)
    .service(`${MODULE_NAME}.TagTemplateToJsConverter`, TagTemplateToJsConverter)
    .service(`${MODULE_NAME}.TagTemplateLinter`, TagTemplateLinter)
    .service(`${MODULE_NAME}.TextEditorConfig`, TextEditorConfig)
    .run([
        '$rootScope',
        `${MODULE_NAME}.TextEditorConfig`,

        ($rootScope, TextEditorConfig) => {
            $rootScope.TextEditorConfig = TextEditorConfig;
        }]);

module.exports = {MODULE_NAME};
