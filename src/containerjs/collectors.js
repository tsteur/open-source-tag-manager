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

(function (sevenTag) {
    var CAMPAIGN_PARAMETER = 'utm_campaign';

    var config = function ($collectorProvider, $cookie, $window, $document, $location, $utils) {
        $collectorProvider
            .add('dataLayer', function (variable, state) {
                if(typeof state.dataLayer[variable.value] !== 'undefined') {
                    return state.dataLayer[variable.value];
                }

                return undefined;
            })
            .add('constant', function (variable) {
                return variable.value;
            })
            .add('cookie', function (variable) {
                return $cookie.get(variable.value);
            })
            .add('url', function (variable) {
                var definedValues = ['href', 'hostname', 'pathname'];

                if ($utils.inArray(variable.value, definedValues) !== -1) {
                    return $location[variable.value];
                }

                if (variable.value === 'referrer') {
                    return $document.referrer;
                }

                if (variable.value === CAMPAIGN_PARAMETER) {
                    var params = getSearchParameters();
                    var cookieName = 'stg_' + variable.value;

                    if ($document.referrer === '') {
                        $cookie.remove(cookieName);
                        return undefined;
                    }

                    if (getDomain($document.referrer) !== $location.hostname && params[variable.value]) {
                        $cookie.add(cookieName, params[variable.value]);
                    }

                    return $cookie.get(cookieName);
                }

                return variable.value;
            })
            .add('document', function (variable) {
                return $document[variable.value];
            })
            .add('random', function () {
                return Math.random();
            });

        function getDomain (url) {
            if(url === '') {
                return false;
            }

            var domain = /\/\/(.+)/.exec(url)[1];

            return /(.+)\//.exec(domain)[1];
        }

        function getSearchParameters() {
            var prmstr = $location.search.substr(1);
            return prmstr != null && prmstr !== '' ? transformToAssocArray(prmstr) : {};
        }

        function transformToAssocArray( prmstr ) {
            var params = {};
            var prmarr = prmstr.split('&');
            for ( var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split('=');
                params[tmparr[0]] = tmparr[1];
            }
            return params;
        }
    };

    config.$inject = [
        '$collectorProvider',
        '$cookie',
        '$window',
        '$document',
        '$location',
        '$utils',
        'DOMAIN'
    ];

    sevenTag.config(config);
}(window.sevenTag));
