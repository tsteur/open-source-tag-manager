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

namespace SevenTag\Api\TestBundle\Tests\TestCase;

use Doctrine\Common\Persistence\Mapping\Driver\SymfonyFileLocator;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\Driver\YamlDriver;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bridge\Doctrine\Test\DoctrineTestHelper;

abstract class RepositoryYamlTestCase extends \PHPUnit_Framework_TestCase
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    public function setUp()
    {
        $fileLocator = new SymfonyFileLocator($this->getMetadataMapping(), '.orm.yml');
        $metadataDriver = new YamlDriver($fileLocator);

        $this->entityManager = DoctrineTestHelper::createTestEntityManager();

        $this->entityManager
            ->getConfiguration()
            ->setMetadataDriverImpl($metadataDriver);

        $this->entityManager
            ->getConfiguration()
            ->setEntityNamespaces($this->getEntityNamespace());
    }

    /**
     * @return array
     */
    abstract protected function getEntityNamespace();

    /**
     * @return array
     */
    protected function getMetadataMapping()
    {
        return [
            __DIR__ . '/../../../AppBundle/Resources/config/doctrine' => 'SevenTag\Api\AppBundle\Entity',
            __DIR__ . '/../../../ContainerBundle/Resources/config/doctrine' => 'SevenTag\Api\ContainerBundle\Entity',
            __DIR__ . '/../../../SecurityBundle/Resources/config/doctrine' => 'SevenTag\Api\SecurityBundle\Entity',
            __DIR__ . '/../../../TagBundle/Resources/config/doctrine' => 'SevenTag\Api\TagBundle\Entity',
            __DIR__ . '/../../../TriggerBundle/Resources/config/doctrine' => 'SevenTag\Api\TriggerBundle\Entity',
            __DIR__ . '/../../../UserBundle/Resources/config/doctrine' => 'SevenTag\Api\UserBundle\Entity',
            __DIR__ . '/../../../VariableBundle/Resources/config/doctrine' => 'SevenTag\Api\VariableBundle\Entity'
        ];
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param array $expectedParts
     */
    protected function assertQuerySelectParts(QueryBuilder $queryBuilder, array $expectedParts = [])
    {
        $this->assertQueryParts($queryBuilder->getDQLPart('select'), $expectedParts);
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param array $expectedParts
     */
    protected function assertQueryOrderByParts(QueryBuilder $queryBuilder, array $expectedParts = [])
    {
        $this->assertQueryParts($queryBuilder->getDQLPart('orderBy'), $expectedParts);
    }

    /**
     * @param QueryBuilder $queryBuilder
     * @param array $expectedParts
     */
    protected function assertQueryWhereParts(QueryBuilder $queryBuilder, array $expectedParts = [])
    {
        $whereParts = $queryBuilder->getDQLPart('where');

        $partsCount = count($expectedParts);
        if ($partsCount < 1) {
            $this->assertNull($whereParts);

            return;
        }

        $this->assertQueryParts($whereParts, $expectedParts);
    }

    /**
     * @param array $actualParts
     * @param array $expectedParts
     */
    protected function assertQueryParts(array $actualParts, array $expectedParts = [])
    {
        $partsCount = count($expectedParts);

        $this->assertCount($partsCount, $actualParts);

        for ($i = 0; $i < $partsCount; $i++) {
            $this->assertEquals($expectedParts[$i], (string)$actualParts[$i]);
        }
    }
}
