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

namespace SevenTag\Api\ContainerBundle\Service;

use Doctrine\Common\Collections\ArrayCollection;
use SevenTag\Api\ContainerBundle\ContainerLibrary\ContainerLibraryEvent;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Events;
use SevenTag\Api\ContainerBundle\Entity\ContainerRepository;
use SevenTag\Component\Container\Model\ContainerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class RepublishContainer
{
    /**
     * @var ContainerRepository
     */
    private $containerRepository;

    /**
     * @var EventDispatcherInterface
     */
    private $eventDispatcher;

    /**
     * @param ContainerRepository $containerRepository
     * @param EventDispatcherInterface $eventDispatcher
     */
    public function __construct(ContainerRepository $containerRepository, EventDispatcherInterface $eventDispatcher)
    {
        $this->containerRepository = $containerRepository;
        $this->eventDispatcher = $eventDispatcher;
    }

    /**
     * @param ContainerInterface $container
     */
    public function process(ContainerInterface $container)
    {
        $this->eventDispatcher->dispatch(Events::CONTAINER_PUBLISHED, new ContainerLibraryEvent($container));
    }

    /**
     * @param integer|null $containerId
     * @return ArrayCollection
     */
    public function getContainersToProcess($containerId = null)
    {
        if ($containerId) {
            return $this->getSingleContainerToProcess($containerId);
        }

        return $this->getAllPublishedContainersToProcess();
    }

    /**
     * @param integer $containerId
     * @return ArrayCollection
     */
    protected function getSingleContainerToProcess($containerId)
    {
        $containers = [];
        $container = $this->getContainerRepository()
            ->findByAccessId($containerId, false);

        if ($container) {
            $containers[] = $container;
        }

        return new ArrayCollection($containers);
    }

    /**
     * @return ArrayCollection
     */
    protected function getAllPublishedContainersToProcess()
    {
        $containers = $this->getContainerRepository()->findPublished();

        if (null === $containers) {
            $containers = [];
        }

        return new ArrayCollection($containers);
    }

    /**
     * @return ContainerRepository
     */
    protected function getContainerRepository()
    {
        return $this->containerRepository;
    }
}
