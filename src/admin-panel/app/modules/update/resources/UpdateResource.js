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

/**
 * @name UpdateResource
 */
class UpdateResource {
    constructor ($http, $q, $location) {
        this.http = $http;
        this.q = $q;
        this.location = $location;
    }

    setSession () {
        var deferred = this.q.defer();

        this.http({
            method: 'GET',
            url: 'admin-tools/update'
        })
            .success((resp) => {
                deferred.resolve(resp);
            })
            .error((err) => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    getLatest (version) {
        var deferred = this.q.defer();
        let domain = this.location.host();

        this.http({
            method: 'GET',
            url: '//download.7tag.org/version.json',
            params: {
                version: version,
                domain: domain
            },
            headers: {
                'Access-Control-Request-Headers': undefined
            }
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

export default UpdateResource;
