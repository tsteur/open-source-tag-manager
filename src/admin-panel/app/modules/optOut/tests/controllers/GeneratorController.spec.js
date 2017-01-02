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

describe('Unit: GeneratorController', () => {
    var GeneratorController, $translate, $scope, snippet, PageInfo;

    beforeEach(module('clearcode.tm.optOut', ($provide) => {
        PageInfo = {
            clear: () => PageInfo,
            add: () => PageInfo,
            broadcast: jasmine.createSpy('broadcast').and.returnValue({
                then: () => PageInfo
            })
        };

        snippet = {
            buildSnippet: jasmine.createSpy('buildSnippet')
        };

        $translate = jasmine.createSpy('$translate');
        $translate.storageKey = jasmine.createSpy('storageKey');
        $translate.storage = jasmine.createSpy('storage');
        $translate.preferredLanguage = jasmine.createSpy('preferredLanguage');
        $translate.and.callFake( () => {
            return {
                then: () => {
                    PageInfo.clear()
                        .add('test', 'tags', {})
                        .add('test')
                        .broadcast();
                }
            }
        });

        $provide.value('clearcode.tm.pageInfo.pageInfo', PageInfo);
        $provide.value('$translate', $translate);
        $provide.value('clearcode.tm.optOut.snippet', snippet);
    }));

    beforeEach(inject(
        ($controller, $rootScope) => {
            $scope = $rootScope.$new();

            GeneratorController = $controller('clearcode.tm.optOut.GeneratorController', {
                $scope: $scope
            });
        }
    ));

    it('should be defined', () => {
        expect(GeneratorController).toBeDefined();
        expect(PageInfo.broadcast).toHaveBeenCalled();
    });

    it('should call buildSnippet method when fired generateSnippet', () => {
        GeneratorController.generateSnippet();

        expect(snippet.buildSnippet).toHaveBeenCalled();
    });
});
