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

window.sevenTag.provider('$jsonp', function () {

    return {
         CALLBACK_PATTERN: 'JSONPCallback',
         callbackCounter: 0,
         eval: function (callback) {

             return function (resp) {

                 var validJSON = false;

                 if (typeof resp == 'string') {

                     try {

                         validJSON = JSON.parse(resp);

                     } catch (ex) {
                         /* invalid JSON */
                     }

                 } else {

                     validJSON = JSON.parse(JSON.stringify(resp));

                 }

                 if (validJSON) {

                     callback(validJSON);

                 } else {

                     throw ('JSONP call returned invalid or empty JSON');

                 }

             };
         },
         fetch: function (url, callback) {

             throw Error('override $jsonp::fetch method in your test');

         }
     };
});
