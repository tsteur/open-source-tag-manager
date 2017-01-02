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

const DEFAULT_LANGUAGE = 'en';

let localeInterceptor = ($window) => {
    return {
        request: (config) => {
            let localStorageLang = $window.localStorage['NG_TRANSLATE_LANG_KEY'];

            if (!/^https?:\/\//i.test(config.url)) {
                config.headers.Locale = localStorageLang
                    ? localStorageLang
                    : DEFAULT_LANGUAGE;
            }

            return config;
        }
    };
};

export default localeInterceptor;
