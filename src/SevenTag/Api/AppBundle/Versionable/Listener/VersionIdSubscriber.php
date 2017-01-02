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

namespace SevenTag\Api\AppBundle\Versionable\Listener;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LoadClassMetadataEventArgs;
use Doctrine\ORM\Event\OnFlushEventArgs;
use Doctrine\ORM\Mapping\Builder\ClassMetadataBuilder;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\UnitOfWork;
use SevenTag\Api\AppBundle\Entity\Version;
use SevenTag\Api\AppBundle\Entity\VersionInterface;
use SevenTag\Api\AppBundle\Versionable\VersionableInterface;
use SevenTag\Component\Condition\Model\ConditionInterface;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Tag\Model\TagInterface;
use SevenTag\Component\Trigger\Model\TriggerInterface;

/**
 * Class VersionIdSubscriber
 * @package SevenTag\Api\AppBundle\Versionable\Listener
 */
class VersionIdSubscriber implements EventSubscriber
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;
    /**
     * @var UnitOfWork
     */
    protected $unitOfWork;

    /**
     * @return array
     */
    public function getSubscribedEvents()
    {
        return [
            'loadClassMetadata',
            'onFlush'
        ];
    }

    public function loadClassMetadata(LoadClassMetadataEventArgs $eventArgs)
    {
        /** @var ClassMetadata $classMetadata */
        $classMetadata = $eventArgs->getClassMetadata();
        if (!$this->isVersionable($classMetadata)) {
            return;
        }

        $builder = new ClassMetadataBuilder($classMetadata);

        $associationBuilder = $builder->createManyToOne('version', 'SevenTag\Api\AppBundle\Entity\Version');
        $associationBuilder->addJoinColumn('version_id', 'id', false, false, 'CASCADE');
        $associationBuilder->build();
    }

    /**
     * @param OnFlushEventArgs $event
     */
    public function onFlush(OnFlushEventArgs $event)
    {
        /** @var EntityManagerInterface $entityManager */
        $this->entityManager = $event->getEntityManager();
        /** @var UnitOfWork $uow */
        $this->unitOfWork = $this->entityManager->getUnitOfWork();

        foreach ($this->unitOfWork->getScheduledEntityInsertions() as $entity) {
            if (!$entity instanceof VersionableInterface) {
                continue;
            }

            if ($entity instanceof ContainerInterface) {
                $this->createNewVersionId($entity);

                continue;
            }

            $this->setCurrentVersionId($entity);
        }
    }

    /**
     * @param ClassMetadata $classMetadata
     * @return boolean
     */
    protected function isVersionable(ClassMetadata $classMetadata)
    {
        $reflectionClass = $classMetadata->getReflectionClass();

        if (!$reflectionClass) {
            return false;
        }

        return in_array(
            'SevenTag\Api\AppBundle\Versionable\VersionableInterface',
            $reflectionClass->getInterfaceNames()
        );
    }

    /**
     * @param ContainerInterface $entity
     */
    protected function createNewVersionId(ContainerInterface $entity)
    {
        if ($entity->getVersion() instanceof VersionInterface) {
            return;
        } else {
            $version = new Version();
            $version->setCreatedBy($entity->getCreatedBy());

            $this->computeSingleEntity($version);

            $entity->setVersion($version);
        }

        $this->recomputeSingleEntity($entity);
    }

    /**
     * @param TagInterface|TriggerInterface|ConditionInterface $entity
     */
    protected function setCurrentVersionId($entity)
    {
        if ($entity instanceof ConditionInterface) {
            $trigger = $entity->getTrigger();

            if ($trigger->getVersion() instanceof VersionInterface) {
                $version = $trigger->getVersion();
            } else {
                $version = $trigger->getContainer()->getVersion();
            }

            $entity->setVersion($version);
        } else {
            $entity->setVersion($entity->getContainer()->getVersion());
        }

        $this->recomputeSingleEntity($entity);
    }

    /**
     * @param $entity
     */
    protected function recomputeSingleEntity($entity)
    {
        $meta = $this->entityManager->getClassMetadata(get_class($entity));
        $this->unitOfWork->recomputeSingleEntityChangeSet($meta, $entity);
    }

    /**
     * @param $entity
     */
    protected function computeSingleEntity($entity)
    {
        $this->entityManager->persist($entity);
        $meta = $this->entityManager->getClassMetadata(get_class($entity));
        $this->unitOfWork->computeChangeSet($meta, $entity);
    }
}
