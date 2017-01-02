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

import BreadcrumbController from './controllers/BreadcrumbController.js';
import TitleController from './controllers/TitleController.js';
import BreadcrumbDirective from './directives/BreadcrumbDirective.js';
import PageInfo from './services/PageInfo.js';
import TitleDirective from './directives/TitleDirective.js';

const MODULE_NAME = 'clearcode.tm.pageInfo';

BreadcrumbController.$inject = [
    '$scope',
    '$state',
    `${MODULE_NAME}.pageInfo`
];

TitleController.$inject = [
    '$scope',
    `${MODULE_NAME}.pageInfo`
];

PageInfo.$inject = [
    '$rootScope'
];

angular
    .module(MODULE_NAME, [])
    .controller(`${MODULE_NAME}.BreadcrumbController`, BreadcrumbController)
    .controller(`${MODULE_NAME}.TitleController`, TitleController)
    .directive('ccBreadcrumb', BreadcrumbDirective)
    .directive('ccTitle', TitleDirective)
    .service(`${MODULE_NAME}.pageInfo`, PageInfo);

module.exports = {MODULE_NAME};
