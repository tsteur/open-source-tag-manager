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

(function (sevenTag, MODULE_NAME, SERVICE_NAME) {
    function OptOutVisitor($optOut) {
        /**
         * @param target
         * @returns {boolean}
         */
        var acceptsVisitorsPrivacy = function (target) {
            return $optOut.isEnabled() && target.respectVisitorsPrivacy;
        };

        /**
         * @returns {boolean}
         */
        this.accept = function () {
            return true;
        };

        /**
         * @param target
         * @returns {boolean}
         */
        this.visit = function (target) {
            return !acceptsVisitorsPrivacy(target);
        };

        return this;
    }

    sevenTag.provider(MODULE_NAME, function () {
        return OptOutVisitor;
    });

    var OptOutVisitorFactory = function (OptOutVisitorClass, $optOut) {
        return new OptOutVisitorClass($optOut);
    };

    OptOutVisitorFactory.$inject = [
        'OptOutVisitor',
        '$optOut'
    ];

    sevenTag.service(SERVICE_NAME, OptOutVisitorFactory);
})(window.sevenTag, 'OptOutVisitor', '$optOutVisitor');
