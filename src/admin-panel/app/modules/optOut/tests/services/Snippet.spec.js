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

/* global describe: false, jasmine: false, beforeEach: false, it: false, expect: false */

describe('Unit: Snippet service', () => {
    var snippet;

    beforeEach(angular.mock.module('clearcode.tm.optOut'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.optOut.snippet',
        (_snippet_) => {
            snippet = _snippet_;
        }
    ]));

    it('should be defined', () => {
        expect(snippet).toBeDefined();
    });

    describe('when call buildOptionsInitialization method', () => {
        it('should properly render ', () => {
            let expectedSnippet = '<script>window.sevenTag = window.sevenTag || {};' +
                                  'window.sevenTag.optedOutCheckboxText="testowy";' +
                                  'window.sevenTag.optedInCheckboxText="test";' +
                                  'window.sevenTag.isGlobal=true;' +
                                  'window.sevenTag.instanceHostname="localhost";</script>',
                generatedSnippet = snippet.buildVariablesInitialization('test', 'testowy', 1);
            expect(generatedSnippet).toBe(expectedSnippet);
        });
    });

    describe('when call buildExternalScript method', () => {
        it('should properly render ', () => {
            expect(snippet.buildExternalScript())
                .toBe('<script src="//localhost/containers/privacy/script.v2.js"></script>');
        });
    });

    describe('when call buildMainMessage method', () => {
        it('should properly render ', () => {
            let expectedMainMessage = '<div id="_stg_opt_out_iframe_content" style="display: none;">' +
                  '<p>I really like to test</p>' +
                  '<input id="_stg_optout_checkbox" onclick="window.parent.storeUserOptOutPreferences();" type="checkbox">' +
                  '<label id="_stg_optout_checkbox_label" for="_stg_optout_checkbox"></label></div>',
                generatedMainMessage = snippet.buildMainMessage('I really like to test');
            expect(generatedMainMessage).toBe(expectedMainMessage);
        });
    });
});
