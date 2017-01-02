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

const STATE_DRAFT = 0,
    STATE_NEVER_PUBLISHED = 1,
    STATE_PUBLISHED = 2,
    STATE_WAITING_FOR_CONTAINER_DATA = 3;
const PUBLISHED_STATE = [
    {
        name: 'Draft',
        class: 'stg-status-badge-draft'
    },
    {
        name: 'Draft - never published',
        class: 'stg-status-badge-never-published'
    },
    {
        name: 'Published',
        class: 'stg-status-badge-published'
    },
    {
        name: '',
        class: ''
    }
];

let currentContainer;

/**
 * @name PublishedStatus
 */
class PublishedStatus {
    constructor ($currentContainer) {
        currentContainer = $currentContainer;
    }

    getPublishedStatusForContainer (container) {
        return getPublishedState(container, container.hasUnpublishedChanges);
    }

    getPublishedStatusForTag (tag) {
        let $container = currentContainer.$container;
        if (!$container) {
            return PUBLISHED_STATE[STATE_WAITING_FOR_CONTAINER_DATA];
        }

        let dateTagChanged = new Date(tag.updatedAt),
            dateTagCreated = new Date(tag.createdAt),
            dateContainerPublished = new Date($container.publishedAt),
            tagIsDirty = dateTagChanged > dateContainerPublished,
            tagCreatedAfterLastPublish = dateTagCreated > dateContainerPublished;
        return getPublishedState($container, tagIsDirty, tagCreatedAfterLastPublish);
    }
}

function getPublishedState (container, hasUnpublishedChanges, wasNeverPublished) {
    if (!containerHasBeenPublished(container) || wasNeverPublished) {
        return PUBLISHED_STATE[STATE_NEVER_PUBLISHED];
    } else if (hasUnpublishedChanges) {
        return PUBLISHED_STATE[STATE_DRAFT];
    } else {
        return PUBLISHED_STATE[STATE_PUBLISHED];
    }
}

function containerHasBeenPublished (container) {
    return !!container.publishedAt;
}

export default PublishedStatus;
