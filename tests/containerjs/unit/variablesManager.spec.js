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

describe('Unit tests: Variable Manager', function() {
    var variablesManager,
        $injector;

    beforeEach(function() {
        $injector = window.sevenTag.$injector;

        variablesManager = $injector.get('$variablesManager');
    });

    it('should be defined', function () {
        expect(variablesManager).toBeDefined();
    });

    describe('when call handle method', function() {

        var state = {};

        beforeEach(function() {

            state.dataLayer = {
                'elementId': 'elementId',
                'elementClasses': 'test test-success',
                'form_href': 'www.clearcode.cc/test',
                'click_classes': 'form-clicked'
            };
        });

        it('should return associated array of variables', function() {

            var variables = variablesManager.handle(state);

            expect(variables instanceof Object).toBeTruthy();

        });

        it('should return variables collection with fields', function () {

            var variables = variablesManager.handle(state);

            /* eslint-disable */
            expect(variables['Page Url']).toBeDefined();
            expect(variables['Page Path']).toBeDefined();
            expect(variables['Page Hostname']).toBeDefined();
            expect(variables['Form Classes']).toBeDefined();
            expect(variables['Form ID']).toBeDefined();
            expect(variables['Form Url']).toBe(undefined);
            /* eslint-enable */

        });

    });
});
