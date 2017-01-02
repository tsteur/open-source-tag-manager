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


describe('Unit: clearcode.tm.alert.refreshAlert', () => {
    beforeEach(module('clearcode.tm.alert'));

    var $injector, RefreshAlert, AlertStorage;

    beforeEach(inject((_$injector_) => {
        $injector = _$injector_;

        RefreshAlert = $injector.get('clearcode.tm.alert.refreshAlert');
        AlertStorage = $injector.get('clearcode.tm.alert.alertStorage');

        RefreshAlert.window.localStorage['TEST'] = true;
    }));

    it('should be defined', () => {
        expect(RefreshAlert).toBeDefined();
    });

    it('should have some parameters', () => {
        expect(RefreshAlert.storage instanceof AlertStorage.constructor).toBeTruthy();
        expect(RefreshAlert.settings).toBeDefined();
        expect(RefreshAlert.settings.interval).toBeDefined();
        expect(RefreshAlert.settings.messagePatterns).toBeDefined();
    });

    it('should get storage by getStorage function', () => {
        var alertStorage = RefreshAlert.getStorage();

        expect(alertStorage instanceof AlertStorage.constructor).toBeTruthy();
    });

    it('should add a new success alert after refresh', () => {
        RefreshAlert.success('TEST', 'user.change_language');
    });
});
