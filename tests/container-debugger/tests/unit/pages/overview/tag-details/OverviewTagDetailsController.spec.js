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
'use strict';

describe('Unit: OverviewTagDetailsController class', () => {

    let scope, overviewTagDetailsController, controller, containerMock;

    beforeEach(angular.mock.module('stg.debugger'));

    beforeEach(() => {

        containerMock = {
            name: 'containerName',
            debugger: {
                close: jasmine.createSpy('close'),
                addListener: jasmine.createSpy('addListener'),
                stack: []
            },
            $doNotTrack: {
                isEnabled: () => {
                    return true;
                }
            }
        };

        let reportMock = {
            stateSummary: {
                getTagSummary: jasmine.createSpy('getTagSummary').and.returnValue(1)
            }
        };

        angular.mock.module(($provide) => {
            $provide.value('$container', containerMock);
            $provide.value('stg.debugger.report', reportMock);
        });

        angular.mock.inject(
            function ($controller, $rootScope) {

                scope = $rootScope.$new();

                controller = $controller('stg.debugger.OverviewTagDetailsController', {
                    $scope: scope
                });

            }
        );
    });

    it('should be defined', () => {

        expect(controller).toBeDefined();

    });

    describe('should have getter "tagSummary" which', () => {

        it('should be defined', () => {

            expect(controller.tagSummary).toBeDefined();

        });

        it('should return tagSummary for specific stateParameter', () => {

            expect(controller.tagSummary).toBe(1);

        });

    });

});
