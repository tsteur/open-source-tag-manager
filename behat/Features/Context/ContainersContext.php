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

use Behat\Gherkin\Node\TableNode;

/**
 * Class ContainersContext
 * @package Features\Context
 */
class ContainersContext extends BaseContext
{
    /**
     * @When I am on container list resource
     */
    public function iAmOnContainerListResource()
    {
        $client = $this->getClient();
        $client->request('GET', '/api/containers');
    }

    /**
     * @When I filter container list by name :name
     */
    public function iFilterContainerListByName($name)
    {
        $client = $this->getClient();
        $client->request('GET', '/api/containers?name=' . $name);
    }

    /**
     * @When I get container :id
     */
    public function iAttemptToGetContainer($id)
    {
        $client = $this->getClient();
        $client->request('GET', sprintf('/api/containers/%s', $id));
    }

    /**
     * @When I create container with data
     */
    public function iAttemptToCreateContainerWithData(TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            '/api/containers',
            array('name' => $table->getRow(1)[0])
        );
    }

    /**
     * @When /I update "([^"]*)" container with data$/
     */
    public function iAttemptToUpdateContainerWithData($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'PUT',
            sprintf('/api/containers/%s', $id),
            array('name' => $table->getRow(1)[0])
        );
    }

    /**
     * @When I add tag to container :id
     */
    public function iAttemptToAddTagToContainer($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/tags', $id),
            array('name' => $table->getRow(1)[0], 'code' => $table->getRow(1)[1])
        );
    }

    /**
     * @Then response should contains valid containers list
     */
    public function responseShouldContainContainersList()
    {
        $data = $this->getJsonResponseContent();

        foreach ($data['data'] as $container) {
            $this->assertContainersWithCustomFieldsTypes($container);
        }
    }

    /**
     * @Then response should contains valid container object
     */
    public function responseShouldContainerObject()
    {
        $data = $this->getJsonResponseContent();

        $this->assertContainerWithCustomFieldsTypes($data['data']);
    }

    /**
     * @Then response should contains valid container
     */
    public function responseShouldContainerList()
    {
        $data = $this->getJsonResponseContent();

        $this->assertContainerTypes($data['data']);
    }

    /**
     * @When I delete container :id
     */
    public function iAttemptToDeleteContainer($id)
    {
        $client = $this->getClient();

        $client->request(
            'DELETE',
            sprintf('/api/containers/%s', $id)
        );
    }

    /**
     * @When I get tags related to container :id
     */
    public function iAttemptToGetTagsRelatedToContainer($id)
    {
        $client = $this->getClient();

        $client->request('GET', sprintf('/api/containers/%s/tags', $id));
    }

    /**
     * @When I update :id container permissions
     */
    public function iUpdateContainerPermissions($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'PUT',
            sprintf('/api/containers/%s/permissions', $id),
            array(
                'user' => $table->getRow(1)[0],
                'permissions' => $table->getRow(1)[1]
            )

        );
    }

    /**
     * @When I get :id container permissions
     */
    public function iGetContainerPermissions($id)
    {
        $client = $this->getClient();

        $client->request(
            'GET',
            sprintf('/api/containers/%s/permissions', $id)
        );
    }

    /**
     * @When I add websites to container :arg1
     */
    public function iAddWebsitesToContainer($id, TableNode $table)
    {
        $client = $this->getClient();
        $containerWebsites = [];

        foreach ($table->getColumnsHash() as $row) {
            if (count($row) === 3) {
                $containerWebsites[] = [
                    'id' => $row['id'],
                    'url' => $row['url'],
                    'parameter_type' => $row['parameter_type'],
                ];
            } else if (count($row) === 2) {
                $containerWebsites[] = [
                    'url' => $row['url'],
                    'parameterType' => $row['parameter_type'],
                ];
            } else {
                $containerWebsites[] = [
                    'url' => $row[0],
                ];
            }
        }

        $client->request(
            'PUT',
            sprintf('/api/containers/%s/websites', $id),
            [
                'websites' => $containerWebsites,
            ]
        );
    }

    /**
     * @Then response should contains container with added websites
     */
    public function responseShouldContainsContainerWithAddedWebsites(TableNode $table)
    {
        $expectedContainers = [];
        $response = $this->getJsonResponseContent();
        $this->assertResponseStatusCode(200);
        $this->assertResponseContainsJson($response);
        $containerWebsites = $response['data']['websites'];

        foreach ($table->getColumnsHash() as $row) {
            $expectedContainers[] = [
                'id' => (int)$row['id'],
                'url' => $row['url'],
                'parameter_type' => (int)$row['parameter_type']
            ];
        }

        \PHPUnit_Framework_Assert::assertEquals($containerWebsites, $expectedContainers);
    }

    protected function assertListContainerTypes(array $tag)
    {
        $this->assertContainerTypes($tag, true);
    }

    /**
     * @param array $container
     */
    protected function assertContainerWithCustomFieldsTypes(array $container)
    {
        $this->assertContainerTypes($container, false, [
            'has_unpublished_changes',
            'published_at'
        ]);
    }

    /**
     * @param array $container
     */
    protected function assertContainersWithCustomFieldsTypes(array $container)
    {
        $this->assertContainerTypes($container, true, [
            'has_unpublished_changes',
            'published_at'
        ]);
    }

    /**
     * @param array $container
     * @param bool $list
     * @param array $aditionalFields
     */
    protected function assertContainerTypes(array $container, $list = false, array $aditionalFields = [])
    {
        $fields = array_keys($container);
        sort($fields);

        $requiredFields = ['id', 'name', 'description', 'created_at', 'updated_at', 'permissions', 'websites'];

        if ($list === true) {
            \PHPUnit_Framework_Assert::assertNotContains(
                'triggers',
                $fields,
                "List resource should not contains embedded lists"
            );
        } else {
            $requiredFields[] = 'triggers';
            $requiredFields[] = 'tags';
            $requiredFields[] = 'version';
            $requiredFields[] = 'code';
            $requiredFields[] = 'code_synchronous';
            $requiredFields[] = 'delay';

            \PHPUnit_Framework_Assert::assertInternalType('string', $container['code']);
        }

        if (count($aditionalFields)) {
            $requiredFields = array_merge($requiredFields, $aditionalFields);
        }

        sort($requiredFields);

        \PHPUnit_Framework_Assert::assertEquals($requiredFields, $fields);

        \PHPUnit_Framework_Assert::assertInternalType('int', $container['id']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $container['name']);
        \PHPUnit_Framework_Assert::assertTrue(
            is_null($container['description']) || is_string($container['description'])
        );
        \PHPUnit_Framework_Assert::assertInternalType('string', $container['created_at']);
        \PHPUnit_Framework_Assert::assertTrue(
            is_null($container['updated_at']) || is_string($container['updated_at'])
        );
        \PHPUnit_Framework_Assert::assertInternalType('array', $container['permissions']);
        \PHPUnit_Framework_Assert::assertInternalType('array', $container['websites']);
    }
}
