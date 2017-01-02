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

namespace SevenTag\Api\TriggerBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use SevenTag\Api\AppBundle\Versionable\VersionableRepositoryInterface;
use SevenTag\Component\Model\Repository\EntityRepository;

class ConditionRepository extends EntityRepository implements VersionableRepositoryInterface
{
    /**
     * @param bool $draft
     * @return \Doctrine\ORM\QueryBuilder
     */
    protected function getBaseQuery($draft = true)
    {
        $queryBuilder = $this->createQueryBuilder('c')
            ->join('c.version', 'v')
            ->andWhere('v.draft = :draft')
            ->setParameter('draft', $draft);

        return $queryBuilder;
    }

    /**
     * @param Trigger $trigger
     * @param integer $limit
     * @param integer $offset
     *
     * @return ArrayCollection
     */
    public function findByTrigger(Trigger $trigger, $limit = 20, $offset = 0)
    {
        $queryBuilder = $this->getBaseQuery(true)
            ->andWhere('c.trigger = :trigger')
            ->setParameter('trigger', $trigger->getId());

        return $this
            ->applyPagination($queryBuilder, $limit, $offset)
            ->getQuery()
            ->execute();
    }

    /**
     * @param Trigger $trigger
     *
     * @return int
     */
    public function countByTrigger(Trigger $trigger)
    {
        return (int) $this->getBaseQuery(true)
            ->select('count(c.id)')
            ->andWhere('c.trigger = :trigger')
            ->setParameter('trigger', $trigger->getId())
            ->getQuery()
            ->getSingleScalarResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findByAccessId($accessId, $draft = true)
    {
        return $this->getBaseQuery($draft)
            ->andWhere('t.accessId = :accessId')
            ->setParameter('accessId', $accessId)
            ->orderBy('t.id', 'DESC')
            ->getQuery()
            ->getOneOrNullResult();
    }
}
