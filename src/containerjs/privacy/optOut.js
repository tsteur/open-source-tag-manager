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
var COOKIE_PREFIX = '_stg_optout';
var GLOBAL_CONFIG_NAME = 'stg_global_opt_out';

(function($sevenTag, MODULE_NAME, SERVICE_NAME) {
    function OptOut($cookie, $configuration) {
        var cookie_name = COOKIE_PREFIX;
        this.isEnabled = function () {
            var cookie = $cookie.get(cookie_name);
            var globalCookie = $configuration[GLOBAL_CONFIG_NAME] || false;

            return globalCookie || cookie === 'true';
        };

        return this;
    }

    $sevenTag.provider(MODULE_NAME, function() {
        return OptOut;
    });

    var OptOutFactory = function(OptOutClass, $cookie, $config){
        return new OptOutClass($cookie, $config);
    };

    OptOutFactory.$inject = [
        'OptOut',
        '$cookie',
        '$configuration'
    ];

    $sevenTag.service(SERVICE_NAME, OptOutFactory);
    $sevenTag[SERVICE_NAME] = $sevenTag.$injector.get(SERVICE_NAME);
})(window.sevenTag, 'OptOut', '$optOut');
