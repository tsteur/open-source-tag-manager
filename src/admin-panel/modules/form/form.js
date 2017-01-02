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

import CheckboxDirective from './directives/CheckboxDirective.js';
import RadioButtonDirective from './directives/RadioButtonDirective.js';
import SelectDirective from './directives/SelectDirective.js';
import AlertForm from './services/AlertForm.js';
import AlertFormDirective from './directives/AlertFormDirective.js';
import AlertFormController from './controller/AlertFormController.js';

const MODULE_NAME = 'clearcode.tm.form';

AlertForm.$inject = [
    '$timeout',
    'clearcode.tm.alert.alertUniqueStorage',
    'clearcode.tm.alert.$alert',
    '$translate'
];

AlertFormDirective.$inject = [
    `${MODULE_NAME}.alertForm`,
    'clearcode.tm.alert.$alert'
];

AlertFormController.$inject = [
    'clearcode.tm.alert.alertUniqueStorage'
];

SelectDirective.$inject = [
    '$compile'
];

angular
    .module(MODULE_NAME, [
        'pascalprecht.translate',
        'clearcode.tm.alert'
    ])
    .service(`${MODULE_NAME}.alertForm`, AlertForm)
    .directive('ccSelect', SelectDirective)
    .directive('ccCheckbox', CheckboxDirective)
    .directive('ccRadio', RadioButtonDirective)
    .directive('ccNotificationForm', AlertFormDirective)
    .controller(`${MODULE_NAME}.AlertFormController`, AlertFormController);

module.exports = {MODULE_NAME};
