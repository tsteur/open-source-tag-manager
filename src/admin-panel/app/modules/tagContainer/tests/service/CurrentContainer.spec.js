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


describe('Unit: CurrentContainer service', () => {
    var currentContainer;
    var containerResource;

    beforeEach(module('clearcode.tm.tagContainer', ($provide) => {
        $provide.value('$stateParams', {
            containerId: 12
        });

        containerResource = {
            get: jasmine.createSpy('get').and.returnValue({
                then: () => {
                    return 'get called';
                }
            }),
            publishVersion: jasmine.createSpy('publishVersion').and.returnValue({
                then: () => {
                    return 'publishVersion called';
                }
            })
        };

        $provide.value('clearcode.tm.tagContainer.containerResource', containerResource);
    }));

    beforeEach(inject([
        'clearcode.tm.tagContainer.currentContainer',
        (_currentContainer_) => {
            currentContainer = _currentContainer_;
        }
    ]));

    it('should be defined', () => {
        expect(currentContainer).toBeDefined();
    });

    describe('when call getId method', () => {
        it('should return current container id when not attribute pass', () => {
            expect(currentContainer.getId()).toBe(12);
        });

        it('should return provided container when attribute pass', () => {
            expect(currentContainer.getId(13)).toBe(13);
        });
    });

    describe('when call get method', () => {
        it('should return promise', () => {
            expect(currentContainer.get()).toBe('get called');
        });

        it('should call container resource about current container', () => {
            currentContainer.get();

            expect(containerResource.get).toHaveBeenCalledWith(12);
        });

        it('should call container resource to update current container', () => {
            currentContainer.get(13);

            expect(containerResource.get).toHaveBeenCalledWith(13);
        });
    });

    describe('when call getContainer method', () => {
        it('should return promise', () => {
            expect(currentContainer.getContainer()).toBe('get called');
        });
    });

    describe('when call publish method', () => {
        it('should return promise', () => {
            expect(currentContainer.publish()).toBe('publishVersion called');
        });
    });

    describe('when call "canRestore" method', () => {
        it('should return false when container is undefined', () => {
            currentContainer.$container = undefined;

            expect(currentContainer.canRestore()).toBe(false);
        });

        it('should return false when container draft', () => {
            currentContainer.$container = {
                publishedAt: false,
                hasUnpublishedChanges: false
            };

            expect(currentContainer.canRestore()).toBe(false);
        });

        it('should return true when container is published', () => {
            currentContainer.$container = {
                publishedAt: true,
                hasUnpublishedChanges: true
            };

            expect(currentContainer.canRestore()).toBe(true);
        });
    });

    describe('when call "isPublished" method', () => {
        it('should return false when container is undefined', () => {
            currentContainer.$container = undefined;

            expect(currentContainer.isPublished()).toBe(false);
        });

        it('should return true when container draft', () => {
            currentContainer.$container = {
                publishedAt: false,
                hasUnpublishedChanges: true
            };

            expect(currentContainer.isPublished()).toBe(false);
        });

        it('should return true when container is published', () => {
            currentContainer.$container = {
                publishedAt: true,
                hasUnpublishedChanges: false
            };

            expect(currentContainer.isPublished()).toBe(true);
        });
    });

    describe('when call "makeChanges" method', () => {
        it('should return undefined when container is undefined', () => {
            currentContainer.$container = undefined;

            expect(currentContainer.makeChanges()).toBe(false);
        });

        it('should return true when container exists', () => {
            currentContainer.$container = {
                publishedAt: false,
                hasUnpublishedChanges: false
            };

            expect(currentContainer.makeChanges()).toBe(true);
        });
    });
});
