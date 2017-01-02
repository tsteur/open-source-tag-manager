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
/* global describe: false, beforeEach: false, inject: false, it: false, expect: false */

describe('Unit: clearcode.tm.validator.stgFormDirective', () => {
    var element, scope, $compile, $q, isolated, $alertForm;

    beforeEach(module('clearcode.tm.validator'));

    beforeEach(inject((_$compile_, $rootScope, _$q_, $injector) => {
        scope = $rootScope;
        $compile = _$compile_;
        $q = _$q_;

        element = angular.element('<form name="testForm" stg-form form-resource="deferred">' +
            '<input ng-model="first" name="first">' +
            '<input ng-model="second" name="second">' +
            '<input ng-model="third" name="third">' +
            '<input ng-model="foo" name="foo">' +
            '<input ng-model="foobar" name="foobar"></form>');

        scope.deferred = undefined;

        $alertForm = $injector.get('clearcode.tm.form.alertForm');

        element = $compile(element)(scope);

        scope.$digest();

        isolated = element.isolateScope();
    }));

    it('should be defined', () => {
        expect(element).toBeDefined();
    });

    describe('Unit: link function', () => {
        it('should pass promise object with form error', () => {
            spyOn($alertForm, 'error');

            isolated.$apply(() => {
                var deferred = $q.defer();

                deferred.reject({
                    errors: {
                        form: ['Invalid username and password combination']
                    }
                });

                isolated.formResource = deferred.promise;
            });

            expect($alertForm.error).toHaveBeenCalled();
        });

        it('should not pass simple object with form error', () => {
            spyOn($alertForm, 'error');

            isolated.$apply(() => {
                isolated.formResource = {
                    resp: {
                        errors: {
                            form: ['Invalid username and password combination']
                        }
                    }
                };
            });

            expect($alertForm.error).not.toHaveBeenCalled();
        });

        describe('Fields validation', () => {
            it('should register errors properly', () => {
                isolated.$apply(() => {
                    var deferred = $q.defer();

                    deferred.reject({
                        errors: {
                            fields: {
                                first: ['Invalid first'],
                                second: [],
                                third: ['Invalid third', 'Invalid third again']
                            }
                        }
                    });

                    isolated.formResource = deferred.promise;
                });

                expect(isolated.$parent.testForm.first.$error.first.length).toBe(1);
                expect(isolated.$parent.testForm.second.$error.second).not.toBeDefined();
                expect(isolated.$parent.testForm.third.$error.third.length).toBe(2);
            });

            it('should register error properly', () => {
                isolated.$apply(() => {
                    var deferred = $q.defer();

                    deferred.reject({
                        errors: {
                            fields: {
                                first: ['Invalid first'],
                                second: [],
                                third: ['Invalid third', 'Invalid third again'],
                                fourth: {
                                    fields: {
                                        foo: ['bar'],
                                        foobar: ['foo', 'bar']
                                    }
                                }
                            }
                        }
                    });

                    isolated.formResource = deferred.promise;
                });

                expect(isolated.$parent.testForm.first.$error.first.length).toBe(1);
                expect(isolated.$parent.testForm.second.$error.second).not.toBeDefined();
                expect(isolated.$parent.testForm.third.$error.third.length).toBe(2);
                expect(isolated.$parent.testForm.foo.$error.foo.length).toBe(1);
                expect(isolated.$parent.testForm.foobar.$error.foobar.length).toBe(2);
            });
        });
    });
});
