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

import OthersSettingsController from './controllers/OthersSettingsController.js';
import ChangePasswordController from './controllers/ChangePasswordController.js';
import ResetRequestController from './controllers/ResetRequestController.js';
import SetPasswordController from './controllers/SetPasswordController.js';

import UserResource from './resources/UserResource.js';

const MODULE_NAME = 'clearcode.tm.user';
const MODULE_DIR = 'app/modules/user';

CreateController.$inject = [
    `${MODULE_NAME}.userResource`,
    'clearcode.tm.alert.alert',
    'clearcode.tm.pageInfo.pageInfo',
    '$state',
    '$scope',
    '$translate',
    'clearcode.tm.alert.refreshAlert'
];

EditController.$inject = [
    `${MODULE_NAME}.userResource`,
    '$stateParams',
    'clearcode.tm.alert.alert',
    'clearcode.tm.pageInfo.pageInfo',
    '$state',
    '$scope',
    '$translate',
    'clearcode.tm.alert.refreshAlert',
    'clearcode.tm.security.security'
];

ManageController.$inject = [
    'ngTableParams',
    `${MODULE_NAME}.userResource`,
    'clearcode.tm.alert.alert',
    'clearcode.tm.tagContainer.paramConverter',
    'clearcode.tm.tagContainer.currentContainer',
    'clearcode.tm.pageInfo.pageInfo',
    '$translate'
];

ChangePasswordController.$inject = [
    'clearcode.tm.user.userResource',
    'clearcode.tm.alert.alert',
    '$state',
    'clearcode.tm.pageInfo.pageInfo',
    '$scope',
    '$translate'
];

OthersSettingsController.$inject = [
    'clearcode.tm.alert.alert',
    '$scope',
    '$translate',
    'clearcode.tm.translation.translation',
    '$window',
    'clearcode.tm.pageInfo.pageInfo'
];

ResetRequestController.$inject = [
    `${MODULE_NAME}.userResource`,
    'clearcode.tm.form.alertForm',
    'clearcode.tm.alert.alert',
    'clearcode.tm.pageInfo.pageInfo',
    '$translate'
];

SetPasswordController.$inject = [
    `${MODULE_NAME}.userResource`,
    '$state',
    '$stateParams',
    'clearcode.tm.alert.alert',
    'clearcode.tm.pageInfo.pageInfo',
    '$scope',
    '$translate'
];

UserResource.$inject = [
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
        'clearcode.tm.form',
        'clearcode.tm.tagContainer',
        'clearcode.tm.security'
    ])
    .run([
        'clearcode.tm.alert.$alert',

        ($alertProvider) => {
            $alertProvider.addMessagePattern(
                'user.save',
                'User account has been saved successfully.'
            );

            $alertProvider.addMessagePattern(
                'user.change_language',
                'The language has been changed'
            );

            $alertProvider.addMessagePattern(
                'password.change',
                'Your password has been changed successfully.'
            );

            $alertProvider.addMessagePattern(
                'user.invalid',
                'Sorry, something went wrong.'
            );

            $alertProvider.addMessagePattern(
                'user.reset',
                'Email with activation link has been sent.'
            );

            $alertProvider.addMessagePattern(
                'user.others',
                'Other settings has been saved successfully.'
            );
        }
    ])
    .config([
        '$stateProvider',

        ($stateProvider) => {
            $stateProvider
                .state('users', {
                    url: '/users',
                    controller: `${MODULE_NAME}.ManageController as view`,
                    templateUrl: `${MODULE_DIR}/views/manage.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: false
                    }
                })
                .state('userCreate', {
                    url: '/users-create',
                    controller: `${MODULE_NAME}.CreateController as view`,
                    templateUrl: `${MODULE_DIR}/views/create.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: false
                    }
                })
                .state('userEdit', {
                    url: '/users-edit/{userId}',
                    controller: `${MODULE_NAME}.EditController as view`,
                    templateUrl: `${MODULE_DIR}/views/edit.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: false
                    }
                })
                .state('editProfile', {
                    url: '/profile',
                    controller: `${MODULE_NAME}.EditController as view`,
                    controllerAs: 'view',
                    data: {
                        roles: ['ROLE_SUPER_ADMIN'],
                        secure: true
                    },
                    templateUrl: '/app/modules/user/views/profile.html'
                })
                .state('resetPassword', {
                    url: '/reset-password',
                    controller: `${MODULE_NAME}.ResetRequestController`,
                    controllerAs: 'view',
                    data: {
                        roles: [],
                        secure: false
                    },
                    templateUrl: '/app/modules/user/views/resetPassword.html'
                })
                .state('resetConfirm', {
                    url: '/reset-password/token/{token}',
                    controller: `${MODULE_NAME}.SetPasswordController`,
                    controllerAs: 'view',
                    data: {
                        roles: [],
                        secure: false
                    },
                    templateUrl: '/app/modules/user/views/setPassword.html'
                });
        }
    ])
    .controller(`${MODULE_NAME}.CreateController`, CreateController)
    .controller(`${MODULE_NAME}.EditController`, EditController)
    .controller(`${MODULE_NAME}.ManageController`, ManageController)
    .controller(`${MODULE_NAME}.OthersSettingsController`, OthersSettingsController)
    .controller(`${MODULE_NAME}.ChangePasswordController`, ChangePasswordController)
    .controller(`${MODULE_NAME}.ResetRequestController`, ResetRequestController)
    .controller(`${MODULE_NAME}.SetPasswordController`, SetPasswordController)
    .service(`${MODULE_NAME}.userResource`, UserResource);

module.exports = {MODULE_NAME};
