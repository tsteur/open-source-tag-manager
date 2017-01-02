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

/* eslint-disable */
var permissionsList = [{
        user: {
            id: 0,
            firstName: 'Adam',
            lastName: 'Malysz'
        },
        permission: 'view'
    }, {
        user: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe'
        },
        permission: 'noaccess'
    }, {
        user: {
            id: 2,
            firstName: 'Jon',
            lastName: 'Doe'
        },
        permission: 'publish'
    },
    {
        user: {
            id: 3,
            firstName: 'Adam',
            lastName: 'Malysz'
        },
        permission: 'view'
    }, {
        user: {
            id: 4,
            firstName: 'John',
            lastName: 'Doe'
        },
        permission: 'noaccess'
    }, {
        user: {
            id: 5,
            firstName: 'Jon',
            lastName: 'Doe'
        },
        permission: 'publish'
    },
    {
        user: {
            id: 6,
            firstName: 'Adam',
            lastName: 'Malysz'
        },
        permission: 'view'
    }, {
        user: {
            id: 7,
            firstName: 'John',
            lastName: 'Doe'
        },
        permission: 'noaccess'
    }, {
        user: {
            id: 8,
            firstName: 'Jon',
            lastName: 'Doe'
        },
        permission: 'publish'
    },{
        user: {
            id: 9,
            firstName: 'Adam',
            lastName: 'Malysz'
        },
        permission: 'view'
    }, {
        user: {
            id: 10,
            firstName: 'John',
            lastName: 'Doe'
        },
        permission: 'noaccess'
    }, {
        user: {
            id: 11,
            firstName: 'Jon',
            lastName: 'Doe'
        },
        permission: 'publish'
    }
];
/* eslint-enable */

/**
 * @name tagContainer.permissionsMock
 *
 * @param {$httpBackend} $httpBackend
 * @param {ngTableParams} ngTableParams
 * @param $filter
 * @param {$mockProvider} Mock
 */
var permissionsMock = ($httpBackend, ngTableParams, $filter, Mock) => {
    var permissions = Mock.all('permissions');

    $httpBackend.whenGET(/\api\/containers\/(.*)\/permissions\?*/).respond((method, url, data) => {
        var query = url.split('?')[1],
            requestParams = {},
            params,
            vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            requestParams[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }

        // parse url params
        for (var key in requestParams) {
            if (key.indexOf('[') >= 0) {
                params = key.split(/\[(.*)\]/);
                var value = requestParams[key], lastKey = '';

                /* eslint-disable */
                angular.forEach(params.reverse(), (name) => {
                    if (name !== '') {
                        var v = value;
                        value = {};
                        value[lastKey = name] = !isNaN(v) ? parseFloat(v) : v;
                    }
                });
                /* eslint-enable */

                requestParams[lastKey] = angular.extend(requestParams[lastKey] || {}, value[lastKey]);
            } else {
                requestParams[key] = !isNaN(requestParams[key]) ? parseFloat(requestParams[key]) : requestParams[key];
            }
        }

        data = permissions;
        var total = data.length;

        /* eslint-disable */
        params = new ngTableParams({
            page: (requestParams.offset/requestParams.limit) + 1,
            count: requestParams.limit
        });
        /* eslint-enable */

        data = data.slice((params.page() - 1) * params.count(), params.page() * params.count());

        return [200, {
            data: data,
            total: total
        }];
    });

    $httpBackend.whenPUT(/\api\/containers\/(.*)\/permissions\?*/).respond((method, url, data) => {
        data = JSON.parse(data);
        permissions = Mock.all('permissions');

        for (var i = data.length - 1; i >= 0; i--) {
            permissions[i].permission = data[i].permission;
        }

        Mock.update('permissions', permissions);

        return [200, {data: permissions}];
    });
};

module.exports = {permissionsMock, permissionsList};
