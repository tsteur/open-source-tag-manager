/**
 * Created by marnits on 01/03/16.
 */
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

/* global describe: false, beforeEach: false, it: false, expect: false */


describe('Unit: TokenStorage service', () => {
    let MODULE_NAME = 'clearcode.tm.security';
    let tokenStorage, item, localstorage;

    beforeEach(angular.mock.module(MODULE_NAME, ($provide) => {
        localstorage = {
            accessToken: undefined,
            removeItem: jasmine.createSpy('removeItem').and.returnValue({
                then: () => 'removeItem called'
            })
        };

        $provide.value('$localStorage', localstorage);
    }));

    beforeEach(angular.mock.inject([
        `${MODULE_NAME}.tokenStorage`,
        (_tokenStorage_) => {
            tokenStorage = _tokenStorage_;
        }
    ]));
    describe('getItem method', () => {
        it('should return undefined when value of accessToken is undefined', () => {
            item = tokenStorage.getItem();

            expect(item).not.toBeDefined();
        });

        it('should return  accessToken when is set', () => {
            localstorage.accessToken = '1234';
            item = tokenStorage.getItem();

            expect(item).toBe(1234);
        });
    });

    describe('getToken method', () => {
        it('should return string with capitalized first letter of tokenType', () => {
            localstorage.accessToken = '{"tokenType": "test","accessToken": "test"}';
            let token = tokenStorage.getToken();

            expect(token).toBe('Test test');
        });
    });

    describe('addToken method', () => {
        it('should add accessToken into localStorage', () => {
            localstorage.accessToken = undefined;
            tokenStorage.addItem('test');

            expect(tokenStorage.getItem()).toBe('test');
        });
    });

    describe('removeToken method', () => {
        it('should remove accessToken from localStorage', () => {
            tokenStorage.removeItem('accessToken');

            expect(localstorage.removeItem).toHaveBeenCalled();
        });
    });
});
