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
use SevenTag\Api\AppBundle\Versionable\Traits\VersionableEntity;
use SevenTag\Component\Model\Traits\TimestampableEntity;
use SevenTag\Component\Condition\Model\ConditionInterface;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Tag\Model\TagInterface;
use SevenTag\Api\TriggerBundle\TriggerType\Type\TypeInterface;

class Trigger implements TriggerInterface
{
    use TimestampableEntity;
    use VersionableEntity;

    /**
     * @var integer
     */
    protected $id;

    /**
     * @var string
     */
    protected $name;

    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @var ArrayCollection<Condition>
     */
    protected $conditions;

    /**
     * @var ArrayCollection<Tag>
     */
    protected $tags;

    /**
     * @var integer
     */
    protected $type;

    /**
     * @var integer
     */
    protected $strategy;

    /**
     * @var boolean
     */
    protected $isAddedToSynchronousTag = false;

    public function __construct()
    {
        $this->conditions = new ArrayCollection;
        $this->tags = new ArrayCollection;
        $this->type = TypeInterface::TYPE_PAGE_VIEW;
        $this->strategy = TypeInterface::STRATEGY_ALWAYS;

        $this->initTimestampable();
    }

    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @inheritdoc
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @inheritdoc
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @inheritdoc
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @inheritdoc
     */
    public function getContainer()
    {
        return $this->container;
    }

    /**
     * @inheritdoc
     */
    public function setContainer(ContainerInterface $container)
    {
        $this->container = $container;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getContainerAccessId()
    {
        return $this->container->getAccessId();
    }

    /**
     * @inheritdoc
     */
    public function getConditions()
    {
        return $this->conditions;
    }

    /**
     * @inheritdoc
     */
    public function setConditions(ArrayCollection $conditions)
    {
        $this->conditions = $conditions;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function addCondition(ConditionInterface $condition)
    {
        if (!$this->conditions->contains($condition)) {
            $condition->setTrigger($this);
            $this->conditions->add($condition);
        }

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function removeCondition(ConditionInterface $condition)
    {
        $this->conditions->removeElement($condition);

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * {@inheritdoc}
     */
    public function setTags(ArrayCollection $tags)
    {
        $this->tags = $tags;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function addTag(TagInterface $tag)
    {
        if (!$this->tags->contains($tag)) {
            $this->tags->add($tag);
        }

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function removeTag(TagInterface $tag)
    {
        $this->tags->remove($tag);

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getTagsCount()
    {
        return $this->tags->count();
    }

    /**
     * {@inheritdoc}
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * {@inheritdoc}
     */
    public function setStrategy($strategy)
    {
        $this->strategy = $strategy;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getStrategy()
    {
        return $this->strategy;
    }

    /**
     * {@inheritdoc}
     */
    public function setIsAddedToSynchronousTag($isAddedToSynchronousTag)
    {
        $this->isAddedToSynchronousTag = $isAddedToSynchronousTag;
    }

    /**
     * {@inheritdoc}
     */
    public function getIsAddedToSynchronousTag()
    {
        return $this->isAddedToSynchronousTag;
    }
}
