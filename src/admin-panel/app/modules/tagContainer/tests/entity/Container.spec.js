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


describe('Unit: Container entity', () => {
    var containerResource, container;

    beforeEach(angular.mock.module('clearcode.tm.tagContainer'));
    beforeEach(angular.mock.inject([
        'clearcode.tm.tagContainer.containerResource',
        (_containerResource_) => {
            containerResource = _containerResource_;

            container = containerResource.getEntityObject();

            spyOn(containerResource, 'put');
            spyOn(containerResource, 'post');
            spyOn(containerResource, 'delete');
        }
    ]));

    it('should be defined', () => {
        expect(container).toBeDefined();
    });

    describe('when call save method', () => {
        it('should call put method of resource when id is defined', () => {
            container.id = 15;
            container.save();

            expect(containerResource.put).toHaveBeenCalled();
        });

        it('should call post method of resource when id is defined', () => {
            container.save();

            expect(containerResource.post).toHaveBeenCalled();
        });
    });

    describe('when call remove method', () => {
        it('should call delete method of resource when id is defined', () => {
            container.id = 15;
            container.remove();

            expect(containerResource.delete).toHaveBeenCalled();
        });

        it('should not call delete method of resource when id is not defined', () => {
            container.remove();

            expect(containerResource.delete).not.toHaveBeenCalled();
        });
    });

    describe('when call hasPermission method', () => {
        it('should properly check permissions', () => {
            container.permissions = ['publish', 'view', 'owner'];

            expect(container.hasPermission('publish')).toBeTruthy();
            expect(container.hasPermission('view')).toBeTruthy();
            expect(container.hasPermission('edit')).toBeFalsy();
            expect(container.hasPermission('owner')).toBeTruthy();
        });
    });
});
