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

import AuthToken from '../token/AuthToken.js';

const RESOURCE_ROUTE = '/api/oauth/v2/token';
const LOGOUT_ROUTE = '/api/users/me/logout';
const GRANT_TYPE = 'password';

let transformResponse = function (resp, header, status) {
    let response;

    if (status < 400) {
        let authToken = this.getEntity();

        authToken.accessToken = resp.access_token;
        authToken.expiresIn = resp.expires_in;
        authToken.tokenType = resp.token_type;
        authToken.scope = resp.scope;
        authToken.refreshToken = resp.refresh_token;

        response = authToken;
    } else {
        response = resp;
    }

    return response;
};

let appendTransform = (defaults, transform) => {
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    return defaults.concat(transform);
};

/**
 * @name OAuthResource
 */
class OAuthResource {
    constructor ($http, $q, tokenStorage, OAuthClientSettings) {
        this.http = $http;
        this.q = $q;
        this.tokenStorage = tokenStorage;
        this.OAuthClientSettings = OAuthClientSettings;
    }

    /**
     * @returns {AuthToken}
     */
    getEntity () {
        AuthToken.prototype.save = () => {
            let deferred = this.q.defer();

            this.tokenStorage.add(this);
            deferred.resolve(this);

            return deferred.promise;
        };

        AuthToken.prototype.remove = () => {
            let deferred = this.q.defer();

            this.tokenStorage.remove();
            deferred.resolve(this);

            return deferred.promise;
        };

        return new AuthToken();
    }

    /**
     * @description Send request to get oauth
     *
     * @param {string} identity of user ( email or username )
     * @param {string} password
     *
     * @returns {deferred.promise}
     */
    post (identity, password) {
        let deferred = this.q.defer();

        this.http({
            method: 'POST',
            url: RESOURCE_ROUTE,
            data: {
                /* eslint-disable */
                client_id: this.OAuthClientSettings.clientId,
                client_secret: this.OAuthClientSettings.clientSecret,
                grant_type: GRANT_TYPE,
                username: identity,
                password: password
                /* eslint-enable */
            },
            ignoreAuthModule: true,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp, header, status) => {
                return transformResponse.call(this, resp, header, status);
            })
        })
            .success((resp) => {
                deferred.resolve(resp);
            })
            .error((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * @description Send request to get new tokens
     *
     * @param {string} token
     *
     * @returns {deferred.promise}
     */
    refreshToken (token) {
        let deferred = this.q.defer();

        this.http({
            method: 'POST',
            url: RESOURCE_ROUTE,
            data: {
                /* eslint-disable */
                client_id: this.OAuthClientSettings.clientId,
                client_secret: this.OAuthClientSettings.clientSecret,
                grant_type: 'refresh_token',
                refresh_token: token
                /* eslint-enable */
            },
            ignoreAuthModule: true,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp, header, status) => {
                if (resp.error !== undefined) {
                    return resp;
                }

                return transformResponse.call(this, resp, header, status);
            })
        })
            .success((resp) => {
                deferred.resolve(resp);
            })
            .error((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * @description Send request to logout
     *
     * @returns {Promise}
     */
    logout () {
        let deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: LOGOUT_ROUTE
        })
            .success((resp) => {
                deferred.resolve(resp);
            })
            .error((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    }
}

export default OAuthResource;
