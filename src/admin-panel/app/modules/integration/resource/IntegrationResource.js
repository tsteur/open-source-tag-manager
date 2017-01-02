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

import integrationFactory from '../entity/Integration.js';

var transformResponse = function (resp) {
    var Integration = integrationFactory(this);
    var integration = new Integration();

    integration.id = resp.id;
    integration.name = resp.name;
    integration.clientId = resp.client_id;
    integration.clientSecret = resp.client_secret;
    integration.createdAt = resp.created_at;
    integration.updatedAt = resp.updated_at;

    integration.user = {
        id: undefined,
        status: undefined,
        roles: [],
        email: undefined
    };

    if (resp.user) {
        integration.user.id = resp.user.id;
        integration.user.status = resp.user.status;
        integration.user.roles = resp.user.roles;

        if (resp.user.email) {
            integration.user.email = resp.user.email;
        }
    }

    return integration;
};


var appendTransform = function (defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    return defaults.concat(transform);
};

/**
 * @name IntegrationResource
 */
class IntegrationResource {
    /**
     * @param {$http} $http
     * @param {$q} $q
     */
    constructor ($http, $q) {
        this.http = $http;
        this.q = $q;
    }

    /**
     * @returns {Integration}
     */
    getEntityObject () {
        var Integration = integrationFactory(this);

        return new Integration();
    }

    /**
     * @description Send request to get specific entity
     *
     * @param {number} id
     *
     * @returns {deferred.promise}
     */
    get (id) {
        var deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `/api/integration/${id}`,
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
            url: '/api/integration',
            params: params,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp) => {
                for (var element in resp.data) {
                    if (resp.data[element] instanceof Object) {
                        resp.data[element] = transformResponse.call(this, resp.data[element]);
                    }
                }

                return resp;
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
            url: `/api/integration/${id}`
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
     * @description Send request to create entity
     *
     * @param {object} entity
     *
     * @returns {deferred.promise}
     */
    post (entity) {
        var deferred = this.q.defer();

        this.http({
            method: 'POST',
            url: '/api/integration',
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
            url: `/api/integration/${id}`,
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
}

export default IntegrationResource;
