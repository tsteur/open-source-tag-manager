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
 * @name BaseController
 */
class BaseController {
    /**
     * @param {IntegrationResource} $Integration
     * @param {PageInfo} $PageInfo
     * @param {$stateParams} $stateParams
     * @param {Alert} $alert
     * @param {$state} $state
     * @param {$translate} $translate
     */
    constructor (
        $Integration,
        $PageInfo,
        $stateParams,
        $alert,
        $state,
        $translate
        ) {
        const BREADCRUMB_TEXT = 'Integrations';

        this.integration = $Integration.getEntityObject();
        this.stateParams = $stateParams;
        this.alert = $alert;
        this.state = $state;

        this.formTouched = false;

        $translate([BREADCRUMB_TEXT, this.getBreadcrumbText()])
            .then((translations) => {
                $PageInfo.clear()
                    .add(translations[BREADCRUMB_TEXT], 'integration')
                    .add(translations[this.getBreadcrumbText()])
                    .broadcast();
            });
    }

    /**
     * Handle form submit action
     *
     * @param {Integration} Integration
     */
    submitForm (Integration) {
        this.integrationPromise = Integration.save(this.stateParams.id);

        this.integrationPromise.then(
            (resp) => {
                this.alert.success(this.getAlertType());

                if (this.state.includes('integrationCreate')) {
                    this.state.go('integrationEdit', {
                        integrationId: resp.id
                    });
                } else {
                    this.state.go('integration');
                }
            },
            () => {
                this.alert.error('error.invalid');
            }
        );
    }

    /**
     * Display error if form is invalid
     */
    displayInvalidFormMessage () {
        this.validateIntegration = true;
        this.alert.error('error.invalid');
    }
}

export default BaseController;
