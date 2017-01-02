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

import variableTypeFactory from '../entity/VariableType.js';

let transformResponse = function (resp) {
    let VariableType = variableTypeFactory(this);

    let type = new VariableType();

    type.id = resp.id;
    type.name = resp.name;
    type.helper = resp.helper;

    return type;
};


let appendTransform = function (defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    return defaults.concat(transform);
};

/**
 * @name VariableResource
 */
class VariableTypeResource {
    constructor ($http, $q) {
        this.http = $http;
        this.q = $q;
    }

    getEntityObject () {
        let VariableType = variableTypeFactory(this);

        return new VariableType();
    }

    query (params) {
        let deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: '/api/variable-types',
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
}

export default VariableTypeResource;
