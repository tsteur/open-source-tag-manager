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
    /**
     * Dependency Injector
     *
     * @name $injector
     */
    var $injector = {
        dependencies: {},
        register: function (key, value) {
            $injector.dependencies[key] = value;
        },
        get: function (key) {
            return $injector.dependencies[key];
        },
        has: function(key) {
            return $injector.dependencies[key] !== undefined;
        },
        resolve: function (service) {
            var args = [];
            var dependencies = service.$inject !== undefined ?
                service.$inject :
                [];

            for (var i = 0; i < dependencies.length; i++) {
                var name = dependencies[i];
                if (typeof $injector.dependencies[name] === 'undefined') {
                    var callee = service.name === '' ? '' : ' Called from ' + service.name + ' function';
                    throw 'Can not resolve ' + name + ' dependency.' + callee;
                }
                args.push($injector.dependencies[name]);
            }

            return service.apply({}, args);
        }
    };

    sevenTag[MODULE_NAME] = $injector;
})(window.sevenTag, '$injector');
