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
    var TEMPLATE_ID = 'google_adwords';
    var TEMPLATE_NAME = 'Google AdWords';

    angular
        .module(MODULE_NAME)
        .run([
            TAG_MODULE + '.$template',
            '$translate',

            function ($templateProvider, $translate) {

                $translate([
                    'Conversion ID',
                    'Set conversion id',
                    'Conversion value',
                    'Set conversion value',
                    'Conversion label',
                    'Set conversion label'
                ])
                .then(function(translations) {

                    $templateProvider
                        .add(TEMPLATE_ID, TEMPLATE_NAME)
                        .addBrand('/bundles/seventagplugingoogleadwordscustomtemplate/img/gaw.svg')
                        .addType('conversion_tracking', 'Conversion tracking')
                        .addTextField({
                            name: 'conversionId',
                            label: translations['Conversion ID'],
                            placeholder: translations['Set conversion id'],
                            roles: {
                                required: true
                            }
                        })
                        .addTextField({
                            name: 'conversionLabel',
                            label: translations['Conversion label'],
                            placeholder: translations['Set conversion label'],
                            roles: {
                                required: true
                            }
                        })
                        .addTextField({
                            name: 'conversionValue',
                            label: translations['Conversion value'],
                            placeholder: translations['Set conversion value'],
                            roles: {
                                required: false
                            }
                        })
                        .addHiddenField('remarketingOnly', false);

                    $templateProvider
                        .get(TEMPLATE_ID)
                        .addType('remarketing', 'Remarketing')
                        .addTextField({
                            name: 'conversionId',
                            label: translations['Conversion ID'],
                            placeholder: translations['Set conversion id'],
                            roles: {
                                required: true
                            }
                        })
                        .addTextField({
                            name: 'conversionLabel',
                            label: translations['Conversion label'],
                            placeholder: translations['Set conversion label'],
                            roles: {
                                required: false
                            }
                        })
                        .addHiddenField('remarketingOnly', true);

                });

            }

        ]);

}());
