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

describe('Unit: EditController', () => {
    var EditController, integrationResource, $scope;

    beforeEach(module('clearcode.tm.integration', ($provide) => {
        integrationResource = {
            getEntityObject: jasmine.createSpy('getEntityObject').and.returnValue({
                then: () => 'getEntityObject has been called'
            }),
            get: jasmine.createSpy('get').and.returnValue({
                then: () => 'get has been called'
            })
        };

        $provide.value('clearcode.tm.integration.IntegrationResource', integrationResource);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            EditController = $controller('clearcode.tm.integration.EditController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(EditController).toBeDefined();
    });

    describe('when call constructor method', () => {
        it('should create Integration entity', () => {
            expect(integrationResource.getEntityObject).toHaveBeenCalled();
        });

        it('should call get method from Integration entity', () => {
            expect(integrationResource.get).toHaveBeenCalled();
        });
    });
});
