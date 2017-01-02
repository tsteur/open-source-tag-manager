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

namespace SevenTag\Component\Model\Repository;

use Doctrine\ORM\EntityRepository as BaseRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\QueryBuilder;
use SevenTag\Api\UserBundle\Entity\User;

abstract class EntityRepository extends BaseRepository implements RepositoryInterface
{
    /**
     * {@inheritdoc}
     */
    public function getClass()
    {
        return $this->getClassName();
    }

    /**
     * {@inheritdoc}
     */
    public function countAll()
    {
        return (int) $this->createQueryBuilder('c')
            ->select('COUNT(c.id)')
            ->getQuery()
            ->getSingleScalarResult();
    }

    /**
     * {@inheritdoc}
     */
    public function create()
    {
        $className = $this->getClass();

        return new $className();
    }

    /**
     * {@inheritdoc}
     */
    public function save($object, $andFlush = true)
    {
        $this->validateObject($object);

        $entityMangager = $this->getEntityManager();
        $entityMangager->persist($object);

        if ($andFlush) {
            $entityMangager->flush();
        }

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function delete($object, $andFlush = true)
    {
        $this->validateObject($object);

        $entityMangager = $this->getEntityManager();
        $entityMangager->remove($object);

        if ($andFlush) {
            $entityMangager->flush();
        }

        return $this;
    }

    /**
     * @param $object
     * @return void
     */
    private function validateObject($object)
    {
        $className = $this->getClass();
        if (!$object instanceof $className) {
            throw new \InvalidArgumentException(
                sprintf(
                    'Object must be instance of "%s". "%s" given.',
                    $className,
                    get_class($object)
                )
            );
        }
    }

    /**
     * @param int $limit
     * @param int $offset
     * @param QueryBuilder $queryBuilder
     * @return QueryBuilder
     */
    public function getWithLimitAndOffsetQueryBuilder($limit = 20, $offset = 0, QueryBuilder $queryBuilder = null)
    {
        if (is_null($queryBuilder)) {
            $queryBuilder = $this->createQueryBuilder('root');
        }

        $queryBuilder
            ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $queryBuilder;
    }

    /**
     * Apply pagination to query builder
     *
     * @param QueryBuilder $queryBuilder
     * @param integer $limit
     * @param integer $offset
     *
     * @return QueryBuilder
     */
    protected function applyPagination(QueryBuilder $queryBuilder, $limit, $offset)
    {
        return $queryBuilder
            ->setMaxResults($limit)
            ->setFirstResult($offset);
    }

    /**
     * @param User $user
     * @param QueryBuilder $queryBuilder
     */
    protected function applyAclSubquery(User $user, QueryBuilder $queryBuilder)
    {
        if (!$user->isSuperAdmin()) {
            $queryBuilder
                ->andWhere(
                    'c.accessId IN (
                SELECT cp.containerAccessId
                FROM SevenTag\Api\ContainerBundle\Entity\ContainerPermission cp
                WHERE cp.containerAccessId = c.accessId
                AND cp.user = :user
                AND cp.permissions > 0
                GROUP BY cp.containerAccessId
                )'
                );
            $queryBuilder->setParameter('user', $user);
        }
    }
}
