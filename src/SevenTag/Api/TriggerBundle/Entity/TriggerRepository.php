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
use Doctrine\DBAL\Connection;
use Doctrine\ORM\QueryBuilder;
use SevenTag\Api\AppBundle\Versionable\VersionableRepositoryInterface;
use SevenTag\Component\Container\Model\Container;
use SevenTag\Component\Model\Repository\EntityRepository;

class TriggerRepository extends EntityRepository implements VersionableRepositoryInterface
{
    /**
     * @param bool $draft
     * @return \Doctrine\ORM\QueryBuilder
     */
    protected function getBaseQuery($draft = true)
    {
        $queryBuilder = $this->createQueryBuilder('t')
            ->join('t.version', 'v')
            ->andWhere('v.draft = :draft')
            ->setParameter('draft', $draft);

        return $queryBuilder;
    }

    /**
     * @param Container $container
     * @param integer $limit
     * @param integer $offset
     * @param array $excludeTriggers
     *
     * @return ArrayCollection
     */
    public function findByContainer(Container $container, $limit = 20, $offset = 0, array $excludeTriggers = [], array $types = [])
    {
        $queryBuilder = $this->getBaseQuery(true)
            ->select('t')
            ->andWhere('t.container = :container')
            ->setParameter('container', $container->getId());

        if (!empty($excludeTriggers)) {
            $queryBuilder->andWhere($queryBuilder->expr()->notIn('t.accessId', ':exclude'));

            $queryBuilder->setParameter('exclude', $excludeTriggers, Connection::PARAM_INT_ARRAY);
        }

        if (!empty($types)) {
            $queryBuilder->andWhere($queryBuilder->expr()->in('t.type', ':types'));

            $queryBuilder->setParameter('types', $types, Connection::PARAM_INT_ARRAY);
        }

        return $this
            ->applyPagination($queryBuilder, $limit, $offset)
            ->addOrderBy('t.updatedAt', 'DESC')
            ->addOrderBy('t.id', 'DESC')
            ->getQuery()
            ->execute();
    }

    /**
     * @param Container $container
     * @param array $excludeTriggers
     *
     * @return int
     */
    public function countByContainer(Container $container, array $excludeTriggers = [], array $types = [])
    {
        $queryBuilder = $this->getBaseQuery(true)
            ->select('count(t.id)')
            ->andWhere('t.container = :container')
            ->setParameter('container', $container->getId());

        if (!empty($excludeTriggers)) {
            $queryBuilder->andWhere($queryBuilder->expr()->notIn('t.accessId', ':exclude'));

            $queryBuilder->setParameter('exclude', $excludeTriggers, Connection::PARAM_INT_ARRAY);
        }

        if (!empty($types)) {
            $queryBuilder->andWhere($queryBuilder->expr()->in('t.type', ':types'));

            $queryBuilder->setParameter('types', $types, Connection::PARAM_INT_ARRAY);
        }

        return (int) $queryBuilder
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

    /**
     * @param array $parameters
     * @return mixed
     */
    public function findByNameAmongDrafts($parameters)
    {
        return $this->getBaseQuery(true)
            ->andWhere('t.name = :name')
            ->andWhere('t.container = :container')
            ->setParameter('name', $parameters['name'])
            ->setParameter('container', $parameters['container'])
            ->getQuery()
            ->execute();
    }
}
