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

const BREADCRUMB_GLOBAL = 'Variables';

/**
 * @name CreateController
 */
class CreateController extends BaseController {
    constructor (
        $variableResource,
        $typeResource,
        $PageInfo,
        $scope,
        $variableFormProvider,
        currentContainer,
        $stateParams,
        $alert,
        $state,
        $translate,
        $condition
    ) {
        super(
            $variableResource,
            $typeResource,
            $PageInfo,
            $scope,
            $variableFormProvider,
            currentContainer,
            $stateParams,
            $alert,
            $state,
            $translate,
            $condition
        );

        this.variable = $variableResource.getEntityObject();

        this.getVariableTypes();

        currentContainer.getContainer().then( () => {
            if (!currentContainer.$container.hasPermission('edit')) {
                $state.go('triggers', {containerId: $stateParams.containerId});
            }

            this
                .translate([this.getBreadcrumbText(), BREADCRUMB_GLOBAL])
                .then((translations) => {
                    $PageInfo.clear()
                        .add(currentContainer.$container.name, 'tags', {
                            containerId: currentContainer.$container.id
                        })
                        .add(translations[BREADCRUMB_GLOBAL], 'variables', {
                            containerId: currentContainer.$container.id
                        })
                        .add(translations[this.getBreadcrumbText()])
                        .broadcast();
                });
        });
    }

    getBreadcrumbText () {
        return 'Add a new variable';
    }

    getAlertType () {
        return 'success.create';
    }
}

export default CreateController;
