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

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\UserInterface;
use SevenTag\Component\Model\Traits\TimestampableEntity;

/**
 * Class Version
 * @package SevenTag\Api\AppBundle\Entity
 */
class Version implements VersionInterface
{
    use TimestampableEntity;

    /**
     * @var integer
     */
    private $id;

    /**
     * @var boolean
     */
    private $published = false;

    /**
     * @var boolean
     */
    private $draft = true;

    /**
     * @var UserInterface
     */
    private $createdBy;

    public function __construct()
    {
        $this->initTimestampable();
    }

    /**
     * {@inheritDoc}
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * {@inheritDoc}
     */
    public function setPublished($published)
    {
        $this->published = $published;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function isPublished()
    {
        return $this->published;
    }

    /**
     * {@inheritDoc}
     */
    public function setDraft($draft)
    {
        $this->draft = $draft;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function isDraft()
    {
        return $this->draft;
    }

    /**
     * {@inheritDoc}
     */
    public function setCreatedBy(UserInterface $createdBy)
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function getCreatedBy()
    {
        return $this->createdBy;
    }
}
