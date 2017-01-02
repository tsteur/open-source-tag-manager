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
import EditInsideTagController from './controllers/EditInsideTagController.js';

import TriggerResource from './resource/TriggerResource.js';

const MODULE_NAME = 'clearcode.tm.trigger';
const CONDITION_MODULE_NAME = 'clearcode.tm.condition';
const MODULE_DIR = '/app/modules/trigger';

ManageController.$inject = [
    'ngTableParams',
    '$stateParams',
    `${MODULE_NAME}.triggerResource`,
    'clearcode.tm.alert.alert',
    'clearcode.tm.tagContainer.paramConverter',
    'clearcode.tm.tagContainer.currentContainer',
    'clearcode.tm.pageInfo.pageInfo',
    '$scope',
    'clearcode.tm.condition.condition',
    '$state',
    '$translate'
];

CreateController.$inject = [
    '$scope',
    `${MODULE_NAME}.triggerResource`,
    `${CONDITION_MODULE_NAME}.conditionResource`,
    '$stateParams',
    '$state',
    'clearcode.tm.alert.alert',
    'clearcode.tm.tagContainer.currentContainer',
    'clearcode.tm.condition.condition',
    'clearcode.tm.pageInfo.pageInfo',
    '$translate'
];

EditController.$inject = [
    '$scope',
    `${MODULE_NAME}.triggerResource`,
    `${CONDITION_MODULE_NAME}.conditionResource`,
    '$stateParams',
    '$state',
    'clearcode.tm.alert.alert',
    'clearcode.tm.tagContainer.currentContainer',
    'clearcode.tm.condition.condition',
    'clearcode.tm.pageInfo.pageInfo',
    '$translate'
];

EditInsideTagController.$inject = [
    '$scope',
    `${MODULE_NAME}.triggerResource`,
    `${CONDITION_MODULE_NAME}.conditionResource`,
    '$stateParams',
    'clearcode.tm.alert.alert',
    'clearcode.tm.tagContainer.currentContainer',
    'clearcode.tm.condition.condition',
    'clearcode.tm.pageInfo.pageInfo',
    '$translate'
];

TriggerResource.$inject = [
    '$http',
    '$q'
];

angular
    .module(MODULE_NAME, [
        'pascalprecht.translate',
        'ui.router',
        'ngTable',
        'clearcode.tm.alert',
        'clearcode.tm.pageInfo',
        'clearcode.tm.tagContainer',
        'clearcode.tm.condition'
    ])
    .config([
        '$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('triggers', {
                    url: '/containers/{containerId}/triggers',
                    controller: `${MODULE_NAME}.ManageController as view`,
                    templateUrl: `${MODULE_DIR}/views/manage.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: true
                    }
                })
                .state('triggerCreate', {
                    url: '/containers/{containerId}/trigger-create',
                    controller: `${MODULE_NAME}.CreateController as triggerForm`,
                    templateUrl: `${MODULE_DIR}/views/create.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: true
                    }
                })
                .state('triggerEdit', {
                    url: '/containers/{containerId}/trigger/edit/{triggerId}',
                    controller: `${MODULE_NAME}.EditController as triggerForm`,
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
                'trigger.create',
                'Trigger has been created successfully.'
            );
            $alertProvider.addMessagePattern(
                'trigger.edit',
                'Trigger has been updated successfully.'
            );
        }
    ])
    .controller(`${MODULE_NAME}.CreateController`, CreateController)
    .controller(`${MODULE_NAME}.EditController`, EditController)
    .controller(`${MODULE_NAME}.ManageController`, ManageController)
    .controller(`${MODULE_NAME}.EditInsideTagController`, EditInsideTagController)
    .service(`${MODULE_NAME}.triggerResource`, TriggerResource);

module.exports = {MODULE_NAME};
