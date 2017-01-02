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
use SevenTag\Api\TriggerBundle\Entity\Condition;

/**
 * Class TriggersContext
 * @package Features\Context
 */
class TriggersContext extends BaseContext
{
    /**
     * @var int
     */
    protected $preparedId;

    /**
     * @var string
     */
    protected $preparedName;

    /**
     * @var int
     */
    protected $preparedType;

    /**
     * @var array
     */
    protected $preparedConditions = array();

    /**
     * @When I get triggers related to container :id
     */
    public function iGetTriggersRelatedToContainer($id)
    {
        $client = $this->getClient();

        $client->request('GET', sprintf('/api/containers/%s/triggers', $id));
    }

    /**
     * @Then response should contains valid triggers list
     */
    public function responseShouldContainsValidTriggersList()
    {
        $data = $this->getJsonResponseContent();

        foreach ($data['data'] as $trigger) {
            $this->assertListTriggerTypes($trigger);
        }
    }

    protected function assertListTriggerTypes(array $trigger)
    {
        $this->assertTriggerTypes($trigger, true);
    }

    /**
     * @param array $trigger
     */
    protected function assertTriggerTypes(array $trigger, $list = false)
    {
        $fields = array_keys($trigger);
        sort($fields);

        $requiredFields = array(
            'id',
            'name',
            'strategy',
            'type',
            'created_at',
            'updated_at',
            'container',
            'tags_count',
            'is_added_to_synchronous_tag'
        );

        if ($list === true) {
            \PHPUnit_Framework_Assert::assertNotContains(
                'tags',
                $fields,
                "List resource should not contains embedded lists"
            );
        } else {
            $requiredFields[] = 'conditions';
        }

        sort($requiredFields);

        \PHPUnit_Framework_Assert::assertEquals($requiredFields, $fields);

        \PHPUnit_Framework_Assert::assertInternalType('int', $trigger['id']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $trigger['name']);
        \PHPUnit_Framework_Assert::assertInternalType('int', $trigger['container']);
        \PHPUnit_Framework_Assert::assertInternalType('int', $trigger['strategy']);
        \PHPUnit_Framework_Assert::assertInternalType('int', $trigger['type']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $trigger['created_at']);
        \PHPUnit_Framework_Assert::assertTrue(
            is_null($trigger['updated_at']) || is_string($trigger['updated_at'])
        );
        \PHPUnit_Framework_Assert::assertInternalType('int', $trigger['tags_count']);
    }

    /**
     * @Then trigger should contains at least :count total count
     */
    public function triggerShouldContainsAtLeastTotalCount($count)
    {
        $data = $this->getJsonResponseContent();

        \PHPUnit_Framework_Assert::assertArrayHasKey('tags_count', $data['data']);
        \PHPUnit_Framework_Assert::assertGreaterThanOrEqual((int)$count, $data['data']['tags_count']);
    }

    /**
     * @Then response should contains triggers
     */
    public function responseShouldContainsTriggers(TableNode $table)
    {
        $this->assertResponseContainsJson($this->transformTriggersRows($table));
    }

    /**
     * @Then response should contains trigger
     */
    public function triggerShouldContains(TableNode $table)
    {
        $this->assertResponseContainsJson($this->transformTriggersRows($table)[0]);
    }

    /**
     * @param TableNode $table
     * @return array
     */
    private function transformTriggersRows(TableNode $table)
    {
        $data = [];
        foreach ($table as $row) {

            $trigger = [];

            if (isset($row['id'])) {
                $trigger['id'] = (int)$row['id'];
            }

            if (isset($row['name'])) {
                $trigger['name'] = $row['name'];
            }

            if (isset($row['conditions'])) {
                $trigger['conditions'] = $row['conditions'];
            }

            if (isset($row['tags'])) {
                $trigger['tags'] = $row['tags'];
            }

            if (isset($row['container'])) {
                $trigger['container'] = (int)$row['container'];
            }

            if(isset($row['type'])) {
                $trigger['type'] = (int)$row['type'];
            }

            if(isset($row['strategy'])) {
                $trigger['strategy'] = (int)$row['strategy'];
            }

            $data[] = $trigger;
        }

        return $data;
    }

    /**
     * @Given I prepare trigger :preparedName to container :preparedId with type :preparedType
     */
    public function iPrepareTriggerToContainer($preparedName, $preparedId, $preparedType)
    {
        $this->preparedName = $preparedName;
        $this->preparedId = $preparedId;
        $this->preparedType = (int)$preparedType;
    }

    /**
     * @Given I prepare trigger conditions
     */
    public function iPrepareTriggerConditions(TableNode $table)
    {
        $this->preparedConditions = $this->prepareConditions($table);
    }

    /**
     * @Then response should contains valid trigger
     */
    public function responseShouldContainsValidTrigger()
    {
        $data = $this->getJsonResponseContent();

        $this->assertTriggerTypes($data['data']);
    }

    /**
     * @Then response should contains prepared trigger
     */
    public function responseShouldContainsPreparedTrigger()
    {
        $this->assertResponseContainsJson(
            [
                'name' => $this->preparedName,
                'type' => $this->preparedType
            ]
        );
    }

    /**
     * @Then response should contains prepared conditions
     */
    public function responseShouldContainsPreparedConditions()
    {
        $this->assertResponseContainsJson(
            [
                'conditions' => $this->preparedConditions
            ]
        );

        $data = $this->getJsonResponseContent();

        \PHPUnit_Framework_Assert::assertCount(
            count($this->preparedConditions),
            $data['data']['conditions']
        );
    }

    /**
     * @When I save trigger
     */
    public function iSaveTrigger()
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/triggers', $this->preparedId),
            [
                'name' => $this->preparedName,
                'conditions' => $this->preparedConditions,
                'type' => $this->preparedType
            ]
        );
    }

    /**
     * @When I update trigger :id
     */
    public function iUpdateTrigger($id)
    {
        $client = $this->getClient();

        $client->request(
            'PUT',
            sprintf('/api/triggers/%s', $id),
            [
                'name' => $this->preparedName,
                'conditions' => $this->preparedConditions,
                'type' => $this->preparedType
            ]
        );
    }

    /**
     * @When I delete trigger :id
     */
    public function iDeleteTrigger($id)
    {
        $client = $this->getClient();

        $client->request('DELETE', sprintf('/api/triggers/%s', $id));
    }

    /**
     * @When I get trigger :id
     */
    public function iGetTrigger($id)
    {
        $client = $this->getClient();

        $client->request('GET', sprintf('/api/triggers/%s', $id));
    }

    /**
     * @Then condition update date should be populated to relations
     */
    public function conditionUpdateDateShouldBePopulatedToRelationship()
    {
        $data = $this->getJsonResponseContent();

        $trigger = $this->getContainer()
            ->get('doctrine.orm.default_entity_manager')
            ->getRepository('SevenTagTriggerBundle:Trigger')
            ->find($data['data']['id']);

        \PHPUnit_Framework_Assert::assertNotNull(
            $trigger
        );

        \PHPUnit_Framework_Assert::assertNotEquals(
            $trigger->getCreatedAt(),
            $trigger->getUpdatedAt()
        );

        \PHPUnit_Framework_Assert::assertNotEquals(
            $trigger->getContainer()->getCreatedAt(),
            $trigger->getContainer()->getUpdatedAt()
        );

        foreach ($trigger->getTags() as $tag) {
            \PHPUnit_Framework_Assert::assertNotEquals(
                $tag->getCreatedAt(),
                $tag->getUpdatedAt()
            );
        }

        /** @var Condition $condition */
        foreach ($trigger->getConditions() as $condition) {
            \PHPUnit_Framework_Assert::assertNotEquals(
                $condition->getCreatedAt(),
                $condition->getUpdatedAt()
            );
        }
    }

    /**
     * @Then trigger should contains at least :count conditions
     */
    public function triggerShouldContainsAtLeastConditions($count)
    {
        $data = $this->getJsonResponseContent();

        \PHPUnit_Framework_Assert::assertGreaterThanOrEqual((int)$count, count($data['data']['conditions']));
    }

    /**
     * @Then trigger should contains exactly :count conditions
     */
    public function triggerShouldContainsConditions($count)
    {
        $data = $this->getJsonResponseContent();

        \PHPUnit_Framework_Assert::assertSame((int)$count, count($data['data']['conditions']));
    }

    /**
     * @When I prepare empty trigger conditions
     */
    public function iPrepareEmptyTriggerConditions()
    {
        $this->preparedConditions = [];
    }

    /**
     * @Then trigger should contains valid conditions
     */
    public function triggerShouldContainsValidConditions()
    {
        $data = $this->getJsonResponseContent();

        $conditions = $data['data']['conditions'];
        foreach($conditions as $condition) {

            \PHPUnit_Framework_Assert::assertSame(
                array(
                    'variable',
                    'condition',
                    'value'
                ),
                array_keys($condition)
            );

            \PHPUnit_Framework_Assert::assertInternalType('string', $condition['variable']);
            \PHPUnit_Framework_Assert::assertInternalType('string', $condition['condition']);
            \PHPUnit_Framework_Assert::assertInternalType('string', $condition['value']);
        }
    }

    private function prepareConditions(TableNode $table)
    {
        $conditions = array();

        foreach ($table as $row) {
            $conditions[] = array(
                'variable' => $row['variable'],
                'condition' => $row['condition'],
                'value' => $row['value']
            );
        }

        return $conditions;
    }
}
