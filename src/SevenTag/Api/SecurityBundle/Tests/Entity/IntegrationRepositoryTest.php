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

namespace SevenTag\Api\SecurityBundle\Tests\Entity;

use SevenTag\Api\SecurityBundle\Entity\IntegrationRepository;
use SevenTag\Api\TestBundle\Tests\TestCase\RepositoryYamlTestCase;

class IntegrationRepositoryTest extends RepositoryYamlTestCase
{
    /**
     * @var IntegrationRepository
     */
    protected $repository;

    /**
     * @test
     */
    public function itShouldFindRecordsOfIntegrationsIncludedLimitAndOffset()
    {
        $queryBuilder = $this->repository
            ->findWithLimitAndOffsetQueryBuilder(20, 0);

        $this->assertQuerySelectParts($queryBuilder, ['i']);
        $this->assertQueryWhereParts($queryBuilder, []);
        $this->assertQueryOrderByParts($queryBuilder, ['i.updatedAt DESC', 'i.id DESC']);

        $this->assertEquals(
            'SELECT i FROM SevenTag\Api\SecurityBundle\Entity\Integration i ORDER BY i.updatedAt DESC, i.id DESC',
            $queryBuilder->getQuery()->getDQL()
        );
    }

    public function setUp()
    {
        parent::setUp();

        $this->repository = $this->entityManager->getRepository('SevenTagSecurityBundle:Integration');
    }

    /**
     * @return array
     */
    protected function getEntityNamespace()
    {
        return [
            'SevenTagSecurityBundle' => 'SevenTag\Api\SecurityBundle\Entity'
        ];
    }
}
