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

let PageInfo,
    translate,
    snippet;

const BREADCRUMB_TEXT = 'Opt-out generator',
    defaultOptOutMessage = `You can choose to opt out of being tracked by all marketing and advertising tools installed on this website. 
To make that choice, please click below to receive an opt-out cookie.`,
    defaultOptIn = 'You are currently opted in. Click here to opt out.',
    defaultOptOut = 'You are currently opted out. Click here to opt in.';

/**
 * @name GeneratorController
 */
class GeneratorController {
    /*
     * @param {PageInfo} $PageInfo
     * @param {Snippet} $snippet
     * @param {$scope} scope
     * @param {$translate} $translate
     */
    constructor (
        $PageInfo,
        $snippet,
        scope,
        $translate
    ) {
        PageInfo = $PageInfo;
        translate = $translate;
        snippet = $snippet;

        this.options = [{
            name: 'domain',
            value: 0
        }, {
            name: 'global',
            value: 1
        }];

        this.option = 0;
        this.optOutMessage = defaultOptOutMessage;
        this.optInOption = defaultOptIn;
        this.optOutOption = defaultOptOut;

        scope.$watch('view.option', () => {
            this.generateSnippet();
        });

        this.setPageInfo();

        this.generateSnippet();
    }

    setPageInfo () {
        translate([BREADCRUMB_TEXT])
            .then((translations) => {
                PageInfo.clear()
                    .add(translations[BREADCRUMB_TEXT])
                    .broadcast();
            });
    }

    generateSnippet () {
        this.snippet = snippet.buildSnippet(this.option, this.optInOption, this.optOutOption, this.optOutMessage.replace(/\n/g, '<br>'));
    }
}

export default GeneratorController;
