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

let state;
let stateParams;
let alert;
let currentContainer;
let scope;

const BREADCRUMB_TEXT = 'Options';

/**
 * @name EditController
 */
class EditController {
    constructor (
        containerResource,
        $state,
        $stateParams,
        $alert,
        CurrentContainer,
        PageInfo,
        $scope,
        $translate
    ) {
        state = $state;
        stateParams = $stateParams;
        alert = $alert;
        currentContainer = CurrentContainer;
        scope = $scope;

        this.pageInfo = PageInfo;
        this.container = containerResource.getEntityObject();
        this.containerPromise = containerResource.get(stateParams.containerId);
        this.containerPromise.then((resp) => {
            this.container = resp;
        });

        this.translate = $translate;
        currentContainer.getContainer().then(() => {
            if (currentContainer.$container.hasPermission('noaccess')) {
                state.go('container');
            }

            this.refreshBreadcrumb(BREADCRUMB_TEXT, currentContainer.$container);
        });

        scope.$on('pageInfo.reload', (event, container) => {
            this.refreshBreadcrumb(BREADCRUMB_TEXT, container);
        });
    }

    removeContainer () {
        this.container.remove().then(
            () => {
                alert.success('success.remove');
                state.go('container');
            },
            () => {
                alert.error('error.remove');
            }
        );
    }

    submitForm (container) {
        this.containerPromise = container.save();

        this.containerPromise.then(
            (container) => {
                this.refreshBreadcrumb(BREADCRUMB_TEXT, container);
                currentContainer.get(stateParams.containerId);
                alert.success('success.edit');
                state.go('containerEdit', {containerId: stateParams.containerId});
            },
            () => {
                alert.error('error.invalid');
            }
        );
    }

    displayInvalidFormMessage () {
        this.validateContainer = true;
        alert.error('error.invalid');
    }

    refreshBreadcrumb (breadcrumbText, container) {
        let pageInfo = this.pageInfo;

        this.translate([breadcrumbText])
            .then((translations) => {
                pageInfo
                    .clear()
                    .add(container.name, 'tags', {
                        containerId: container.id
                    })
                    .add(translations[breadcrumbText])
                    .broadcast();
            });
    }
}

export default EditController;
