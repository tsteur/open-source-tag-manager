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

const HTML_LINT_RULES = {
    'tagname-lowercase': false,
    'attr-lowercase': false,
    'attr-value-double-quotes': false,
    'attr-value-not-empty': false,
    'attr-no-duplication': false,
    'doctype-first': false,
    'tag-pair': false,
    'tag-self-close': false,
    'spec-char-escape': false,
    'id-unique': false,
    'src-not-empty': false,
    'title-require': false,
    'head-script-disabled': false,
    'doctype-html5': false,
    'id-class-value': false,
    'style-disabled': false,
    'inline-style-disabled': false,
    'inline-script-disabled': false,
    'space-tab-mixed-disabled': false,
    'id-class-ad-disabled': false,
    'href-abs-or-rel': false,
    'attr-unsafe-chars': false,
};

const JS_LINT_RULES = {
    browser: true,
    devel: true,
    dojo: true,
    jquery: true,
    mootools: true,
    nonstandard: true,
    prototypejs: true,
    yui: true,
    bitwise: false,
    camelcase: false,
    curly: true,
    enforceall: false,
    eqeqeq: true,
    es3: false,
    es5: false,
    forin: false,
    freeze: false,
    funcscope: true,
    futurehostile: true,
    immed: false,
    latedef: false,
    nocomma: true,
    nonew: true,
    notypeof: true,
    shadow: 'inner',
    strict: false,
    sub: false,
    undef: true,
    unused: true,
    asi: true
};

/**
 * @name LintingRules
 */
class LintingRules {
    getLintingRules () {
        let jsHintRules = angular.copy(JS_LINT_RULES),
            htmlHintRules = angular.copy(HTML_LINT_RULES);

        htmlHintRules.jshint = jsHintRules;

        return htmlHintRules;
    }
}

export default LintingRules;
