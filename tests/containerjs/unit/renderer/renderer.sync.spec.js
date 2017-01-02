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

describe('Unit: Renderer Synchronous Service', function () {
    var renderer, windowMock, parserMock;

    beforeEach(function () {
        windowMock = {
            document: {
                write: function(){},
                close: function(){}
            }
        };

        parserMock = {
            parse: function () {}
        };

        var RendererSync = window.sevenTag.$injector.get('RendererSync');
        renderer = new RendererSync(windowMock, parserMock);
    });

    it('should call document', function() {
        spyOn(windowMock.document, 'write').andCallThrough();
        spyOn(windowMock.document, 'close').andCallThrough();
        spyOn(parserMock, 'parse').andCallThrough();

        var tag = {
            code: 'test'
        };

        renderer.render(tag);

        expect(windowMock.document.write).toHaveBeenCalled();
        expect(windowMock.document.close).toHaveBeenCalled();
        expect(parserMock.parse).toHaveBeenCalled();
    });
});