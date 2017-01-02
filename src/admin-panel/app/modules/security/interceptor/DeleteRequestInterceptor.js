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

let deleteRequestInterceptor = ($q, $rootScope, $injector) => {
    let METHOD_DELETE = 'DELETE';
    let POST_DELETE_URL_SUFIX = '/remove';

    return {
        request: (config) => {
            if (config.method.toUpperCase() === METHOD_DELETE && $rootScope.deleteHeaderNotSupported === true) {
                config.method = 'POST';
                config.url += POST_DELETE_URL_SUFIX;
            }

            return config;
        },
        responseError: (rejection) => {
            let $http = $injector.get('$http');
            if (rejection.config.method.toUpperCase() === METHOD_DELETE) {
                if (rejection.status === 405) {
                    $rootScope.deleteHeaderNotSupported = true;

                    return $http.post(rejection.config.url + POST_DELETE_URL_SUFIX);
                }
            }

            return $q.reject(rejection);
        }
    };
};

export default deleteRequestInterceptor;
