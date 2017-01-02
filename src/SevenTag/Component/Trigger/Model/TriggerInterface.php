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

namespace SevenTag\Component\Trigger\Model;

use Doctrine\Common\Collections\ArrayCollection;
use SevenTag\Api\AppBundle\Versionable\VersionableInterface;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Model\Model\TimestampableInterface;
use SevenTag\Component\Tag\Model\TagInterface;

interface TriggerInterface extends TimestampableInterface, VersionableInterface
{
    /**
     * @return int
     */
    public function getId();

    /**
     * @param int $id
     * @return self
     */
    public function setId($id);

    /**
     * @return string
     */
    public function getName();

    /**
     * @param string $name
     * @return self
     */
    public function setName($name);

    /**
     * @return ContainerInterface
     */
    public function getContainer();

    /**
     * @param ContainerInterface $container
     * @return self
     */
    public function setContainer(ContainerInterface $container);

    /**
     * @return mixed
     */
    public function getContainerAccessId();

    /**
     * @return ArrayCollection
     */
    public function getConditions();

    /**
     * @param ArrayCollection $conditions
     * @return self
     */
    public function setConditions(ArrayCollection $conditions);

    /**
     * @return ArrayCollection
     */
    public function getTags();

    /**
     * @param ArrayCollection $tags
     * @return self
     */
    public function setTags(ArrayCollection $tags);

    /**
     * @param TagInterface $tag
     * @return self
     */
    public function addTag(TagInterface $tag);

    /**
     * @param TagInterface $tag
     * @return self
     */
    public function removeTag(TagInterface $tag);

    /**
     * @return int
     */
    public function getTagsCount();

    /**
     * Set type
     *
     * @param integer $type
     * @return self
     */
    public function setType($type);

    /**
     * Get type
     *
     * @return integer
     */
    public function getType();

    /**
     * Set strategy
     *
     * @param integer $strategy
     * @return self
     */
    public function setStrategy($strategy);

    /**
     * Get strategy
     *
     * @return integer
     */
    public function getStrategy();

    /**
     * Set isAddedToSynchronousTag
     *
     * @param boolean $isAddedToSynchronousTag
     * @return self
     */
    public function setIsAddedToSynchronousTag($isAddedToSynchronousTag);

    /**
     * Get isAddedToSynchronousTag
     *
     * @return boolean
     */
    public function getIsAddedToSynchronousTag();
}
