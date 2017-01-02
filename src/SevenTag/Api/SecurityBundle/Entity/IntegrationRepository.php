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

namespace SevenTag\Api\SecurityBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use SevenTag\Component\Model\Repository\EntityRepository;

/**
 * Class IntegrationRepository
 * @package SevenTag\Api\SecurityBundle\Entity
 */
class IntegrationRepository extends EntityRepository
{
    /**
     * @return \Doctrine\ORM\QueryBuilder
     */
    protected function getBaseQuery()
    {
        return $this->createQueryBuilder('i');
    }

    /**
     * @param int $limit
     * @param int $offset
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function findWithLimitAndOffsetQueryBuilder($limit = 20, $offset = 0)
    {
        $queryBuilder = $this->getWithLimitAndOffsetQueryBuilder($limit, $offset, $this->getBaseQuery());
        $aliases = $queryBuilder->getRootAliases();

        return $queryBuilder
            ->addOrderBy(sprintf('%s.updatedAt', $aliases[0]), 'DESC')
            ->addOrderBy(sprintf('%s.id', $aliases[0]), 'DESC');
    }

    /**
     * @param int $limit
     * @param int $offset
     * @return ArrayCollection<SevenTag\Component\Integration\Model\IntegrationInterface>
     */
    public function findWithLimitAndOffset($limit = 20, $offset = 0)
    {
        return $this
            ->findWithLimitAndOffsetQueryBuilder($limit, $offset)
            ->getQuery()
            ->execute();
    }
}
