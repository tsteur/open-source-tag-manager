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

/**
 * @type {$state}
 */
let state;

/**
 * @type {$stateParams}
 */
let stateParams;

/**
 * @type {CurrentContainer}
 */
let currentContainer;

/**
 * @type {$scope}
 */
let scope;

let translate;

/**
 * @type {String}
 */
const BREADCRUMB_TEXT = 'Debug';

/**
 * @name DebugOptionsController
 */
class DebugOptionsController {
    /**
     * @param {ContainerResource} containerResource
     * @param {$state} $state
     * @param {$stateParams} $stateParams
     * @param {currentContainer} CurrentContainer
     * @param {PageInfo} PageInfo
     * @param {$scope} $scope
     * @param {$translate} $translate
     */
    constructor (
        containerResource,
        $state,
        $stateParams,
        CurrentContainer,
        PageInfo,
        $scope,
        $translate
    ) {
        state = $state;
        stateParams = $stateParams;
        currentContainer = CurrentContainer;
        scope = $scope;
        translate = $translate;

        this.container = containerResource.getEntityObject();

        this.containerPromise = containerResource.get(stateParams.containerId);

        this.containerPromise.then((resp) => {
            this.container = resp;
        });

        currentContainer.getContainer().then(() => {
            if (currentContainer.$container.hasPermission('noaccess')) {
                state.go('container');
            }

            translate([BREADCRUMB_TEXT])
                .then((translations) => {
                    PageInfo.clear()
                        .add(currentContainer.$container.name, 'tags', {
                            containerId: currentContainer.$container.id
                        })
                        .add(translations[BREADCRUMB_TEXT])
                        .broadcast();
                });
        });

        scope.$on('pageInfo.reload', (event, args) => {
            translate([BREADCRUMB_TEXT])
                .then((translations) => {
                    PageInfo.clear()
                        .add(args.name, 'tags', {
                            containerId: args.id
                        })
                        .add(translations[BREADCRUMB_TEXT])
                        .broadcast();
                });
        });
    }
}

export default DebugOptionsController;
