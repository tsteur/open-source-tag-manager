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

import ManageController from './controllers/ManageController.js';
import CreateController from './controllers/CreateController.js';
import EditController from './controllers/EditController.js';

import IntegrationResource from './resource/IntegrationResource.js';

const MODULE_NAME = 'clearcode.tm.integration';
const MODULE_DIR = 'app/modules/integration';

ManageController.$inject = [
    'ngTableParams',
    `${MODULE_NAME}.IntegrationResource`,
    'clearcode.tm.alert.alert',
    'clearcode.tm.tagContainer.paramConverter',
    'clearcode.tm.pageInfo.pageInfo',
    '$translate'
];

CreateController.$inject = [
    `${MODULE_NAME}.IntegrationResource`,
    'clearcode.tm.pageInfo.pageInfo',
    '$stateParams',
    'clearcode.tm.alert.alert',
    '$state',
    '$translate'
];

EditController.$inject = [
    `${MODULE_NAME}.IntegrationResource`,
    'clearcode.tm.pageInfo.pageInfo',
    '$stateParams',
    'clearcode.tm.alert.alert',
    '$state',
    '$translate'
];

IntegrationResource.$inject = [
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
        'clearcode.tm.tagContainer'
    ])
    .config([
        '$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('integration', {
                    url: '/integration',
                    controller: `${MODULE_NAME}.ManageController as view`,
                    templateUrl: `${MODULE_DIR}/views/manage.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: false
                    }
                })
                .state('integrationCreate', {
                    url: '/integration/create',
                    controller: `${MODULE_NAME}.CreateController as view`,
                    templateUrl: `${MODULE_DIR}/views/create.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: false
                    }
                })
                .state('integrationEdit', {
                    url: '/integration/{integrationId}/edit',
                    controller: `${MODULE_NAME}.EditController as view`,
                    templateUrl: `${MODULE_DIR}/views/edit.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: false
                    }
                });
        }
    ])
    .run([
        'clearcode.tm.alert.$alert',
        ($alertProvider) => {
            $alertProvider.addMessagePattern(
                'integration.close',
                'You are trying to close unsaved OAuth client.'
            );
        }
    ])
    .controller(`${MODULE_NAME}.ManageController`, ManageController)
    .controller(`${MODULE_NAME}.CreateController`, CreateController)
    .controller(`${MODULE_NAME}.EditController`, EditController)
    .service(`${MODULE_NAME}.IntegrationResource`, IntegrationResource);

module.exports = {MODULE_NAME};
