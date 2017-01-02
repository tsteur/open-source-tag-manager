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

'use strict';

var through = require('through2'),
    gutil = require('gulp-util'),
    ejs = require('ejs');

module.exports = function (data, options, settings, filters) {

    for (var filter in filters) {

        if (filters.hasOwnProperty(filter)) {

            ejs.filters[filter] = filters[filter];

        }

    }

    ejs.open = '{@';
    ejs.close = '@}';

    data = data || {};
    settings = settings || {};
    options = options || {};
    settings.ext = typeof settings.ext === 'undefined' ? '.html' : settings.ext;

    return through.obj(function (file, enc, cb) {

        if (file.isNull()) {

            this.push(file);
            return cb();

        }

        if (file.isStream()) {

            this.emit(
                'error',
                new gutil.PluginError('gulp-ejs', 'Streaming not supported')
            );

        }

        options.filename = file.path;
        try {

            file.contents = new Buffer(ejs.render(file.contents.toString(), data, options));
            file.path = gutil.replaceExtension(file.path, settings.ext);

        } catch (err) {

            this.emit('error', new gutil.PluginError('gulp-ejs', err.toString()));

        }

        this.push(file);
        cb();

    });

};
