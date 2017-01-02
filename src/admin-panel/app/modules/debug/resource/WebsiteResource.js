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

import websiteFactory from '../entity/Website.js';

var transformResponse = function (resp) {
    if (angular.isArray(resp)) {
        return resp.map((websiteData) => {
            return transformResponse.call(this, websiteData);
        });
    }

    var website = this.getEntityObject();

    if (resp !== undefined) {
        website.url = resp.url;
        website.parameterType = resp.parameter_type;
    }

    return website;
};

var appendTransform = function (defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    return defaults.concat(transform);
};

/**
 * @name WebsiteResource
 *
 */
class WebsiteResource {
    /**
     * @param {$http} $http
     * @param {$q} $q
     */
    constructor ($http, $q) {
        this.http = $http;
        this.q = $q;
    }

    /**
     * @returns {Website}
     */
    getEntityObject () {
        var Website = websiteFactory(this);

        return new Website();
    }

    /**
     * @description Send request to get list of entity
     *
     * @param {number} containerId
     * @param {Object} params
     *
     * @returns {deferred.promise}
     */
    query (containerId, params) {
        var deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `/api/containers/${containerId}/websites`,
            params: params,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp, header, status) => {
                if (isResponseSuccess(resp, status)) {
                    for (var i = 0; i < resp.data.length; i++) {
                        if (resp.data[i] instanceof Object) {
                            resp.data[i] = transformResponse.call(this, resp.data[i]);
                        }
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

    put (containerId, websites) {
        var deferred = this.q.defer();

        this.http({
            method: 'PUT',
            data: {
                websites: websites
            },
            url: `api/containers/${containerId}/websites`,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp, header, status) => {
                if (isResponseSuccess(resp, status)) {
                    return transformResponse.call(this, resp.data);
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

function isResponseSuccess (resp, status) {
    return status < 400 && resp.data !== undefined;
}

export default WebsiteResource;
