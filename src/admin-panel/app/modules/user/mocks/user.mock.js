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
var usersList  = [{
        id: 1,
        email: 'test_1@test.cc',
        first_name: 'Andy',
        last_name: 'Smith',
        display_name: 'Andy Smith',
        status: true,
        roles: ['ROLE_SUPER_ADMIN'],
        created_at: '20.03.2015'
    },
    {
        id: 2,
        email: 'test_2@test.cc',
        first_name: 'John',
        last_name: 'Smith',
        display_name: 'John Smith',
        status: false,
        roles: ['ROLE_USER', 'ROLE_CONTAINERS_CREATE'],
        created_at: '20.03.2015'
    },
    {
        id: 3,
        email: 'test_3@test.cc',
        first_name: 'Jon',
        last_name: 'Smith',
        display_name: 'John Smith',
        status: true,
        roles: ['ROLE_USER'],
        created_at: '20.03.2015'
    },
    {
        id: 4,
        email: 'test_4@test.cc',
        first_name: 'Andy',
        last_name: 'Smith',
        display_name: 'Andy Smith',
        status: true,
        roles: ['ROLE_SETTINGS_EDIT'],
        created_at: '20.03.2015'
    },
    {
        id: 5,
        email: 'test_5@test.cc',
        first_name: 'John',
        last_name: 'Smith',
        display_name: 'John Smith',
        status: false,
        roles: ['ROLE_USER_LIST', 'ROLE_USER_EDIT', 'ROLE_SETTINGS_EDIT'],
        created_at: '20.03.2015'
    },
    {
        id: 6,
        email: 'test_6@test.cc',
        first_name: 'Jon',
        last_name: 'Smith',
        display_name: 'John Smith',
        status: true,
        roles: ['ROLE_USER_LIST', 'ROLE_USER_EDIT', 'ROLE_SETTINGS_EDIT'],
        created_at: '20.03.2015'
    },
    {
        id: 7,
        email: 'test_7@test.cc',
        first_name: 'Andy',
        last_name: 'Smith',
        display_name: 'Andy Smith',
        status: true,
        roles: ['ROLE_USER_LIST', 'ROLE_USER_EDIT', 'ROLE_SETTINGS_EDIT'],
        created_at: '20.03.2015'
    },
    {
        id: 8,
        email: 'test_8@test.cc',
        first_name: 'John',
        last_name: 'Smith',
        display_name: 'John Smith',
        status: false,
        roles: ['ROLE_USER_LIST', 'ROLE_USER_EDIT', 'ROLE_SETTINGS_EDIT'],
        created_at: '20.03.2015'
    },
    {
        id: 9,
        email: 'test_9@test.cc',
        first_name: 'Jon',
        last_name: 'Smith',
        display_name: 'John Smith',
        status: true,
        roles: ['ROLE_USER_LIST', 'ROLE_USER_EDIT', 'ROLE_SETTINGS_EDIT'],
        created_at: '20.03.2015'
    },
    {
        id: 10,
        email: 'test_10@test.cc',
        first_name: 'Andy',
        last_name: 'Smith',
        display_name: 'Andy Smith',
        status: true,
        roles: ['ROLE_USER_LIST', 'ROLE_USER_EDIT', 'ROLE_SETTINGS_EDIT'],
        created_at: '20.03.2015'
    },
    {
        id: 11,
        email: 'test_11@test.cc',
        first_name: 'John',
        last_name: 'Smith',
        display_name: 'John Smith',
        status: false,
        roles: ['ROLE_USER_LIST', 'ROLE_USER_EDIT', 'ROLE_SETTINGS_EDIT'],
        created_at: '20.03.2015'
    },
    {
        id: 12,
        email: 'test_12@test.cc',
        first_name: 'Jon',
        last_name: 'Smith',
        display_name: 'John Smith',
        status: true,
        roles: ['ROLE_USER_LIST', 'ROLE_USER_EDIT', 'ROLE_SETTINGS_EDIT'],
        created_at: '20.03.2015'
    }
];

var requestError = {
    'code': 400,
    'message': 'Validation Failed',
    'errors':{
        'fields': {
            'email': [
                'This value should not be blank.',
                'This value should not be null.'
            ]
        }
    }
};

var success_change = {
    message: 'Password has been changed.'
};

var reset_message = {
    message: 'Activation link has been successfully send.'
};

var token_reset = {
    token: 'asdfaosidhfoasudhf9ashfoiaushd'
};
/* eslint-enable */

/**
 * @name user.userMock
 *
 * @param {$httpBackend} $httpBackend
 * @param {ngTableParams} ngTableParams
 * @param $filter
 * @param {$mockProvider} Mock
 */
var userMock = ($httpBackend, ngTableParams, $filter, Mock) => {
    var users = Mock.all('users');

    var id = users[users.length - 1].id + 1;

    $httpBackend.whenDELETE(/\api\/users\/(.*)/).respond((method, url) => {
        var matches = url.match(/\/api\/users\/(.*)/);

        matches = matches[1].split('?');
        users = Mock.remove('users', parseInt(matches[0]));

        return [204];
    });

    $httpBackend.whenGET(/\/api\/users\/(.*)\?*/).respond((method, url) => {
        var matches = url.match(/\/api\/users\/(.*)/);

        matches = matches[1].split('?');

        if (matches[0] === 'me') {
            return [200, {data: users[0]}];
        } else {
            return [200, {data: Mock.get('users', parseInt(matches[0]))}];
        }
    });

    $httpBackend.whenGET(/\/api\/users\?*/).respond((method, url, data) => {
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

        data = users;
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

    $httpBackend.whenPOST(/\/api\/users/).respond(
       (method, url, data) => {
           data = JSON.parse(data);

           /* eslint-disable */
           var newUser = {
                id: parseInt(id),
                email: data.email,
                first_name: data.firstName,
                last_name: data.lastName,
                created_at: '20.03.2015',
                roles: ['user']
           };
           /* eslint-enable */

           Mock.add('users', newUser);
           id++;

           return [201, {data: newUser}];
       }
    );

    $httpBackend.whenPUT(/\/api\/users\/(.*)/).respond(
        (method, url, data) => {
            data = JSON.parse(data);

            var matches = url.match(/\/api\/users\/(.*)/);

            matches = matches[1].split('?');

            var user = Mock.get('users', parseInt(matches[0]));

            /* eslint-disable */
            user.first_name = data.firstName;
            user.last_name = data.lastName;
            /* eslint-enable */

            Mock.update('users', user);

            return [200, {data: user}];
        }
    );

    $httpBackend.whenPOST(/\/reset-password\/request/).respond((method, url) => {
        var query = url.split('?')[1],
            requestParams = {};

        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            requestParams[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }

        if (requestParams.username === users[0].email) {
            /* eslint-disable */
            return [200, reset_message];
            /* eslint-enable */
        } else {
            return [400, requestError];
        }
    });

    $httpBackend.whenGET(/\/reset-password\/token\/(.*)/).respond(() => {
        /* eslint-disable */
        return [200, token_reset];
        /* eslint-enable */
    });

    $httpBackend.whenPOST(/\/reset-password\/token\/(.*)/).respond(() => {
        /* eslint-disable */
        return [200, success_change];
        /* eslint-enable */
    });

    $httpBackend.whenPOST(/\/api\/users\/me\/change-password/).respond((method, url, data) => {
        data = JSON.parse(data);

        /* eslint-disable */
        if (data.current_password === 'testing' && data.new.first === data.new.second) {
            return [200, success_change];
        } else {
            return [400, {}];
        }
        /* eslint-enable */
    });
};

module.exports = {userMock, usersList};
