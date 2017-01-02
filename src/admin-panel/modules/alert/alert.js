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

import AlertProvider from './providers/AlertProvider.js';
import AlertController from './controllers/AlertController.js';
import AlertDirective from './directives/AlertDirective.js';
import Alert from './services/Alert.js';
import RefreshAlert from './services/RefreshAlert.js';
import AlertStorage from './services/AlertStorage.js';
import UniqueStorage from './services/UniqueStorage.js';

const MODULE_NAME = 'clearcode.tm.alert';

Alert.$inject = [
    '$timeout',
    `${MODULE_NAME}.alertStorage`,
    `${MODULE_NAME}.$alert`,
    '$translate'
];

RefreshAlert.$inject = [
    '$timeout',
    `${MODULE_NAME}.alertStorage`,
    `${MODULE_NAME}.$alert`,
    '$translate',
    '$window'
];

AlertDirective.$inject = [
    `${MODULE_NAME}.alert`,
    `${MODULE_NAME}.$alert`,
    '$window'
];

AlertController.$inject = [
    `${MODULE_NAME}.alertStorage`
];

angular
    .module(MODULE_NAME, ['pascalprecht.translate', 'ngSanitize', 'ngAnimate'])
    .provider(`${MODULE_NAME}.$alert`, AlertProvider)
    .factory(`${MODULE_NAME}.alertStorage`, () => new AlertStorage())
    .factory(`${MODULE_NAME}.alertUniqueStorage`, () => new UniqueStorage())
    .service(`${MODULE_NAME}.alert`, Alert)
    .service(`${MODULE_NAME}.refreshAlert`, RefreshAlert)
    .directive('ccNotification', AlertDirective)
    .controller(`${MODULE_NAME}.AlertController`, AlertController);

module.exports = {MODULE_NAME};
