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


describe('Unit: VersionController', () => {
    var VersionController, updateResource, $scope;

    beforeEach(module('clearcode.tm.update', ($provide) => {
        updateResource = {
            setSession: jasmine.createSpy('setSession').and.returnValue({
                then: () => {
                    return 'setSession called';
                }
            })
        };

        $provide.value('clearcode.tm.update.updateResource', updateResource);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            VersionController = $controller('clearcode.tm.update.VersionController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(VersionController).toBeDefined();
    });

    describe('when call startUpdate method', () => {
        it('should call setSession method on updateResource', () => {
            VersionController.startUpdate();

            expect(updateResource.setSession).toHaveBeenCalled();
        });
    });
});
