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

namespace SevenTag\Api\AppBundle\Versionable\VersionManager\Handler;

use Doctrine\ORM\EntityManagerInterface;
use SevenTag\Api\AppBundle\Versionable\CopyManager\CopyManagerInterface;
use SevenTag\Api\AppBundle\Versionable\DeepPersister\DeepPersisterIntreface;
use SevenTag\Component\Container\Model\ContainerInterface;

/**
 * Class AbstractHandler
 * @package SevenTag\Api\AppBundle\Versionable\VersionManager\Handler
 */
abstract class AbstractHandler implements HandlerInterface
{
    /**
     * @var CopyManagerInterface
     */
    protected $copyManager;

    /**
     * @var DeepPersisterIntreface
     */
    protected $deepPersister;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @param CopyManagerInterface $copyManager
     */
    public function setCopyManager(CopyManagerInterface $copyManager)
    {
        $this->copyManager = $copyManager;
    }

    /**
     * @param DeepPersisterIntreface $deepPersister
     */
    public function setDeepPersister($deepPersister)
    {
        $this->deepPersister = $deepPersister;
    }

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function setEntityManager(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param ContainerInterface $container
     */
    protected function markContainerAsPublish(ContainerInterface $container)
    {
        $version = $container->getVersion();
        $version->setDraft(false);
        $version->setPublished(true);

        $this->entityManager->persist($version);
    }

    /**
     * @param ContainerInterface $container
     */
    protected function markContainerAsDraft(ContainerInterface $container)
    {
        $version = $container->getVersion();
        $version->setDraft(true);
        $version->setPublished(false);

        $this->entityManager->persist($version);
    }

    /**
     * @param ContainerInterface $container
     */
    protected function resetDrafts(ContainerInterface $container)
    {
        $this->entityManager
            ->getRepository('SevenTagAppBundle:Version')
            ->updateContainerDrafts($container, 0);
    }

    /**
     * @param ContainerInterface $container
     */
    protected function resetPublished(ContainerInterface $container)
    {
        $this->entityManager
            ->getRepository('SevenTagAppBundle:Version')
            ->updateContainerPublished($container, 0);
    }
}
