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
 * @name EditController
 */
class EditController extends BaseController {
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

        this.variablePromise = $variableResource.get($stateParams.variableId);

        this.variablePromise.then(
            resp => {
                this.variable = resp;
                this.getVariableTypes();
            }
        );

        this.currentContainer.getContainer().then(() => {
            if (this.currentContainer.$container.hasPermission('noaccess')) {
                this.state.go('container');
            }

            this
                .translate([this.getBreadcrumbText(), BREADCRUMB_GLOBAL])
                .then((translations) => {
                    $PageInfo.clear()
                        .add(this.currentContainer.$container.name, 'tags', {
                            containerId: this.currentContainer.$container.id
                        })
                        .add(translations[BREADCRUMB_GLOBAL], 'variables', {
                            containerId: this.currentContainer.$container.id
                        })
                        .add(translations[this.getBreadcrumbText()])
                        .broadcast();
                });
        });

        this.formTouched = true;
    }

    getBreadcrumbText () {
        return 'Configure variable';
    }

    getAlertType () {
        return 'success.edit';
    }
}

export default EditController;
