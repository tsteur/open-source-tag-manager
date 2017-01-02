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

 /* global describe: false, jasmine: false, beforeEach: false, inject: false, it: false, expect: false */


describe('Unit: EditController', () => {
    var EditController, containerResource, container, $scope, currentContainer;

    beforeEach(module('clearcode.tm.tagContainer', ($provide) => {
        container = {
            save: jasmine.createSpy('save').and.returnValue({
                then: () => 'save called'
            }),
            remove: jasmine.createSpy('remove').and.returnValue({
                then: () => 'remove called'
            })
        };

        containerResource = {
            getEntityObject: jasmine.createSpy('getEntityObject').and.returnValue({
                then: () => 'getEntityObject called'
            }),
            get: jasmine.createSpy('get').and.returnValue({
                then: () => container
            })
        };

        currentContainer = {
            getContainer: jasmine.createSpy('getContainer').and.returnValue({
                then: () => 'getContainer called'
            })
        };

        $provide.value('clearcode.tm.tagContainer.containerResource', containerResource);
        $provide.value('clearcode.tm.tagContainer.currentContainer', currentContainer);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            EditController = $controller('clearcode.tm.tagContainer.EditController', {
                $scope: $scope
            });

            EditController.container = container;
        }
    ));

    it('should be defined', () => {
        expect(EditController).toBeDefined();
    });

    it('should get call getEntityObject method from containerResource', () => {
        expect(containerResource.getEntityObject).toHaveBeenCalled();
    });

    it('should get call get method from containerResource', () => {
        expect(containerResource.get).toHaveBeenCalled();
    });

    describe('when call submitForm method', () => {
        it('should call save method on Container', () => {
            EditController.submitForm(container);

            expect(container.save).toHaveBeenCalled();
        });
    });

    describe('when call removeContainer method', () => {
        it('should call remove method on Container object', () => {
            EditController.removeContainer(container);

            expect(container.remove).toHaveBeenCalled();
        });
    });
});
