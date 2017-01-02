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
window.sevenTag.provider('DOMAIN', function () {
    return 'http://localhost';
});

window.sevenTag.provider('ID', function () {
    return '60';
});

window.sevenTag.value('$variables', function () {
    return [
        {
            name: 'Page Url',
            type: {
                collector_name: 'url'
            },
            value: 'href',
            options: {}
        },
        {
            name: 'Referrer',
            type: {
                collector_name: 'document'
            },
            value: 'referrer',
            options: {}
        },
        {
            name: 'Page Path',
            type: {
                collector_name: 'url'
            },
            value: 'pathname',
            options: {}
        },
        {
            name: 'Page Hostname',
            type: {
                collector_name: 'url'
            },
            value: 'hostname',
            options: {}
        },
        {
            name: 'Form Classes',
            type: {
                collector_name: 'dataLayer'
            },
            value: 'elementClasses',
            options: {}
        },
        {
            name: 'Form ID',
            type: {
                collector_name: 'dataLayer'
            },
            value: 'elementId',
            options: {}
        },
        {
            name: 'Form Url',
            type: {
                collector_name: 'dataLayer'
            },
            value: 'elementUrl',
            options: {}
        },
        {
            name: 'Click Url',
            type: {
                collector_name: 'dataLayer'
            },
            value: 'elementUrl',
            options: {}
        },
        {
            name: 'Click ID',
            type: {
                collector_name: 'dataLayer'
            },
            value: 'elementId',
            options: {}
        },
        {
            name: 'Click Classes',
            type: {
                collector_name: 'dataLayer'
            },
            value: 'elementClasses',
            options: {}
        },
        {
            name: 'Event',
            type: {
                collector_name: 'dataLayer'
            },
            value: 'event',
            options: {}
        }
    ]
});
