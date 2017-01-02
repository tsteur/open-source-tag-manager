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
import ExplanationController from './controllers/ExplanationController.js';
import PermissionsController from './controllers/PermissionsController.js';
import PrivacyController from './controllers/PrivacyController.js';

import ContainerResource from './resource/ContainerResource.js';
import PermissionResource from './resource/PermissionResource.js';
import ParamConverter from './service/ParamConverter.js';
import CurrentContainer from './service/CurrentContainer.js';
import PublishedStatus from './service/PublishedStatus.js';

const MODULE_NAME = 'clearcode.tm.tagContainer';
const DEBUG_MODULE_NAME = 'clearcode.tm.debug';
const MODULE_DIR = 'app/modules/tagContainer';

ContainerResource.$inject = [
    '$http',
    '$q',
    `${DEBUG_MODULE_NAME}.websiteResource`
];

PermissionResource.$inject = [
    '$http',
    '$q'
];

CurrentContainer.$inject = [
    '$stateParams',
    `${MODULE_NAME}.containerResource`,
    'clearcode.tm.alert.alert',
    '$state',
    '$rootScope',
    '$cookieStore',
    'clearcode.tm.condition.conditionResource',
    '$translate'
];

PublishedStatus.$inject = [
    `${MODULE_NAME}.currentContainer`
];

ManageController.$inject = [
    'ngTableParams',
    '$scope',
    '$timeout',
    `${MODULE_NAME}.containerResource`,
    `${MODULE_NAME}.publishedStatus`,
    'clearcode.tm.alert.alert',
    `${MODULE_NAME}.paramConverter`,
    `${MODULE_NAME}.currentContainer`
];

CreateController.$inject = [
    `${MODULE_NAME}.containerResource`,
    '$state',
    'clearcode.tm.alert.alert',
    'clearcode.tm.pageInfo.pageInfo',
    '$translate'
];

EditController.$inject = [
    `${MODULE_NAME}.containerResource`,
    '$state',
    '$stateParams',
    'clearcode.tm.alert.alert',
    'clearcode.tm.tagContainer.currentContainer',
    'clearcode.tm.pageInfo.pageInfo',
    '$scope',
    '$translate'
];

ExplanationController.$inject = [
    `${MODULE_NAME}.containerResource`,
    '$stateParams',
    'clearcode.tm.pageInfo.pageInfo',
    'clearcode.tm.tagContainer.currentContainer',
    '$translate'
];

PermissionsController.$inject = [
    'ngTableParams',
    `${MODULE_NAME}.paramConverter`,
    `${MODULE_NAME}.currentContainer`,
    'clearcode.tm.alert.alert',
    `${MODULE_NAME}.permissionResource`
];

PrivacyController.$inject = [
    '$stateParams',
    `${MODULE_NAME}.containerResource`
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
        'clearcode.tm.user',
        DEBUG_MODULE_NAME
    ])
    .run([

        '$rootScope',
        `${MODULE_NAME}.currentContainer`,
        '$stateParams',
        'clearcode.tm.alert.$alert',

        ($rootScope, currentContainer, $stateParams, $alertProvider) => {
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

            $alertProvider.addMessagePattern(
                'success.restore',
                'Well done! Action completed successfully.'
            );

            $alertProvider.addMessagePattern(
                'container.create',
                'Container has been created successfully.'
            );

            $alertProvider.addMessagePattern(
                'container.error',
                'Sorry, something went wrong.'
            );

            $alertProvider.addMessagePattern(
                'success.publish',
                'Container has been published! Changes are now live!'
            );

            $alertProvider.addMessagePattern(
                'permissions.error',
                'Permissions can not be changed.'
            );
        }
    ])
    .config([
        '$stateProvider',

        ($stateProvider) => {
            $stateProvider
                .state('container', {
                    url: '/containers',
                    controller: `${MODULE_NAME}.ManageController as view`,
                    templateUrl: `${MODULE_DIR}/views/manage.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: false,
                        permission: [
                            'view'
                        ]
                    }
                })
                .state('containerCreate', {
                    url: '/containers-create',
                    controller: `${MODULE_NAME}.CreateController as view`,
                    templateUrl: `${MODULE_DIR}/views/create.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: false,
                        permission: [
                            'edit'
                        ]
                    }
                })
                .state('containerExplanation', {
                    url: '/containers-explanation/{containerId}',
                    controller: `${MODULE_NAME}.ExplanationController as view`,
                    templateUrl: `${MODULE_DIR}/views/explanation.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: true,
                        permission: [
                            'owner'
                        ]
                    }
                })
                .state('containerEdit', {
                    url: '/containers-edit/{containerId}',
                    controller: `${MODULE_NAME}.EditController as view`,
                    templateUrl: `${MODULE_DIR}/views/options.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: true,
                        permission: [
                            'edit'
                        ]
                    }
                });
        }
    ])
    .controller(`${MODULE_NAME}.ManageController`, ManageController)
    .controller(`${MODULE_NAME}.CreateController`, CreateController)
    .controller(`${MODULE_NAME}.EditController`, EditController)
    .controller(`${MODULE_NAME}.ExplanationController`, ExplanationController)
    .controller(`${MODULE_NAME}.PermissionsController`, PermissionsController)
    .controller(`${MODULE_NAME}.PrivacyController`, PrivacyController)
    .service(`${MODULE_NAME}.containerResource`, ContainerResource)
    .service(`${MODULE_NAME}.permissionResource`, PermissionResource)
    .service(`${MODULE_NAME}.paramConverter`, ParamConverter)
    .service(`${MODULE_NAME}.currentContainer`, CurrentContainer)
    .service(`${MODULE_NAME}.publishedStatus`, PublishedStatus);

module.exports = {MODULE_NAME};
