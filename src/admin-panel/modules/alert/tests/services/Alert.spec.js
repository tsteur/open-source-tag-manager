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

/* global describe: false, beforeEach: false, inject: false, it: false, expect: false */


describe('Unit: clearcode.tm.alert.Alert', () => {
    beforeEach(module('clearcode.tm.alert'));

    let $injector,
        Alert,
        AlertStorage;

    beforeEach(inject((_$injector_) => {
        $injector = _$injector_;

        Alert = $injector.get('clearcode.tm.alert.alert');
        AlertStorage = $injector.get('clearcode.tm.alert.alertStorage');
    }));

    it('should be defined', () => {
        expect(Alert).toBeDefined();
    });

    it('should have some parameters', () => {
        expect(Alert.storage instanceof AlertStorage.constructor).toBeTruthy();
        expect(Alert.settings).toBeDefined();
        expect(Alert.settings.interval).toBeDefined();
        expect(Alert.settings.messagePatterns).toBeDefined();
    });

    it('should get storage by getStorage function', () => {
        let alertStorage = Alert.getStorage();

        expect(alertStorage instanceof AlertStorage.constructor).toBeTruthy();
    });
});
