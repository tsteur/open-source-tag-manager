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

const DEBOUNCE_TIMEOUT = 500;

let $alert, $timeout;

/**
 * @name ManageController
 */
class ManageController {
    constructor (
        TableParams,
        scope,
        timeout,
        containerResource,
        publishedStatus,
        alert,
        paramConverter,
        currentContainer
    ) {
        $alert = alert;
        $timeout = timeout;
        this.publishedStatus = publishedStatus;
        currentContainer.disableDebugMode();
        this.currentFilterQuery = '';
        this.filterQuery = '';

        this.tableParams = new TableParams({
            page: 1,
            count: 10,
            sorting: {
                name: 'asc'
            }
        }, {
            total: 0,
            getData: ($defer, params) => {
                let queryParam = paramConverter.list(params.url());
                if (this.useSearchByName()) {
                    queryParam.name = this.currentFilterQuery;
                }

                containerResource.query(queryParam).then((resp) => {
                    params.total(resp.total);
                    $defer.resolve(resp.data);
                    this.filterQuery = this.currentFilterQuery;
                });
            }
        });

        scope.$on('$destroy', () => {
            $timeout.cancel(this.debounce);
        });
    }

    removeContainer (container) {
        container.remove().then(
            () => {
                $alert.success('success.remove');
                if (this.tableParams.data.length === 1) {
                    this.tableParams.page(this.tableParams.page() - 1);
                }
                this.tableParams.reload();
            },
            () => {
                $alert.error('error.remove');
                this.tableParams.reload();
            }
        );
    }

    getPublishedStatus (container) {
        return this.publishedStatus.getPublishedStatusForContainer(container);
    }

    search () {
        this.tableParams.page(1);
        this.tableParams.reload();
    }

    searchDebounced () {
        $timeout.cancel(this.debounce);

        let searchCallback = () => {
            this.search();
        };

        if (this.currentFilterQuery !== this.filterQuery) {
            this.debounce = $timeout(searchCallback, DEBOUNCE_TIMEOUT);
        }
    }

    resetSearchQuery () {
        this.currentFilterQuery = '';
        this.search();
    }

    showSearchLoader () {
        return this.currentFilterQuery !== this.filterQuery;
    }

    useSearchByName () {
        return this.currentFilterQuery !== undefined && this.currentFilterQuery.length > 0;
    }
}

export default ManageController;
