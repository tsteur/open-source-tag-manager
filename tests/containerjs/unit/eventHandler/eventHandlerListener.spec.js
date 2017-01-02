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

describe('Unit: eventHandlerListener', function () {

    var eventHandler, testedObject;

    beforeEach(function () {
        testedObject = {
            bind: function () {}
        };

        eventHandler = window.sevenTag.$injector.get('$eventHandler');
    });


    it('should add listeners', function () {
        expect(eventHandler.getListener('test')).toBeUndefined();
        eventHandler.addListener('test', testedObject);
        expect(eventHandler.getListener('test')).toBeDefined();
    });

    it('should remove listeners', function () {
        eventHandler.addListener('test', testedObject);
        expect(eventHandler.getListener('test')).toBeDefined();
        eventHandler.removeListener('test');
        expect(eventHandler.getListener('test')).toBeUndefined();
    });

    it('should call all listeners', function () {
        var done = false;

        eventHandler.addListener('test', testedObject);

        spyOn(testedObject, 'bind').andCallFake(function () {
            done = true;
        });

        eventHandler.run();

        expect(done).toBeTruthy();
    });

});
