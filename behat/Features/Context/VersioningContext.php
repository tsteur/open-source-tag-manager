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

class VersioningContext extends BaseContext
{
    /**
     * @When I publish container :id
     *
     * @param integer $id
     */
    public function iPublishContainer($id)
    {
        $client = $this->getClient();
        $client->request('POST', sprintf('/api/containers/%d/version-publish', $id));
    }

    /**
     * @When I restore container :id
     *
     * @param integer $id
     */
    public function iRestoreContainer($id)
    {
        $client = $this->getClient();
        $client->request('POST', sprintf('/api/containers/%d/version-restore', $id));
    }

    /**
     * @Then container :id is published
     *
     * @param integer $id
     */
    public function containerIsPublished($id)
    {
        $client = $this->getClient();
        $client->request('GET', sprintf('/api/containers/%d/version-published', $id));

        $this->assertContainerPublished($this->getJsonResponseContent()['data']);
    }

    /**
     * @Then container :containerId version id is :versionId
     *
     * @param integer $containerId
     * @param integer $versionId
     */
    public function containerVersionIdIs($containerId, $versionId)
    {
        $client = $this->getClient();
        $client->request('GET', sprintf('/api/containers/%d', $containerId));

        \PHPUnit_Framework_Assert::assertEquals($versionId, $this->getJsonResponseContent()['data']['version']['id']);
    }

    /**
     * @When I change container :id name to :name
     *
     * @param integer $id
     * @param string $name
     */
    public function changeContainerNameTo($id, $name)
    {
        $client = $this->getClient();
        $address = sprintf('/api/containers/%d', $id);
        $client->request('GET', $address);

        $container = $this->getJsonResponseContent()['data'];
        $changedContainer = [
            'name' => $name,
            'description' => $container['description']
        ];

        $client->request('PUT', $address, $changedContainer);
    }

    /**
     * @Then container :id name should be :name
     *
     * @param integer $id
     * @param string $name
     */
    public function containerNameShouldBe($id, $name)
    {
        $client = $this->getClient();
        $client->request('GET', sprintf('/api/containers/%d', $id));

        $container = $this->getJsonResponseContent()['data'];
        \PHPUnit_Framework_Assert::assertEquals($name, $container['name']);
    }

    /**
     * @When I change tags to
     *
     * @param TableNode $table
     */
    public function iChangeTagsTo(TableNode $table)
    {
        $client = $this->getClient();

        foreach ($table->getRows() as $row) {
            $tag = [
                'name' => $row[1],
                'code' => $row[2],
                'triggers' => []
            ];

            $client->request('PUT', sprintf('/api/tags/%d', $row[0]), $tag);
            $this->assertResponseStatusCode(200);
        }
    }

    /**
     * @When tags should look like
     *
     * @param TableNode $table
     */
    public function tagsShouldLookLike(TableNode $table)
    {
        $client = $this->getClient();

        foreach ($table->getRows() as $row) {
            $client->request('GET', sprintf('/api/tags/%d', $row[0]));
            $tag = $this->getJsonResponseContent()['data'];

            \PHPUnit_Framework_Assert::assertEquals($row[1], $tag['name']);
            \PHPUnit_Framework_Assert::assertEquals($row[2], $tag['code']);
        }
    }

    /**
     * @Then I change triggers to
     *
     * @param TableNode $table
     */
    public function iChangeTriggersTo(TableNode $table)
    {
        foreach ($table->getRows() as $row) {
            $this->updateTrigger($row[0], $row[1], $row[2]);
        }
    }

    /**
     * @Then triggers should look like
     *
     * @param TableNode $table
     */
    public function triggersShouldLookLike(TableNode $table)
    {
        $client = $this->getClient();

        foreach ($table->getRows() as $row) {
            $client->request('GET', sprintf('/api/triggers/%d', $row[0]));
            $trigger = $this->getJsonResponseContent()['data'];

            \PHPUnit_Framework_Assert::assertEquals($row[1], $trigger['name']);
            \PHPUnit_Framework_Assert::assertEquals($row[2], $trigger['type']);
        }
    }

    /**
     * @When I change trigger :id conditions to
     */
    public function iChangeTriggerConditionsTo($id, TableNode $table)
    {
        $client = $this->getClient();
        $address = sprintf('/api/triggers/%d', $id);
        $client->request('GET', $address);
        $trigger = $this->getJsonResponseContent()['data'];
        $conditions = [];

        foreach ($table->getRows() as $condition) {
            $conditions[] = [
                'variable' => $condition[0],
                'condition' => $condition[1],
                'value' => $condition[2]
            ];
        }

        $changedTrigger = [
            'name' => $trigger['name'],
            'type' => $trigger['type'],
            'conditions' => $conditions
        ];

        $client->request('PUT', $address, $changedTrigger);
        $this->assertResponseStatusCode(200);
    }

    /**
     * @Then trigger :id conditions should look like
     *
     * @param integer $id
     * @param TableNode $table
     */
    public function triggerConditionsShouldLookLike($id, TableNode $table)
    {
        $client = $this->getClient();
        $client->request('GET', sprintf('/api/triggers/%d', $id));
        $conditions = $this->getJsonResponseContent()['data']['conditions'];

        foreach ($table->getRows() as $index => $condition) {
            \PHPUnit_Framework_Assert::assertEquals($condition[0], $conditions[$index]['variable']);
            \PHPUnit_Framework_Assert::assertEquals($condition[1], $conditions[$index]['condition']);
            \PHPUnit_Framework_Assert::assertEquals($condition[2], $conditions[$index]['value']);
        }
    }

    /**
     * @param integer $id
     * @param string $name
     * @param integer $type
     */
    private function updateTrigger($id, $name, $type, $conditions = 0)
    {
        $client = $this->getClient();
        $address = sprintf('/api/triggers/%d', $id);
        $client->request('GET', $address);

        $newConditions = [];

        for ($i = 0; $i <= $conditions; $i++) {
            $newConditions[] = [
                'variable' => 'variable' . $i,
                'condition' => 'condition' . $i,
                'value' => 'value' . $i
            ];
        }

        $trigger = $this->getJsonResponseContent()['data'];
        $changedTrigger = [
            'name' => $trigger['name'],
            'type' => $trigger['type'],
            'conditions' => $newConditions
        ];

        $changedTrigger['name'] = $name;
        $changedTrigger['type'] = $type;

        $client->request('PUT', $address, $changedTrigger);
        $this->assertResponseStatusCode(200);
    }

    /**
     * @param array $container
     */
    protected function assertContainer(array $container)
    {
        $requiredFields = ['id', 'name', 'description', 'code', 'created_at', 'updated_at'];

        foreach ($requiredFields as $field) {
            \PHPUnit_Framework_Assert::assertArrayHasKey($field, $container);
        }

        \PHPUnit_Framework_Assert::assertInternalType('int', $container['id']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $container['name']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $container['description']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $container['code']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $container['created_at']);

        if (!is_null($container['updated_at'])) {
            \PHPUnit_Framework_Assert::assertInternalType('string', $container['updated_at']);
        }
    }

    /**
     * @param array $container
     */
    protected function assertContainerPublished(array $container)
    {
        $client = $this->getClient();
        $client->request('GET', sprintf('/api/containers/%d/version-published', $container['id']));
        $this->assertContainer($this->getJsonResponseContent()['data']);
    }
}
