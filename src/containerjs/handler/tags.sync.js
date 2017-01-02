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
'use strict';

var SYNC_EVENT = '_stg_sync_event';

(function (sevenTag, MODULE_NAME) {
    var TagsHandler = function ($utils, $variablesManager, $resolver, $debugger, $renderer, $localStorage) {
        this.handle = function (tagTree, dataLayer) {
            while (dataLayer.length > 0) {
                var dataLayerElement = dataLayer.shift(),
                    state = {
                        dataLayer: dataLayerElement
                    },
                    contextId = $utils.guid();

                var variableCollection = $variablesManager.handle(state, contextId),
                    tags = $resolver.resolve(tagTree, variableCollection);

                var debuggerEventObject = {
                    'dataLayerElement': $utils.clone(dataLayerElement),
                    'variableCollection': $utils.clone(variableCollection),
                    'tags': tags
                };

                try {
                    $localStorage.setItem(SYNC_EVENT, JSON.stringify(debuggerEventObject));
                } catch (ex) {}

                var atLeastOneTagResolved = false;

                for (var i = 0; i < tags.length; i++) {
                    var tag = tags[i];

                    if (tag.resolved) {
                        if ($debugger.isEnabled() && tag.disableInDebugMode) {
                            continue;
                        }

                        atLeastOneTagResolved = true;
                        $renderer.render(tag, variableCollection, contextId);
                    }
                }

                if (dataLayerElement.eventCallback) {
                    dataLayerElement.eventCallback(dataLayerElement, atLeastOneTagResolved, $debugger.breakpoints.isEnabled());
                }
            }
        };

        return this;
    };

    TagsHandler.$inject = [
        '$utils',
        '$variablesManager',
        '$resolver',
        '$debugger',
        '$rendererSync',
        '$localStorage'
    ];

    sevenTag.service(MODULE_NAME, TagsHandler);
})(window.sevenTag, '$tagsHandlerSync');
