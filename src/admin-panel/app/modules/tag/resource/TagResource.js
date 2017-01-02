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

import tagFactory from '../entity/Tag.js';

var transformResponse = function (resp) {
    var Tag = tagFactory(this);
    var tag = new Tag();

    tag.id = resp.id;
    tag.name = resp.name;
    tag.code = resp.code;
    tag.priority = resp.priority;
    tag.updatedAt = resp.updated_at;
    tag.createdAt = resp.created_at;
    tag.documentWrite = resp.document_write;
    tag.disableInDebugMode = resp.disable_in_debug_mode;
    tag.isActive = resp.is_active;
    tag.respectVisitorsPrivacy = resp.respect_visitors_privacy;
    tag.isSynchronous = resp.is_synchronous;

    if (resp.template !== null) {
        tag.template = resp.template;
        tag.templateOptions = resp.template_options;
    } else {
        tag.template = undefined;
    }

    for (var key in resp.triggers) {
        if (resp.triggers[key] instanceof Object) {
            tag.addTrigger(resp.triggers[key]);
        }
    }

    return tag;
};


var appendTransform = function (defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    return defaults.concat(transform);
};

/**
 * @name TagResource
 */
class TagResource {
    constructor ($http, $q) {
        this.http = $http;
        this.q = $q;
    }

    getEntityObject () {
        var Tag = tagFactory(this);

        return new Tag();
    }

    get (id) {
        var deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `/api/tags/${id}`,
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
        var deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `/api/containers/${containerId}/tags`,
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

    delete (id) {
        var deferred = this.q.defer();

        this.http({
            method: 'DELETE',
            url: `/api/tags/${id}`
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
        var deferred = this.q.defer();

        this.http({
            method: 'POST',
            url: `/api/containers/${containerId}/tags`,
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
        var deferred = this.q.defer();

        this.http({
            method: 'PUT',
            url: `/api/tags/${id}`,
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

export default TagResource;
