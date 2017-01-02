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

import CreateController from './controllers/CreateController.js';
import EditController from './controllers/EditController.js';
import ManageController from './controllers/ManageController.js';

import TagResource from './resource/TagResource.js';
import Templates from './services/Templates.js';
import TemplatesProvider from './providers/TemplatesProvider.js';

const MODULE_NAME = 'clearcode.tm.tag';
const MODULE_TRIGGER = 'clearcode.tm.trigger';
const MODULE_VARIABLE = 'clearcode.tm.variable';
const MODULE_TAG_CONTAINER = 'clearcode.tm.tagContainer';
const MODULE_DIR = 'app/modules/tag';

Templates.$inject = [
    `${MODULE_NAME}.$template`
];

TagResource.$inject = [
    '$http',
    '$q'
];

ManageController.$inject = [
    'ngTableParams',
    '$stateParams',
    `${MODULE_NAME}.tagResource`,
    `${MODULE_TAG_CONTAINER}.publishedStatus`,
    'clearcode.tm.alert.alert',
    `${MODULE_TAG_CONTAINER}.paramConverter`,
    `${MODULE_TAG_CONTAINER}.currentContainer`,
    'clearcode.tm.pageInfo.pageInfo',
    '$scope',
    '$state',
    '$translate'
];

CreateController.$inject = [
    `${MODULE_NAME}.tagResource`,
    `${MODULE_TRIGGER}.triggerResource`,
    `${MODULE_VARIABLE}.variableResource`,
    '$state',
    '$stateParams',
    'clearcode.tm.alert.alert',
    '$scope',
    '$timeout',
    'ngTableParams',
    `${MODULE_TAG_CONTAINER}.paramConverter`,
    `${MODULE_TAG_CONTAINER}.currentContainer`,
    'clearcode.tm.pageInfo.pageInfo',
    `${MODULE_NAME}.templatesStorage`,
    '$translate'
];

EditController.$inject = [
    `${MODULE_NAME}.tagResource`,
    `${MODULE_TRIGGER}.triggerResource`,
    `${MODULE_VARIABLE}.variableResource`,
    '$state',
    '$stateParams',
    'clearcode.tm.alert.alert',
    '$scope',
    '$timeout',
    'ngTableParams',
    `${MODULE_TAG_CONTAINER}.paramConverter`,
    `${MODULE_TAG_CONTAINER}.currentContainer`,
    'clearcode.tm.pageInfo.pageInfo',
    `${MODULE_NAME}.templatesStorage`,
    '$translate'
];

module.exports = {MODULE_NAME};
angular
    .module(MODULE_NAME, [
        'pascalprecht.translate',
        'ui.router',
        'ngTable',
        'clearcode.tm.alert',
        'clearcode.tm.pageInfo',
        'clearcode.tm.tagContainer',
        'clearcode.tm.trigger',
        'ui.codemirror'
    ])
    .config([
        '$stateProvider',

        ($stateProvider) => {
            $stateProvider
                .state('tags', {
                    url: '/containers/{containerId}/tags',
                    controller: `${MODULE_NAME}.ManageController as view`,
                    templateUrl: `${MODULE_DIR}/views/manage.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: true
                    }
                })
                .state('tagCreate', {
                    url: '/containers/{containerId}/tag-create',
                    controller: `${MODULE_NAME}.CreateController as view`,
                    templateUrl: `${MODULE_DIR}/views/create.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: true
                    }
                })
                .state('tagEdit', {
                    url: '/containers/{containerId}/tag/edit/{tagId}',
                    controller: `${MODULE_NAME}.EditController as view`,
                    templateUrl: `${MODULE_DIR}/views/edit.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: true
                    }
                });
        }
    ])
    .run([
        'clearcode.tm.alert.$alert',

        ($alertProvider) => {
            $alertProvider.addMessagePattern(
                'trigger.close',
                'You are trying to close unsaved trigger.'
            );

            $alertProvider.addMessagePattern(
                'status.change',
                'Tag status was changed successfully'
            );

            $alertProvider.addMessagePattern(
                'status.failed',
                'Sorry, something went wrong.'
            );
        }
    ])
    .provider(`${MODULE_NAME}.$template`, TemplatesProvider)
    .controller(`${MODULE_NAME}.ManageController`, ManageController)
    .controller(`${MODULE_NAME}.CreateController`, CreateController)
    .controller(`${MODULE_NAME}.EditController`, EditController)
    .service(`${MODULE_NAME}.tagResource`, TagResource)
    .service(`${MODULE_NAME}.templatesStorage`, Templates);
