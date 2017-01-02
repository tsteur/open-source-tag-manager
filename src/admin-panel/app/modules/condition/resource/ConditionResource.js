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

import conditionFactory from '../entity/Condition.js';

/**
 * @name ConditionResource
 */
class ConditionResource {
    /**
     * @param  {$http} $http
     * @param  {$q} $q
     */
    constructor ($http, $q) {
        this.http = $http;
        this.q = $q;
    }

    /**
     * @returns {Condition}
     */
    getEntityObject () {
        var Condition = conditionFactory();

        return new Condition();
    }

    /**
     * @description Send request to get conditions with their specific variables
     *
     * @param {number} id
     *
     * @returns {deferred.promise}
     */
    query (id) {
        var deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: `/api/containers/${id}/conditions`
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

export default ConditionResource;
