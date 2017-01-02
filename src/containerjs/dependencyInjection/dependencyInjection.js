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

(function(scope, $injector) {
    /**
     * Register service on costructor pattern to dependency injection
     *
     * @param {string} name
     * @param {Array|Function} factory
     */
    scope.service = function (name, factory) {
        var Resolver = $injector.resolve;

        $injector.register(
            name,
            new Resolver(factory)
        );
    };

    /**
     * Register simple service to dependency injection
     *
     * @param {string} name
     * @param {Array|Function} factory
     */
    scope.provider = function (name, factory) {
        $injector.register(
            name,
            $injector.resolve(factory)
        );
    };

    /**
     * Register object as service to dependency injection
     *
     * @param {string} name
     * @param {Object} value
     */
    scope.value = function (name, value) {
        $injector.register(name, value);
    };

    /**
     * Configure providers and settings for container script
     *
     * @param {Array|Function} factory
     */
    scope.config = function (factory) {
        $injector.resolve(factory);
    };
})(window.sevenTag, window.sevenTag.$injector);
