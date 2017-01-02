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
import SelectorController from './controllers/SelectorController';

import VariableResource from './resource/VariableResource.js';
import VariableTypeResource from './resource/VariableTypeResource.js';
import VariableFormProvider from './providers/VariableFormProvider.js';
import VariableSelector from './services/VariableSelector.js';

import variableSelectorDirective from './directives/variableSelector.js';
import clickOutsideElement from './directives/variableClickOutside.js';

const MODULE_NAME = 'clearcode.tm.variable';
const MODULE_DIR = 'app/modules/variable';

const CONDITION_MODULE_NAME = 'clearcode.tm.condition';

ManageController.$inject = [
    'ngTableParams',
    '$stateParams',
    `${MODULE_NAME}.variableResource`,
    'clearcode.tm.alert.alert',
    'clearcode.tm.tagContainer.paramConverter',
    'clearcode.tm.tagContainer.currentContainer',
    'clearcode.tm.pageInfo.pageInfo',
    '$scope',
    '$state',
    '$translate'
];

SelectorController.$inject = [
    '$compile',
    '$scope',
    `${MODULE_NAME}.variableSelector`,
    `${CONDITION_MODULE_NAME}.condition`
];

CreateController.$inject = [
    `${MODULE_NAME}.variableResource`,
    `${MODULE_NAME}.variableTypeResource`,
    'clearcode.tm.pageInfo.pageInfo',
    '$scope',
    `${MODULE_NAME}.$variableForm`,
    'clearcode.tm.tagContainer.currentContainer',
    '$stateParams',
    'clearcode.tm.alert.alert',
    '$state',
    '$translate',
    'clearcode.tm.condition.condition'
];

EditController.$inject = [
    `${MODULE_NAME}.variableResource`,
    `${MODULE_NAME}.variableTypeResource`,
    'clearcode.tm.pageInfo.pageInfo',
    '$scope',
    `${MODULE_NAME}.$variableForm`,
    'clearcode.tm.tagContainer.currentContainer',
    '$stateParams',
    'clearcode.tm.alert.alert',
    '$state',
    '$translate',
    'clearcode.tm.condition.condition'
];

VariableResource.$inject = [
    '$http',
    '$q'
];

clickOutsideElement.$inject = [
    '$document'
];

VariableTypeResource.$inject = [
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
                .state('variables', {
                    url: '/containers/{containerId}/variables',
                    controller: `${MODULE_NAME}.ManageController as view`,
                    templateUrl: `${MODULE_DIR}/views/manage.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: true
                    }
                })
                .state('variableCreate', {
                    url: '/containers/{containerId}/variable-create',
                    controller: `${MODULE_NAME}.CreateController as view`,
                    templateUrl: `${MODULE_DIR}/views/create.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: true
                    }
                })
                .state('variableEdit', {
                    url: '/containers/{containerId}/variable-edit/{variableId}',
                    controller: `${MODULE_NAME}.EditController as view`,
                    templateUrl: `${MODULE_DIR}/views/edit.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: true
                    }
                });
        }
    ])
    .run([
        'clearcode.tm.alert.$alert',
        ($alertProvider) => {
            $alertProvider.addMessagePattern(
                'variables.close',
                'You are trying to close unsaved variable.'
            );
        }
    ])
    .controller(`${MODULE_NAME}.ManageController`, ManageController)
    .controller(`${MODULE_NAME}.CreateController`, CreateController)
    .controller(`${MODULE_NAME}.EditController`, EditController)
    .controller(`${MODULE_NAME}.SelectorController`, SelectorController)
    .service(`${MODULE_NAME}.variableResource`, VariableResource)
    .service(`${MODULE_NAME}.variableTypeResource`, VariableTypeResource)
    .provider(`${MODULE_NAME}.$variableForm`, VariableFormProvider)
    .service(`${MODULE_NAME}.variableSelector`, VariableSelector)
    .directive('variableSelector', variableSelectorDirective)
    .directive('variableClickOutside', clickOutsideElement);

module.exports = {MODULE_NAME};
