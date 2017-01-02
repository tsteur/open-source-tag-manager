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

import templateTypeFactory from '../entity/TemplateType.js';

var templateFactory = () => {
    let TemplateType = templateTypeFactory();

    class Template {
        constructor (id, name) {
            this.id = id;
            this.name = name;
            this.brandUrl = undefined;
            this.templateUrl = undefined;
            this.type = undefined;
            this.types = [];
            this.fields = [];
            this.isSynchronous = false;
            this.isTracking = true;
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

        addSelectField (params) {
            let field = params ? params : {};
            field.type = 'select';
            this.fields.push(field);
            return this;
        }

        addType (id, name) {
            let type = new TemplateType(id, name);
            this.types.push(type);
            return type;
        }

        addBrand (url) {
            this.brandUrl = url;
            return this;
        }

        addTemplateUrl (url) {
            this.templateUrl = url;
            return this;
        }

        setSynchronous (isSynchronous) {
            this.isSynchronous = isSynchronous;
            return this;
        }

        setTracking (isTracking) {
            this.isTracking = isTracking;
            return this;
        }
    }

    return Template;
};


export default templateFactory;
