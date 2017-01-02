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

import containerFactory from '../entity/Container.js';

let transformResponse = function (resp) {
    let Container = containerFactory(this);

    let container = new Container();

    if (resp !== undefined) {
        container.id = resp.id;
        container.name = resp.name;
        container.description = resp.description;
        container.code = resp.code;
        container.codeSynchronous = resp.code_synchronous;
        container.version = resp.version;
        container.hasUnpublishedChanges = resp.has_unpublished_changes;
        container.publishedAt = resp.published_at;
        container.permissions = resp.permissions;
        container.delay = resp.delay;
        container.websites = [];

        for (let i = 0; i < resp.websites.length; i++) {
            let website = this.WebsiteResource.getEntityObject();

            website.url = resp.websites[i].url;
            website.parameterType = resp.websites[i].parameter_type;

            container.websites.push(website);
        }
    }

    return container;
};

let appendTransform = function (defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    return defaults.concat(transform);
};

/**
 * @name ContainerResource
 */
class ContainerResource {
    constructor ($http, $q, WebsiteResource) {
        this.http = $http;
        this.q = $q;
        this.WebsiteResource = WebsiteResource;
    }

    getEntityObject () {
        let Container = containerFactory(this);

        return new Container();
    }

    get (id) {
        let deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `/api/containers/${id}`,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp) => {
                return transformResponse.call(this, resp.data);
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

    query (params) {
        let deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: '/api/containers',
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
            .success((data) => {
                deferred.resolve(data);
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
            url: `/api/containers/${id}`
        })
            .success((resp) => {
                deferred.resolve(resp);
            })
            .error((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    post (entity) {
        let deferred = this.q.defer();

        this.http({
            method: 'POST',
            url: '/api/containers',
            data: entity,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp) => {
                return transformResponse.call(this, resp.data);
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
            url: `/api/containers/${id}`,
            data: entity,
            transformResponse: appendTransform(this.http.defaults.transformResponse, (resp) => {
                return transformResponse.call(this, resp.data);
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

    publishVersion (id) {
        let deferred = this.q.defer();

        this.http({
            method: 'POST',
            url: `/api/containers/${id}/version-publish`
        })
            .success((resp) => {
                deferred.resolve(resp);
            })
            .error((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    restoreVersion (id) {
        let deferred = this.q.defer();

        this.http({
            method: 'POST',
            url: `/api/containers/${id}/version-restore`
        })
            .success((resp) => {
                deferred.resolve(resp);
            })
            .error((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    getPrivacyOptOut (id) {
        let deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `containers/${id}/privacy`
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

export default ContainerResource;
