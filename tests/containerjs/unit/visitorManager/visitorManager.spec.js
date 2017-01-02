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

describe('Unit: stg visitor manager module', function () {

    var ARTIFICIAL_ARRAY_PROPERTY = 'ARTIFICIAL_ARRAY_PROPERTY';

    var visitorManager, visitorStrategyMock;

    beforeEach(function () {
        Array.prototype[ARTIFICIAL_ARRAY_PROPERTY] = ARTIFICIAL_ARRAY_PROPERTY;

        visitorStrategyMock = {
            visit: function (){
            }
        };

        var VisitorManagerClass = window.sevenTag.$injector.get('VisitorManager');
        visitorManager = new VisitorManagerClass(visitorStrategyMock);
    });

    afterEach(function () {
        delete Array.prototype[ARTIFICIAL_ARRAY_PROPERTY];
    });

    it('should be defined', function () {
        expect(visitorManager).toBeDefined();
    });

    it('add visitor', function () {
        var visitor = {};

        expect(visitorManager.has(visitor)).toEqual(false);
        expect(visitorManager.add(visitor)).toEqual(true);
        expect(visitorManager.has(visitor)).toEqual(true);
        expect(visitorManager.getVisitors().length).toEqual(1);
        expect(visitorManager.getVisitors()).toEqual([visitor]);
    });

    it('remove visitor', function(){
        var visitor = {};

        expect(visitorManager.has(visitor)).toEqual(false);
        expect(visitorManager.add(visitor)).toEqual(true);
        expect(visitorManager.has(visitor)).toEqual(true);
        expect(visitorManager.remove(visitor)).toEqual(true);
        expect(visitorManager.remove(visitor)).toEqual(false);
        expect(visitorManager.getVisitors().length).toEqual(0);
        expect(visitorManager.getVisitors()).toEqual([]);

    });

    it('remove all visitors', function(){
        var visitor1 = {1: ''};
        var visitor2 = {2: ''};
        var visitor3 = {3: ''};

        expect(visitorManager.add(visitor1)).toEqual(true);
        expect(visitorManager.add(visitor2, 255)).toEqual(true);
        expect(visitorManager.add(visitor3, -255)).toEqual(true);
        expect(visitorManager.getVisitors().length).toEqual(3);
        expect(visitorManager.getVisitors()).toEqual([visitor2, visitor1, visitor3]);

        expect(visitorManager.removeAll()).toEqual(true);
        expect(visitorManager.getVisitors().length).toEqual(0);
        expect(visitorManager.getVisitors()).toEqual([]);
    });

    it('return visitors by priority', function () {
        var visitor1 = {1: ''};
        var visitor2 = {2: ''};
        var visitor3 = {3: ''};

        expect(visitorManager.add(visitor1)).toEqual(true);
        expect(visitorManager.add(visitor2, 255)).toEqual(true);
        expect(visitorManager.add(visitor3, -255)).toEqual(true);
        expect(visitorManager.getVisitors().length).toEqual(3);
        expect(visitorManager.getVisitors()).toEqual([visitor2, visitor1, visitor3]);
    });

    it('should use provided visit strategy', function () {
        var visitor1 = {1: ''},
            visitor2 = {2: ''},
            target = {},
            variables = [];

        spyOn(visitorStrategyMock, 'visit').andCallFake(function () {
            return false;
        });

        var visitResult = visitorManager.visit(target, variables);

        expect(visitorStrategyMock.visit).toHaveBeenCalledWith(jasmine.any(Array), target, variables);
        expect(visitResult).toBeFalsy();
    });

    it('should not contain properties of prototype object', function () {
        expect(visitorManager.has(ARTIFICIAL_ARRAY_PROPERTY)).toBeFalsy();
    });

});
