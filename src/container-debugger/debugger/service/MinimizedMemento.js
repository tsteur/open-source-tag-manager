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
 * @name MinimizedMemento
 */
class MinimizedMemento {
    constructor ($wrapper, $cookies) {
        this.$wrapper = $wrapper;
        this.$cookies = $cookies;
        this.setMinimized(false);
    }
    
    setMinimized (minimized) {
        window.parent.stgDebuggerMinimized = minimized;
    }

    isMinimized () {
        return window.parent.stgDebuggerMinimized;
    }

    isMaximized () {
        return !this.isMinimized();
    }

    maximize () {
        this.setMinimized(false);
        this.$wrapper.maximize();
    }

    minimize () {
        this.setMinimized(true);
        this.$wrapper.minimize();
    }
}

MinimizedMemento.$inject = [
    'stg.debugger.wrapper',
    '$cookies'
];

angular
    .module('stg.debugger')
    .service('stg.debugger.minimizedMemento', MinimizedMemento);
