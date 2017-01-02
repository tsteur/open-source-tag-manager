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

/* global describe: false, jasmine: false, beforeEach: false, inject: false, it: false, expect: false */

describe('Unit: ManageController', () => {
    var ManageController, integration, $scope, integrationResource;

    beforeEach(module('clearcode.tm.integration', ($provide) => {
        integration = {
            total: 0,
            data: [],
            remove: jasmine.createSpy('remove').and.returnValue({
                then: () => 'remove called'
            }),

            changeStatus: jasmine.createSpy('changeStatus').and.returnValue({
                then: () => 'changeStatus called'
            })
        };

        integrationResource = {
            query: jasmine.createSpy('query').and.returnValue({
                then: () => integration
            })
        };

        $provide.value('clearcode.tm.integration.IntegrationResource', integrationResource);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            ManageController = $controller('clearcode.tm.integration.ManageController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(ManageController).toBeDefined();
    });

    it('should set table properly', () => {
        expect(ManageController.tableParams).toBeDefined();
    });

    describe('when call removeIntegration method', () => {
        it('should call remove method on Integration object', () => {
            ManageController.removeIntegration(integration);

            expect(integration.remove).toHaveBeenCalled();
        });
    });
});
