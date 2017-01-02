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

namespace SevenTag\Api\AppBundle\Entity;

use Doctrine\ORM\EntityRepository;
use SevenTag\Component\Container\Model\ContainerInterface;

/**
 * Class VersionRepository
 * @package SevenTag\Api\AppBundle\Entity
 */
class VersionRepository extends EntityRepository
{
    /**
     * @param ContainerInterface $container
     * @param int $status
     */
    public function updateContainerDrafts(ContainerInterface $container, $status = 0)
    {
        $this->createQueryBuilder('v')
            ->update()
            ->set('v.draft', $status)
            ->where(
                'v.id IN (SELECT IDENTITY(c.version) FROM SevenTag\Api\ContainerBundle\Entity\Container c WHERE c.accessId = :accessId)'
            )
            ->andWhere('v.draft = 1')
            ->setParameter('accessId', $container->getAccessId())
            ->getQuery()
            ->execute();
    }

    /**
     * @param ContainerInterface $container
     * @param int $status
     */
    public function updateContainerPublished(ContainerInterface $container, $status = 0)
    {
        $this->createQueryBuilder('v')
            ->update()
            ->set('v.published', $status)
            ->where(
                'v.id IN (SELECT IDENTITY(c.version) FROM SevenTag\Api\ContainerBundle\Entity\Container c WHERE c.accessId = :accessId)'
            )
            ->andWhere('v.published = 1')
            ->setParameter('accessId', $container->getAccessId())
            ->getQuery()
            ->execute();
    }
}
