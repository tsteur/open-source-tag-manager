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

namespace SevenTag\Api\AppBundle\Plugin;

use Symfony\Component\EventDispatcher\Event;

/**
 * Class LoadManifestEvent
 * @package SevenTag\Api\AppBundle\Plugin
 */
class LoadManifestEvent extends Event
{
    /**
     * @var Manifest
     */
    private $manifest;

    /**
     * @param Manifest $manifest
     */
    public function __construct(Manifest $manifest)
    {
        $this->manifest = $manifest;
    }

    /**
     * @return Manifest
     */
    public function getManifest()
    {
        return $this->manifest;
    }
}
