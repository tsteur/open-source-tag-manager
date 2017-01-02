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

namespace SevenTag\Api\AppBundle\Versionable\Traits;

use SevenTag\Api\AppBundle\Entity\VersionInterface;

/**
 * Class VersionableEntity
 * @package SevenTag\Api\AppBundle\Versionable\Traits
 */
trait VersionableEntity
{
    /**
     * @var VersionInterface
     */
    protected $version;

    /**
     * @var int
     */
    protected $accessId;

    /**
     * @return VersionInterface
     */
    public function getVersion()
    {
        return $this->version;
    }

    /**
     * @param VersionInterface $version
     * @return VersionableEntity
     */
    public function setVersion(VersionInterface $version)
    {
        $this->version = $version;

        return $this;
    }

    /**
     * @return int
     */
    public function getAccessId()
    {
        return $this->accessId;
    }

    /**
     * @param int $accessId
     * @return self
     */
    public function setAccessId($accessId)
    {
        $this->accessId = $accessId;

        return $this;
    }
}
