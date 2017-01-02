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

describe('Unit: Debugger service', () => {

    const MODULE_NAME = 'stg.debugger';

    let $debugger;

    let containerMock = {};

    beforeEach(angular.mock.module(MODULE_NAME));

    beforeEach(() => {

        containerMock.debugOptions = {
            containerName: 'containerName'
        };

        containerMock.debugger = {
            close: jasmine.createSpy('close')
        };

        angular.mock.module(($provide) => {
            $provide.value('$container', containerMock);
        });

        angular.mock.inject(function($injector) {

            $debugger = $injector.get(`${MODULE_NAME}.debugger`);

        });
    });

    it('should be defined', () => {

        expect($debugger).toBeDefined();

    });

    describe('method close', () => {

        it('should be defined', () => {

            expect($debugger.close).toBeDefined();

        });

        it('should close debugger', () => {

            $debugger.close();

            expect(containerMock.debugger.close).toHaveBeenCalled();

        });

    });

    describe('method getContainerName', () => {

        it('should be defined', () => {

            expect($debugger.getContainerName).toBeDefined();

        });

        it('should return container name', () => {

            expect($debugger.getContainerName()).toBe('containerName');

        });

    });

    describe('method "getTagTree"', () => {

        it('should be defined', () => {

            expect($debugger.getTagTree).toBeDefined();

        });

    });

    describe('method getDataLayerStates', () => {

        it('should be defined', () => {

            expect($debugger.getDataLayerStates).toBeDefined();

        });
    });

    describe('method addListenerContainerStates', () => {

        it('should be defined', () => {

            expect($debugger.addListenerContainerStates).toBeDefined();

        });

    });

});
