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

(function (sevenTag, MODULE_NAME) {
    function httpFactory($window, $jsonp) {
        return function (config, successCallback) {
            var request,
                method = config.method || 'GET';

            if (config.url === undefined) {
                throw new Error('Url not pass to $http config');
            }

            if (config.method === 'JSONP') {
                return $jsonp.fetch(config.url, successCallback);
            }

            if ($window.XMLHttpRequest) {
                //Firefox, Opera, IE7, and other browsers will use the native object
                request = new $window.XMLHttpRequest();
            } else if (typeof $window.XDomainRequest != 'undefined') {
                request = new $window.XDomainRequest();
            } else {
                //IE 5 and 6 will use the ActiveX control
                request = new $window.ActiveXObject('Microsoft.XMLHTTP');
            }

            if ('withCredentials' in request) {
                request.withCredentials = true;
            }

            request.open(method, config.url, config.async);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        var response = JSON.parse(request.response);
                        successCallback(response);
                    }
                }
            };

            request.send();
        };
    }

    httpFactory.$inject = [
        '$window',
        '$jsonp'
    ];

    sevenTag.service(MODULE_NAME, httpFactory);
})(window.sevenTag, '$http');
