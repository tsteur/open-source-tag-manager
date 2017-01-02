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

angular
    .module('application', [
        'ngCookies',
        'stg.debugger',
        'stg.debugger.templates',
        'ui.bootstrap',
        'ui.router',
        'ngAnimate'
    ])
    .run([
        '$rootScope',
        'stg.debugger.debugger',
        '$state',
        '$window',

        ($rootScope, $debugger, $state, $window) => {
            const MOBILE_PHONE_MAX_WIDTH = 400,
                MOBILE_DEVICE_MAX_WIDTH = 800,
                MOBILE_DEVICE_MAX_HEIGHT = 600,
                PIVOT_ORIENTATION = 0;

            $rootScope.debugger = $debugger;
            $rootScope.$state = $state;

            $rootScope.isMobile = () => {
                let screenHasPhoneLikeWidth = $window.parent.screen.availWidth < MOBILE_PHONE_MAX_WIDTH,
                    isPortrait = $window.orientation === PIVOT_ORIENTATION;
                return screenHasPhoneLikeWidth && isPortrait;
            };

            $rootScope.isHelperVisible = () =>{
                let screenHasPhoneLikeWidth = $window.parent.innerWidth <= MOBILE_DEVICE_MAX_WIDTH,
                    screenHasPhoneLikeHeight = $window.parent.innerHeight <= MOBILE_DEVICE_MAX_HEIGHT;
                return !screenHasPhoneLikeWidth || !screenHasPhoneLikeHeight;
            };

            $window.addEventListener('orientationchange', () => {
                $rootScope.$digest();
            }, false);
        }
    ])
    .config([
        '$stateProvider',
        '$urlRouterProvider',

        ($stateProvider, $urlRouterProvider) => {
            $stateProvider
                .state('overview', {
                    url: '/overview',
                    templateUrl: 'pages/overview/overview.html'
                })
                    .state('overview.tags', {
                        url: '/tags',
                        templateUrl: 'pages/overview/tags/tags.html',
                        controller: 'stg.debugger.OverviewTagsController as view'
                    })
                    .state('overview.tag-details', {
                        url: '/tags/{id}',
                        controller: 'stg.debugger.OverviewTagDetailsController as view',
                        templateUrl: 'pages/overview/tag-details/tag-details.html'
                    })
                .state('events-log', {
                    url: '/events-log',
                    templateUrl: 'pages/events-log/events-log.html'
                })
                    .state('events-log.list', {
                        url: '/list',
                        controller: 'stg.debugger.EventsLogController as view',
                        templateUrl: 'pages/events-log/list/list.html'
                    })
                    .state('events-log.details', {
                        url: '/{eventId}',
                        controller: 'stg.debugger.EventsLogDetailsController as view',
                        templateUrl: 'pages/events-log/details/details.html'
                    })
                        .state('events-log.details.variables', {
                            url: '/variables',
                            templateUrl: 'pages/events-log/details/variables/variables.html'
                        })
                        .state('events-log.details.data-layer', {
                            url: '/data-layer',
                            templateUrl: 'pages/events-log/details/data-layer/data-layer.html'
                        })
                        .state('events-log.details.related-tags', {
                            url: '/related-tags',
                            templateUrl: 'pages/events-log/details/related-tags/related-tags.html'
                        })
                            .state('events-log.details.related-tags.list', {
                                url: '/list',
                                templateUrl: 'pages/events-log/details/related-tags/list/list.html'
                            })
                            .state('events-log.details.related-tags.details', {
                                url: '/{id}',
                                templateUrl: 'pages/events-log/details/related-tags/details/details.html',
                                controller: 'stg.debugger.EventsLogTagDetailsController as details'
                            });

            $urlRouterProvider
                .otherwise('/overview/tags');
        }
    ]);
