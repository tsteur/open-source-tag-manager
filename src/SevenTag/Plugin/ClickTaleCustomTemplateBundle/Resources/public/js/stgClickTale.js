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
    var TEMPLATE_ID = 'click_tale';
    var TEMPLATE_NAME = 'Click Tale';

    angular
        .module(MODULE_NAME)
        .run([
            TAG_MODULE + '.$template',
            '$translate',

            function ($templateProvider, $translate) {

                $translate([
                    'Partition',
                    'Set partition',
                    'Project GUID',
                    'Set project GUID',
                    'How to get project details from'
                ])
                .then(function(translations) {

                    $templateProvider
                        .add(TEMPLATE_ID, TEMPLATE_NAME)
                        .addTextField({
                            /* eslint-disable */
                            name: 'partition',
                            label: translations['Partition'],
                            placeholder: translations['Set partition'],
                            roles: {
                                required: true
                            }
                            /* eslint-enable */
                        })
                        .addTextField({
                            /* eslint-disable */
                            name: 'guid',
                            label: translations['Project GUID'],
                            placeholder: translations['Set project GUID'],
                            roles: {
                                required: true
                            }
                            /* eslint-enable */
                        })
                        .addTemplateUrl('/bundles/seventagpluginclicktalecustomtemplate/views/helper.html')
                        .addBrand('/bundles/seventagpluginclicktalecustomtemplate/img/ct.png');

                });

            }

        ]);

}());
