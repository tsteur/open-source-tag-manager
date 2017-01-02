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

let $alert,
    stateParams,
    currentContainer,
    scope;

const BREADCRUMB_TEXT = 'Variables';

/**
 * @name ManageController
 */
class ManageController {
    constructor (
        TableParams,
        $stateParams,
        variableResource,
        alert,
        paramConverter,
        CurrentContainer,
        PageInfo,
        $scope,
        state,
        $translate
    ) {
        $alert = alert;
        stateParams = $stateParams;
        currentContainer = CurrentContainer;
        scope = $scope;

        this.permissions = [];
        this.containerId = stateParams.containerId;

        currentContainer.getContainer().then((container) => {
            if (!currentContainer.$container.hasPermission('view')) {
                state.go('container');
            } else {
                this.permissions = currentContainer.$container.permissions;
            }

            $translate([BREADCRUMB_TEXT]).then((translations) => {
                PageInfo.clear()
                    .add(container.name, 'variable', {
                        containerId: container.id
                    })
                    .add(translations[BREADCRUMB_TEXT])
                    .broadcast();
            });
        });

        this.tableParams = new TableParams({
            page: 1,
            count: 10,
            sorting: {
                name: 'asc'
            }
        }, {
            total: 0,
            getData: ($defer, params) => {
                variableResource.query(stateParams.containerId, paramConverter.list(params.url())).then((resp) => {
                    params.total(resp.total);
                    $defer.resolve(resp.data);
                });
            }
        });

        scope.$on('pageInfo.reload', (event, args) => {
            $translate([BREADCRUMB_TEXT]).then((translations) => {
                PageInfo.clear()
                    .add(args.name, 'variables', {
                        containerId: args.id
                    })
                    .add(translations[BREADCRUMB_TEXT])
                    .broadcast();
            });
        });
    }

    removeVariable (variable) {
        variable.remove().then(
            () => {
                $alert.success('success.remove');
                currentContainer.makeChanges();

                if (this.tableParams.data.length === 1 && this.tableParams.page() > 1) {
                    this.tableParams.page(this.tableParams.page() - 1);
                } else {
                    this.tableParams.reload();
                }
            },
            () => {
                $alert.error('error.remove');
                this.tableParams.reload();
            }
        );
    }
}

export default ManageController;
