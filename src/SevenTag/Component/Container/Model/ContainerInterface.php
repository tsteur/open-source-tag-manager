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

use SevenTag\Api\AppBundle\Versionable\VersionableInterface;
use SevenTag\Api\ContainerBundle\Entity\ContainerWebsite;
use SevenTag\Component\Model\Model\TimestampableInterface;
use SevenTag\Component\Tag\Model\TagInterface;
use SevenTag\Component\Trigger\Model\Trigger;
use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\UserInterface;
use SevenTag\Component\Variable\Model\Variable;
use Symfony\Component\Security\Acl\Model\DomainObjectInterface;

/**
 * Interface ContainerInterface
 * @package SevenTag\Component\Model\ContainerInterface
 */
interface ContainerInterface extends TimestampableInterface, VersionableInterface, DomainObjectInterface
{
    /**
     * Get id
     *
     * @return mixed
     */
    public function getId();

    /**
     * Set name
     *
     * @param  string $name
     * @return self
     */
    public function setName($name);

    /**
     * Get name
     *
     * @return string
     */
    public function getName();

    /**
     * Set description
     *
     * @param  string $description
     * @return self
     */
    public function setDescription($description);

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription();

    /**
     * @return ArrayCollection<SevenTag\Component\Tag\Model\TagInterface>
     */
    public function getTags();

    /**
     * @param \Traversable|array $tags
     * @return self
     */
    public function setTags($tags);

    /**
     * @param TagInterface $tag
     * @return self
     */
    public function addTag(TagInterface $tag);

    /**
     * @param TagInterface $tag
     * @return boolean
     */
    public function hasTag(TagInterface $tag);

    /**
     * @param TagInterface $tag
     * @return self
     */
    public function removeTag(TagInterface $tag);

    /**
     * @return ArrayCollection<Trigger>
     */
    public function getTriggers();

    /**
     * @param \Traversable|array $triggers
     * @return self
     */
    public function setTriggers($triggers);

    /**
     * @param Trigger $trigger
     * @return self
     */
    public function addTrigger(Trigger $trigger);

    /**
     * @param Trigger $trigger
     * @return boolean
     */
    public function hasTrigger(Trigger $trigger);

    /**
     * @param Trigger $trigger
     * @return self
     */
    public function removeTrigger(Trigger $trigger);

    /**
     * @return ArrayCollection|ContainerWebsite[]
     */
    public function getWebsites();

    /**
     * @param ContainerWebsite $containerWebsite
     * @return self
     */
    public function addWebsite(ContainerWebsite $containerWebsite);

    /**
     * @param ContainerWebsite $containerWebsite
     * @return boolean
     */
    public function hasWebsite(ContainerWebsite $containerWebsite);

    /**
     * @param ContainerWebsite $containerWebsite
     * @return self
     */
    public function removeWebsite(ContainerWebsite $containerWebsite);

    /**
     * @return ArrayCollection<Variables>
     */
    public function getVariables();

    /**
     * @param $variables
     * @return self
     */
    public function setVariables($variables);

    /**
     * @param Variable $variable
     * @return mixed
     */
    public function addVariable(Variable $variable);

    /**
     * @param Variable $variable
     * @return mixed
     */
    public function hasVariable(Variable $variable);

    /**
     * @param Variable $variable
     * @return mixed
     */
    public function removeVariable(Variable $variable);

    /**
     * @param UserInterface $createdBy
     * @return self
     */
    public function setCreatedBy(UserInterface $createdBy);

    /**
     * @return UserInterface
     */
    public function getCreatedBy();

    /**
     * Set delay
     *
     * @param  number $delay
     * @return self
     */
    public function setDelay($delay);

    /**
     * Get delay
     *
     * @return number
     */
    public function getDelay();

    /**
     * Set code
     *
     * @param  string $code
     * @return self
     */
    public function setCode($code);

    /**
     * Get code
     *
     * @return string
     */
    public function getCode();

    /**
     * Set synchronous code
     *
     * @param  string $code
     * @return self
     */
    public function setCodeSynchronous($code);

    /**
     * Get synchronous code
     *
     * @return string
     */
    public function getCodeSynchronous();
}
