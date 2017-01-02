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

(function(sevenTag, MODULE_NAME, SERVICE_NAME) {
    var Renderer = function($window, $parser) {
        this.render = function(tag, variables, contextId) {
            $window.document.write($parser.parse(tag.code, variables, contextId));
            $window.document.close();
        };

        return this;
    };

    sevenTag.provider(MODULE_NAME, function() {
        return Renderer;
    });

    var RendererFactory = function(RendererClass, $window, $parser){
        return new RendererClass($window, $parser);
    };

    RendererFactory.$inject = [
        'RendererSync',
        '$window',
        '$parser'
    ];

    sevenTag.service(SERVICE_NAME, RendererFactory);
    sevenTag[SERVICE_NAME] = sevenTag.$injector.get(SERVICE_NAME);
})(window.sevenTag, 'RendererSync', '$rendererSync');
