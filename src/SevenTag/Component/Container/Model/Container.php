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

namespace SevenTag\Component\Container\Model;

use SevenTag\Api\AppBundle\Entity\VersionInterface;
use SevenTag\Api\AppBundle\Versionable\Traits\VersionableEntity;
use SevenTag\Api\ContainerBundle\Entity\ContainerWebsite;
use SevenTag\Component\Model\Traits\TimestampableEntity;
use SevenTag\Component\Tag\Model\TagInterface;
use SevenTag\Component\Trigger\Model\Trigger;
use SevenTag\Component\Variable\Model\Variable;
use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\UserInterface;

/**
 * Class Container
 * @package SevenTag\Component\Container\Model
 */
class Container implements ContainerInterface
{
    use TimestampableEntity;
    use VersionableEntity;

    /**
     * @var mixed
     */
    protected $id;

    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var ArrayCollection<TagInterface>
     */
    protected $tags;

    /**
     * @var ArrayCollection<Trigger>
     */
    protected $triggers;

    /**
     * @var ArrayCollection<Variable>
     */
    protected $variables;

    /**
     * @var ArrayCollection|ContainerWebsite[]
     */
    protected $websites;

    /**
     * @var UserInterface
     */
    protected $createdBy;

    /**
     * @var VersionInterface|null
     * @internal
     */
    protected $lastPublishVersion = null;

    /**
     * @var array
     */
    protected $permissions = [];

    /**
     * @var number
     */
    protected $delay;

    /**
     * @var string
     */
    protected $code;

    /**
     * @var string
     */
    protected $codeSynchronous;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->triggers = new ArrayCollection();
        $this->variables = new ArrayCollection();
        $this->websites = new ArrayCollection();
        $this->delay = 500;

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
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * {@inheritDoc}
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * {@inheritDoc}
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * {@inheritDoc}
     */
    public function setTags($tags)
    {
        if (!is_array($tags) || !$tags instanceof \Traversable) {
            throw new \InvalidArgumentException(sprintf('Tags should be array or \Traversable.'));
        }

        foreach ($tags as $tag) {
            $this->addTag($tag);
        }

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function addTag(TagInterface $tag)
    {
        if (!$this->hasTag($tag)) {
            $this->tags->add($tag);
        }

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function hasTag(TagInterface $tag)
    {
        return $this->tags->contains($tag);
    }

    /**
     * {@inheritDoc}
     */
    public function removeTag(TagInterface $tag)
    {
        $this->tags->removeElement($tag);

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function getTriggers()
    {
        return $this->triggers;
    }

    /**
     * {@inheritDoc}
     */
    public function setTriggers($triggers)
    {
        if (!is_array($triggers) || !$triggers instanceof \Traversable) {
            throw new \InvalidArgumentException(sprintf('Triggers should be array or \Traversable.'));
        }

        foreach ($triggers as $trigger) {
            $this->addTrigger($trigger);
        }

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function addTrigger(Trigger $trigger)
    {
        if (!$this->hasTrigger($trigger)) {
            $this->triggers->add($trigger);
        }

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function hasTrigger(Trigger $trigger)
    {
        return $this->triggers->contains($trigger);
    }

    /**
     * {@inheritDoc}
     */
    public function removeTrigger(Trigger $trigger)
    {
        $this->triggers->removeElement($trigger);

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getVariables()
    {
        return $this->variables;
    }

    /**
     * {@inheritdoc}
     */
    public function setVariables($variables)
    {
        $this->variables = $variables;
    }

    /**
     * {@inheritDoc}
     */
    public function addVariable(Variable $variable)
    {
        if (!$this->hasVariable($variable)) {
            $this->variables->add($variable);
        }

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function hasVariable(Variable $variable)
    {
        return $this->variables->contains($variable);
    }

    /**
     * {@inheritDoc}
     */
    public function removeVariable(Variable $variable)
    {
        $this->variables->removeElement($variable);

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getWebsites()
    {
        return $this->websites;
    }

    /**
     * {@inheritDoc}
     */
    public function addWebsite(ContainerWebsite $containerWebsite)
    {
        if (!$this->hasWebsite($containerWebsite)) {
            $containerWebsite->setContainer($this);
            $this->websites->add($containerWebsite);
        }

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function hasWebsite(ContainerWebsite $containerWebsite)
    {
        return $this->websites->contains($containerWebsite);
    }

    /**
     * {@inheritDoc}
     */
    public function removeWebsite(ContainerWebsite $containerWebsite)
    {
        $this->websites->removeElement($containerWebsite);

        return $this;
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

    /**
     * {@inheritDoc}
     */
    public function getObjectIdentifier()
    {
        return $this->getAccessId();
    }

    /**
     * @internal
     * @return VersionInterface
     */
    public function getLastPublishVersion()
    {
        return $this->lastPublishVersion;
    }

    /**
     * @internal
     * @param VersionInterface $lastPublishVersion
     * @return Container
     */
    public function setLastPublishVersion(VersionInterface $lastPublishVersion = null)
    {
        $this->lastPublishVersion = $lastPublishVersion;

        return $this;
    }

    /**
     * @internal
     * @return \DateTime|null
     */
    public function getPublishedAt()
    {
        if (!$this->getLastPublishVersion()) {
            return null;
        }

        return $this->getLastPublishVersion()->getUpdatedAt();
    }

    /**
     * @internal
     * @return bool
     */
    public function hasUnpublishedChanges()
    {
        if (!$this->getLastPublishVersion()) {
            return true;
        }

        $lastPublishDate = $this->getLastPublishVersion()->getUpdatedAt()->format('U');
        $newDraftDate = $this->getUpdatedAt()->format('U');

        if ($lastPublishDate <= $newDraftDate) {
            return true;
        }

        return false;
    }

    /**
     * @return string
     */
    public function getPermissions()
    {
        return $this->permissions;
    }

    /**
     * @param array $permissions
     */
    public function setPermissions(array $permissions)
    {
        $this->permissions = $permissions;
    }

    /**
     * @return number
     */
    public function getDelay()
    {
        return $this->delay;
    }

    /**
     * @param integer $delay
     * @return integer
     */
    public function setDelay($delay)
    {
        $this->delay = $delay;
    }

    /**
     * {@inheritDoc}
     */
    public function setCode($code)
    {
        $this->code = $code;
    }

    /**
     * {@inheritDoc}
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * {@inheritDoc}
     */
    public function setCodeSynchronous($codeSynchronous)
    {
        $this->codeSynchronous = $codeSynchronous;
    }

    /**
     * {@inheritDoc}
     */
    public function getCodeSynchronous()
    {
        return $this->codeSynchronous;
    }
}
