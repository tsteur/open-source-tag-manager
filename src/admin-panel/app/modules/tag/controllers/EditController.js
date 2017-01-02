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
        super(
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
        );

        this.tagPromise = $tagResource.get($stateParams.tagId);
        this.tagPromise.then(
            (resp) => {
                this.tag = resp;
                this.initTagTemplate(this.tag.template, this.tag.templateOptions);
            }
        );
    }

    getBreadcrumbText () {
        return 'Configure tag';
    }

    getAlertType () {
        return 'success.edit';
    }
}

export default EditController;
