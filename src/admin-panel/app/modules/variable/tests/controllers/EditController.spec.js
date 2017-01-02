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
    var EditController, variableResource, $scope;

    beforeEach(module('clearcode.tm.variable', ($provide) => {
        variableResource = {
            getEntityObject: () => {},
            get: jasmine.createSpy('get').and.returnValue({
                then: () => {
                    return 'get has been called';
                }
            })
        };

        $provide.value('clearcode.tm.variable.variableResource', variableResource);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            EditController = $controller('clearcode.tm.variable.EditController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(EditController).toBeDefined();
    });

    describe('when call constructor method', () => {
        it('should get Variable entity', () => {
            expect(variableResource.get).toHaveBeenCalled();
        });
    });
});
