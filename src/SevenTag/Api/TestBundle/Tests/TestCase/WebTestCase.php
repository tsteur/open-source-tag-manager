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

use SevenTag\Api\SecurityBundle\DataFixtures\ORM\ClientFixture;
use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\SchemaTool;
use Liip\FunctionalTestBundle\Test\WebTestCase as BaseWebTestCase;

/**
 * Class DoctrineORMTestCase
 * @package SevenTag\Api\TestBundle\Tests\TestCase
 */
abstract class WebTestCase extends BaseWebTestCase
{
    /**
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * {@inheritDoc}
     */
    public function setUp()
    {
        parent::setUp();

        $this->setUpORM();
    }

    /**
     * {@inheritDoc}
     */
    protected function tearDown()
    {
        $this->entityManager->close();

        parent::tearDown();
    }

    /**
     * Create ORM schema.
     */
    private function createSchema()
    {
        $tool = new SchemaTool($this->entityManager);
        $tool->createSchema(
            $this->entityManager
                ->getMetadataFactory()
                ->getAllMetadata()
        );

        return $this;
    }

    /**
     * @return self
     */
    private function setUpORM()
    {
        $this->prepareEntityManager()
            ->dropAndCreateDatabase()
            ->createSchema();

        return $this;
    }

    /**
     * @return self
     */
    private function prepareEntityManager()
    {
        $this->entityManager = $this
            ->getContainer()
            ->get('doctrine.orm.entity_manager');

        return $this;
    }

    /**
     * Drop and create database.
     */
    private function dropAndCreateDatabase()
    {
        $connection = $this
            ->entityManager
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
     * @param string $username
     * @param string $password
     * @return \Symfony\Bundle\FrameworkBundle\Client
     */
    protected function createOAuth2Client($username, $password = 'testing')
    {
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/oauth/v2/token',
            [
                'client_id' => sprintf('1_%s', ClientFixture::RANDOM_ID),
                'client_secret' => ClientFixture::SECRET,
                'grant_type' => 'password',
                'username' => $username,
                'password' => $password,
            ]
        );

        $response = $client->getResponse();

        $this->assertTrue(
            $response->isSuccessful(),
            'Response should return successful status.'
        );

        $content = $response->getContent();

        $this->assertJson(
            $content,
            'Response should be valid JSON.'
        );

        $data = json_decode($content, true);

        $this->assertArrayHasKey(
            'access_token',
            $data,
            'Response should contain access token.'
        );

        $client = static::createClient();
        $client->setServerParameter('HTTP_Authorization', sprintf('Bearer %s', $data['access_token']));

        return $client;
    }
}
