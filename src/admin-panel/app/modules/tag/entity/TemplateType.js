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
var templateTypeFactory = () => {
    class TemplateType {
        constructor (id, name) {
            /**
             * @type {string}
             */
            this.id = id;

            /**
             * @type {string}
             */
            this.name = name;

            /**
             * @type {string}
             */
            this.templateUrl = undefined;

            /**
             * @type {object}
             */
            this.fields = [];
        }

        addTextField (params) {
            let field = params ? params : {};

            field.type = 'text';
            this.fields.push(field);

            return this;
        }

        addHiddenField (name, value) {
            let field = {};

            field.name = name;
            field.value = value;
            field.type = 'hidden';

            this.fields.push(field);

            return this;
        }

        addTemplateUrl (url) {
            this.templateUrl = url;

            return this;
        }
    }

    return TemplateType;
};

export default templateTypeFactory;
