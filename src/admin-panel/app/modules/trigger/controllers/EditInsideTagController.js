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

import BaseController from './BaseController.js';

/**
 * @name EditController
 */
class EditController extends BaseController {
    constructor (
        $scope,
        $triggerResource,
        $conditionResource,
        $stateParams,
        $alert,
        CurrentContainer,
        $condition,
        PageInfo,
        $translate
    ) {
        super(
            $scope,
            $triggerResource,
            $conditionResource,
            $stateParams,
            null,
            $alert,
            CurrentContainer,
            $condition,
            PageInfo,
            $translate
        );
    }

    /**
     * @desc Init trigger
     * @param {number} triggerId
     */
    initTrigger (triggerId) {
        this.triggerPromise = this.triggerResource.get(triggerId);

        this.triggerPromise.then(triggerResp => {
            this.trigger = triggerResp;

            this.typesArrayPromise.then(typesResp => {
                this.typesArray = typesResp;
                this.Condition.getVariables(this.trigger.type).then(resp => {
                    this.variables = resp;
                });

                this.Condition.getActions(this.trigger.type).then(resp => {
                    this.actions = resp;
                });

                this.Condition.getRequired(this.trigger.type).then(resp => {
                    this.required = resp;
                });
            });
        });
    }

    getBreadcrumbText () {
        return 'Configure trigger';
    }

    getAlertType () {
        return 'success.edit';
    }

    submitForm (trigger) {
        this.triggerPromise = trigger.save(this.stateParams.containerId);

        this.triggerPromise.then(
            resp => {
                this.currentContainer.makeChanges();
                this.alert.success('trigger.edit');
                this.scope.$emit('trigger.edit', resp);
            },
            () => {
                this.alert.error('error.invalid');
            }
        );
    }
}

export default EditController;
