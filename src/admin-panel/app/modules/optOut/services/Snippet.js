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

const  optOutOpeningComment = '<!-- Start 7Tag privacy opt-out code -->',
    optOutClosingComment = '<!-- End 7Tag privacy opt-out code -->',
    hostname = window.location.hostname;

class Snippet {
    buildSnippet (option, optInMessage, optOutMessage, message) {
        let snippet = optOutOpeningComment +
            this.buildVariablesInitialization(optInMessage, optOutMessage, option) +
            this.buildExternalScript() +
            this.buildMainMessage(message) +
            optOutClosingComment;

        return snippet;
    }

    buildVariablesInitialization (optInMessage, optOutMessage, option) {
        return '<script>window.sevenTag = window.sevenTag || {};' +
               `window.sevenTag.optedOutCheckboxText="${optOutMessage}";` +
               `window.sevenTag.optedInCheckboxText="${optInMessage}";` +
               `window.sevenTag.isGlobal=${!!option};` +
               `window.sevenTag.instanceHostname="${hostname}";</script>`;
    }

    buildExternalScript () {
        return `<script src="//${hostname}/containers/privacy/script.v2.js"></script>`;
    }

    buildMainMessage (message) {
        return '<div id="_stg_opt_out_iframe_content" style="display: none;">' +
               `<p>${message}</p>` +
               '<input id="_stg_optout_checkbox" onclick="window.parent.storeUserOptOutPreferences();" type="checkbox">' +
               '<label id="_stg_optout_checkbox_label" for="_stg_optout_checkbox"></label>' +
               '</div>';
    }
}

export default Snippet;
