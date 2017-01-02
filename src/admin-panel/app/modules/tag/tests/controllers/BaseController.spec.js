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


describe('Unit: BaseController', () => {
    const TAG_TEMPLATE_TAB_ASYNC = 'async',
        TAG_TEMPLATE_TAB_SYNC = 'sync',
        TEMPLATE_ASYNCHRONOUS = 0,
        TEMPLATE_ASYNCHRONOUS_WITH_SUBTYPES = 1,
        TEMPLATE_SYNCHRONOUS_NOT_TRACKING = 2,
        TEMPLATES = [
            {
                name: 'piwik',
                isSynchronous: false,
                types: [],
                isTracking: true
            },
            {
                name: 'google analytics',
                isSynchronous: false,
                types: [1, 2],
                isTracking: true
            },
            {
                name: 'optimizely',
                isSynchronous: true,
                types: [1],
                isTracking: false
            }
        ];

    let BaseController, tagObject, tagResource, variableResource, variables, $translate, translations, templatesStorage, $scope;

    beforeEach(module('clearcode.tm.tag', ($provide) => {
        tagObject = {
            addTrigger: jasmine.createSpy('getEntityObject'),
            editTrigger: jasmine.createSpy('getEntityObject')
        };

        tagResource = {
            getEntityObject: jasmine.createSpy('getEntityObject').and.returnValue(tagObject),
            get: jasmine.createSpy('get').and.returnValue({
                then: () => 'get has been called'
            })
        };

        variables = {
            data: ['Random', 'Lorem ipsum']
        };

        variableResource = {
            queryAllAvailable: jasmine.createSpy('queryAllAvailable').and.returnValue({
                then: (callback) => {
                    callback(variables);
                    return 'queryAllAvailable has been called';
                }
            })
        };

        templatesStorage = {
            getAll: jasmine.createSpy('getAll').and.returnValue(TEMPLATES),
            get: jasmine.createSpy('get').and.callFake(id => {
                return TEMPLATES[id];
            }),
            setListener: jasmine.createSpy('setListener').and.returnValue({
                then: () => 'setListener has been called'
            })
        };

        translations = {};
        translations['Place the code'] = 'Place the code';

        $translate = jasmine.createSpy('$translate').and.returnValue({
            then: (callback) => {
                callback(translations);
                return '$translate called';
            }
        });

        $translate.storageKey = jasmine.createSpy('storageKey');
        $translate.storage = jasmine.createSpy('storage');
        $translate.preferredLanguage = jasmine.createSpy('preferredLanguage');

        $provide.value('clearcode.tm.tag.tagResource', tagResource);
        $provide.value('clearcode.tm.tag.templatesStorage', templatesStorage);
        $provide.value('clearcode.tm.variable.variableResource', variableResource);
        $provide.value('$translate', $translate);
        $provide.value('$timeout', callback => {
            callback();
        });
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();
            BaseController = $controller('clearcode.tm.tag.EditController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(BaseController).toBeDefined();
    });

    describe('when call constructor method', () => {
        it('should create Tag entity', () => {
            expect(tagResource.getEntityObject).toHaveBeenCalled();
        });

        it('should read all available templates', () => {
            expect(templatesStorage.getAll).toHaveBeenCalled();
        });

        it('should add listener for templates that are loaded after the controller is created', () => {
            expect(templatesStorage.setListener).toHaveBeenCalled();
        });

        it('should filter synchronous templates', () => {
            expect(BaseController.synchronousTemplates.length).toBe(1);
        });

        it('should filter asynchronous templates', () => {
            expect(BaseController.asynchronousTemplates.length).toBe(2);
        });

        it('should translate placeholder text for text editor', () => {
            expect($translate).toHaveBeenCalledWith(['Place the code']);
            expect(BaseController.textEditorConfig.placeholder).toBe(translations['Place the code']);
        });

        it('should retrieve list of variables that can be inserted into editor', () => {
            expect(variableResource.queryAllAvailable).toHaveBeenCalled();
            expect(BaseController.variables).toBe(variables.data);
        });
    });

    describe('when trigger is added', () => {
        beforeEach(() => {
            $scope.$emit('trigger.add', {});
        });

        it('should add trigger to the tag object', () => {
            expect(tagObject.addTrigger).toHaveBeenCalled();
        });

        it('should hide trigger selection form', () => {
            expect(BaseController.showTriggerForm).toBe(false);
        });
    });

    describe('when trigger is edited', () => {
        beforeEach(() => {
            $scope.$emit('trigger.edit', {});
        });

        it('should edit trigger in the tag object', () => {
            expect(tagObject.editTrigger).toHaveBeenCalled();
        });

        it('should hide trigger selection form', () => {
            expect(BaseController.editTriggerForm).toBe(false);
        });
    });

    describe('when hasVariables is called', () => {
        it('should only use array', () => {
            BaseController.variables = 1;
            expect(BaseController.hasVariables()).toBe(false);
        });

        it('should return false if variable array is empty', () => {
            BaseController.variables = [];
            expect(BaseController.hasVariables()).toBe(false);
        });

        it('should return false if for synchronous tags', () => {
            BaseController.scope.tagTemplateTab = TAG_TEMPLATE_TAB_SYNC;
            BaseController.variables = [1, 2];
            expect(BaseController.hasVariables()).toBe(false);
        });

        it('should return true if variable array has elements', () => {
            BaseController.variables = [1, 2];
            expect(BaseController.hasVariables()).toBe(true);
        });
    });

    describe('when isTagTemplateTabActive is called', () => {
        it('should detect synchronous tab if is active', () => {
            BaseController.scope.tagTemplateTab = TAG_TEMPLATE_TAB_SYNC;
            expect(BaseController.isTagTemplateTabActive(TAG_TEMPLATE_TAB_SYNC)).toBe(true);
        });

        it('should detect asynchronous tab if is active', () => {
            BaseController.scope.tagTemplateTab = TAG_TEMPLATE_TAB_ASYNC;
            expect(BaseController.isTagTemplateTabActive(TAG_TEMPLATE_TAB_ASYNC)).toBe(true);
        });

        it('should not detect synchronous tab if asynchronous is active', () => {
            BaseController.scope.tagTemplateTab = TAG_TEMPLATE_TAB_ASYNC;
            expect(BaseController.isTagTemplateTabActive(TAG_TEMPLATE_TAB_SYNC)).toBe(false);
        });

        it('should not detect asynchronous tab if synchronous is active', () => {
            BaseController.scope.tagTemplateTab = TAG_TEMPLATE_TAB_SYNC;
            expect(BaseController.isTagTemplateTabActive(TAG_TEMPLATE_TAB_ASYNC)).toBe(false);
        });
    });

    describe('when setTagTemplateTab is called', () => {
        it('should do nothing if selecting the same tab that is active', () => {
            BaseController.scope.tagTemplateTab = TAG_TEMPLATE_TAB_SYNC;
            BaseController.setTagTemplateTab(TAG_TEMPLATE_TAB_SYNC);
            expect(BaseController.scope.tagTemplateTab).toBe(TAG_TEMPLATE_TAB_SYNC);
        });

        it('should not deselect current template if asked not to', () => {
            BaseController.setTagTemplateTab(TAG_TEMPLATE_TAB_SYNC, true);
            expect(BaseController.hasSelectedTemplate()).toBe(true);
        });

        it('should deselect current template if asked to', () => {
            BaseController.setTagTemplateTab(TAG_TEMPLATE_TAB_SYNC, false);
            expect(BaseController.hasSelectedTemplate()).toBe(false);
        });

        it('should switch tab to synchronous', () => {
            BaseController.setTagTemplateTab(TAG_TEMPLATE_TAB_SYNC, true);
            expect(BaseController.isTagTemplateTabActive(TAG_TEMPLATE_TAB_SYNC)).toBe(true);
        });

        it('should switch tab to asynchronous', () => {
            BaseController.scope.tagTemplateTab = TAG_TEMPLATE_TAB_SYNC;
            BaseController.setTagTemplateTab(TAG_TEMPLATE_TAB_ASYNC, true);
            expect(BaseController.isTagTemplateTabActive(TAG_TEMPLATE_TAB_ASYNC)).toBe(true);
        });

        it('should remove triggers that are not page view type when switching tab to synchronous', () => {
            BaseController.tag.triggers = [{
                type: 0,
            },
            {
                type: 1,
            }];
            BaseController.setTagTemplateTab(TAG_TEMPLATE_TAB_SYNC, true);
            expect(BaseController.tag.triggers.length).toBe(1);
        });

        it('should restore triggers all when switching tab to synchronous', () => {
            BaseController.tag.triggers = [{
                type: 0,
            },
            {
                type: 1,
            }];
            BaseController.setTagTemplateTab(TAG_TEMPLATE_TAB_SYNC, true);
            BaseController.setTagTemplateTab(TAG_TEMPLATE_TAB_ASYNC, true);
            expect(BaseController.tag.triggers.length).toBe(2);
        });
    });

    describe('when hasTriggersNotAssignableToSyncTags is called', () => {
        it('should return false if there are no triggers', () => {
            BaseController.triggersWhenTagIsAsync = [];
            expect(BaseController.hasTriggersNotAssignableToSyncTags()).toBe(false);
        });

        it('should return false if all triggers are of page view type', () => {
            BaseController.triggersWhenTagIsAsync = [{
                type: 0
            },
            {
                type: 0
            }];
            expect(BaseController.hasTriggersNotAssignableToSyncTags()).toBe(false);
        });

        it('should return true if some triggers are not page view', () => {
            BaseController.triggersWhenTagIsAsync = [{
                type: 0
            },
            {
                type: 1
            }];
            expect(BaseController.hasTriggersNotAssignableToSyncTags()).toBe(true);
        });
    });

    describe('when setTagTemplate is called', () => {
        it('should deselect current template if selected it again', () => {
            BaseController.tag.template = TEMPLATE_ASYNCHRONOUS;
            BaseController.setTagTemplate(TEMPLATE_ASYNCHRONOUS);
            expect(BaseController.hasSelectedTemplate()).toBe(false);
        });

        it('should set new tag template', () => {
            BaseController.setTemplateType = () => {}
            BaseController.setTagTemplate(TEMPLATE_ASYNCHRONOUS);
            expect(BaseController.tag.template).toBe(TEMPLATE_ASYNCHRONOUS);
        });

        it('should set new custom tag template and show further steps', () => {
            BaseController.deselectCurrentTemplate();
            BaseController.setTagTemplate(undefined);
            expect(BaseController.hasSelectedCustomTemplate()).toBe(true);
            expect(BaseController.displayStepsAfterFirst).toBe(true);
        });

        it('should not show further steps if selected template has subtypes', () => {
            BaseController.setTagTemplate(TEMPLATE_ASYNCHRONOUS_WITH_SUBTYPES);
            expect(BaseController.displayStepsAfterFirst).toBe(false);
        });

        it('should set respectVisitorsPrivacy for plugin templates if template is tracking', () => {
            BaseController.tag.respectVisitorsPrivacy = false;
            BaseController.setTagTemplate(TEMPLATE_ASYNCHRONOUS_WITH_SUBTYPES);
            expect(BaseController.tag.respectVisitorsPrivacy).toBe(true);
        });

        it('should set respectVisitorsPrivacy to false for plugin templates if template is not tracking', () => {
            BaseController.tag.respectVisitorsPrivacy = true;
            BaseController.setTagTemplate(TEMPLATE_SYNCHRONOUS_NOT_TRACKING);
            expect(BaseController.tag.respectVisitorsPrivacy).toBe(false);
        });

        it('should set respectVisitorsPrivacy to false by default if selected custom synchronous template', () => {
            BaseController.deselectCurrentTemplate();
            BaseController.scope.tagTemplateTab = TAG_TEMPLATE_TAB_SYNC;
            BaseController.setTagTemplate(undefined);
            expect(BaseController.tag.respectVisitorsPrivacy).toBe(false);
        });

        it('should set respectVisitorsPrivacy by default if selected custom asynchronous template', () => {
            BaseController.deselectCurrentTemplate();
            BaseController.scope.tagTemplateTab = TAG_TEMPLATE_TAB_ASYNC;
            BaseController.setTagTemplate(undefined);
            expect(BaseController.tag.respectVisitorsPrivacy).toBe(true);
        });
    });

    describe('when currentTemplateAllowsToSetRVP is called', () => {
        it('should return false if current template is not tracking', () => {
            BaseController.tag.template = 1;
            BaseController.template = {
                isTracking: false
            };
            expect(BaseController.currentTemplateAllowsToSetRVP()).toBe(false);
        });

        it('should return true if current template is tracking', () => {
            BaseController.tag.template = 1;
            BaseController.template = {
                isTracking: true
            };
            expect(BaseController.currentTemplateAllowsToSetRVP()).toBe(true);
        });

        it('should return true if using custom tag template', () => {
            BaseController.tag.template = undefined;
            expect(BaseController.currentTemplateAllowsToSetRVP()).toBe(true);
        });
    });

    describe('when initTagTemplate is called', () => {
        it('should select synchronous tab based on tag', () => {
            BaseController.tag = TEMPLATES[TEMPLATE_SYNCHRONOUS_NOT_TRACKING];
            BaseController.initTagTemplate();
            expect(BaseController.isTagTemplateTabActive(TAG_TEMPLATE_TAB_SYNC)).toBe(true);
        });

        it('should select asynchronous tab based on tag', () => {
            BaseController.tag = TEMPLATES[TEMPLATE_ASYNCHRONOUS];
            BaseController.initTagTemplate();
            expect(BaseController.isTagTemplateTabActive(TAG_TEMPLATE_TAB_ASYNC)).toBe(true);
        });

        it('should show all form steps from the beginning', () => {
            BaseController.tag = TEMPLATES[TEMPLATE_ASYNCHRONOUS];
            BaseController.initTagTemplate();
            expect(BaseController.displayStepsAfterFirst).toBe(true);
        });
    });

    describe('when showAddNewTriggerForm is called', () => {
        it('should show form for new trigger', () => {
            BaseController.showAddNewTriggerForm();
            expect(BaseController.showTriggerForm).toBe(true);
        });
    });

    describe('when deselectCurrentTemplate is called', () => {
        it('should deselect current template', () => {
            BaseController.deselectCurrentTemplate();
            expect(BaseController.template).toBe(undefined);
            expect(BaseController.hasSelectedTemplate()).toBe(false);
        });

        it('should only show first step of the form', () => {
            BaseController.deselectCurrentTemplate();
            expect(BaseController.displayStepsAfterFirst).toBe(false);
        });

        it('should reset state of the trigger form', () => {
            BaseController.deselectCurrentTemplate();
            expect(BaseController.editTriggerForm).toBe(false);
            expect(BaseController.showTriggerForm).toBe(false);
            expect(BaseController.showListTriggersForm).toBe(false);
        });
    });

    describe('when hasSelectedTemplate is called', () => {
        it('should return true if custom template is selected', () => {
            BaseController.tag.template = undefined;
            expect(BaseController.hasSelectedTemplate()).toBe(true);
        });

        it('should return true if plugin template is selected', () => {
            BaseController.tag.template = 'piwik';
            expect(BaseController.hasSelectedTemplate()).toBe(true);
        });

        it('should return false if no template is selected', () => {
            BaseController.tag.template = null;
            expect(BaseController.hasSelectedTemplate()).toBe(false);
        });
    });

    describe('when hasSelectedCustomTemplate is called', () => {
        it('should return true if custom template is selected', () => {
            BaseController.tag.template = undefined;
            expect(BaseController.hasSelectedCustomTemplate()).toBe(true);
        });

        it('should return false if plugin template is selected', () => {
            BaseController.tag.template = 'piwik';
            expect(BaseController.hasSelectedCustomTemplate()).toBe(false);
        });

        it('should return false if no template is selected', () => {
            BaseController.tag.template = null;
            expect(BaseController.hasSelectedCustomTemplate()).toBe(false);
        });
    });

    describe('when hasSelectedPluginTemplate is called', () => {
        it('should return false if custom template is selected', () => {
            BaseController.tag.template = undefined;
            expect(BaseController.hasSelectedPluginTemplate()).toBe(false);
        });

        it('should return true if plugin template is selected', () => {
            BaseController.tag.template = 'piwik';
            expect(BaseController.hasSelectedPluginTemplate()).toBe(true);
        });

        it('should return false if no template is selected', () => {
            BaseController.tag.template = null;
            expect(BaseController.hasSelectedPluginTemplate()).toBe(false);
        });
    });

    describe('when text editor is loaded', () => {
        let editor;

        beforeEach(() => {
            editor = {
                on: jasmine.createSpy('on'),
                options: {}
            };

            BaseController.textEditorConfig.onLoad(editor);
        });

        it('should add handler to focus event', () => {
            expect(editor.on).toHaveBeenCalledWith('focus', jasmine.any(Function));
        });

        it('should add handler to focus lost event', () => {
            expect(editor.on).toHaveBeenCalledWith('blur', jasmine.any(Function));
        });
    });

    describe('when inserting variable into snippet', () => {
        let editor;

        beforeEach(() => {
            let doc = {
                replaceSelection: jasmine.createSpy('replaceSelection')
            };

            editor = {
                on: jasmine.createSpy('on'),
                focus: jasmine.createSpy('focus'),
                doc: doc,
                options: {}
            };

            BaseController.textEditorConfig.onLoad(editor);
        });

        it('should insert it with correct format', () => {
            let variable = {
                name: 'my variable'
            };

            $scope.insertVariableIntoCode(variable);
            expect(editor.doc.replaceSelection).toHaveBeenCalledWith('{{ my variable }}');
        });

        it('should switch focus back to snippet editor', () => {
            let variable = {
                name: 'my variable'
            };

            $scope.insertVariableIntoCode(variable);
            expect(editor.focus).toHaveBeenCalled();
        });
    });
});
