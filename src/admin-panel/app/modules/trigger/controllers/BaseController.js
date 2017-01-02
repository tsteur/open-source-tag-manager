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

const PAGE_VIEW_TYPES = [{
        value: 0,
        name: 'Page view'
    }, {
        value: 1,
        name: 'DOM ready'
    }, {
        value: 2,
        name: 'Page load'
    }],
    NOT_VISIBLE_TRIGGER_TYPES = ['Page Load', 'DOM Ready'];


/**
 * @name BaseController
 */
class BaseController {
    constructor (
        $scope,
        $triggerResource,
        $conditionResource,
        $stateParams,
        $state,
        $alert,
        CurrentContainer,
        $condition,
        $PageInfo,
        $translate
    ) {
        const BREADCRUMB_GLOBAL = 'Triggers';

        this.required = undefined;
        this.variables = undefined;
        this.actions = undefined;

        this.triggerPromise = undefined;

        this.triggerResource = $triggerResource;
        this.conditionResource = $conditionResource;

        this.scope = $scope;
        this.stateParams = $stateParams;
        this.state = $state;
        this.alert = $alert;
        this.currentContainer = CurrentContainer;
        this.Condition = $condition;
        this.PageInfo = $PageInfo;

        this.typesArrayPromise = $condition.getArrayOfTypes().then(filterVisibleTriggerTypes);

        this.trigger = $triggerResource.getEntityObject();
        this.condition = $conditionResource.getEntityObject();
        this.translate = $translate;

        $scope.$on('pageInfo.reload', (event, args) => {
            this
                .translate([this.getBreadcrumbText(), BREADCRUMB_GLOBAL])
                .then((translations) => {
                    $PageInfo.clear()
                        .add(args.name, 'tags', {
                            containerId: args.id
                        })
                        .add(translations[BREADCRUMB_GLOBAL], 'triggers', {
                            containerId: args.id
                        })
                        .add(translations[this.getBreadcrumbText()])
                        .broadcast();
                });
        });

        this.pageViewTriggerTypes = PAGE_VIEW_TYPES;

        function filterVisibleTriggerTypes (types) {
            return types.filter(type => NOT_VISIBLE_TRIGGER_TYPES.indexOf(type) === -1);
        }
    }

    setType (type) {
        if (this.typesArray[type] !== undefined) {
            this.trigger.type = type;
            this.trigger.conditions = [];

            this.Condition.getVariables(type).then(resp => {
                this.variables = resp;
            });
            this.Condition.getActions(type).then(resp => {
                this.actions = resp;
            });
            this.Condition.getRequired(type).then(
                resp => {
                    this.required = resp;
                    let requiredIndex = this.required.length;

                    while (requiredIndex--) {
                        this.trigger.conditions.push({
                            variable: this.required[requiredIndex].name,
                            condition: this.actions[0].type,
                            value: ''
                        });
                    }
                }
            );
        } else {
            throw new Error('Invalid type');
        }
    }

    addCondition () {
        this.condition = this.conditionResource.getEntityObject();

        this.condition.variable = this.variables[0].name;
        this.condition.condition = this.actions[0].type;

        this.trigger.addCondition(this.condition);
    }

    validateTrigger (form) {
        this.scope[form.$name].$setPristine();

        let conditionLength = this.trigger.conditions.length;

        if (this.scope[form.$name].name.$valid) {
            if (conditionLength !== 0) {
                while (conditionLength--) {
                    /* eslint-disable */
                    if (this.scope[form.$name]['conditionValue[' + conditionLength + ']'].$invalid) {
                        return false;
                    }
                    /* eslint-enable */
                }
            }

            return true;
        } else {
            return false;
        }
    }

    isTypeRequired (variable) {
        return this.required !== undefined && this.required.map(element => element.name).indexOf(variable) !== -1;
    }

    getVariableName (variable) {
        var variablesIndex = this.variables.map(element => element.name).indexOf(variable);

        if (variablesIndex === -1) {
            variablesIndex = this.required.map(element => element.name).indexOf(variable);

            return variablesIndex !== -1 ? this.required[variablesIndex].name : false;
        }

        return this.variables[variablesIndex].name;
    }

    getConditionName (conditionName) {
        var conditionsIndex = this.actions.map(element => element.name).indexOf(conditionName);

        return conditionsIndex !== -1 ? this.actions[conditionsIndex].name : false;
    }

    leaveFormInsideTag () {
        this
            .translate([this.getBreadcrumbText()])
            .then((translations) => {
                this.PageInfo.clear()
                    .add(this.currentContainer.$container.name, 'tags', {
                        containerId: this.currentContainer.$container.id
                    })
                    .add(translations[this.getBreadcrumbText()])
                    .broadcast();
            });

        return false;
    }

    showFormForSynchronousTrigger () {
        let isEmbededInsideSynchronousTagForm = this.scope.tagTemplateTab === 'sync';
        return this.trigger.isAddedToSynchronousTag || isEmbededInsideSynchronousTagForm;
    }

    submitForm (trigger) {
        this.triggerPromise = trigger.save(this.stateParams.containerId);

        this.triggerPromise.then(
            () => {
                this.currentContainer.makeChanges();
                this.alert.success(this.getAlertType());

                this.state.go('triggers', {
                    containerId: this.stateParams.containerId
                });
            },
            () => {
                this.alert.error('error.invalid');
            }
        );
    }

    displayInvalidFormMessage (view) {
        view.validateTriggers = true;
        this.alert.error('error.invalid');
    }
}

export default BaseController;
