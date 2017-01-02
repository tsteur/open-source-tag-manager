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

import {MODULE_NAME as APPLICATION_MODULE_NAME} from './app.js';

import container from './modules/tagContainer/mock/container.mock.js';
import permissions from './modules/tagContainer/mock/permissions.mock.js';
import user from './modules/user/mocks/user.mock.js';
import tag from './modules/tag/mock/tag.mock.js';
import trigger from './modules/trigger/mock/trigger.mock.js';
import oauthMock from './modules/security/mock/oauth.mock.js';

import {MODULE_NAME as MOCK_MODULE_NAME} from './../modules/mock/mock.js';

const MODULE_NAME = 'admin.application.dev';

angular.module(MODULE_NAME, [
    APPLICATION_MODULE_NAME,
    'ngMockE2E',
    MOCK_MODULE_NAME,
    'ui.router'
])
    .run([
        '$httpBackend',
        'ngTableParams',
        '$filter',
        'clearcode.tm.mock.$mock',
        'clearcode.tm.mock.Mock',
        '$stateParams',
        'clearcode.tm.alert.$alert',

        ($httpBackend, ngTableParams, $filter, $mockProvider, Mock, $stateParams, $alertProvider) => {
            $mockProvider.init(
                'triggers',
                trigger.triggersList
            );
            $mockProvider.init(
                'tags',
                tag.tagsList
            );
            $mockProvider.init(
                'containers',
                container.containersList
            );
            $mockProvider.init(
                'users',
                user.usersList
            );
            $mockProvider.init(
                'permissions',
                permissions.permissionsList
            );
            $mockProvider.init(
                'logged',
                []
            );

            trigger.triggerMock($httpBackend, ngTableParams, $filter, Mock, $stateParams);
            tag.tagMock($httpBackend, ngTableParams, $filter, Mock, $stateParams);
            permissions.permissionsMock($httpBackend, ngTableParams, $filter, Mock);
            container.containerMock($httpBackend, ngTableParams, $filter, Mock);
            user.userMock($httpBackend, ngTableParams, $filter, Mock);
            oauthMock($httpBackend);

            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
            $httpBackend.whenPUT(/.*/).passThrough();
            $httpBackend.whenDELETE(/.*/).passThrough();

            $alertProvider.interval = 6000;
        }
    ]);

angular.element(document).ready(() => {
    angular.bootstrap(document, [MODULE_NAME]);
});
