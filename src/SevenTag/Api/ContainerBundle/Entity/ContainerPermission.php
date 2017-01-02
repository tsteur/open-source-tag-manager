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

namespace SevenTag\Api\ContainerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use SevenTag\Api\UserBundle\Entity\User;

/**
 * ContainerPermission
 */
class ContainerPermission
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $permissions;

    /**
     * @var \SevenTag\Api\UserBundle\Entity\User
     */
    private $user;

    /**
     * @var int
     */
    private $containerAccessId;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set permissions
     *
     * @param integer $permissions
     * @return self
     */
    public function setPermissions($permissions)
    {
        $this->permissions = $permissions;

        return $this;
    }

    /**
     * Get permissions
     *
     * @return integer
     */
    public function getPermissions()
    {
        return $this->permissions;
    }

    /**
     * Set user
     *
     * @param User $user
     * @return self
     */
    public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @return int
     */
    public function getContainerAccessId()
    {
        return $this->containerAccessId;
    }

    /**
     * @param int $containerAccessId
     */
    public function setContainerAccessId($containerAccessId)
    {
        $this->containerAccessId = $containerAccessId;
    }
}
