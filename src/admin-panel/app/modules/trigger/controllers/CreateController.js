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

const BREADCRUMB_GLOBAL = 'Triggers';

/**
 * @name CreateController
 */
class CreateController extends BaseController {
    constructor (
        $scope,
        $triggerResource,
        $conditionResource,
        $stateParams,
        $state,
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
            $state,
            $alert,
            CurrentContainer,
            $condition,
            PageInfo,
            $translate
        );

        this.typesArrayPromise.then(resp => {
            this.typesArray = resp;
            this.setType(0);
        });

        CurrentContainer.getContainer().then( () => {
            if (!CurrentContainer.$container.hasPermission('edit')) {
                $state.go('triggers', {containerId: $stateParams.containerId});
            }

            this
                .translate([this.getBreadcrumbText(), BREADCRUMB_GLOBAL])
                .then((translations) => {
                    PageInfo.clear()
                        .add(CurrentContainer.$container.name, 'tags', {
                            containerId: CurrentContainer.$container.id
                        })
                        .add(translations[BREADCRUMB_GLOBAL], 'triggers', {
                            containerId: CurrentContainer.$container.id
                        })
                        .add(translations[this.getBreadcrumbText()])
                        .broadcast();
                });
        });
    }

    getBreadcrumbText () {
        return 'Add a new trigger';
    }

    getAlertType () {
        return 'success.create';
    }

    addTrigger (form, trigger) {
        this.triggerPromise = trigger.save(this.stateParams.containerId);

        this.triggerPromise.then(
            resp => {
                this.scope[form.$name].$setPristine();
                this.trigger = this.triggerResource.getEntityObject();
                this.scope.$emit('trigger.add', resp);
            },
            () => {
            }
        );
    }
}

export default CreateController;
