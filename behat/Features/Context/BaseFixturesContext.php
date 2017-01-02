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

namespace Features\Context;

use Doctrine\Common\DataFixtures\Executor\ORMExecutor;
use Doctrine\Common\DataFixtures\Purger\ORMPurger;
use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\Tools\SchemaTool;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Symfony\Bridge\Doctrine\DataFixtures\ContainerAwareLoader as DataFixturesLoader;

/**
 * Class BaseFixturesContext
 * @package Features\Context\Fixtures
 */
abstract class BaseFixturesContext extends BaseContext
{
    /**
     * @param array $classNames
     * @param bool $append
     * @param int $purgeMode
     */
    protected function loadFixturesClass(
        array $classNames,
        $append = false,
        $purgeMode = ORMPurger::PURGE_MODE_DELETE
    ) {
        $entityManager = $this->getEntityManager();

        $loader = new DataFixturesLoader($this->getContainer());
        foreach($classNames as $className) {

            $fixture = new $className();
            if ($loader->hasFixture($fixture)) {
                unset($fixture);
                return;
            }

            $loader->addFixture($fixture);
        }

        $purger = new ORMPurger($entityManager);
        $purger->setPurgeMode($purgeMode);
        $executor = new ORMExecutor($entityManager, $purger);
        $executor->execute($loader->getFixtures(), $append);
    }

    /**
     * @return \Doctrine\ORM\EntityManager
     */
    protected function getEntityManager()
    {
        return $this
            ->getContainer()
            ->get('doctrine.orm.entity_manager');
    }

    /**
     * Drop and create database.
     *
     * @return self
     */
    protected function dropAndCreateDatabase()
    {
        $connection = $this
            ->getEntityManager()
            ->getConnection();

        $params = $connection->getParams();
        if (isset($params['master'])) {
            $params = $params['master'];
        }

        $name = isset($params['path']) ? $params['path'] : (isset($params['dbname']) ? $params['dbname'] : false);
        if (!$name) {
            throw new \InvalidArgumentException(
                "Connection does not contain a 'path' or 'dbname' parameter and cannot be dropped."
            );
        }
        unset($params['dbname']);

        $tmpConnection = DriverManager::getConnection($params);

        // Only quote if we don't have a path
        if (!isset($params['path'])) {
            $name = $tmpConnection->getDatabasePlatform()->quoteSingleIdentifier($name);
        }

        $tmpConnection->getSchemaManager()->dropAndCreateDatabase($name);
        $tmpConnection->close();

        return $this;
    }

    /**
     * Create ORM schema.
     *
     * @return self
     */
    protected function createSchema()
    {
        $entityManager = $this->getEntityManager();

        $tool = new SchemaTool($entityManager);
        $tool->createSchema(
            $entityManager
                ->getMetadataFactory()
                ->getAllMetadata()
        );

        return $this;
    }

    /**
     * @BeforeScenario
     */
    public function prepareORM(BeforeScenarioScope $scope)
    {
        $this->dropAndCreateDatabase()
            ->createSchema()
            ->loadFixtures();
    }

    /**
     * @return self
     */
    protected function loadFixtures()
    {
        return $this;
    }
}