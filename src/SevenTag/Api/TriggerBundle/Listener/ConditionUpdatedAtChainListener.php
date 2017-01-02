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

namespace SevenTag\Api\TriggerBundle\Listener;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\OnFlushEventArgs;
use Doctrine\ORM\PersistentCollection;
use Doctrine\ORM\UnitOfWork;
use SevenTag\Api\TagBundle\Entity\Tag;
use SevenTag\Api\TriggerBundle\Entity\Condition;
use SevenTag\Api\TriggerBundle\Entity\Trigger;
use SevenTag\Component\Container\Model\Container;

/**
 * Class ConditionUpdatedAtChainListener
 * @package SevenTag\Api\TriggerBundle\Listener
 */
class ConditionUpdatedAtChainListener
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var UnitOfWork
     */
    private $unitOfWork;

    /**
     * @var \Doctrine\ORM\Mapping\ClassMetadataFactory
     */
    private $metadataFactory;

    public function onFlush(OnFlushEventArgs $eventArgs)
    {
        $this->entityManager = $eventArgs->getEntityManager();
        $this->unitOfWork = $this->entityManager->getUnitOfWork();
        $this->metadataFactory = $this->entityManager->getMetadataFactory();

        $this->onUpdateConditions($this->unitOfWork->getScheduledEntityUpdates());
        $this->onUpdateTriggers($this->unitOfWork->getScheduledEntityUpdates());
        $this->onUpdateTag($this->unitOfWork->getScheduledEntityUpdates());

        $this->onDeletions(array_merge(
            $this->unitOfWork->getScheduledEntityDeletions()
        ));

        $this->onInsertions(array_merge(
            $this->unitOfWork->getScheduledEntityInsertions()
        ));

        $this->onChangesInDeletedCollections(
            $this->unitOfWork->getScheduledCollectionDeletions()
        );

        $this->onChangesInInsertedCollections(
            $this->unitOfWork->getScheduledCollectionUpdates()
        );
    }

    private function onChangesInInsertedCollections(array $entities)
    {
        /** @var PersistentCollection $entity */
        foreach ($entities as $entity) {
            $container = $this->provideContainerFromEntity($entity->getOwner());
            if ($this->isInPublishAction($container)) {
                $container->setUpdatedAt(new \DateTime());
                $this->recomputeSingleEntityChangesSet($container);
            }
        }
    }

    private function onChangesInDeletedCollections(array $entities)
    {
        /** @var PersistentCollection $entity */
        foreach ($entities as $entity) {
            $container = $this->provideContainerFromEntity($entity->getOwner());
            if ($this->isInPublishAction($container)) {
                $container->setUpdatedAt(new \DateTime());
                $this->recomputeSingleEntityChangesSet($container);
            }
        }
    }

    private function onInsertions(array $entities)
    {
        foreach ($entities as $entity) {
            $container = $this->provideContainerFromEntity($entity);

            if ($container instanceof Container) {
                $container->setUpdatedAt($entity->getUpdatedAt());
                $this->recomputeSingleEntityChangesSet($container);
            }
        }
    }

    private function onDeletions(array $entities)
    {
        foreach ($entities as $entity) {
            $container = $this->provideContainerFromEntity($entity);

            if ($container instanceof Container) {
                $container->setUpdatedAt(new \DateTime());

                $this->recomputeSingleEntityChangesSet($container);
            }
        }
    }

    /**
     * @param array $entities
     */
    private function onUpdateConditions(array $entities)
    {
        foreach ($entities as $entity) {
            if ($entity instanceof Condition) {
                $trigger = $entity->getTrigger();
                $trigger->setUpdatedAt($entity->getUpdatedAt());

                $this->recomputeSingleEntityChangesSet($trigger);
            }
        }
    }

    /**
     * @param array $entities
     */
    private function onUpdateTriggers(array $entities)
    {
        foreach ($entities as $entity) {
            if ($entity instanceof Trigger) {
                $container = $entity->getContainer();
                $container->setUpdatedAt($entity->getUpdatedAt());

                $this->recomputeSingleEntityChangesSet($container);

                /** @var Tag $tag */
                foreach ($entity->getTags() as $tag) {
                    $tag->setUpdatedAt($entity->getUpdatedAt());
                    $this->recomputeSingleEntityChangesSet($tag);
                }
            }
        }
    }

    /**
     * @param array $entities
     */
    private function onUpdateTag(array $entities)
    {
        foreach ($entities as $entity) {
            if ($entity instanceof Tag) {
                $container = $entity->getContainer();
                $container->setUpdatedAt($entity->getUpdatedAt());

                $this->recomputeSingleEntityChangesSet($container);
            }
        }
    }

    /**
     * @param object $object
     * @throws \Doctrine\Common\Persistence\Mapping\MappingException
     */
    private function recomputeSingleEntityChangesSet($object)
    {
        $className = get_class($object);
        if ($this->metadataFactory->hasMetadataFor($className)) {
            $this->unitOfWork->recomputeSingleEntityChangeSet(
                $this->metadataFactory->getMetadataFor($className),
                $object
            );
        }
    }

    /**
     * @param object $entity
     * @return null|\SevenTag\Component\Container\Model\ContainerInterface
     */
    private function provideContainerFromEntity($entity)
    {
        $container = null;
        if ($entity instanceof Condition) {
            $container = $entity->getTrigger()->getContainer();
        }

        if ($entity instanceof Trigger) {
            $container = $entity->getContainer();
        }

        if ($entity instanceof Tag) {
            $container = $entity->getContainer();
        }

        return $container;
    }

    /**
     * @param $container
     * @return bool
     */
    private function isInPublishAction($container)
    {
        return $container instanceof Container && $container->getId() !== null;
    }
}
