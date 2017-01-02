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

/* global describe: false, jasmine: false, beforeEach: false, it: false, expect: false */


describe('Unit: Version service', () => {
    var version;

    beforeEach(angular.mock.module('clearcode.tm.update'));
    beforeEach(angular.mock.inject([
        'clearcode.tm.update.version',
        (_version_) => {
            version = _version_;
        }
    ]));

    it('should be defined', () => {
        expect(version).toBeDefined();
    });

    describe('when call isUpToDate method', () => {
        it('should return false if versions are undefined', () => {
            expect(version.isUpToDate()).toBeFalsy();
        });

        it('should return false if versions are different', () => {
            version.current = '1.0.1';
            version.latest = '1.0.2';

            expect(version.isUpToDate()).toBeFalsy();
        });

        it('should return true if versions are the same', () => {
            version.current = '1.0.1';
            version.latest = '1.0.1';

            expect(version.isUpToDate()).toBeTruthy();
        });
    });
});
