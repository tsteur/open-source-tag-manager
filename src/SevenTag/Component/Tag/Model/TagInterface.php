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

use SevenTag\Api\AppBundle\Versionable\VersionableInterface;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Model\Model\TimestampableInterface;
use SevenTag\Component\Trigger\Model\TriggerInterface;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Interface TagInterface
 * @package SevenTag\Component\Tag\Model
 */
interface TagInterface extends TimestampableInterface, VersionableInterface
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
     * Set priority
     *
     * @param  integer $priority
     * @return self
     */
    public function setPriority($priority);

    /**
     * Get priority
     *
     * @return integer
     */
    public function getPriority();

    /**
     * Set documentWrite
     *
     * @param  integer $documentWrite
     * @return self
     */
    public function setDocumentWrite($documentWrite);

    /**
     * Get documentWrite
     *
     * @return integer
     */
    public function getDocumentWrite();

    /**
     * Set disableInDebugMode
     *
     * @param  integer $disableInDebugMode
     * @return self
     */
    public function setDisableInDebugMode($disableInDebugMode);

    /**
     * Get disableInDebugMode
     *
     * @return integer
     */
    public function getDisableInDebugMode();

    /**
     * Set respectVisitorsPrivacy
     *
     * @param  integer $respectVisitorsPrivacy
     * @return self
     */
    public function setRespectVisitorsPrivacy($respectVisitorsPrivacy);

    /**
     * Get respectVisitorsPrivacy
     *
     * @return integer
     */
    public function getRespectVisitorsPrivacy();

    /**
     * Get isSynchronous
     *
     * @return boolean
     */
    public function getIsSynchronous();

    /**
     * Set isSynchronous
     *
     * @param boolean $isSynchronous
     * @return Tag
     */
    public function setIsSynchronous($isSynchronous);

    /**
     * @param ContainerInterface $container
     * @return self
     */
    public function setContainer(ContainerInterface $container);

    /**
     * @return ContainerInterface
     */
    public function getContainer();

    /**
     * @return mixed
     */
    public function getContainerAccessId();

    /**
     * @return ArrayCollection<SevenTag\Component\Trigger\Model\TriggerInterface>
     */
    public function getTriggers();

    /**
     * @param ArrayCollection $triggers
     * @return self
     */
    public function setTriggers(ArrayCollection $triggers);

    /**
     * @param TriggerInterface $trigger
     * @return mixed
     */
    public function hasTrigger(TriggerInterface $trigger);

    /**
     * @param TriggerInterface $trigger
     * @return self
     */
    public function addTrigger(TriggerInterface $trigger);

    /**
     * @param TriggerInterface $trigger
     * @return self
     */
    public function removeTrigger(TriggerInterface $trigger);

    /**
     * @return string
     */
    public function getTemplate();

    /**
     * @param string $template
     * @return self
     */
    public function setTemplate($template);

    /**
     * @return array
     */
    public function getTemplateOptions();

    /**
     * @param array $templateOptions
     * @return self
     */
    public function setTemplateOptions($templateOptions);
}
