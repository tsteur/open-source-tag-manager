<?php
/**
 * Copyright (C) 2015 Digimedia Sp. z o.o. d/b/a Clearcode
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

namespace SevenTag\Api\ContainerBundle\ContainerLibrary;

/**
 * Class Events
 * @package SevenTag\Api\ContainerBundle\ContainerLibrary
 */
final class Events
{
    const CONTAINER_PUBLISHED = 'seventag_container_library_event.container_published';
    const CONTAINER_CREATED = 'seventag_container_library_event.container_created';
    const CONTAINER_REMOVED = 'seventag_container_library_event.container_removed';
}
