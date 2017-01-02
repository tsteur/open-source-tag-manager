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
 * @name Debugger
 */
class Debugger {
    constructor ($container, $timeout, $minimizedMemento) {
        if ($container.debugOptions !== undefined) {
            if ($container.debugOptions.containerName !== undefined) {
                this.$containerName = $container.debugOptions.containerName;
            }
        }

        this.$debugger = $container.debugger;
        this.$tagTree = angular.copy($container.tagTree);
        this.$tagTreeSync = angular.copy($container.tagTreeSync);
        this.$timeout = $timeout;
        this.minimizedMemento = $minimizedMemento;
    }

    close () {
        if (this.$debugger.close !== undefined) {
            this.$debugger.close();
        }
    }

    getContainerName () {
        return this.$containerName;
    }

    getTagTree () {
        let hasSynchronousTagTree = this.$debugger.sync && this.$tagTreeSync;
        return hasSynchronousTagTree ? this.$tagTree.concat(this.$tagTreeSync) : this.$tagTree;
    }

    getDataLayerStates () {
        if (this.$debugger.stack !== undefined) {
            return this.$debugger.stack;
        }
    }

    addListenerContainerStates (listener) {
        this.$debugger.addListener(() => {
            this.$timeout(listener);
        });
    }
}

Debugger.$inject = [
    '$container',
    '$timeout',
    'stg.debugger.minimizedMemento'
];

angular
    .module('stg.debugger')
    .service('stg.debugger.debugger', Debugger);
