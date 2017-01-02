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

import {MODULE_NAME as SECURITY_MODULE_NAME} from './modules/security/security.js';
import {MODULE_NAME as UPDATE_MODULE_NAME} from './modules/update/update.js';
import {MODULE_NAME as USER_MODULE_NAME} from './modules/user/user.js';
import {MODULE_NAME as CONTAINER_MODULE_NAME} from './modules/tagContainer/tagContainer.js';
import {MODULE_NAME as TAG_MODULE_NAME} from './modules/tag/tag.js';
import {MODULE_NAME as TRIGGER_MODULE_NAME} from './modules/trigger/trigger.js';
import {MODULE_NAME as VARIABLE_MODULE_NAME} from './modules/variable/variable.js';
import {MODULE_NAME as INTEGRATION_MODULE_NAME} from './modules/integration/integration.js';
import {MODULE_NAME as CONDITION_MODULE_NAME} from './modules/condition/condition.js';
import {MODULE_NAME as DEBUG_MODULE_NAME} from './modules/debug/debug.js';
import {MODULE_NAME as OPT_OUT_MODULE_NAME} from './modules/optOut/optOut.js';
import {MODULE_NAME as ALERT_MODULE_NAME} from './../modules/alert/alert.js';
import {MODULE_NAME as TRANSLATION_MODULE_NAME} from './../modules/translation/translation.js';
import {MODULE_NAME as FORM_MODULE_NAME} from './../modules/form/form.js';
import {MODULE_NAME as CONFIRM_MODULE_NAME} from './../modules/confirm/confirm.js';
import {MODULE_NAME as SANITIZE_MODULE_NAME} from './../modules/sanitize/sanitize.js';
import {MODULE_NAME as CLIPBOARD_MODULE_NAME} from './../modules/clipboard/clipboard.js';
import {MODULE_NAME as PAGEINFO_MODULE_NAME} from './../modules/pageInfo/pageInfo.js';
import {MODULE_NAME as HELPSYSTEM_MODULE_NAME} from './../modules/helpSystem/helpSystem.js';
import {MODULE_NAME as VALIDATOR_MODULE_NAME} from './../modules/validator/validator.js';
import {MODULE_NAME as TEXT_EDITOR_MODULE_NAME} from './../modules/textEditor/textEditor.js';

const MODULE_NAME = 'admin.application';

angular.module('admin.application.plugins', [
    TAG_MODULE_NAME
]);

angular.module(MODULE_NAME, [
    'pascalprecht.translate',
    'cgBusy',
    'ui.router',
    'ui.bootstrap',
    'checklist-model',
    'http-auth-interceptor',
    SECURITY_MODULE_NAME,
    UPDATE_MODULE_NAME,
    USER_MODULE_NAME,
    CONDITION_MODULE_NAME,
    TRIGGER_MODULE_NAME,
    VARIABLE_MODULE_NAME,
    INTEGRATION_MODULE_NAME,
    TAG_MODULE_NAME,
    CONTAINER_MODULE_NAME,
    OPT_OUT_MODULE_NAME,
    ALERT_MODULE_NAME,
    TRANSLATION_MODULE_NAME,
    FORM_MODULE_NAME,
    CONFIRM_MODULE_NAME,
    SANITIZE_MODULE_NAME,
    CLIPBOARD_MODULE_NAME,
    PAGEINFO_MODULE_NAME,
    HELPSYSTEM_MODULE_NAME,
    VALIDATOR_MODULE_NAME,
    DEBUG_MODULE_NAME,
    TEXT_EDITOR_MODULE_NAME,
    'ngClipboard',
    'admin.application.plugins'
])
    .run([
        '$rootScope',
        '$state',
        'clearcode.tm.alert.$alert',
        'clearcode.tm.security.security',
        'clearcode.tm.security.oauthResource',
        'clearcode.tm.security.tokenStorage',
        'authService',
        'clearcode.tm.variable.$variableForm',

        ($rootScope, $state, $alertProvider, security, OAuthResource, tokenStorage, authService, $variableFormProvider) => {
            let removeToken = false;

            $variableFormProvider
                .addType('dataLayer', {
                    templateUrl: 'app/modules/variable/views/types/dataLayer.html'
                })
                .addType('cookie', {
                    templateUrl: 'app/modules/variable/views/types/cookie.html'
                })
                .addType('constant', {
                    templateUrl: 'app/modules/variable/views/types/constant.html'
                })
                .addType('document', {
                    templateUrl: 'app/modules/variable/views/types/document.html'
                })
                .addType('random', {
                    templateUrl: 'app/modules/variable/views/types/random.html'
                })
                .addType('url', {
                    templateUrl: 'app/modules/variable/views/types/url.html'
                })
                .addType('campaign', {
                    templateUrl: 'app/modules/variable/views/types/campaign.html'
                });

            $alertProvider.addMessagePattern(
                'error.invalid',
                'Form is invalid. Please correct selected fields'
            );

            $alertProvider.addMessagePattern(
                'success.create',
                'Settings saved successfully'
            );

            $alertProvider.addMessagePattern(
                'success.edit',
                'Settings saved successfully'
            );

            $alertProvider.addMessagePattern(
                'success.remove',
                'Deleted successfully'
            );

            $rootScope.$state = $state;
            $rootScope.animateSidebarReady = false;

            $rootScope.isContainerView = () => false;

            $rootScope.$on('$stateChangeStart', (event, toState, toStateParams) => {
                $rootScope.isContainerView = () => {
                    let hasContainerList = toState.data.hasContainerList !== undefined
                        ? toState.data.hasContainerList
                        : false,
                        isAuthenticated = security.isAuthenticated();

                    if ($rootScope.animateSidebarReady === false && hasContainerList && isAuthenticated) {
                        $rootScope.animateSidebarReady = true;
                    }

                    return hasContainerList && isAuthenticated;
                };

                $rootScope.activeContainerId = toStateParams.containerId;
            });

            $rootScope.$on('event:auth-loginRequired', () => {
                let authToken = tokenStorage.getItem();

                if (removeToken || undefined !== authToken) {
                    OAuthResource.refreshToken(authToken.refreshToken).then((data) => {
                        tokenStorage.addItem(data);

                        authService.loginConfirmed('success', (config) => {
                            config.headers.Authorization = tokenStorage.getToken();

                            return config;
                        });
                    }, () => {
                        tokenStorage.removeItem();
                        authService.loginCancelled('invalid');
                        $state.go('signIn');
                    });
                }
                removeToken = !removeToken;
            });
        }
    ])
    .config([
        '$urlRouterProvider',
        'ngClipProvider',
        '$translateProvider',

        ($urlRouterProvider, ngClipProvider, $translateProvider) => {
            $urlRouterProvider.otherwise('/containers');
            ngClipProvider.setPath('ZeroClipboard.swf');
            $translateProvider.useSanitizeValueStrategy('escape');

            $translateProvider
                .useStaticFilesLoader({
                    prefix: '/api/translations/',
                    suffix: '.json'
                });

            $translateProvider.preferredLanguage('en');
            $translateProvider.useLocalStorage();
        }
    ])
    .value('cgBusyDefaults', {
        wrapperClass: 'loading'
    })
    .value('longDataFormat', 'dd MMMM yyyy')
    .value('defaultDateFormat', 'yyyy-MM-dd HH:mm')
    .filter('reverse', () => {
        return (items) => {
            return items.slice().reverse();
        };
    });

module.exports = {MODULE_NAME};
