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


describe('Unit: PrivacyController', () => {
    var PrivacyController, stateParams, containerResource, $scope;

    beforeEach(module('clearcode.tm.tagContainer', ($provide) => {
        containerResource = {
            getPrivacyOptOut: jasmine.createSpy('getPrivacyOptOut').and.returnValue({
                then: () => {
                    return 'getPrivacyOptOut called';
                }
            })
        };

        stateParams = {
            containerId: 1
        };

        $provide.value('$stateParams', stateParams);
        $provide.value('clearcode.tm.tagContainer.containerResource', containerResource);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            PrivacyController = $controller('clearcode.tm.tagContainer.PrivacyController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(PrivacyController).toBeDefined();
    });

    describe('when calling constructor', () => {
        it('should call getPrivacyOptOut method on containerResource object', () => {
            expect(containerResource.getPrivacyOptOut).toHaveBeenCalledWith(stateParams.containerId);
        });
    });
});
