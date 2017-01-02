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

import VersionController from './controllers/VersionController.js';
import UpdateResource from './resources/UpdateResource.js';
import version from './services/Version.js';
import setVersionDirective from './directives/setVersionDirective.js';

const MODULE_NAME = 'clearcode.tm.update';

VersionController.$inject = [
    `${MODULE_NAME}.updateResource`,
    '$window',
    `${MODULE_NAME}.version`
];

UpdateResource.$inject = [
    '$http',
    '$q',
    '$location'
];

setVersionDirective.$inject = [
    `${MODULE_NAME}.version`,
    'clearcode.tm.update.updateResource'
];

version.$inject = [
    '$rootScope'
];

angular
    .module(MODULE_NAME, [])
    .controller(`${MODULE_NAME}.VersionController`, VersionController)
    .service(`${MODULE_NAME}.updateResource`, UpdateResource)
    .service(`${MODULE_NAME}.version`, version)
    .directive('stgSetVersion', setVersionDirective);

module.exports = {MODULE_NAME};
