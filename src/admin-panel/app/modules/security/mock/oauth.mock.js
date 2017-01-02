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
 * @name security.oauthMock
 *
 */
let oauthMock = ($httpBackend) => {
    /* eslint-disable */
    let accessToken = {
            access_token: 'Y2FhN2IwY2U1YzI2ODU2M2FkMzMxMGM2NDQ0ODkxODJlYTkzZTllNmZhZmZkZmE3Yjc5ZTVkMTE3ZmNhMmM0Mw',
            expires_in: 3600,
            token_type: 'bearer',
            scope: 'user',
            refresh_token: 'NzYxMGExYzU2MzQzZjNkYTc4Y2E4MjY4OTM1NmVhNzMxNzZlMzJkNGYxNjU2ODA3ZWQ4MWUzZDI0MmVhZjNhZQ'
        },
        error = {
            'code': 400,
            'message': 'Validation Failed',
            'errors':{
                'fields': {
                    'login': [
                        'This value should not be blank.',
                        'This value should not be null.'
                    ],
                    'password': [
                        'This value should not be null.'
                    ]
                }
            }
        };
    /* eslint-enable */

    $httpBackend.whenPOST(/\/api\/oauth\/v2\/token/).respond((method, url, data) => {
        data = JSON.parse(data);
        let response;
        let usersTable = ['test_1@test.cc', 'test_2@test.cc', 'test_3@test.cc'];

        if (usersTable.indexOf(data.username) !== -1 && data.password === 'testing') {
            response = [200, accessToken];
        } else {
            response = [400, error];
        }

        return response;
    });

    $httpBackend.whenDELETE(/\/api\/oauth\/v2\/token/).respond(() => {
        return [204];
    });
};

export default oauthMock;
