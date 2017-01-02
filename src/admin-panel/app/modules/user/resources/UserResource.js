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

import userFactory from '../entities/User.js';

const CHANGE_PASSWORD_ROUTE = '/api/users/me/change-password';
const RESET_REQUEST_ROUTE = '/api/reset-password/request';
const RESET_PASSWORD_ROUTE = '/api/reset-password/token/';
const DEFAULT_LANGUAGE = 'en';

var transformResponse = function (resp) {
    var user = this.getEntity();

    if (resp !== undefined) {
        user.id = resp.id;
        user.email = resp.email;
        user.firstName = resp.first_name;
        user.lastName = resp.last_name;
        user.displayName = resp.display_name;
        user.roles = resp.roles;
        user.status = resp.status;
        user.createdAt = resp.created_at;

        if (resp.language === null) {
            user.language = DEFAULT_LANGUAGE;
        } else {
            user.language = resp.language;
        }
    }

    return user;
};

var appendTransform = function (defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    return defaults.concat(transform);
};

/**
 * @name UserResource
 */
class UserResource {
    /**
     * @param {$http} $http
     * @param {$q} $q
     */
    constructor ($http, $q) {
        this.http = $http;
        this.q = $q;
    }

    /**
     * @returns {User}
     */
    getEntity () {
        var User = userFactory(this);

        return new User();
    }

    /**
     * @description Send request to get specific entity
     *
     * @param {number} id
     * @returns {deferred.promise}
     */
    get (id) {
        var deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `/api/users/${id}`,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp, header, status) => {
                if (status < 400) {
                    return transformResponse.call(this, resp.data);
                } else {
                    return resp;
                }
            })
        })
            .success((data) => {
                deferred.resolve(data);
            })
            .error(() => {
                deferred.reject();
            });

        return deferred.promise;
    }

    /**
     * @description Send request to get specific entity
     *
     * @returns {deferred.promise}
     */
    getMe () {
        var deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: '/api/users/me',
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp, header, status) => {
                if (status < 400) {
                    return transformResponse.call(this, resp.data);
                } else {
                    return resp;
                }
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
     * @description Send request to get list of entity
     *
     * @param {Object} params
     *
     * @returns {deferred.promise}
     */
    query (params) {
        var deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: '/api/users',
            params: params,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp) => {
                if (status < 400) {
                    for (var element in resp.data) {
                        if (resp.data[element] instanceof Object) {
                            resp.data[element] = transformResponse.call(this, resp.data[element]);
                        }
                    }
                }

                return resp;
            })
        })
            .success((data) => {
                deferred.resolve(data);
            })
            .error((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * @description Send request to delete entity
     *
     * @param {number} id
     *
     * @returns {deferred.promise}
     */
    delete (id) {
        var deferred = this.q.defer();

        this.http({
            method: 'DELETE',
            url: `/api/users/${id}`
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
     * @description Send request to create entity
     *
     * @param {object} entity
     */
    post (entity) {
        var deferred = this.q.defer();

        this.http({
            method: 'POST',
            url: '/api/users',
            data: entity,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp, header, status) => {
                if (status < 400) {
                    return transformResponse.call(this, resp.data);
                } else {
                    return resp;
                }
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
     * Send request to update entity
     *
     * @param {number} id
     * @param {object} entity
     *
     * @returns {deferred.promise}
     */
    put (id, entity) {
        var deferred = this.q.defer();

        this.http({
            method: 'PUT',
            url: `/api/users/${id}`,
            data: entity,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp, header, status) => {
                if (status < 400) {
                    return transformResponse.call(this, resp.data);
                } else {
                    return resp;
                }
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
     * Send request to update entity
     *
     * @param {number} id
     * @param {object} entity
     *
     * @returns {deferred.promise}
     */
    putMe (entity) {
        var deferred = this.q.defer();

        this.http({
            method: 'PUT',
            url: '/api/users/me',
            data: entity,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp, header, status) => {
                if (status < 400) {
                    return transformResponse.call(this, resp.data);
                } else {
                    return resp;
                }
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
     * Send request to update entity
     *
     * @param {object} entity
     *
     * @returns {deferred.promise}
     */
    othersSettingsMe (entity) {
        var deferred = this.q.defer();

        this.http({
            method: 'PUT',
            url: '/api/users/me/others-settings',
            data: entity,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp, header, status) => {
                if (status < 400) {
                    return transformResponse.call(this, resp.data);
                } else {
                    return resp;
                }
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
     * @description Send request to change password
     *
     * @param {Object} data
     * @returns {deferred.promise|*}
     */
    changePassword (data) {
        var deferred = this.q.defer();

        this.http({
            method: 'POST',
            data: data,
            url: CHANGE_PASSWORD_ROUTE
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
     * @description Send request to reset password
     *
     * @param {Object} data
     * @returns {deferred.promise|*}
     */
    resetPassword (data) {
        var deferred = this.q.defer();

        this.http({
            method: 'POST',
            data: data,
            url: RESET_REQUEST_ROUTE
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
     * @description Send request to confirm password with the new one
     *
     * @param {Object} data
     * @param {String} token
     * @returns {deferred.promise|*}
     */
    setPassword (data, token) {
        var deferred = this.q.defer();

        this.http({
            method: 'POST',
            data: data,
            url: RESET_PASSWORD_ROUTE + token
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

export default UserResource;
