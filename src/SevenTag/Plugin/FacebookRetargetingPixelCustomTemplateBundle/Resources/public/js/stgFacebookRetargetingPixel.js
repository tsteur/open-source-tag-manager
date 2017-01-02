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

(function () {
    'use strict';

    var MODULE_NAME = 'admin.application.plugins';
    var TAG_MODULE = 'clearcode.tm.tag';
    var TEMPLATE_ID = 'facebook_retargeting_pixel';
    var TEMPLATE_NAME = 'Facebook Retargeting Pixel';
    var FACEBOOK_EVENTS_LIST = [
        {id: 'ViewContent', name: 'ViewContent'},
        {id: 'Search', name: 'Search'},
        {id: 'AddToCart', name: 'AddToCart'},
        {id: 'AddToWishlist', name: 'AddToWishlist'},
        {id: 'InitiateCheckout', name: 'InitiateCheckout'},
        {id: 'AddPaymentInfo', name: 'AddPaymentInfo'},
        {id: 'Lead', name: 'Lead'},
        {id: 'CompleteRegistration', name: 'CompleteRegistration'}
    ];
    var DEFAULT_VALUE = 'ViewContent';

    angular
        .module(MODULE_NAME)
        .run([

            TAG_MODULE + '.$template',
            '$translate',

            function ($templateProvider, $translate) {

                $translate([
                    'Pixel Id',
                    'Set pixel id',
                    'Event',
                    'Set event type'
                ])
                .then(function(translations) {

                    $templateProvider
                        .add(TEMPLATE_ID, TEMPLATE_NAME)
                        .addTextField({
                            name: 'pixelId',
                            label: translations['Pixel Id'],
                            placeholder: translations['Set pixel id'],
                            roles: {
                                required: true
                            }
                        })
                        .addSelectField({
                            name: 'event',
                            label: translations['Event'],
                            placeholder: translations['Set event type'],
                            values: FACEBOOK_EVENTS_LIST,
                            value: DEFAULT_VALUE,
                            roles: {
                                required: true,
                                column: 3
                            }
                        })
                        .addBrand('/bundles/seventagpluginfacebookretargetingpixelcustomtemplate/img/fb.png');

                });

            }

        ]);

}());
