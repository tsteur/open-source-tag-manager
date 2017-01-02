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

namespace SevenTag\Api\VariableBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\QueryBuilder;
use SevenTag\Api\AppBundle\Versionable\VersionableRepositoryInterface;
use SevenTag\Api\UserBundle\Entity\User;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Model\Repository\EntityRepository as BaseEntityRepository;

class VariableRepository extends BaseEntityRepository implements VersionableRepositoryInterface
{
    /**
     * @param bool $draft
     * @return \Doctrine\ORM\QueryBuilder
     */
    protected function getBaseQuery($draft = true)
    {
        $queryBuilder = $this->createQueryBuilder('va')
            ->join('va.version', 'v')
            ->andWhere('v.draft = :draft')
            ->setParameter('draft', $draft);

        return $queryBuilder;
    }

    /**
     * @param array $parameters
     * @return mixed
     */
    public function findByNameAmongDrafts($parameters)
    {
        return $this->getBaseQuery(true)
            ->andWhere('va.name = :name')
            ->andWhere('va.container = :container')
            ->setParameter('name', $parameters['name'])
            ->setParameter('container', $parameters['container'])
            ->getQuery()
            ->execute();
    }

    /**
     * @param ContainerInterface $container
     * @param int $limit
     * @param int $offset
     * @param boolean $draft
     *
     * @return ArrayCollection<SevenTag\Api\VariableBundle\Entity\Variable>
     */
    public function findByContainerWithLimitAndOffset(ContainerInterface $container, $limit = 20, $offset = 0, $draft = true)
    {
        $queryBuilder = $this->getWithLimitAndOffsetQueryBuilder($limit, $offset, $this->getBaseQuery($draft));
        $aliases = $queryBuilder->getRootAliases();

        return $queryBuilder
            ->andWhere(sprintf('%s.container = :container', $aliases[0]))
            ->setParameter('container', $container)
            ->addOrderBy(sprintf('%s.updatedAt', $aliases[0]), 'DESC')
            ->addOrderBy(sprintf('%s.id', $aliases[0]), 'DESC')
            ->getQuery()
            ->execute();
    }

    /**
     * @param ContainerInterface $container
     * @param bool $draft
     *
     * @return ArrayCollection<SevenTag\Api\VariableBundle\Entity\Variable>
     */
    public function findByContainer(ContainerInterface $container, $draft = true)
    {
        return $this->getBaseQuery($draft)
            ->andWhere('va.container = :container')
            ->setParameter('container', $container)
            ->getQuery()
            ->execute();
    }

    /**
     * @param ContainerInterface $container
     * @return int
     */
    public function countByContainer(ContainerInterface $container)
    {
        return (int)$this->getBaseQuery(true)
            ->select('COUNT(va.id)')
            ->andWhere('va.container = :container')
            ->setParameter('container', $container)
            ->getQuery()
            ->getSingleScalarResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findByAccessId($accessId, $draft = true)
    {
        return $this->getBaseQuery($draft)
            ->andWhere('va.accessId = :accessId')
            ->setParameter('accessId', $accessId)
            ->orderBy('va.id', 'DESC')
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * {@inheritdoc}
     */
    protected function applyAclSubquery(User $user, QueryBuilder $queryBuilder)
    {
        $queryBuilder->join('va.container', 'c');

        parent::applyAclSubquery($user, $queryBuilder);
    }
}
