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

let findByKey = function (collection, key, value) {
    let collectionLength = collection.length;

    while (collectionLength--) {
        if (collection[collectionLength][key] === value) {
            return collection[collectionLength];
        }
    }

    return false;
};

/**
 * @name Templates
 */
class Templates {
    constructor ($templates) {
        this.templatesService = $templates;
        this.collection = this.templatesService.getAll();
    }

    setListener (listener) {
        this.templatesService.setListener(listener);
    }

    getAll () {
        return this.collection;
    }

    get (id) {
        let collectionLength = this.collection.length;

        while (collectionLength--) {
            if (this.collection[collectionLength].id === id) {
                return this.collection[collectionLength];
            }
        }

        return false;
    }

    getOptions (id, typeId) {
        let template = findByKey(this.collection, 'id', id);

        if (template) {
            if (typeId) {
                let type = findByKey(template.types, 'id', typeId);

                return type && type.hasOwnProperty('fields')
                    ? type.fields
                    : false;
            }

            return template.hasOwnProperty('fields')
                ? template.fields
                : false;
        }

        return false;
    }

    getTemplateUrl (id, typeId) {
        let template = findByKey(this.collection, 'id', id);

        if (typeId) {
            let type = findByKey(template.types, 'id', typeId);

            return type
                ? type.templateUrl
                : false;
        }

        return template.templateUrl;
    }
}

export default Templates;
