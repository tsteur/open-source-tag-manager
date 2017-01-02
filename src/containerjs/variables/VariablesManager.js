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
'use strict';

(function(sevenTag, MODULE_NAME) {
    var VariableManager = function ($variables, $collectorProvider) {
        this.handle = function (state) {
            var collection = {}, variable, variables = $variables();

            for (var i = 0; i < variables.length; i++) {
                variable = variables[i];
                collection[variable.name] = $collectorProvider.get(variable.type.collector_name)(variable, state);
            }

            return collection;
        };

        return this;
    };

    VariableManager.$inject = [
        '$variables',
        '$collectorProvider'
    ];

    sevenTag.service(MODULE_NAME, VariableManager);
})(window.sevenTag, '$variablesManager');
