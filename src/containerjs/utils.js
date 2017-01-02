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

(function(sevenTag, MODULE_NAME) {
    //Returns true if it is a DOM element
    function isElement(object){
        return (
            typeof HTMLElement === 'object' ? object instanceof HTMLElement : //DOM2
            object && typeof object === 'object' && object !== null && object.nodeType === 1 && typeof object.nodeName==='string'
        );
    }

    var Utils = function($window) {
        var class2type = {},
            hasOwn = class2type.hasOwnProperty,
            support = {},
            coreArray = [];

        /**
         * @param {Function} callback
         */
        this.timeout = function (callback) {
            var time = [].slice.call(arguments, 0)[1] || 0;

            $window.setTimeout(callback, time);
        };

        /**
         * Extend object about another object
         */
        this.extend = function () {
            var src, copyIsArray, copy, name, options, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            // Handle a deep copy situation
            if ( typeof target === 'boolean' ) {
                deep = target;

                // skip the boolean and the target
                target = arguments[ i ] || {};
                i++;
            }

            // Handle case when target is a string or something (possible in deep copy)
            if ( typeof target !== 'object' && !this.isFunction(target) ) {
                target = {};
            }

            // extend stg itself if only one argument is passed
            if ( i === length ) {
                target = this;
                i--;
            }

            for ( ; i < length; i++ ) {
                // Only deal with non-null/undefined values
                if ( (options = arguments[ i ]) != null ) {
                    // Extend the base object
                    for ( name in options ) {
                        src = target[ name ];
                        copy = options[ name ];

                        // Prevent never-ending loop
                        if ( target === copy ) {
                            continue;
                        }

                        // Recurse if we're merging plain objects or arrays
                        if ( deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)) ) ) {
                            if ( copyIsArray ) {
                                copyIsArray = false;
                                clone = src && this.isArray(src) ? src : [];
                            } else {
                                clone = src && this.isPlainObject(src) ? src : {};
                            }

                            // Never move original objects, clone them
                            target[ name ] = this.extend( deep, clone, copy );
                            // Don't bring in undefined values
                        } else if ( copy !== undefined ) {
                            target[ name ] = copy;
                        }
                    }
                }
            }

            // Return the modified object
            return target;
        };

        /**
         * Check if object is array
         *
         * @param {Object} obj
         *
         * @returns {Boolean}
         */
        this.isArray = Array.isArray || function (obj) {
            return obj instanceof Array;
        };

        /**
         * Check if object is window
         *
         * @param {Object} obj
         *
         * @returns {boolean}
         */
        this.isWindow = function( obj ) {
            return obj.document !== undefined; // fix for IE 6/7
        };

        /**
         * Check if object is plainObject for example {}
         *
         * @param {Object} obj
         *
         * @returns {boolean}
         */
        this.isPlainObject = function( obj ) {
            var key;

            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if ( !obj || this.type(obj) !== 'object' || obj.nodeType || this.isWindow( obj ) ) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if ( obj.constructor &&
                    !hasOwn.call(obj, 'constructor') &&
                    !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf') ) {
                    return false;
                }
            } catch ( e ) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Support: IE<9
            // Handle iteration over inherited properties before own properties.
            if ( support.ownLast ) {
                for ( key in obj ) {
                    return hasOwn.call( obj, key );
                }
            }

            /* eslint-disable */
            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for ( key in obj ) {}
            /* eslint-enable */

            return key === undefined || hasOwn.call( obj, key );
        };

        /**
         * Returns type of object
         *
         * @param {Object} obj
         *
         * @returns {string}
         */
        this.type = function (obj) {
            if (obj == null) {
                return obj + '';
            }
            return typeof obj === 'object' || typeof obj === 'function' ?
            class2type[ obj.toString() ] || 'object' :
                typeof obj;
        };

        /**
         * @param string matchClass
         * @returns {NodeList}
         */
        this.getElementsByClassName = function (search) {
            var d = document, elements, pattern, i, results = [];

            if (d.querySelectorAll) { // IE8
                return d.querySelectorAll('.' + search);
            }

            if (d.evaluate) { // IE6, IE7
                pattern = './/*[contains(concat(\' \', @class, \' \'), \'' + search + ' \')]';
                elements = d.evaluate(pattern, d, null, 0, null);
                while ((i = elements.iterateNext())) {
                    results.push(i);
                }
            } else {
                elements = d.getElementsByTagName('*');
                pattern = new RegExp('(^|\\s)' + search + '(\\s|$)');
                for (i = 0; i < elements.length; i++) {
                    if ( pattern.test(elements[i].className) ) {
                        results.push(elements[i]);
                    }
                }
            }

            return results;
        };

        /**
         * Check if element is in array
         *
         * @param {Object} element
         * @param {Array} array
         * @param {number} indicator
         *
         * @returns {number}
         */
        this.inArray = function ( element, array, indicator ) {
            var len;

            if ( array ) {
                if ( coreArray.indexOf ) {
                    return coreArray.indexOf.call( array, element, indicator );
                }

                len = array.length;
                indicator = indicator ? indicator < 0 ? Math.max( 0, len + indicator ) : indicator : 0;

                for ( ; indicator < len; indicator++ ) {
                    // Skip accessing in sparse arrays
                    if ( indicator in array && array[ indicator ] === element ) {
                        return indicator;
                    }
                }
            }

            return -1;
        };

        /**
         * Check if string ends with search string
         *
         * @param {String} subjectString
         * @param {String} searchString
         * @param {number} position
         *
         * @returns {boolean}
         */
        this.endsWith = function (subjectString, searchString, position) {
            if (position === undefined || position > subjectString.length) {
                position = subjectString.length;
            }

            position -= searchString.length;
            var lastIndex = this.inString(subjectString, searchString, position);

            return lastIndex !== -1 && lastIndex === position;
        };

        /**
         * @param {String} string
         * @param {String} search
         * @param {number} startIndex
         *
         * @returns {number}
         */
        this.inString = function (string, search, startIndex) {
            return string.indexOf(search, startIndex ? startIndex : 0);
        };

        /**
         * @param obj
         * @returns {*}
         */
        this.clone = function (obj) {
            if (obj === null || typeof obj !== 'object' || isElement(obj)) {
                return obj;
            }

            var temp = obj.constructor();
            for (var key in obj) {
                temp[key] = this.clone(obj[key]);
            }

            return temp;
        };

        this.trim = function (str) {
            var	str = str.replace(/^\s\s*/, ''),
                ws = /\s/,
                i = str.length;

            while (ws.test(str.charAt(--i)));

            return str.slice(0, i + 1);
        };

        /**
         * @returns {String}
         */
        this.guid = function() {
            function _p8(s) {
                var p = (Math.random().toString(16)+'000000000').substr(2,8);
                return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p ;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        };

        return this;
    };

    Utils.$inject = [
        '$window'
    ];

    sevenTag.service(MODULE_NAME, Utils);
})(window.sevenTag, '$utils');
