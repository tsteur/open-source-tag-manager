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

 /* global describe: false, jasmine: false, beforeEach: false, inject: false, it: false, expect: false */


describe('Unit: OthersSettingsController', () => {
    var OthersSettingsController, $translate, $scope, $translation, $window;

    beforeEach(module('clearcode.tm.user', ($provide) => {
        $translate = jasmine.createSpy('$translate');
        $translate.storageKey = jasmine.createSpy('storageKey');
        $translate.storage = jasmine.createSpy('storage');
        $translate.preferredLanguage = jasmine.createSpy('preferredLanguage');
        $translate.and.callFake(() => {
            return {
                then: () => {
                    return 'translation called';
                }
            };
        });

        $translation = {
            getLanguages: jasmine.createSpy('setPassword').and.returnValue([
                { id: 'en', name: 'English' },
                { id: 'pl', name: 'Polish' }
            ])
        };

        $window = {
            localStorage: []
        };
        $window.localStorage['NG_TRANSLATE_LANG_KEY'] = 'pl';

        $provide.value('$translate', $translate);
        $provide.value('clearcode.tm.translation.translation', $translation);
        $provide.value('$window', $window);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            OthersSettingsController = $controller('clearcode.tm.user.OthersSettingsController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(OthersSettingsController).toBeDefined();
    });

    describe('when call submitForm method', () => {
        it('should call save method on User', () => {
            var user = {
                saveOthersSettings: jasmine.createSpy('saveOthersSettings').and.returnValue({
                    then: () => {
                        return 'save called';
                    }
                })
            };

            OthersSettingsController.submitForm(user);
        });
    });
});
