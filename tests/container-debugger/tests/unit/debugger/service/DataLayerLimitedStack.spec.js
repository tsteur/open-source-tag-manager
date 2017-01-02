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

describe('Unit: DataLayerLimitedStack service', () => {

    const MODULE_NAME = 'stg.debugger';

    /**
     * @var DataLayerLimitedStack
     */
    let $dataLayerLimitedStack;

    beforeEach(angular.mock.module(MODULE_NAME));

    beforeEach(() => {

        angular.mock.inject(($injector) => {
            $dataLayerLimitedStack = $injector.get(`${MODULE_NAME}.dataLayerLimitedStack`);
        });

    });

    it('should be defined', () => {

        expect($dataLayerLimitedStack).toBeDefined();

    });

    describe('method isLimitDefined', () => {

        it('should be defined', () => {

            expect($dataLayerLimitedStack.isLimitDefined).toBeDefined();

        });

        it('should return true if we pass limit argument', () => {

            var result = $dataLayerLimitedStack.isLimitDefined(10);

            expect(result).toBe(true);

        });

        it('should return false if we have undefined limit', () => {

            var result = $dataLayerLimitedStack.isLimitDefined(undefined);

            expect(result).toBe(false);

        });
    });

    describe('method get stack', () => {

        it('should be defined', () => {

            expect($dataLayerLimitedStack.stack).toBeDefined();

        });

        it('should return stack array', () => {

            var stack = $dataLayerLimitedStack.stack;

            expect(stack.length).toBe(0);

        });

    });

    describe('method push', () => {

        it('should be defined', () => {

            expect($dataLayerLimitedStack.push).toBeDefined();

        });

        it('should add new element to stack', () => {

            $dataLayerLimitedStack.push(['test']);

            var stack = $dataLayerLimitedStack.stack;
            expect(stack.length).toBe(1);

        });

    });

    describe('method setLimit', () => {

        it('should be defined', () => {

            expect($dataLayerLimitedStack.setLimit).toBeDefined();

        });

        it('should set limit for stack from argument', () => {

            var result;

            $dataLayerLimitedStack.setLimit(1);
            result = $dataLayerLimitedStack.isLimitExceeded();

            expect(result).toBe(false);

            $dataLayerLimitedStack.push(['test']);
            result = $dataLayerLimitedStack.isLimitExceeded();

            expect(result).toBe(true);
        });

        it('should set limit for stack to default value', () => {

            var result;

            $dataLayerLimitedStack.setLimit(undefined);

            result = $dataLayerLimitedStack.isLimitExceeded();
            expect(result).toBe(false);

            for (var i=0; i<299; i++) {
                $dataLayerLimitedStack.push(['test']);
            }
            result = $dataLayerLimitedStack.isLimitExceeded();
            expect(result).toBe(false);

            $dataLayerLimitedStack.push(['test']);
            
            result = $dataLayerLimitedStack.isLimitExceeded();
            expect(result).toBe(true);

        });

    });

    describe('method isLimitExceeded', () => {

        it('should be defined', () => {

            expect($dataLayerLimitedStack.isLimitExceeded).toBeDefined();

        });

        it('should return false if limit is not exceeded', () => {

            var result = $dataLayerLimitedStack.isLimitExceeded();

            expect(result).toBe(false);

        });

        it('should return true if limit is exceeded', () => {

            $dataLayerLimitedStack.setLimit(1);
            $dataLayerLimitedStack.push(['test']);

            expect($dataLayerLimitedStack.isLimitExceeded()).toBe(true);

        });

    });

});
