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


describe('Unit: PublishedStatus service', () => {
    let currentContainer, container, publishedStatus;

    beforeEach(module('clearcode.tm.tagContainer', ($provide) => {
        container = {
            publishedAt: '2016-04-26'
        };

        currentContainer = {
            $container: container
        };

        $provide.value('clearcode.tm.tagContainer.currentContainer', currentContainer);
    }));

    beforeEach(inject([
        'clearcode.tm.tagContainer.publishedStatus',
        (_publishedStatus_) => {
            publishedStatus = _publishedStatus_;
        }
    ]));

    describe('when call getPublishedStatusForContainer method', () => {
        it('should return Published when container was published and has no unsaved changes', () => {
            let container = {
                    publishedAt: 1,
                    hasUnpublishedChanges: false
                },
                status = publishedStatus.getPublishedStatusForContainer(container);
            expect(status.name).toBe('Published');
        });

        it('should return Draft when container was published and has unsaved changes', () => {
            let container = {
                    publishedAt: 1,
                    hasUnpublishedChanges: true
                },
                status = publishedStatus.getPublishedStatusForContainer(container);
            expect(status.name).toBe('Draft');
        });

        it('should return NeverPublished when container was not published and has no unsaved changes', () => {
            let container = {
                    publishedAt: undefined,
                    hasUnpublishedChanges: false
                },
                status = publishedStatus.getPublishedStatusForContainer(container);
            expect(status.name).toBe('Draft - never published');
        });

        it('should return NeverPublished when container was not published and has unsaved changes', () => {
            let container = {
                    publishedAt: undefined,
                    hasUnpublishedChanges: true
                },
                status = publishedStatus.getPublishedStatusForContainer(container);
            expect(status.name).toBe('Draft - never published');
        });
    });

    describe('when call getPublishedStatusForTag method', () => {
        it('should return Published when tag was modified at the same time container was published', () => {
            let tag = {
                    updatedAt: container.publishedAt,
                    createdAt: '2000-04-26'
                },
                status = publishedStatus.getPublishedStatusForTag(tag);
            expect(status.name).toBe('Published');
        });

        it('should return Published when tag was modified before container was published', () => {
            let tag = {
                    updatedAt: '2000-04-26',
                    createdAt: '2000-04-26'
                },
                status = publishedStatus.getPublishedStatusForTag(tag);
            expect(status.name).toBe('Published');
        });

        it('should return Draft when tag was modified after container was published', () => {
            let tag = {
                    updatedAt: '2099-04-26',
                    createdAt: '2000-04-26'
                },
                status = publishedStatus.getPublishedStatusForTag(tag);
            expect(status.name).toBe('Draft');
        });

        it('should return Draft - never published when tag was created after container was published', () => {
            let tag = {
                    updatedAt: '2099-04-26',
                    createdAt: '2099-04-26'
                },
                status = publishedStatus.getPublishedStatusForTag(tag);
            expect(status.name).toBe('Draft - never published');
        });

        it('should return Draft - never published when tag was added but container was never published', () => {
            let tag = {
                updatedAt: '2099-04-26'
            };
            container.publishedAt = undefined;
            let status = publishedStatus.getPublishedStatusForTag(tag);
            expect(status.name).toBe('Draft - never published');
        });
    });
});
