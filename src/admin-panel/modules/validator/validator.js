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

import stgFormDirective from './directives/stgFormDirective.js';

const MODULE_NAME = 'clearcode.tm.validator';

stgFormDirective.$inject = [
    'clearcode.tm.alert.$alert',
    'clearcode.tm.form.alertForm'
];

angular
    .module(MODULE_NAME, [
        'clearcode.tm.alert',
        'clearcode.tm.form'
    ])
    .directive('stgForm', stgFormDirective);

module.exports = {MODULE_NAME};
