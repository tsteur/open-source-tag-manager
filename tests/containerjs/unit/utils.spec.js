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

describe('Unit: utils module', function () {

    var utils;

    beforeEach(function () {
        utils = window.sevenTag.$injector.get('$utils');
    });

    describe('Unit: isArray method', function () {

        it('should be defined', function () {
            expect(utils.isArray).toBeDefined();
        });

        it('should return true when is Array', function () {

            var array = [];

            expect(utils.isArray(array)).toBeTruthy();
        });

        it('should return false when is not Array', function () {

            var object = {};

            expect(utils.isArray(object)).toBeFalsy();
        });

    });

    describe('Unit: isWindow method', function () {

        it('should be defined', function () {
            expect(utils.isWindow).toBeDefined();
        });

        it('should return true when is \"window\"', function () {

            expect(utils.isWindow(window)).toBeTruthy();
        });

        it('should return false when is not \"window\"', function () {

            var object = {};

            expect(utils.isWindow(object)).toBeFalsy();
        });

    });

    describe('Unit: isPlainObject method', function () {

        it('should be defined', function () {
            expect(utils.isPlainObject).toBeDefined();
        });

        it('should return false when is not object', function () {

            var mockFunction = function () {
                return true;
            };

            expect(utils.isPlainObject(mockFunction)).toBeFalsy();
        });

        it('should return true when is object', function () {

            var object = {};

            expect(utils.isPlainObject(object)).toBeTruthy();
        });

    });

    describe('Unit: extend method', function () {

        it('should be defined', function () {
            expect(utils.extend).toBeDefined();
        });

        describe('when clone object', function () {

            var object;

            beforeEach(function () {

                object = {
                    method1: function () {
                        return true;
                    }
                };
            });

            it('should create new object from existing one', function () {

                var obj2 = utils.extend(true, object);

                obj2.customProperty = 'some property';

                expect(object.hasOwnProperty('customProperty')).toBeFalsy();
            });

            it('should have method from cloned object', function () {

                var obj2 = utils.extend(true, object);

                expect(obj2.hasOwnProperty('method1')).toBeTruthy();

            });
        });

        describe('when extend library object', function () {

            var object;

            beforeEach(function () {

                object = {
                    method1: function () {
                        return true;
                    }
                };

            });

            it('should have method from extended object', function () {

                var object2 = {};

                utils.extend(object2, object);

                expect(object2.method1).toBeDefined();
            });

        });

        describe('when merge two objects new object', function () {

            var object;

            beforeEach(function () {

                object = utils.extend({
                    method1: function () {
                        return true;
                    }
                }, {
                    method2: function () {
                        return false;
                    }
                });

            });

            it('should contain methods from first object', function () {

                expect(object.method1).toBeDefined();

            });

            it('should contain methods from second object', function () {

                expect(object.method2).toBeDefined();
            });
        });

        describe('Unit: type method', function () {

            it('should be defined', function () {
                expect(utils.type).toBeDefined();
            });

            it('should return \'null\' string when null given', function () {

                expect(utils.type(null)).toBe('null');

            });

            it('should return \'object\' string when simple object given', function () {

                expect(utils.type({})).toBe('object');
            });

            it('should return \'number\' string when number given', function () {

                expect(utils.type(2)).toBe('number');
            });

        });


        describe('Unit: getElementsByClassName method', function () {

            var element;

            beforeEach(function () {
                var Element = window.sevenTag.$injector.get('Element');
                element = new Element(window.document.body);
            });

            it('should be defined', function () {
                expect(utils.getElementsByClassName).toBeDefined();
                expect(element).toBeDefined();
            });

            it('should return elements if exists in DOM', function () {
                expect(utils.getElementsByClassName('className').length).toBe(0);

                var wrapper = window.document.createElement('div');
                wrapper.className = 'className';
                element.appendChild(wrapper);

                expect(utils.getElementsByClassName('className').length).toBe(1);
            });

        });

        describe('Unit: inArray method', function () {

            var mockArray;

            beforeEach(function () {

                mockArray = [
                    'firstElement',
                    'secondElement',
                    'thirdElement'
                ];
            });

            it('should be defined', function () {
                expect(utils.inArray).toBeDefined();
            });

            it('should return \'-1\' when not array pass', function () {

                expect(utils.inArray('firstElement', undefined)).toBe(-1);

            });

            it('should return \'-1\' when not find element', function () {

                expect(utils.inArray('customElement', mockArray)).toBe(-1);
            });

            it('should return indicator when element is find', function () {

                expect(utils.inArray('firstElement', mockArray)).toBe(0);
            });

        });

        describe('Unit: inString method', function () {

            it('should be defined', function () {
                expect(utils.inString).toBeDefined();
            });

            it('should return \'-1\' when not match string', function () {

                expect(utils.inString('http://example.com', '?param=1')).toBe(-1);
            });

            it('should return position of matched element', function () {

                expect(utils.inString('http://example.com?param=1', '?param=1')).toBe(18);
            });

            it('should return first position of matched element', function () {

                expect(utils.inString('?param=1http://example.com?param=1', '?param=1')).toBe(0);
            });

        });

        describe('Unit: trim method', function () {

            it('should be defined', function () {
                expect(utils.trim).toBeDefined();
            });

            it('should remove spaces', function () {

                expect(utils.trim('    test    ')).toBe('test');
            });

            it('shouldn\'t remove spaces if not necessary', function () {

                expect(utils.trim('test')).toBe('test');
            });

        });

        describe('Unit: guid method', function () {

            it('should be defined', function () {
                expect(utils.guid).toBeDefined();
            });

            it('should generate guid string', function () {
                expect(typeof utils.guid()).toBe('string');
            });

        });


    });

});
