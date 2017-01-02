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
 * @name EventsLogDetailsController
 */
class EventsLogDetailsController {
    constructor ($dataLayerLimitedStack, $stateParams) {
        this.dataLayerLimitedStack = $dataLayerLimitedStack;
        this.stateParams = $stateParams;
    }
    
    get summary () {
        return this.dataLayerLimitedStack.get(this.stateParams.eventId);
    }

    get eventId () {
        return this.stateParams.eventId;
    }

    get tagSummary () {
        if (angular.equals({}, this.summary.tagSummaryCollection)) {
            return undefined;
        }

        return this.summary.tagSummaryCollection;
    }
}

EventsLogDetailsController.$inject = [
    'stg.debugger.dataLayerLimitedStack',
    '$stateParams'
];

angular
    .module('stg.debugger')
    .controller('stg.debugger.EventsLogDetailsController', EventsLogDetailsController);
