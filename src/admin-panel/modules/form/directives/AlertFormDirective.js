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
 * @name form#AlertFormDirective
 * @namespace clearcode.tm.form
 */

var alertFormDirective = (Alert, alertProvider) => {
    return {
        restrict: 'E',
        templateUrl: 'modules/form/views/alertForm.html',
        scope: {
            interval: '='
        },
        controller: 'clearcode.tm.form.AlertFormController',
        controllerAs: 'alertFormCtrl',
        link: (scope) => {
            Alert.settings.interval = angular.isDefined(scope.interval) ? scope.interval : alertProvider.interval;
        }
    };
};

export default alertFormDirective;
