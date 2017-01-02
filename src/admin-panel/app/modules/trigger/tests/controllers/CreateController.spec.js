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
    var CreateController, triggerResource, $scope, condition, conditionResource, trigger, form, PageInfo, $translate;

    beforeEach(module('clearcode.tm.trigger', ($provide) => {
        PageInfo = {
            clear: () => PageInfo,
            add: () => PageInfo,
            broadcast: jasmine.createSpy('broadcast').and.returnValue({
                then: () => PageInfo
            })
        };

        trigger = {
            save: jasmine.createSpy('save').and.returnValue({
                then: () => 'save has been called'
            })
        };

        triggerResource = {
            getEntityObject: jasmine.createSpy('getEntityObject').and.returnValue({
                then: () => 'getEntityObject has been called'
            })
        };

        conditionResource = {
            getEntityObject: jasmine.createSpy('getEntityObject').and.returnValue({
                then: () => 'getEntityObject has been called'
            })
        };

        condition = {
            getArrayOfTypes: jasmine.createSpy('getArrayOfTypes').and.returnValue({
                then: () => {
                    return { then: () => 'getArrayOfTypes has been called' }
                }
            }),
            getVariables: jasmine.createSpy('getVariables').and.returnValue({
                then: () => 'getVariables has been called'
            }),
            getActions: jasmine.createSpy('getActions').and.returnValue({
                then: () => 'getActions has been called'
            }),
            getRequired: jasmine.createSpy('getRequired').and.returnValue({
                then: () => 'getRequired has been called'
            })
        };

        $translate = jasmine.createSpy('$translate');
        $translate.storageKey = jasmine.createSpy('storageKey');
        $translate.storage = jasmine.createSpy('storage');
        $translate.preferredLanguage = jasmine.createSpy('preferredLanguage');
        $translate.and.callFake( () => {
            return {
                then: () => {
                    PageInfo.clear()
                        .add('test', 'tags', {})
                        .add('test')
                        .broadcast();
                }
            }
        });

        $provide.value('clearcode.tm.trigger.triggerResource', triggerResource);
        $provide.value('clearcode.tm.condition.condition', condition);
        $provide.value('clearcode.tm.condition.conditionResource', conditionResource);
        $provide.value('clearcode.tm.pageInfo.pageInfo', PageInfo);
        $provide.value('$translate', $translate);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            CreateController = $controller('clearcode.tm.trigger.CreateController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(CreateController).toBeDefined();
    });

    describe('when call constructor method', () => {
        it('should create Trigger entity', () => {
            expect(triggerResource.getEntityObject).toHaveBeenCalled();
            expect(condition.getArrayOfTypes).toHaveBeenCalled();
        });

        it('should create Condition entity', () => {
            expect(conditionResource.getEntityObject).toHaveBeenCalled();
        });
    });

    describe('when call addTrigger method', () => {
        it('should call save method from Trigger', () => {
            CreateController.addTrigger('test', trigger);
            expect(trigger.save).toHaveBeenCalled();
        });
    });

    describe('when call setType method', () => {
        beforeEach(() => {
            CreateController.typesArray = ['test'];
            CreateController.setType(0);
        });

        it('should get variables', () => {
            expect(condition.getVariables).toHaveBeenCalled();
        });

        it('should get actions', () => {
            expect(condition.getActions).toHaveBeenCalled();
        });

        it('should get required fields', () => {
            expect(condition.getRequired).toHaveBeenCalled();
        });
    });

    describe('when call addCondition method', () => {
        beforeEach(() => {
            CreateController.variables = [];
            CreateController.trigger.addCondition = jasmine.createSpy('addCondition').and.returnValue({
                then: () => 'addCondition has been called'
            });

            CreateController.actions = [];
            CreateController.actions.push({
                type: 'test'
            });

            CreateController.variables.push(
                {
                    name: 'test',
                    type: 'test'
                }
            );

            CreateController.addCondition();
        });

        it('should properly set conditions variables', () => {
            expect(conditionResource.getEntityObject).toHaveBeenCalled();
            expect(CreateController.condition.variable).toBe('test');
            expect(CreateController.condition.condition).toBe('test');
        });

        it('should call addCondition method on Triggers entity', () => {
            expect(CreateController.trigger.addCondition).toHaveBeenCalled();
        });
    });

    describe('when call validateTrigger method', () => {
        beforeEach(() => {
            form = {
                $name: 'test'
            };

            CreateController.trigger.conditions = ['test'];

            CreateController.scope = {
                test: {
                    $setPristine: jasmine.createSpy('setPristine').and.returnValue({
                        then: () => 'setPristine has been called'
                    }),
                    name: {
                        $valid: true
                    }
                }
            };
        });

        it('should return true when everything is alright', () => {
            CreateController.scope.test['conditionValue[0]'] = {};
            CreateController.scope.test['conditionValue[0]'].$invalid = false;

            var validate = CreateController.validateTrigger(form);

            expect(CreateController.scope[form.$name].$setPristine).toHaveBeenCalled();
            expect(validate).toBeTruthy();
        });

        it('should return false when trigger is invalid', () => {
            CreateController.scope.test.name.$valid = false;

            var validate = CreateController.validateTrigger(form);

            expect(validate).toBeFalsy();
        });

        it('should return true when trigger hasn\'t got any conditions', () => {
            CreateController.trigger.conditions = [];

            var validate = CreateController.validateTrigger(form);

            expect(validate).toBeTruthy();
        });

        it('should return false when conditions are invalid', () => {
            CreateController.scope.test['conditionValue[0]'] = {};
            CreateController.scope.test['conditionValue[0]'].$invalid = true;

            var validate = CreateController.validateTrigger(form);

            expect(validate).toBeFalsy();
        });
    });

    describe('when call isTypeRequired method', () => {
        beforeEach(() => {
            CreateController.required = [
                {
                    id: 1,
                    type: 'test1',
                    name: 'Test 1'
                }, {
                    id: 2,
                    type: 'test2',
                    name: 'Test 2'
                }, {
                    id: 3,
                    type: 'test3',
                    name: 'Test 3'
                }
            ];
        });

        it('should find type in required types', () => {
            var required = CreateController.isTypeRequired(CreateController.required[1].name);

            expect(required).toBeTruthy();
        });

        it('should\'t find type in required types', () => {
            var required = CreateController.isTypeRequired('test4');

            expect(required).toBeFalsy();
        });
    });

    describe('when call getVariableName method', () => {
        beforeEach(() => {
            CreateController.required = [
                {
                    id: 1,
                    type: 'test1',
                    name: 'testName1'
                }, {
                    id: 2,
                    type: 'test2',
                    name: 'testName2'
                }, {
                    id: 3,
                    type: 'test3',
                    name: 'testName3'
                }
            ];

            CreateController.variables = [
                {
                    id: 4,
                    type: 'test4',
                    name: 'testName4'
                }, {
                    id: 5,
                    type: 'test5',
                    name: 'testName5'
                }, {
                    id: 6,
                    type: 'test6',
                    name: 'testName6'
                }
            ];
        });

        it('should find name in variables', () => {
            var variable = CreateController.getVariableName(CreateController.variables[1].name);

            expect(variable).toBe('testName5');
        });

        it('should find name in required', () => {
            var variable = CreateController.getVariableName(CreateController.required[1].name);

            expect(variable).toBe('testName2');
        });

        it('should\'t find name', () => {
            var variable = CreateController.getVariableName('test7');

            expect(variable).toBeFalsy();
        });
    });

    describe('when call getConditionName method', () => {
        beforeEach(() => {
            CreateController.actions = [
                {
                    id: 1,
                    type: 'test1',
                    name: 'testName1'
                }, {
                    id: 2,
                    type: 'test2',
                    name: 'testName2'
                }, {
                    id: 3,
                    type: 'test3',
                    name: 'testName3'
                }
            ];
        });

        it('should find name in actions array', () => {
            var required = CreateController.getConditionName(CreateController.actions[1].name);

            expect(required).toBe('testName2');
        });

        it('should\'t find name in actions array', () => {
            var required = CreateController.getConditionName('test4');

            expect(required).toBeFalsy();
        });
    });

    describe('when call leaveFormInsideTag method', () => {
        it('should broadcast new page infos', () => {
            CreateController.currentContainer = {
                $container: {
                    name: 'testName',
                    id: 1
                }
            };

            CreateController.leaveFormInsideTag();

            expect(PageInfo.broadcast).toHaveBeenCalled();
        });
    });

    describe('when call showFormForSynchronousTrigger method', () => {
        it('should return true if trigger is added to any synchronous tag', () => {
            CreateController.trigger.isAddedToSynchronousTag = true;
            expect(CreateController.showFormForSynchronousTrigger()).toBe(true);
        });

        it('should return false if trigger is not added to synchronous tag', () => {
            CreateController.trigger.isAddedToSynchronousTag = false;
            expect(CreateController.showFormForSynchronousTrigger()).toBe(false);
        });

        it('should return true if triggerForm is embeded inside synchronous tag edit form', () => {
            $scope.tagTemplateTab = 'sync';
            expect(CreateController.showFormForSynchronousTrigger()).toBe(true);
        });

        it('should return false if triggerForm is embeded inside asynchronous tag edit form', () => {
            $scope.tagTemplateTab = 'async';
            expect(CreateController.showFormForSynchronousTrigger()).toBe(false);
        });
    });

    describe('when call submitForm method', () => {
        it('should call save method on Trigger', () => {
            CreateController.submitForm(trigger);

            expect(trigger.save).toHaveBeenCalled();
        });
    });
});
