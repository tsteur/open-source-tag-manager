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

describe('Unit: EventsLogDetailsController class', () => {

    let scope, eventsLogDetailsController, controller;

    beforeEach(angular.mock.module('stg.debugger'));

    beforeEach(() => {

        let containerMock = {
            name: 'containerName',
            debugger: {
                close: jasmine.createSpy('close'),
                addListener: jasmine.createSpy('addListener'),
                stack: []
            }
        };

        let reportMock = {
            dataLayerLimitedStack: {
                get: jasmine.createSpy('get').and.returnValue(1)
            }
        };

        angular.mock.module(($provide) => {
            $provide.value('$container', containerMock);
            $provide.value('stg.debugger.report', reportMock);
            $provide.value('$stateParams', {eventId: 1});
        });

        angular.mock.inject([

            '$rootScope',
            '$controller',

            ($rootScope, $controller) => {

                scope = $rootScope.$new();

                eventsLogDetailsController = () => {
                    return $controller('stg.debugger.EventsLogDetailsController as view', {
                        '$scope': scope
                    });
                };
            }

        ]);
    });

    it('should be defined', () => {

        controller = eventsLogDetailsController();

        expect(controller).toBeDefined();

    });

    describe('should have getter "summary" which', () => {

        it('should be defined', () => {

            expect(controller.summary).toBeDefined();

        });

    });

    describe('should have getter "eventId" which', () => {

        it('should be defined', () => {

            expect(controller.eventId).toBeDefined();

        });

        it('should return tagSummary for specific stateParameter', () => {

            expect(controller.eventId).toBe(1);

        });

    });

});
