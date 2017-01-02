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

let div;

/**
 * @name Wrapper
 */
class Wrapper {
    constructor ($id) {
        div = window.parent.document.getElementById($id);
        this.navbar = window.document.getElementById('navbar');

        if (this.isMobile()) {
            this.navbar.style.background = '#2e9354';
        }
    }

    isMobile () {
        return window.parent.innerWidth < 400;
    }

    maximize () {
        if (div !== null) {
            if (this.isMobile()) {
                div.style.width = '100%';
            } else {
                div.style.width = '400px';
            }

            div.style.height = '100%';
            div.style.position = 'fixed';
            div.style.zIndex = '2147483647';
            div.style.right = 0;
            div.style.top = 0;

            setTimeout(() => {
                angular.element(window.document.body).removeClass('minimize');
            }, 500);
        }
    }

    minimize () {
        if (div !== null) {
            if (this.isMobile()) {
                div.style.width = '100%';
                div.style.height = '60px';
            } else {
                div.style.width = '60px';
            }

            angular.element(window.document.body).addClass('minimize');
        }
    }

    static wrapperFactory (id) {
        return new Wrapper(id);
    }
}

angular
    .module('stg.debugger')
    .value('seventagContainerDebuggerId', 'seventag_container_debugger')
    .factory('stg.debugger.wrapper', ['seventagContainerDebuggerId', Wrapper.wrapperFactory]);
