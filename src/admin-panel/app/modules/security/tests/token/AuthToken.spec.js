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

/* global describe: false, beforeEach: false, inject: false, it: false, expect: false, jasmine: false */


describe('Unit: Authorization service', () => {
    var oauthResource, OAuthToken, tokenStorage;

    beforeEach(module('clearcode.tm.security', ($provide) => {
        tokenStorage = {
            add: jasmine.createSpy('add').and.returnValue({}),
            remove: jasmine.createSpy('remove').and.returnValue({}),
            getItem: jasmine.createSpy('getItem').and.returnValue({}),
            getToken: jasmine.createSpy('getItem').and.returnValue({})
        };

        $provide.value('clearcode.tm.security.tokenStorage', tokenStorage);
    }));

    beforeEach(inject([
        'clearcode.tm.security.oauthResource',
        (_oauthResource_) => {
            oauthResource = _oauthResource_;
        }
    ]));

    it('should be defined', () => {
        OAuthToken = oauthResource.getEntity();
        expect(OAuthToken).toBeDefined();
    });

    describe('when call save method', () => {
        it('should add token to token storage', () => {
            var entity = oauthResource.getEntity();

            entity.save();

            expect(tokenStorage.add).toHaveBeenCalled();
        });
    });

    describe('when call save remove', () => {
        it('should remove token from token storage', () => {
            var entity = oauthResource.getEntity();

            entity.remove();

            expect(tokenStorage.remove).toHaveBeenCalled();
        });
    });
});
