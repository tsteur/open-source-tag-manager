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

let securityInterceptor = ($q, tokenStorage, $injector) => {
    return {
        request: (config) => {
            if (undefined !== tokenStorage.getItem() && /(.js|.html|.css|.json)$/.test(config.url) === false) {
                config.headers.Authorization = tokenStorage.getToken();
            }

            return config;
        },

        responseError: (rejection) => {
            // TODO: change this to state ( problem with dependency injection )
            let $state = $injector.get('$state');
            if (rejection.status === 400) {
                if (
                    rejection.data &&
                    (rejection.data.error === 'invalid_request' || rejection.data.error === 'invalid_grant')
                ) {
                    tokenStorage.removeItem();
                    $state.go('signIn');
                }
            }

            if (rejection.status === 403) {
                $state.go('accessDenied');
            }

            return $q.reject(rejection);
        }
    };
};

export default securityInterceptor;
