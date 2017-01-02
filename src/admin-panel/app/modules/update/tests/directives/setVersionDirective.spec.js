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


describe('Unit: setVersionDirective', () => {
    var $scope, $rootScope, $injector, $compile, Version, $httpBackend;

    /* eslint-disable */
    var responseSetSession = {
        url: 'example.php'
    };

    var responseGetLatest = {
        version: '1.0.1'
    };
    /* eslint-enable */

    beforeEach(module('clearcode.tm.update'));
    beforeEach(inject((_$rootScope_, _$injector_, _$compile_, _$httpBackend_) => {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $injector = _$injector_;
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;

        Version = $injector.get('clearcode.tm.update.version');

        $httpBackend
          .whenGET(/\/\/download.7tag.org\/version.json?(.*)/)
          .respond(responseGetLatest);
    }));

    describe('with defined setVersion as attrs', () => {
        var element, isolateScope;

        beforeEach(() => {
            element = '<div stg-set-version stg-version="1.0.0"></div>';
            element = $compile(element)($scope);
            $scope.$digest();
        });

        it('should have version value in scope', () => {
            isolateScope = element.isolateScope();

            expect(isolateScope.stgVersion).toBeDefined();
            expect(isolateScope.stgVersion).toBe('1.0.0');
        });

        it('should defined version value in Version Service', () => {
            expect(Version.current).toBe('1.0.0');
        });
    });
});
