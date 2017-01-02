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

namespace SevenTag\Component\Tag\Model;

use Doctrine\Common\Collections\ArrayCollection;
use SevenTag\Api\AppBundle\Versionable\Traits\VersionableEntity;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Model\Traits\TimestampableEntity;
use SevenTag\Component\Trigger\Model\TriggerInterface;

class Tag implements TagInterface
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
    protected $code;

    /**
     * @var integer
     */
    protected $priority;

    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @var ArrayCollection<TriggerInterface>
     */
    protected $triggers;

    /**
     * @var boolean
     */
    protected $documentWrite = false;

    /**
     * @var boolean
     */
    protected $disableInDebugMode = false;

    /**
     * @var boolean
     */
    protected $respectVisitorsPrivacy = false;

    /**
     * @var boolean
     */
    protected $isSynchronous = false;

    /**
     * @var string
     */
    protected $template;

    /**
     * @var array
     */
    protected $templateOptions = [];

    /**
     * @var boolean
     */
    protected $isActive;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->priority = 0;
        $this->triggers = new ArrayCollection;
        $this->isActive = true;

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
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
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
    public function setPriority($priority)
    {
        $this->priority = (int)$priority;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function getPriority()
    {
        return $this->priority;
    }

    /**
     * Set documentWrite
     *
     * @param boolean $documentWrite
     * @return Tag
     */
    public function setDocumentWrite($documentWrite)
    {
        $this->documentWrite = $documentWrite;

        return $this;
    }

    /**
     * Get documentWrite
     *
     * @return boolean
     */
    public function getDocumentWrite()
    {
        return $this->documentWrite;
    }

    /**
     * Get disableInDebugMode
     *
     * @return boolean
     */
    public function getDisableInDebugMode()
    {
        return $this->disableInDebugMode;
    }

    /**
     * Set disableInDebugMode
     *
     * @param boolean $disableInDebugMode
     * @return Tag
     */
    public function setDisableInDebugMode($disableInDebugMode)
    {
        $this->disableInDebugMode = $disableInDebugMode;

        return $this;
    }

    /**
     * Get respectVisitorsPrivacy
     *
     * @return boolean
     */
    public function getRespectVisitorsPrivacy()
    {
        return $this->respectVisitorsPrivacy;
    }

    /**
     * Set respectVisitorsPrivacy
     *
     * @param boolean $respectVisitorsPrivacy
     * @return Tag
     */
    public function setRespectVisitorsPrivacy($respectVisitorsPrivacy)
    {
        $this->respectVisitorsPrivacy = $respectVisitorsPrivacy;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function getIsSynchronous()
    {
        return $this->isSynchronous;
    }

    /**
     * {@inheritDoc}
     */
    public function setIsSynchronous($isSynchronous)
    {
        $this->isSynchronous = $isSynchronous;

        return $this;
    }


    /**
     * {@inheritDoc}
     */
    public function setContainer(ContainerInterface $container)
    {
        $this->container = $container;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function getContainer()
    {
        return $this->container;
    }

    /**
     * {@inheritDoc}
     */
    public function getContainerAccessId()
    {
        return $this->container->getId();
    }

    /**
     * @return ArrayCollection
     */
    public function getTriggers()
    {
        return $this->triggers;
    }

    /**
     * {@inheritDoc}
     */
    public function setTriggers(ArrayCollection $triggers)
    {
        $this->triggers = $triggers;
    }

    /**
     * {@inheritDoc}
     */
    public function addTrigger(TriggerInterface $trigger)
    {
        $trigger->addTag($this);

        if (!$this->triggers->contains($trigger)) {
            $this->triggers->add($trigger);
        }
    }

    /**
     * {@inheritDoc}
     */
    public function hasTrigger(TriggerInterface $trigger)
    {
        return $this->triggers->contains($trigger);
    }

    /**
     * {@inheritDoc}
     */
    public function removeTrigger(TriggerInterface $trigger)
    {
        $this->triggers->remove($trigger);
    }

    /**
     * {@inheritDoc}
     */
    public function getTemplate()
    {
        return $this->template;
    }

    /**
     * {@inheritDoc}
     */
    public function setTemplate($template)
    {
        $this->template = $template;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function getTemplateOptions()
    {
        return $this->templateOptions;
    }

    /**
     * {@inheritDoc}
     */
    public function setTemplateOptions($templateOptions)
    {
        $this->templateOptions = (array)$templateOptions;

        return $this;
    }

    /**
     * Set isActive
     *
     * @param boolean $isActive
     * @return Tag
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * Get isActive
     *
     * @return boolean
     */
    public function isActive()
    {
        return $this->isActive;
    }
}
