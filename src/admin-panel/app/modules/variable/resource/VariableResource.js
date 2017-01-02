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

import variableFactory from '../entity/Variable.js';

let transformResponse = function (resp) {
    let Variable = variableFactory(this);

    let variable = new Variable();

    variable.id = resp.id;
    variable.name = resp.name;
    variable.description = resp.description;
    variable.type = resp.type;
    variable.value = resp.value;
    variable.options = resp.options;
    variable.updatedAt = resp.updated_at;

    return variable;
};


let appendTransform = function (defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    return defaults.concat(transform);
};

/**
 * @name VariableResource
 */
class VariableResource {
    constructor ($http, $q) {
        this.http = $http;
        this.q = $q;
    }

    getEntityObject () {
        let Variable = variableFactory(this);

        return new Variable();
    }

    get (id) {
        let deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `/api/variables/${id}`,
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

    query (containerId, params) {
        let deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `/api/containers/${containerId}/variables`,
            params: params,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp) => {
                for (let element in resp.data) {
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

    queryAllAvailable (containerId, params) {
        let deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `/api/containers/${containerId}/available-variables`,
            params: params,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp) => {
                for (let element in resp.data) {
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

    delete (id) {
        let deferred = this.q.defer();

        this.http({
            method: 'DELETE',
            url: `/api/variables/${id}`
        })
            .success((data) => {
                deferred.resolve(data);
            })
            .error((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    post (containerId, entity) {
        let deferred = this.q.defer();

        this.http({
            method: 'POST',
            url: `/api/containers/${containerId}/variables`,
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

    put (id, entity) {
        let deferred = this.q.defer();

        this.http({
            method: 'PUT',
            url: `/api/variables/${id}`,
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

export default VariableResource;
