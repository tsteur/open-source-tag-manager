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
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\LoadClassMetadataEventArgs;
use Doctrine\ORM\Mapping\Builder\ClassMetadataBuilder;
use Doctrine\ORM\Mapping\ClassMetadata;
use SevenTag\Api\AppBundle\Versionable\VersionableInterface;

/**
 * Class AccessIdSubscriber
 * @package SevenTag\Api\AppBundle\Versionable\Listener
 */
class AccessIdSubscriber implements EventSubscriber
{
    /**
     * @return array
     */
    public function getSubscribedEvents()
    {
        return [
            'loadClassMetadata',
            'postPersist'
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
        $builder->addField('accessId', 'integer', [
            'nullable' => true,
            'columnName' => 'access_id'
        ]);

        $builder->addIndex(
            ['access_id'],
            sprintf(
                'idx_%s_%s',
                'accessId',
                $classMetadata->getReflectionClass()->getShortName()
            )
        );
    }

    public function postPersist(LifecycleEventArgs $eventArgs)
    {
        $entityManager = $eventArgs->getEntityManager();
        $unitOfWork = $entityManager->getUnitOfWork();
        $connection = $entityManager->getConnection();

        $entity = $eventArgs->getEntity();
        if ($entity instanceof VersionableInterface) {
            if (0 === $connection->getTransactionNestingLevel()) {
                throw new \LogicException(
                    'VersionableInterface must be inside database transaction.'
                );
            }

            $accessId = $entity->getAccessId();
            if (null === $accessId) {
                $unitOfWork->scheduleExtraUpdate($entity, [
                    'accessId' => [null, $entity->getId()]
                ]);
                $entity->setAccessId($entity->getId());
            }
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
}
