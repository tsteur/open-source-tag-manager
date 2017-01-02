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

import LoginController from './controller/LoginController.js';

import Authorization from './service/Authorization.js';
import Security from './service/Security.js';
import OAuthResource from './resource/OAuthResource.js';
import TokenStorage from './service/TokenStorage.js';
import securityInterceptor from './interceptor/SecurityInterceptor.js';
import localeInterceptor from './interceptor/LocaleInterceptor.js';
import deleteRequestInterceptor from './interceptor/DeleteRequestInterceptor.js';

const MODULE_NAME = 'clearcode.tm.security';

Authorization.$inject = [
    `${MODULE_NAME}.security`,
    '$state'
];

Security.$inject = [
    '$q',
    '$timeout',
    `${MODULE_NAME}.tokenStorage`,
    'clearcode.tm.user.userResource',
    `${MODULE_NAME}.oauthResource`,
    '$translate'
];

OAuthResource.$inject = [
    '$http',
    '$q',
    `${MODULE_NAME}.tokenStorage`,
    'OAuthClientSettings'
];

LoginController.$inject = [
    `${MODULE_NAME}.oauthResource`,
    `${MODULE_NAME}.tokenStorage`,
    '$state',
    'clearcode.tm.form.alertForm',
    'clearcode.tm.pageInfo.pageInfo'
];

securityInterceptor.$inject = [
    '$q',
    `${MODULE_NAME}.tokenStorage`,
    '$injector'
];

TokenStorage.$inject = [
    '$localStorage'
];

localeInterceptor.$inject = [
    '$window'
];

deleteRequestInterceptor.$inject = [
    '$q',
    '$rootScope',
    '$injector'
];

angular
    .module(MODULE_NAME, [
        'pascalprecht.translate',
        'ui.router',
        'clearcode.tm.alert',
        'clearcode.tm.tagContainer',
        'clearcode.tm.user',
        'clearcode.tm.pageInfo',
        'clearcode.tm.form',
        'clearcode.tm.update'
    ])
    .config([
        '$stateProvider',
        '$httpProvider',

        ($stateProvider, $httpProvider) => {
            $httpProvider.interceptors.push(`${MODULE_NAME}.securityInterceptor`);
            $httpProvider.interceptors.push(`${MODULE_NAME}.deleteRequestInterceptor`);
            $httpProvider.interceptors.push(`${MODULE_NAME}.localeInterceptor`);

            $stateProvider
                .state('signIn', {
                    url: '/sign-in',
                    controller: `${MODULE_NAME}.LoginController`,
                    controllerAs: 'view',
                    data: {
                        roles: [],
                        secure: false
                    },
                    templateUrl: '/app/modules/security/views/signIn.html'
                })
                .state('accessDenied', {
                    url: '/access-denied',
                    data: {
                        roles: []
                    },
                    templateUrl: '/app/modules/security/views/accessDenied.html'
                });
        }
    ])
    .run([
        '$rootScope',
        `${MODULE_NAME}.authorization`,
        '$state',
        `${MODULE_NAME}.security`,
        'clearcode.tm.alert.$alert',
        'clearcode.tm.tagContainer.currentContainer',

        ($rootScope, authorization, $state, security, $alertProvider, currentContainer) => {
            $alertProvider.addMessagePattern(
                'login.invalid',
                'Login or password is incorrect. Please try again.'
            );

            $alertProvider.addMessagePattern(
                'request.error',
                'User with passed email address does not exist.'
            );

            $alertProvider.addMessagePattern(
                'request.success',
                'The email with the activation link has been sent successfully.'
            );

            $alertProvider.addMessagePattern(
                'changePassword.success',
                'Password has been changed successfully.'
            );

            $alertProvider.addMessagePattern(
                'changePassword.error',
                'Sorry, something went wrong. Try to reset your password one more time.'
            );

            $alertProvider.addMessagePattern(
                'changePassword.token',
                'Reset password token is required.'
            );

            $alertProvider.addMessagePattern(
                'changePassword.notCurrentPassword',
                'This value should be the users current password.'
            );

            $alertProvider.addMessagePattern(
                'invalid.email',
                'Your email address is invalid.'
            );

            $alertProvider.addMessagePattern(
                'password.different',
                'Repeat password does not match.'
            );

            $alertProvider.addMessagePattern(
                'password.both',
                'Both password fields requires at least 8 characters.'
            );

            $alertProvider.addMessagePattern(
                'password.first',
                'First password field requires at least 8 characters.'
            );

            $alertProvider.addMessagePattern(
                'password.second',
                'Second password field requires at least 8 characters.'
            );

            $rootScope.logout = () => {
                security.logout().then(() => {
                    currentContainer.disableDebugMode();
                    $state.go('signIn');
                });
            };

            $rootScope.deleteHeaderNotSupported = false;
            $rootScope.security = security;

            $rootScope.$on('$stateChangeStart', (event, toState) => {
                var isDataDefined = toState.data !== undefined, isSecure, roles;

                if (isDataDefined) {
                    isSecure = toState.data.secure !== undefined ? toState.data.secure : true;
                    roles = toState.data.roles !== undefined ? toState.data.roles : [];
                }

                authorization.authorize(roles).then(
                    () => {},
                    () => {
                        if (isSecure) {
                            $state.go('signIn');
                        }
                    }
                );
            });
        }
    ])
    .value('$localStorage', localStorage)
    .controller(`${MODULE_NAME}.LoginController`, LoginController)
    .service(`${MODULE_NAME}.authorization`, Authorization)
    .service(`${MODULE_NAME}.security`, Security)
    .service(`${MODULE_NAME}.oauthResource`, OAuthResource)
    .service(`${MODULE_NAME}.tokenStorage`, TokenStorage)
    .value('OAuthClientSettings', {
        clientId: typeof OAUTH_CLIENT_ID === 'undefined' ? '1_1234567890' : OAUTH_CLIENT_ID,
        clientSecret: typeof OAUTH_CLIENT_SECRET === 'undefined' ? 'sec1234567890' : OAUTH_CLIENT_SECRET
    })
    .factory(`${MODULE_NAME}.securityInterceptor`, securityInterceptor)
    .factory(`${MODULE_NAME}.localeInterceptor`, localeInterceptor)
    .factory(`${MODULE_NAME}.deleteRequestInterceptor`, deleteRequestInterceptor);

module.exports = {MODULE_NAME};
