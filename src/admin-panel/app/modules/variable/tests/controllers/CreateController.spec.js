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
    var CreateController, variableResource, $scope, typeResource, variable, PageInfo;

    beforeEach(module('clearcode.tm.variable', ($provide) => {
        PageInfo = {
            clear: () => {
                return PageInfo;
            },
            add: () => {
                return PageInfo;
            },
            broadcast: jasmine.createSpy('broadcast').and.returnValue({
                then: () => {
                    return PageInfo;
                }
            })
        };

        variable = {
            save: jasmine.createSpy('save').and.returnValue({
                then: () => {
                    return 'save has been called';
                }
            })
        };

        variableResource = {
            getEntityObject: jasmine.createSpy('getEntityObject').and.returnValue({
                then: () => {
                    return 'getEntityObject has been called';
                }
            })
        };

        typeResource = {
            query: jasmine.createSpy('query').and.returnValue({
                then: () => {
                    return 'query has been called';
                }
            })
        };

        $provide.value('clearcode.tm.variable.variableResource', variableResource);
        $provide.value('clearcode.tm.variable.variableTypeResource', typeResource);
        $provide.value('clearcode.tm.pageInfo.pageInfo', PageInfo);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();
            CreateController = $controller('clearcode.tm.variable.CreateController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(CreateController).toBeDefined();
    });

    describe('when call constructor method', () => {
        it('should create Variable entity', () => {
            expect(variableResource.getEntityObject).toHaveBeenCalled();
        });

        it('should call for variable types', () => {
            expect(typeResource.query).toHaveBeenCalled();
        });
    });

    describe('when call setVariableType method', () => {
        it('should set type to variable', () => {
            var type = {id: 1, name: 'typeName'};
            CreateController.setVariableType(type);
            expect(CreateController.variable.type).toBe(type);
        });
    });

    describe('when call submitForm method', () => {
        it('should call save method on Trigger', () => {
            CreateController.submitForm(variable);
            expect(variable.save).toHaveBeenCalled();
        });
    });
});
