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

import DebugOptionsController from './controllers/DebugOptionsController.js';
import WebsitesController from './controllers/WebsitesController.js';
import WebsiteResource from './resource/WebsiteResource.js';

const MODULE_NAME = 'clearcode.tm.debug';
const MODULE_CONTAINER = 'clearcode.tm.tagContainer';
const MODULE_DIR = 'app/modules/debug';

WebsiteResource.$inject = [
    '$http',
    '$q'
];

WebsitesController.$inject = [
    `${MODULE_NAME}.websiteResource`,
    '$state',
    '$stateParams',
    'clearcode.tm.alert.alert',
    `${MODULE_CONTAINER}.currentContainer`,
    '$translate',
    '$scope'
];

DebugOptionsController.$inject = [
    `${MODULE_CONTAINER}.containerResource`,
    '$state',
    '$stateParams',
    `${MODULE_CONTAINER}.currentContainer`,
    'clearcode.tm.pageInfo.pageInfo',
    '$scope',
    '$translate'
];

angular
    .module(MODULE_NAME, [
        'pascalprecht.translate',
        'ui.router',
        'ngTable',
        'ngCookies',
        'clearcode.tm.condition',
        'clearcode.tm.alert',
        'clearcode.tm.pageInfo',
        'clearcode.tm.user'
    ])
    .run([
        '$rootScope',
        `${MODULE_CONTAINER}.currentContainer`,
        '$stateParams',
        ($rootScope, currentContainer, $stateParams) => {
            $rootScope.currentContainerLoading = true;
            $rootScope.currentContainer = currentContainer;

            var loadContainer = (containerId) => {
                if (containerId !== $stateParams.containerId) {
                    let currentContainerPromise = currentContainer.get(containerId);

                    currentContainerPromise.then((container) => {
                        $rootScope.$broadcast('pageInfo.reload', container);
                    });
                }
            };

            $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
                loadContainer(toParams.containerId);
            });
        }
    ])
    .config([
        '$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state('debug', {
                    url: '/containers/{containerId}/debug',
                    controller: `${MODULE_NAME}.DebugOptionsController as view`,
                    templateUrl: `${MODULE_DIR}/views/options.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: true,
                        permission: [
                            'view'
                        ]
                    }
                });
        }
    ])
    .controller(`${MODULE_NAME}.DebugOptionsController`, DebugOptionsController)
    .controller(`${MODULE_NAME}.WebsitesController`, WebsitesController)
    .service(`${MODULE_NAME}.websiteResource`, WebsiteResource);

module.exports = {MODULE_NAME};
