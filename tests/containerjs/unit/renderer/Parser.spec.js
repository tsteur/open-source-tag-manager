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

describe('Unit: Parser Service', function () {

    var $parser, $contextId, $variablesHistory;
    var $variablesHistoryCall = function(contextId, variable) {
        return '<script>(function(){return window.sevenTag.$injector.get(\'$variablesHistory\').get(\''+contextId+'\', \''+variable+'\') })()</script>';
    };

    beforeEach(function () {
        $parser = window.sevenTag.$injector.get('$parser');
        $contextId = window.sevenTag.$injector.get('$utils').guid();
        $variablesHistory = window.sevenTag.$injector.get('$variablesHistory');
    });

    it('should be defined', function() {
        expect($parser).toBeDefined();
    });

    describe('when call parser method', function () {

        it('should return literal for primitive boolean (true)', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = true;

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual('<script>true</script>');

        });

        it('should return literal for primitive boolean (true)', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = false;

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual('<script>false</script>');

        });

        it('should return literal for primitive null type', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = null;

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual('<script>null</script>');

        });

        it('should return literal for primitive undefined type', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = undefined;

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual('<script>undefined</script>');

        });

        it('should return literal for numeric type (integer)', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = 20;

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual('<script>20</script>');

        });

        it('should return literal for numeric type (float)', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = 20.6;

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual('<script>20.6</script>');

        });

        it('should return literal for string type', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = 'string123';

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual('<script>\'string123\'</script>');

        });

        it('should return context call literal for String object', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = new String('string123');

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual($variablesHistoryCall($contextId, 'variable1'));
            expect($variablesHistory.get($contextId, 'variable1')).toBe(variable);

        });

        it('should return context call for Boolean (false)', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = new Boolean(false);

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual($variablesHistoryCall($contextId, 'variable1'));
            expect($variablesHistory.get($contextId, 'variable1')).toBe(variable);

        });

        it('should return context call for Boolean (true)', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = new Boolean(true);

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual($variablesHistoryCall($contextId, 'variable1'));
            expect($variablesHistory.get($contextId, 'variable1')).toBe(variable);

        });

        it('should return context call for Date', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = new Date();

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual($variablesHistoryCall($contextId, 'variable1'));
            expect($variablesHistory.get($contextId, 'variable1')).toBe(variable);

        });

        it('should return context call for Regex', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = /7tag/i;

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual($variablesHistoryCall($contextId, 'variable1'));
            expect($variablesHistory.get($contextId, 'variable1')).toBe(variable);

        });

        it('should return context call for Function', function () {

            var template = '<script>{{ variable1 }}</script>';
            var variable = function(x, y) {
                return x + y;
            };

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual($variablesHistoryCall($contextId, 'variable1'));
            expect($variablesHistory.get($contextId, 'variable1')).toBe(variable);

        });

        it('should return context call for complex object', function () {

            var template = '<script>{{ variable1 }}</script>';
            function Variable(x, y) {
                return  {
                    property1: 1,
                    property2: 'string',
                    calculation: function(z) {
                        return (x + y) * z;
                    }
                }
            }
            var variable = new Variable(1, 3);

            expect($parser.parse(template, {variable1: variable}, $contextId)).toEqual($variablesHistoryCall($contextId, 'variable1'));
            expect($variablesHistory.get($contextId, 'variable1')).toBe(variable);
            expect(variable.calculation(10)).toEqual(40);

        });
    });

});
