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
 * @type {Alert}
 */
var alert;

/**
 * @type {string}
 */
const BREADCRUMB_SECTION = 'My account';

/**
 * @type {Translation}
 */
var translation;

class OthersSettingsController {
    constructor ($alert, $scope, $translate, $translation, $window, PageInfo) {
        alert = $alert;
        this.scope = $scope;
        translation = $translation;
        this.validationForce = false;
        this.translate = $translate;
        this.window = $window;
        this.languages = translation.getLanguages();

        if (!this.languages.length) {
            this.loadTranslationsPromise = translation.loadAvailableTranslations();

            this.loadTranslationsPromise.then(() => {
                this.languages = translation.languages;
            });
        }

        $translate([BREADCRUMB_SECTION])
            .then((translations) => {
                PageInfo.clear()
                    .add(translations[BREADCRUMB_SECTION])
                    .broadcast();
            });
    }

    /**
     * @param {Object} user
     */
    submitForm (user) {
        var localStorageLang = this.window.localStorage['NG_TRANSLATE_LANG_KEY'];
        var storedLanguage = localStorageLang ? localStorageLang : 'en';
        this.othersSettingsPromise = user.saveOthersSettings();

        this.othersSettingsPromise.then(
            (User) => {
                this.translate.use(User.language).then(() => {
                    if (User.language !== storedLanguage) {
                        this.window.localStorage['LANGUAGE_CHANGE_MESSAGE'] = true;
                        this.window.location.reload();
                    } else {
                        alert.success('user.save');
                    }
                });
            },
            () => {
                alert.error('error.invalid');
            }
        );
    }
}

export default OthersSettingsController;
