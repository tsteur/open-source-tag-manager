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

class Translation {
    constructor (translationFactory) {
        this.languages = [];
        this.translationFactory = translationFactory;
    }

    /**
     * @returns {*}
     */
    getLanguages () {
        return this.languages;
    }

    /**
     * @param language
     * @returns {boolean}
     */
    hasLanguage (language) {
        return this.languages.hasOwnProperty(language);
    }

    loadAvailableTranslations () {
        return this.translationFactory({
            url: '/api/translations',
            cache: false
        }).then((data) => {
            for (let key in data) {
                this.languages.push({
                    id: key,
                    name: data[key]
                });
            }
        });
    }
}

export default Translation;
