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

namespace SevenTag\Api\AppBundle\Entity;

use DateTime;
use FOS\UserBundle\Model\UserInterface;

/**
 * Interface VersionInterface
 * @package SevenTag\Api\AppBundle\Entity
 */
interface VersionInterface
{
    /**
     * Get id
     *
     * @return integer
     */
    public function getId();

    /**
     * Set isPublished
     *
     * @param boolean $published
     * @return VersionInterface
     */
    public function setPublished($published);

    /**
     * Get isPublished
     *
     * @return boolean
     */
    public function isPublished();

    /**
     * Set isDraft
     *
     * @param boolean $isDraft
     * @return VersionInterface
     */
    public function setDraft($isDraft);

    /**
     * Get isDraft
     *
     * @return boolean
     */
    public function isDraft();

    /**
     * @param UserInterface $createdBy
     * @return VersionInterface
     */
    public function setCreatedBy(UserInterface $createdBy);

    /**
     * @return UserInterface
     */
    public function getCreatedBy();

    /**
     * Set createdAt
     *
     * @param DateTime $createdAt
     * @return VersionInterface
     */
    public function setCreatedAt(DateTime $createdAt);

    /**
     * Get createdAt
     *
     * @return DateTime
     */
    public function getCreatedAt();

    /**
     * Set updatedAt
     *
     * @param DateTime $updatedAt
     * @return VersionInterface
     */
    public function setUpdatedAt(DateTime $updatedAt);

    /**
     * Get updatedAt
     *
     * @return DateTime
     */
    public function getUpdatedAt();
}
