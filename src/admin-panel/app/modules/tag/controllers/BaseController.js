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

const BREADCRUMB_GLOBAL = 'Tags';

const TAG_TEMPLATE_TAB_ASYNC = 'async',
    TAG_TEMPLATE_TAB_SYNC = 'sync',
    PAGE_VIEW_TRIGGER_TYPE = 0,
    DOM_READY_TRIGGER_TYPE = 4,
    PAGE_LOAD_TRIGGER_TYPE = 5,
    SYNCHRONOUS_TAGS_TRIGGER_TYPES = [PAGE_VIEW_TRIGGER_TYPE, DOM_READY_TRIGGER_TYPE, PAGE_LOAD_TRIGGER_TYPE];

/**
 * @name BaseController
 */
class BaseController {
    constructor (
        $tagResource,
        $triggerResource,
        $variableResource,
        $state,
        $stateParams,
        $alert,
        $scope,
        $timeout,
        $TableParams,
        $paramConverter,
        CurrentContainer,
        PageInfo,
        templatesStorage,
        $translate
    ) {
        this.alert = $alert;
        this.state = $state;
        this.scope = $scope;
        this.stateParams = $stateParams;
        this.triggerResource = $triggerResource;
        this.TableParams = $TableParams;
        this.paramConverter = $paramConverter;
        this.currentContainer = CurrentContainer;

        this.tag = $tagResource.getEntityObject();

        this.tagPromise = undefined;

        this.triggers = [];
        this.chosenTriggers = [];
        this.triggerPromise = undefined;
        this.displayStepsAfterFirst = false;
        this.templatesStorage = templatesStorage;
        this.synchronousTemplates = [];
        this.asynchronousTemplates = [];
        this.triggersWhenTagIsAsync = [];
        this.scope.tagTemplateTab = TAG_TEMPLATE_TAB_ASYNC;
        this.divideTemplatesBasedOnSynchronicity($timeout);

        this.template = undefined;
        this.translate = $translate;
        this.variables = [];

        this.textEditorConfig = {};
        this.isCodeEditorFocused = false;

        $variableResource.queryAllAvailable(this.stateParams.containerId).then( resp => {
            this.variables = resp.data;
        });

        this.textEditorConfig.onLoad = cm => {
            cm.options.variables = this.variables;

            $scope.insertVariableIntoCode = variable => {
                cm.doc.replaceSelection(`{{ ${variable.name} }}`);
                cm.focus();
            };

            cm.on('focus', () => {
                this.isCodeEditorFocused = true;
            });

            cm.on('blur', () => {
                this.isCodeEditorFocused = false;
            });
        };

        $scope.$on('trigger.add', (event, resp) => {
            this.tag.addTrigger(resp);
            this.showTriggerForm = false;
            this.validateTriggers = false;
        });

        $scope.$on('trigger.edit', (event, resp) => {
            this.tag.editTrigger(resp);
            this.editTriggerForm = false;
            this.validateTriggers = false;
        });

        this.translate(['Place the code']).then((translations) => {
            this.textEditorConfig.placeholder = translations['Place the code'];
        });

        this.currentContainer.getContainer().then(() => {
            if (this.currentContainer.$container.hasPermission('noaccess')) {
                $state.go('container');
            }

            this
                .translate([this.getBreadcrumbText(), BREADCRUMB_GLOBAL])
                .then((translations) => {
                    PageInfo.clear()
                        .add(this.currentContainer.$container.name, 'tags', {
                            containerId: this.currentContainer.$container.id
                        })
                        .add(translations[BREADCRUMB_GLOBAL], 'tags', {
                            containerId: this.currentContainer.$container.id
                        })
                        .add(translations[this.getBreadcrumbText()])
                        .broadcast();
                });
        });

        $scope.$on('pageInfo.reload', (event, args) => {
            this
                .translate([this.getBreadcrumbText(), BREADCRUMB_GLOBAL])
                .then((translations) => {
                    PageInfo.clear()
                        .add(args.name, 'tags', {
                            containerId: args.id
                        })
                        .add(translations[BREADCRUMB_GLOBAL], 'tags', {
                            containerId: args.id
                        })
                        .add(translations[this.getBreadcrumbText()])
                        .broadcast();
                });
        });
    }

    divideTemplatesBasedOnSynchronicity ($timeout) {
        let alreadyLoadedTemplates = this.templatesStorage.getAll(),
            classifyTemplate = template => {
                if (template.isSynchronous) {
                    this.synchronousTemplates.push(template);
                } else {
                    this.asynchronousTemplates.push(template);
                }
            },
            classifyAfterAllTemplateDataLoaded  = (template) => {
                $timeout(() => classifyTemplate(template), 0);
            };

        for (let i = 0; i < alreadyLoadedTemplates.length; i++) {
            classifyAfterAllTemplateDataLoaded(alreadyLoadedTemplates[i]);
        }
        this.templatesStorage.setListener(classifyAfterAllTemplateDataLoaded);
    }

    hasVariables () {
        let variablesNotEmpty = angular.isArray(this.variables) && this.variables.length > 0;
        return !this.isTagTemplateTabActive(TAG_TEMPLATE_TAB_SYNC) && variablesNotEmpty;
    }

    setTagTemplateTab (tab, keepCurrentTemplate) {
        if (tab === this.scope.tagTemplateTab) {
            return;
        }

        if (!keepCurrentTemplate) {
            this.deselectCurrentTemplate();
        }

        this.scope.tagTemplateTab = tab;
        this.tag.isSynchronous = this.isTagTemplateTabActive(TAG_TEMPLATE_TAB_SYNC);
        this.rememeberCurrentTriggers();

        if (this.isTagTemplateTabActive(TAG_TEMPLATE_TAB_SYNC)) {
            this.documentWirteWhenTagIsAsync = this.tag.documentWrite;
            this.tag.documentWrite = true;
        } else {
            this.tag.documentWrite = this.documentWirteWhenTagIsAsync;
        }
    }

    rememeberCurrentTriggers () {
        if (this.isTagTemplateTabActive(TAG_TEMPLATE_TAB_SYNC)) {
            this.triggersWhenTagIsAsync = this.tag.triggers || [];
            this.tag.triggers = filterTriggersForSynchronousTags(this.triggersWhenTagIsAsync);
        } else {
            this.tag.triggers = this.triggersWhenTagIsAsync;
        }
    }

    hasTriggersNotAssignableToSyncTags () {
        let allTags = this.triggersWhenTagIsAsync || [],
            triggersAssignableToSyncTags = filterTriggersForSynchronousTags(allTags);
        return triggersAssignableToSyncTags.length !== allTags.length;
    }

    isTagTemplateTabActive (tab) {
        return tab === this.scope.tagTemplateTab;
    }

    currentTemplateAllowsToSetRVP () {
        let templateIsTracking = this.hasSelectedPluginTemplate() && this.template.isTracking;
        return this.hasSelectedCustomTemplate() || templateIsTracking;
    }

    setTagTemplate (id) {
        let selectedSameTemplateAsCurrent = this.tag.template === id;
        if (selectedSameTemplateAsCurrent) {
            this.deselectCurrentTemplate();
            return false;
        }

        this.tag.template = id;

        if (this.hasSelectedPluginTemplate()) {
            this.template = this.templatesStorage.get(id);
            this.tag.code = undefined;

            let requiresAdditionalSelectTemplateType = this.template.types.length !== 0;
            if (requiresAdditionalSelectTemplateType) {
                this.displayStepsAfterFirst = false;
            } else {
                this.setTemplateType(id);
            }

            this.tag.respectVisitorsPrivacy = this.template.isTracking;
        } else {
            this.displayStepsAfterFirst = true;
            this.tag.respectVisitorsPrivacy = this.isTagTemplateTabActive(TAG_TEMPLATE_TAB_ASYNC);
        }
    }

    initTagTemplate (id, options) {
        this.tag.template = id;
        this.setTagTemplateTab(this.tag.isSynchronous ? TAG_TEMPLATE_TAB_SYNC : TAG_TEMPLATE_TAB_ASYNC, true);

        if (this.hasSelectedPluginTemplate()) {
            this.template = this.templatesStorage.get(id);
            this.tag.code = undefined;

            if (this.template.types.length === 0) {
                this.tag.templateOptions = options;
                this.templateFields = this.templatesStorage.getOptions(id);
                this.template.templateUrl = this.templatesStorage.getTemplateUrl(id);
            } else {
                this.tag.templateOptions.type = options.type;
                this.templateFields = this.templatesStorage.getOptions(id, options.type);
                this.template.templateUrl = this.templatesStorage.getTemplateUrl(id, options.type);
            }
        }

        this.displayStepsAfterFirst = true;
    }

    setTemplateType (id, type) {
        let selectedSameTypeAsCurrent = this.tag.templateOptions.type !== undefined && this.tag.templateOptions.type === type;
        if (selectedSameTypeAsCurrent) {
            return false;
        }

        this.templateFields = this.templatesStorage.getOptions(id, type);
        this.setOptions();
        this.tag.templateOptions.type = type;
        this.template.templateUrl = this.templatesStorage.getTemplateUrl(id, type);
        this.displayStepsAfterFirst = true;
    }

    setOptions () {
        let fieldsLength = this.templateFields.length;
        this.tag.templateOptions = {};

        while (fieldsLength--) {
            this.tag.templateOptions[this.templateFields[fieldsLength].name] = this.templateFields[fieldsLength].value;
        }
    }

    showExistingTriggers () {
        this.chosenTriggers = [];
        this.prepareExistingTriggersList();
        this.showListTriggersForm = true;
    }

    showAddNewTriggerForm () {
        this.validateTriggers = false;
        this.showTriggerForm = true;
    }

    prepareExistingTriggersList () {
        this.triggers = [];
        this.types = [
            'Page View',
            'Click',
            'Event',
            'Form submission'
        ];

        this.existingTable = new this.TableParams({
            page: 1,
            count: 10,
            sorting: {
                name: 'asc'
            }
        }, {
            total: 0,
            getData: ($defer, params) => {
                let parameters = this.paramConverter.list(params.url());
                parameters['exclude[]'] = this.tag.triggers.map(trigger => trigger.id);
                parameters['types[]'] = this.isTagTemplateTabActive(TAG_TEMPLATE_TAB_SYNC) ? SYNCHRONOUS_TAGS_TRIGGER_TYPES : [];

                this.triggerResource.query(this.currentContainer.$container.id, parameters).then(
                    (resp) => {
                        params.total(resp.total);
                        $defer.resolve(resp.data);
                    }
                );
            }
        });
    }

    addExistingTriggers () {
        let chosenLength = this.chosenTriggers.length;

        while (chosenLength--) {
            this.tag.triggers.push(this.chosenTriggers[chosenLength]);
        }
    }

    submitForm (tag) {
        this.tagPromise = tag.save(this.stateParams.containerId);

        this.tagPromise.then(
            () => {
                this.alert.success(this.getAlertType(this.stateParams.tagId));
                this.currentContainer.makeChanges();
                this.state.go('tags', {containerId: this.stateParams.containerId});
            },
            () => {
                this.alert.error('error.invalid');
            }
        );
    }

    displayInvalidFormMessage () {
        this.validateTag = true;
        this.alert.error('error.invalid');
    }

    deselectCurrentTemplate () {
        this.template = undefined;
        this.tag.template = null;
        this.displayStepsAfterFirst = false;

        this.editTriggerForm = false;
        this.showTriggerForm = false;
        this.showListTriggersForm = false;
    }

    hasSelectedTemplate () {
        return this.tag.template !== null;
    }

    hasSelectedCustomTemplate () {
        return this.hasSelectedTemplate() && this.tag.template === undefined;
    }

    hasSelectedPluginTemplate () {
        return this.hasSelectedTemplate() && !this.hasSelectedCustomTemplate();
    }
}

function filterTriggersForSynchronousTags (triggers) {
    let result = [];
    for (let i = 0; i < triggers.length; i++) {
        if (SYNCHRONOUS_TAGS_TRIGGER_TYPES.indexOf(triggers[i].type) !== -1) {
            result.push(triggers[i]);
        }
    }
    return result;
}

export default BaseController;
