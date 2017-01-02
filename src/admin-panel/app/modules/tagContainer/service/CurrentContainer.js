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

let stateParams;
let $containerResource;
let alert;
let state;
let rootScope;
let cookies;
let conditionResource;

const PREVIEW_KEY = 'preview';
const DEBUG_KEY = 'debug';


/**
 * Convert params for request
 *
 * @name CurrentContainer
 */
class CurrentContainer {
    constructor (
        $stateParams,
        containerResource,
        $alert,
        $state,
        $rootScope,
        $cookies,
        $conditionResource,
        $translate
    ) {
        stateParams = $stateParams;
        $containerResource = containerResource;
        alert = $alert;
        state = $state;
        rootScope = $rootScope;
        this.$container = undefined;
        cookies = $cookies;

        this.types = undefined;
        this.debugMode = false;
        this.previewedContainer = undefined;
        this.translate = $translate;
        conditionResource = $conditionResource;
    }

    get (containerId) {
        containerId = this.getId(containerId);
        rootScope.currentContainerLoading = true;

        this.containerPromise = $containerResource.get(containerId).then(
            (resp) => {
                this.$container = resp;
                rootScope.currentContainerLoading = false;
                this.verifyDebugMode();

                if (this.types === undefined) {
                    this.types = this.setTypes();
                }

                return this.$container;
            }
        );

        return this.containerPromise;
    }

    getId (containerId) {
        return containerId !== undefined ? containerId : stateParams.containerId;
    }

    getContainer () {
        let response;

        if (this.containerPromise === undefined) {
            response = this.get();
        } else {
            response = this.containerPromise;
        }

        return response;
    }

    publish () {
        let publishPromise = $containerResource.publishVersion(this.getId());

        rootScope.currentContainerLoading = true;

        return publishPromise.then(
            () => {
                alert.success('success.publish');
                rootScope.currentContainerLoading = false;
                this.get().then(() => {
                    rootScope.$broadcast('container-published', this);
                });
            },
            () => {
                alert.error('container.error');
                rootScope.currentContainerLoading = false;
            }
        );
    }

    canRestore () {
        if (!this.$container) {
            return false;
        }

        return this.$container.publishedAt && this.$container.hasUnpublishedChanges;
    }

    isDirty () {
        return this.$container && this.$container.hasUnpublishedChanges;
    }

    isPublished () {
        if (!this.$container) {
            return false;
        }

        return this.$container.publishedAt && !this.$container.hasUnpublishedChanges;
    }

    makeChanges () {
        if (!this.$container) {
            return false;
        }

        return this.$container.hasUnpublishedChanges = true;
    }

    /**
     * Dischard draft changes to latest published version
     */
    restore () {
        var restorePromise = $containerResource.restoreVersion(this.getId());
        rootScope.currentContainerLoading = true;

        restorePromise.then(
            () => {
                alert.success('success.restore');
                this.get();

                let isTagView = state.includes('tags') || state.includes('tagEdit') || state.includes('tagCreate'),
                    isTriggerView = state.includes('triggers') || state.includes('triggerCreate') || state.includes('triggerEdit');
                if (isTagView) {
                    state.go('tags', {containerId: this.getId()}, {reload: true});
                } else if (isTriggerView) {
                    state.go('triggers', {containerId: this.getId()}, {reload: true});
                } else {
                    state.go('containerEdit', {containerId: this.getId()}, {reload: true});
                }

                rootScope.currentContainerLoading = false;
            },
            () => {
                alert.error('container.error');
            }
        );
    }

    verifyDebugMode () {
        if (this.isDebugModeEnabled()) {
            let cookiesDebug = cookies.get(DEBUG_KEY);
            if (cookiesDebug === this.$container.id) {
                this.debugMode = true;
                this.previewedContainer = this.$container;

                this
                    .translate(['Now Previewing'])
                    .then((translations) => {
                        this.previewedContainerText = translations['Now Previewing'];
                    });
            } else {
                this.disableDebugMode();
            }
        }
    }

    isDebugModeEnabled () {
        let cookiesDebug = cookies.get(DEBUG_KEY);
        let cookiesPreview = cookies.get(PREVIEW_KEY);

        return cookiesDebug !== undefined && cookiesPreview !== undefined && cookiesDebug === cookiesPreview;
    }

    enableDebugMode () {
        this.debugMode = true;
        this.previewedContainer = this.$container;

        this
            .translate(['Now Previewing'])
            .then((translations) => {
                this.previewedContainerText = translations['Now Previewing'];
            });

        cookies.put(PREVIEW_KEY, this.$container.id);
        cookies.put(DEBUG_KEY, this.$container.id);
    }

    disableDebugMode () {
        this.debugMode = false;
        this.previewedContainer = undefined;

        cookies.remove(PREVIEW_KEY);
        cookies.remove(DEBUG_KEY);
    }

    setTypes () {
        return conditionResource.query(this.getId()).then(
            (resp) => {
                let respIndex = resp.length,
                    mapped = [];

                while (respIndex--) {
                    mapped[respIndex] = {
                        name: resp[respIndex].name,
                        type: resp[respIndex].type
                    };
                }

                return mapped;
            }
        );
    }

    hasPermission (permission) {
        return this.getContainer().then((container) => container.hasPermission(permission));
    }
}

export default CurrentContainer;
