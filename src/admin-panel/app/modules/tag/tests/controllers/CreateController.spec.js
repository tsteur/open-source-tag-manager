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


describe('Unit: CreateController', () => {
    var CreateController, tagResource, variableResource, $scope, tag;

    beforeEach(module('clearcode.tm.tag', ($provide) => {
        tagResource = {
            getEntityObject: jasmine.createSpy('getEntityObject').and.returnValue({
                then: () => 'getEntityObject has been called'
            })
        };

        variableResource = {
            queryAllAvailable: jasmine.createSpy('queryAllAvailable').and.returnValue({
                then: () => 'queryAllAvailable has been called'
            })
        };

        $provide.value('clearcode.tm.tag.tagResource', tagResource);
        $provide.value('clearcode.tm.variable.variableResource', variableResource);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            CreateController = $controller('clearcode.tm.tag.CreateController', {
                $scope: $scope
            });
        }
    ));


    it('should be defined', () => {
        expect(CreateController).toBeDefined();
    });

    describe('when call constructor method', () => {
        it('should create Tag entity', () => {
            expect(tagResource.getEntityObject).toHaveBeenCalled();
        });
    });

    describe('when call showExistingTriggers method', () => {
        it('should call prepareExistingTriggersList method', () => {
            spyOn(CreateController, 'prepareExistingTriggersList');

            CreateController.showExistingTriggers();

            expect(CreateController.prepareExistingTriggersList).toHaveBeenCalled();
        });

        it('should clear chosenTriggers property and set showListTriggersForm on true', () => {
            CreateController.showExistingTriggers();

            expect(CreateController.chosenTriggers.length).toBe(0);
            expect(CreateController.showListTriggersForm).toBeTruthy();
        });
    });

    describe('when call prepareExistingTriggersList method', () => {
        it('should call query method from triggerResource', () => {
            CreateController.prepareExistingTriggersList();

            expect(CreateController.types.length).toBe(4);
            expect(CreateController.existingTable).toBeDefined();
        });
    });

    describe('when call addExistingTriggers method', () => {
        it('should properly push chosen triggers into array', () => {
            CreateController.chosenTriggers = [
                {
                    trigger: 'test1'
                },
                {
                    trigger: 'test2'
                }
            ];

            CreateController.tag.triggers = [];
            CreateController.addExistingTriggers();

            expect(CreateController.tag.triggers.length).toBe(2);
        });
    });

    describe('when call submitForm method', () => {
        tag = {
            save: jasmine.createSpy('save').and.returnValue({
                then: () => 'save called'
            })
        };

        it('should call save method on Tag', () => {
            CreateController.submitForm(tag);

            expect(tag.save).toHaveBeenCalled();
        });
    });
});
