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

describe('Unit: Application module', () => {

    let scope, windowMock;

    beforeEach(angular.mock.module('application'));

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

            windowMock = {
                orientation: 0,
                parent: {
                    screen: {
                        availWidth: 300
                    },
                    innerWidth: 200,
                    innerHeight: 300
                },
                addEventListener: jasmine.createSpy('addEventListener')
            };

            $provide.value('$window', windowMock);

            $provide.value('$container', containerMock);
            $provide.value('stg.debugger.report', reportMock);

        });

        angular.mock.inject([

            '$rootScope',

            ($rootScope) => {

                scope = $rootScope.$new();

            }

        ]);
    });

    describe('\'isMobile\' function', () => {

        it('should be defined', () => {

            expect(scope.isMobile).toBeDefined();

        });

        it('should return true when orientation is pivot and resolution is small', () => {

            expect(scope.isMobile()).toBeTruthy();

        });

        it('should return false when orientation is landscape and resolution is small', () => {

            windowMock.orientation = 1;

            expect(scope.isMobile()).toBeFalsy();

        });

        it('should return false when orientation is pivot and resolution is large', () => {

            windowMock.parent.screen.availWidth = 1200;

            expect(scope.isMobile()).toBeFalsy();

        });

        it('should return false when orientation is landscape and resolution is small', () => {

            windowMock.parent.screen.availWidth = 1200;
            windowMock.orientation = 1;

            expect(scope.isMobile()).toBeFalsy();

        });

    });

    describe('\'isHelperVisible\' function', () => {

        it('should be defined', () => {

            expect(scope.isHelperVisible).toBeDefined();

        });

        it('should return false when device is mobile', () => {

            expect(scope.isHelperVisible()).toBeFalsy();

        });

        it('should return false when device has large resolution', () => {

            windowMock.parent.innerWidth = 1200;
            windowMock.parent.innerHeight = 1200;

            expect(scope.isHelperVisible()).toBeTruthy();

        });

    });

});
