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


describe('Unit: clearcode.tm.alert.AlertStorage', () => {
    beforeEach(module('clearcode.tm.alert'));

    let $injector,
        AlertStorage;

    beforeEach(inject( (_$rootScope_, _$injector_) => {
        $injector = _$injector_;
        AlertStorage = $injector.get('clearcode.tm.alert.alertStorage');
    }));

    it('should be defined', () => {
        expect(AlertStorage).toBeDefined();
    });

    it('should have some parameters', () => {
        expect(AlertStorage.collection).toBeDefined();
        expect(Object.keys(AlertStorage.collection).length).toBe(0);
    });

    it('should add alert by add function', () => {
        let id = AlertStorage.add('success', 'Success Message');

        expect(Object.keys(AlertStorage.collection).length).toBe(1);
        expect(AlertStorage.collection[id].message).toEqual('Success Message');
        expect(AlertStorage.collection[id].type).toEqual('success');
    });

    describe('after add some alerts', () => {
        let successId,
            errorId;

        beforeEach(() => {
            successId = AlertStorage.add('success', 'Success Message');
            errorId = AlertStorage.add('error', 'Error Message');
        });

        it('should get alerts by getAlerts function', () => {
            let collection = AlertStorage.getAlerts();

            expect(Object.keys(collection).length).toBe(2);
            expect(collection[errorId].message).toEqual('Error Message');
        });

        it('should get alert by getAlert function', () => {
            let alert = AlertStorage.getAlert(successId);

            expect(alert.message).toEqual('Success Message');
            expect(alert.type).toEqual('success');

            alert = AlertStorage.getAlert(errorId);
            expect(alert.message).toEqual('Error Message');
            expect(alert.type).toEqual('error');
        });

        it('should remove alert by remove function', () => {
            let alert = AlertStorage.remove(successId);

            expect(alert).toBeTruthy();
            expect(Object.keys(AlertStorage.collection).length).toBe(1);

            alert = AlertStorage.remove(successId);
            expect(alert).toBeFalsy();

            alert = AlertStorage.remove(errorId);
            expect(alert).toBeTruthy();
            expect(Object.keys(AlertStorage.collection).length).toBe(0);
        });

        it('should clear collection by clear function', () => {
            AlertStorage.clean();
            expect(Object.keys(AlertStorage.collection).length).toBe(0);
        });
    });
});
