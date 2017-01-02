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

/**
 * @name validator#stgFormDirective
 * @namespace clearcode.tm.validator
 */

let isPromise = (promise) => {
    if (typeof promise === 'object' && typeof promise.then === 'function') {
        return true;
    }

    return false;
};

var stgFormDirective = function ($alertProvider, $alertForm) {
    return {
        restrict: 'A',
        scope: {
            formResource: '='
        },
        link: (scope, element) => {
            scope.$watch('formResource', (formPromise) => {
                if (formPromise && isPromise(formPromise)) {
                    formPromise.then(
                        () => {},
                        (resp) => {
                            if (resp.errors.hasOwnProperty('form')) {
                                if (!$alertProvider.getMessagePattern('login.server')) {
                                    $alertProvider.addMessagePattern(
                                        'login.server',
                                        resp.errors.form[0]
                                    );
                                }

                                $alertForm.getStorage().clean();
                                $alertForm.error('login.server');
                            }

                            for (let field in resp.errors.fields) {
                                if (resp.errors.fields.hasOwnProperty(field)) {
                                    let form = scope.$parent[element[0].attributes.name.value];

                                    if (isNotEmptyArray(resp, field)) {
                                        form[field].$invalid = true;
                                        form[field].$setDirty();
                                        form[field].$error[field] = resp.errors.fields[field];
                                    } else {
                                        for (let nested in resp.errors.fields[field].fields) {
                                            if (isNested(resp, field, nested)) {
                                                form[nested].$invalid = true;
                                                form[nested].$error[nested] = resp.errors.fields[field].fields[nested];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    );
                }
            }, false);
        }
    };

    function isNotEmptyArray (resp, field) {
        return resp.errors.fields[field] instanceof Array &&
            resp.errors.fields[field].length !== 0
    }

    function isNested (resp, field, nested) {
        return resp.errors.fields[field].fields.hasOwnProperty(nested) &&
            resp.errors.fields[field].fields[nested].length !== 0
    }
};

export default stgFormDirective;
