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
    var TEMPLATE_ID = 'visual_website_optimizer';
    var TEMPLATE_NAME = 'Visual Website Optimizer';

    var HELPER_TEXT = "You can find Your Visual Website Optimizer Account ID in Settings on the title bar (look for ACCOUNT ID #XXXXXX). The value contains only numbers and You should skip the initial '#' character.";

    angular
        .module(MODULE_NAME)
        .run([

            TAG_MODULE + '.$template',
            '$translate',

            function ($templateProvider, $translate) {
                $translate([
                    'Account ID',
                    'Set account id',
                    HELPER_TEXT
                ]).then(function(translations) {
                    $templateProvider
                        .add(TEMPLATE_ID, TEMPLATE_NAME)
                        .setSynchronous(true)
                        .setTracking(false)
                        .addTextField({
                            name: 'accountId',
                            label: translations['Account ID'],
                            placeholder: translations['Set account id'],
                            helper: translations[HELPER_TEXT],
                            roles: {
                                required: true
                            }
                        })
                        .addBrand('/bundles/seventagpluginvisualwebsiteoptimizercustomtemplate/img/vwo.svg');
                });

            }
        ]);
}());
