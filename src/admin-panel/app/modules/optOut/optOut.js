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

import GeneratorController from './controllers/GeneratorController.js';
import Snippet from './services/Snippet.js';

const MODULE_NAME = 'clearcode.tm.optOut';
const MODULE_DIR = 'app/modules/optOut';

GeneratorController.$inject = [
    'clearcode.tm.pageInfo.pageInfo',
    `${MODULE_NAME}.snippet`,
    '$scope',
    '$translate'
];

angular
    .module(MODULE_NAME, [
        'pascalprecht.translate',
        'ui.router',
        'clearcode.tm.alert',
        'clearcode.tm.pageInfo',
        'clearcode.tm.form',
        'clearcode.tm.security'
    ])
    .config([
        '$stateProvider',

        ($stateProvider) => {
            $stateProvider
                .state('optOutGenerator', {
                    url: '/opt-out',
                    controller: `${MODULE_NAME}.GeneratorController as view`,
                    templateUrl: `${MODULE_DIR}/views/generator.html`,
                    data: {
                        roles: [
                            'ROLE_SUPER_ADMIN'
                        ],
                        hasContainerList: false
                    }
                });
        }])
    .controller(`${MODULE_NAME}.GeneratorController`, GeneratorController)
    .service(`${MODULE_NAME}.snippet`, Snippet);

module.exports = {MODULE_NAME};

