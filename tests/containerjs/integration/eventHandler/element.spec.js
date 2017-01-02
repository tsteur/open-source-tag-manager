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

describe('Integration: element', function () {

    var Element;

    beforeEach(function () {
        Element = window.sevenTag.$injector.get('Element');
    });

    it('should call method appendChild properly', function () {

        var parentElement = window.document.createElement('DIV');
        var childElement = window.document.createElement('BUTTON');

        var element = new Element(parentElement);

        element.appendChild(childElement);

        expect(parentElement.hasChildNodes()).toBeTruthy();

    });

});
