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

import triggerFactory from '../entity/Trigger.js';

const PAGE_VIEW_TRIGGER_TYPE = 0,
    DOM_READY_TRIGGER_TYPE = 4,
    PAGE_LOAD_TRIGGER_TYPE = 5,
    DOM_READY_SUBTYPE = 1,
    PAGE_LOAD_SUBTYPE = 2;


var transformResponse = function (resp) {
    var Trigger = triggerFactory(this);

    var trigger = new Trigger();

    if (resp !== undefined) {
        trigger.id = resp.id;
        trigger.name = resp.name;
        trigger.type = resp.type;
        trigger.conditions = resp.conditions;
        trigger.tagsCount = resp.tags_count;
        trigger.updatedAt = resp.updated_at;
        trigger.isAddedToSynchronousTag = resp.is_added_to_synchronous_tag;
        addTriggerSubtypesInfo(trigger);
    }

    return trigger;
};

function addTriggerSubtypesInfo (trigger) {
    if (trigger.type === DOM_READY_TRIGGER_TYPE) {
        trigger.type = PAGE_VIEW_TRIGGER_TYPE;
        trigger.subtype = DOM_READY_SUBTYPE;
    }

    if (trigger.type === PAGE_LOAD_TRIGGER_TYPE) {
        trigger.type = PAGE_VIEW_TRIGGER_TYPE;
        trigger.subtype = PAGE_LOAD_SUBTYPE;
    }
}

var transformRequest = function (request) {
    var Trigger = triggerFactory(this),
        trigger = new Trigger();

    if (request !== undefined) {
        trigger.id = request.id;
        trigger.name = request.name;
        trigger.type = request.type;
        trigger.conditions = request.conditions;
        trigger.tagsCount = request.tags_count;
        trigger.updatedAt = request.updated_at;

        delete trigger.isAddedToSynchronousTag;
        removeTriggerSubtypesInfo(trigger, request);
    }

    return trigger;
};

function removeTriggerSubtypesInfo (trigger, request) {
    if (request.type === PAGE_VIEW_TRIGGER_TYPE && request.subtype === DOM_READY_SUBTYPE) {
        trigger.type = DOM_READY_TRIGGER_TYPE;
    }

    if (request.type === PAGE_VIEW_TRIGGER_TYPE && request.subtype === PAGE_LOAD_SUBTYPE) {
        trigger.type = PAGE_LOAD_TRIGGER_TYPE;
    }

    delete trigger.subtype;
}


var appendTransform = function (defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    return defaults.concat(transform);
};

/**
 * @name TriggerResource
 */
class TriggerResource {
    constructor ($http, $q) {
        this.http = $http;
        this.q = $q;
    }

    getEntityObject () {
        var Trigger = triggerFactory(this);

        return new Trigger();
    }

    get (id) {
        var deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `/api/triggers/${id}`,
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
            url: `/api/containers/${containerId}/triggers`,
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
            url: `/api/triggers/${id}`
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
            url: `/api/containers/${containerId}/triggers`,
            data: entity,
            transformRequest: appendTransform(transformRequest, this.http.defaults.transformRequest),
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
            .error((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    put (id, entity) {
        var deferred = this.q.defer();

        this.http({
            method: 'PUT',
            url: `/api/triggers/${id}`,
            data: entity,
            transformRequest: appendTransform(transformRequest, this.http.defaults.transformRequest),
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

export default TriggerResource;
