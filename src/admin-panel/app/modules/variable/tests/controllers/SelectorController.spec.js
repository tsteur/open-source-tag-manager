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


describe('Unit: SelectorController', () => {
    var SelectorController, condition, stateParams, $scope, element, ngModelController, listOpened = true;

    beforeEach(module('clearcode.tm.variable', ($provide) => {
        condition = {
            allVariables: jasmine.createSpy('allVariables').and.returnValue({
                then: () => {
                    return 'allVariables fired';
                }
            })
        };

        ngModelController = {
            $render: jasmine.createSpy('$render'),
            $setViewValue: jasmine.createSpy('$setViewValue')
        };

        stateParams = {
            containerId: 1
        };

        $provide.value('clearcode.tm.condition.condition', condition);
        $provide.value('$stateParams', stateParams);
    }));

    beforeEach(inject(
        ($controller, $rootScope, $compile) => {
            element = angular.element(`
                <input type="text" name="test" ng-model="view.test" variable-selector>`
            );
            $scope = $rootScope.$new();

            SelectorController = $controller('clearcode.tm.variable.SelectorController', {
                $scope: $scope
            });

            element = $compile(element)($scope);
            element.wrap = jasmine.createSpy('wrap');

            $scope.$digest();
        }
    ));

    describe('when constructor execute ', () => {
        it('should fire allVariables method from condition', () => {
            expect(condition.allVariables).toHaveBeenCalled();
        });
    });

    describe('when init execute ', () => {
        beforeEach(()=> {
            SelectorController.init(element, ngModelController);
        });

        it('should set properties', () => {
            expect(SelectorController.element).toEqual(jasmine.any(Object));
            expect(SelectorController.ngModel).toEqual(jasmine.any(Object));
            expect(SelectorController.ulElement).toEqual(jasmine.any(Object));
        });

        it('should set parent properly', () => {
            expect(element.parent().hasClass('cc-select')).toBeTruthy();
        });

        it('should set another child properly', () => {
            expect(element.parent().find('span').hasClass('input-group-addon')).toBeTruthy();
        });
    });

    describe('when toggleVariablesList execute', () => {
        beforeEach(()=> {
            SelectorController.init(element, ngModelController);
            SelectorController.ulElement.hasClass = () => {
                return listOpened;
            }
        });

        it('should add {{ when element value is empty and list is closed', () => {
            expect(element.val()).toBe('');
            listOpened = false;
            
            SelectorController.toggleVariablesList({stopPropagation: () => {
                return true;
            }});
            
            expect(element.val()).toBe('{{');
        });

        it('should remove {{ when list is opened', () => {
            element.val('test {{');
            listOpened = true;
            
            SelectorController.toggleVariablesList({stopPropagation: () => {
                return true;
            }});
            
            expect(element.val()).toBe('test');
        });

        it('should add {{ when element value contains text', () => {
            element.val('test');
            listOpened = false;

            SelectorController.toggleVariablesList({stopPropagation: () => {
                return true;
            }});

            expect(element.val()).toBe('test {{');
        });

        it('shouldn\'t add {{ when element value ends with {{', () => {
            element.val('test {{');
            listOpened = false;

            SelectorController.toggleVariablesList({stopPropagation: () => {
                return true;
            }});

            expect(element.val()).toBe('test {{');
        });
    });

    describe('when addVariable execute', () => {
        it('should add value and }} at the end of element value', () => {
            let variable = {
                name: 'test variable'
            };

            SelectorController.init(element, ngModelController);
            element.val('{{');

            SelectorController.addVariable(variable);
            expect(ngModelController.$setViewValue).toHaveBeenCalledWith('{{ test variable }}');
            expect(ngModelController.$render).toHaveBeenCalled();
        });
    });

    describe('when isVariablesListVisible execute', () => {
        beforeEach(()=> {
            SelectorController.init(element, ngModelController);
            SelectorController.ulElement.hasClass = () => {
                return listOpened;
            };
        });

        it('should return true if list is open', () => {
            listOpened = true;
            expect(SelectorController.isVariablesListVisible()).toBeTruthy();
        });

        it('should return true if list is open', () => {
            listOpened = false;
            expect(SelectorController.isVariablesListVisible()).toBeFalsy();
        });
    });

    describe('when closeVariablePrompt execute', () => {
        beforeEach(()=> {
            SelectorController.init(element, ngModelController);
            SelectorController.ulElement.hasClass = () => {
                return true;
            };
            SelectorController.ulElement.removeClass = () => {
                return true;
            };
        });
        it('should remove {{ from the end of element value', () => {
            element.val('test {{');

            SelectorController.closeVariablePrompt({stopPropagation: () => {
                return true;
            }});

            expect(element.val()).toBe('test');
        });

        it('shouldn\'t remove anything when ends with some text', () => {
            element.val('test');

            SelectorController.closeVariablePrompt({stopPropagation: () => {
                return true;
            }});

            expect(element.val()).toBe('test');
        });

        it('shouldn\'t remove anything when element value is empty', () => {
            element.val('');

            SelectorController.closeVariablePrompt({stopPropagation: () => {
                return true;
            }});

            expect(element.val()).toBe('');
        });
    });
});
