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

const DEFAULT_CONFIG = {
    mode: {
        name: 'htmlmixed'
    },
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: 'stg',
    gutters: ['CodeMirror-lint-markers'],
    lint: {}
};

/**
 * @name TextEditorConfig
 */
class TextEditorConfig {
  /**
   * @param {TagTemplateLinter} tagTemplateLinter
   */
    constructor (tagTemplateLinter) {
        this.tagTemplateLinter = tagTemplateLinter;
    }

    /**
     * @param {Object} configOverrides
     *
     * @return {Object}
     */
    getConfig (configOverrides) {
        var overrides = angular.isObject(configOverrides) ? configOverrides : {},
            cfg = angular.extend({}, DEFAULT_CONFIG, overrides);

        cfg.lint.getAnnotations = (value, opt, cm) => {
            return this.tagTemplateLinter.validate(value, opt, cm)
        };

        return cfg;
    }
}

export default TextEditorConfig;
