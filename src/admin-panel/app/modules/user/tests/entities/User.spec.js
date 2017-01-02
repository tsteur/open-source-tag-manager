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

/* global describe: false, jasmine: false, beforeEach: false, it: false, expect: false */


describe('Unit: User entity', () => {
    var userResource, user;

    beforeEach(angular.mock.module('clearcode.tm.user'));

    beforeEach(angular.mock.inject([
        'clearcode.tm.user.userResource',
        (_userResource_) => {
            userResource = _userResource_;

            user = userResource.getEntity();

            spyOn(userResource, 'put');
            spyOn(userResource, 'post');
            spyOn(userResource, 'delete');
        }
    ]));

    it('should be defined', () => {
        expect(user).toBeDefined();
    });

    describe('when call save method', () => {
        it('should call put method of resource when id is defined', () => {
            user.id = 15;
            user.save();

            expect(userResource.put).toHaveBeenCalled();
        });

        it('should call put method of resource when id is defined', () => {
            user.save();

            expect(userResource.post).toHaveBeenCalled();
        });
    });

    describe('when call remove method', () => {
        it('should call delete method of resource when id is defined', () => {
            user.id = 15;
            user.remove();

            expect(userResource.delete).toHaveBeenCalled();
        });

        it('should not call delete method of resource when id is not defined', () => {
            user.remove();

            expect(userResource.delete).not.toHaveBeenCalled();
        });
    });
});
