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

let $alert;
let stateParams;
let scope;

const BREADCRUMB_TEXT = 'Tags';

/**
 * @name ManageController
 */
class ManageController {
    constructor (
        TableParams,
        $stateParams,
        tagResource,
        publishedStatus,
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
        scope = $scope;
        this.permissions = [];

        this.containerId = stateParams.containerId;
        this.translate = $translate;
        this.currentContainer = CurrentContainer;
        this.publishedStatus = publishedStatus;

        this.currentContainer.getContainer().then((container) => {
            if (!this.currentContainer.$container.hasPermission('view')) {
                state.go('container');
            } else {
                this.permissions = this.currentContainer.$container.permissions;
            }

            this
                .translate([BREADCRUMB_TEXT])
                .then((translations) => {
                    PageInfo.clear()
                        .add(container.name, 'tags', {
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
            $scope: $scope,
            getData: ($defer, params) => {
                tagResource.query(stateParams.containerId, paramConverter.list(params.url())).then((resp) => {
                    params.total(resp.total);
                    $defer.resolve(resp.data);
                });
            }
        });

        this.tableParams.reload();
        scope.params = this.tableParams;

        this.addReloadOnPublishListener($scope);

        // behaviour after page change
        $scope.$on('ngTableAfterReloadData', () => {
            this.showTriggers = -1;
            this.showMenu = -1;
        }, true);

        $scope.$watch('params.$params', (newParams, oldParams) => {
            if (newParams === oldParams) {
                return;
            }

            $scope.params.settings().$scope = $scope;
            $scope.params.reload();
        }, true);

        scope.$on('pageInfo.reload', (event, args) => {
            this
                .translate([BREADCRUMB_TEXT])
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

    addReloadOnPublishListener ($scope) {
        let deregisterPublishListener = $scope.$on('container-published', () => {
            $scope.params.reload();
        });
        $scope.$on('$destroy', () => {
            deregisterPublishListener();
        });
    }

    removeTag (tag) {
        tag.remove().then(
            () => {
                $alert.success('success.remove');
                this.currentContainer.makeChanges();

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

    changeStatus (tag) {
        tag.changeStatus(this.containerId).then(
            () => {
                this.currentContainer.makeChanges();
                $alert.success('status.change');
            },
            () => {
                $alert.error('status.failed');
            }
        );
    }

    getPublishedStatus (tag) {
        return this.publishedStatus.getPublishedStatusForTag(tag);
    }

    toggleActionMenu ($index) {
        if (this.permissions.indexOf('edit') !== -1 ) {
            this.showMenu = this.showMenu === $index
                ? -1
                : $index;

            this.showTriggers = -1;
        }
    }

    toggleTriggerList ($index) {
        this.showMenu = -1;
        this.showTriggers = this.isRowExpanded($index) ? -1 : $index;
    }

    isRowExpanded ($index) {
        return this.showTriggers === $index;
    }
}

export default ManageController;
