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


let removeAfterTimeout = function (id) {
    if (this.settings.interval > 0) {
        return this.$timeout(() => {
            this.storage.remove(id);
        }, this.settings.interval);
    }
};

let addAlert = function (type, pattern, params) {
    let id,
        message = this.convertToMessage(pattern, params);

    this
        .translate([message])
        .then((translations) => {
            id = this.storage.add(type, translations[message]);
            removeAfterTimeout.call(this, id);

            return id;
        });
};

class Alert {
    constructor ($timeout, storage, provider, $translate) {
        /**
         * @type {AlertStorage}
         */
        this.storage = storage;
        /**
         * @type {Object}
         */
        this.$timeout = $timeout;
        /**
         * @type {TranslationProvider}
         */
        this.settings = this.settings === undefined
            ? provider
            : angular.extend(this.settings, provider);

        /**
         * @readonly
         * @type {string}
         */
        this.INFO_TYPE = 'info';

        /**
         * @readonly
         * @type {string}
         */
        this.ERROR_TYPE = 'danger';

        /**
         * @readonly
         * @type {string}
         */
        this.SUCCESS_TYPE = 'success';

        /**
         * @readonly
         * @type {$translate}
         */
        this.translate = $translate;
    }

    success (id, params = []) {
        addAlert.call(this, this.SUCCESS_TYPE, id, params);
    }

    error (id, params = []) {
        addAlert.call(this, this.ERROR_TYPE, id, params);
    }

    info (id, params = []) {
        addAlert.call(this, this.INFO_TYPE, id, params);
    }

    getStorage () {
        return this.storage;
    }

    convertToMessage (pattern, params) {
        if (angular.isDefined(pattern)) {
            pattern = this.settings.getMessagePattern(pattern);
        }

        return vsprintf(pattern, params);
    }
}

export default Alert;
