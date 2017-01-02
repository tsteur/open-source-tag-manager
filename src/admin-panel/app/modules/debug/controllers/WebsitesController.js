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

let state,
    stateParams,
    alert,
    currentContainer,
    websitesResource;

/**
 * @name WebsitesController
 */
class WebsitesController {
    constructor (
        $websitesResource,
        $state,
        $stateParams,
        $alert,
        $currentContainer,
        $translate,
        $scope
    ) {
        state = $state;
        stateParams = $stateParams;
        alert = $alert;
        currentContainer = $currentContainer;
        websitesResource = $websitesResource;

        this.websites = [];
        this.websitesPromise = websitesResource.query(stateParams.containerId); 
      
        this.websitesPromise.then((resp) => {
            this.websites = resp.data;
        });

        $translate(['by hash', 'by query'])
            .then((translations) => {
                this.parameterTypes = [{
                    value: 0,
                    name: translations['by query']
                }, {
                    value: 1,
                    name: translations['by hash']
                }];
            });

        $scope.getWebsiteUrlWithParameter = (website) => website.getUrlWithParameter();
    }

    /**
     * Method to create new container website
     */
    addContainerWebsite () {
        if (!currentContainer.$container.hasPermission('edit')) {
            return;
        }

        if (!this.websites) {
            this.websites = [];
        }

        this.websites.push(websitesResource.getEntityObject());
    }

    /**
     * Method to remove container websites
     *
     * @param {Number} index
     */
    removeContainerWebsite (index) {
        this.websites.splice(index, 1);
    }

    /**
     * Handle form submit action
     */
    submitForm () {
        let websites = [];

        for (let i = 0; this.websites && i < this.websites.length; i++) {
            let website = websitesResource.getEntityObject();

            website.url = this.websites[i].url;
            website.parameterType = this.websites[i].parameterType;

            websites.push(website);
        }

        this.websitePromise = websitesResource.put(stateParams.containerId, websites);

        this.websitePromise.then(
            () => {
                currentContainer.get(stateParams.containerId);
                alert.success('success.edit');

                state.go('debug', {containerId: stateParams.containerId});
            },
            () => {
                alert.error('error.invalid');

                this.validateContainer = true;
            }
        );
    }
}

export default WebsitesController;
