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
use SevenTag\Api\TriggerBundle\Entity\Trigger;
use SevenTag\Component\Tag\Model\Tag;

/**
 * Class TagsContext
 * @package Features\Context
 */
class TagsContext extends BaseContext
{
    /**
     * @Then response should contains valid tag
     */
    public function responseShouldContainsValidTag()
    {
        $data = $this->getJsonResponseContent();

        $this->assertTagTypes($data['data']);
    }

    /**
     * @Then response should contains valid tags list
     */
    public function responseShouldContainsValidTagsList()
    {
        $data = $this->getJsonResponseContent();

        foreach ($data['data'] as $container) {
            $this->assertTagTypes($container);
        }
    }

    /**
     * @When I delete tag :id
     */
    public function iAttemptToDeleteTag($id)
    {
        $client = $this->getClient();

        $client->request(
            'DELETE',
            sprintf('/api/tags/%s', $id)
        );
    }

    /**
     * @When I get tag :id
     */
    public function iAttemptToGetTag($id)
    {
        $client = $this->getClient();

        $client->request(
            'GET',
            sprintf('/api/tags/%s', $id)
        );
    }

    /**
     * @When I update tag :id
     */
    public function iAttemptToUpdateTag($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'PUT',
            sprintf('/api/tags/%s', $id),
            $this->transformTagsRows($table)[0]
        );
    }

    /**
     * @When I am on tag list resource
     */
    public function iAmOnTagListResource()
    {
        $client = $this->getClient();

        $client->request('GET', '/api/tags');
    }

    /**
     * @Then response should contains tags
     */
    public function responseShouldContainsTags(TableNode $table)
    {
        $this->assertResponseContainsJson($this->transformTagsRows($table));
    }

    /**
     * @Then response should contains tag
     */
    public function responseShouldContainsTag(TableNode $table)
    {
        $this->assertResponseContainsJson(array('data' => $this->transformTagsRows($table)[0]));
    }

    /**
     * @Then tag update date should be populated to relations
     */
    public function lastUpdateDateShouldBePopulatedToRelationship()
    {
        $data = $this->getJsonResponseContent();

        /** @var Tag $tag */
        $tag = $this->getContainer()
            ->get('doctrine.orm.default_entity_manager')
            ->getRepository('SevenTagTagBundle:Tag')
            ->find($data['data']['id']);

        \PHPUnit_Framework_Assert::assertNotNull(
            $tag
        );

        \PHPUnit_Framework_Assert::assertNotEquals(
            $tag->getCreatedAt(),
            $tag->getUpdatedAt()
        );

        \PHPUnit_Framework_Assert::assertNotEquals(
            $tag->getContainer()->getCreatedAt(),
            $tag->getContainer()->getUpdatedAt()
        );

        /** @var Trigger $trigger */
        foreach ($tag->getTriggers() as $trigger) {
            \PHPUnit_Framework_Assert::assertEquals(
                $trigger->getCreatedAt(),
                $trigger->getUpdatedAt()
            );

            // conditions should not be updated
            foreach ($trigger->getConditions() as $condition) {
                \PHPUnit_Framework_Assert::assertEquals(
                    $condition->getCreatedAt(),
                    $condition->getUpdatedAt()
                );
            }
        }
    }

    /**
     * @param array $tag
     */
    protected function assertTagTypes(array $tag)
    {
        $expectedColumns = array('id', 'name', 'code', 'triggers', 'created_at', 'updated_at', 'document_write', 'disable_in_debug_mode', 'is_active', 'is_synchronous', 'template', 'template_options', 'container', 'priority', 'respect_visitors_privacy');
        $columns = array_keys($tag);
        sort($expectedColumns);
        sort($columns);

        \PHPUnit_Framework_Assert::assertSame(
            $expectedColumns,
            $columns
        );

        \PHPUnit_Framework_Assert::assertInternalType('int', $tag['id']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $tag['name']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $tag['code']);
        \PHPUnit_Framework_Assert::assertInternalType('int', $tag['container']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $tag['created_at']);
        \PHPUnit_Framework_Assert::assertInternalType('int', $tag['priority']);
        \PHPUnit_Framework_Assert::assertInternalType('bool', $tag['respect_visitors_privacy']);
        \PHPUnit_Framework_Assert::assertInternalType('array', $tag['template_options']);
        \PHPUnit_Framework_Assert::assertTrue(
            is_null($tag['updated_at']) || is_string($tag['updated_at'])
        );
    }

    /**
     * @param TableNode $table
     * @return array
     */
    private function transformTagsRows(TableNode $table)
    {
        $data = [];

        foreach ($table as $row) {
            $tag = [];

            if (isset($row['id'])) {
                $tag['id'] = (int)$row['id'];
            }

            if (isset($row['name'])) {
                $tag['name'] = $row['name'];
            }

            if (isset($row['triggers'])) {
                $tag['triggers'] = $row['triggers'];
            }

            if (isset($row['code'])) {
                $tag['code'] = $row['code'];
            }

            if (isset($row['container'])) {
                $tag['container'] = (int)$row['container'];
            }

            if (isset($row['priority'])) {
                $tag['priority'] = (int)$row['priority'];
            }

            if (isset($row['respect_visitors_privacy'])) {
                $tag['respect_visitors_privacy'] = (int)$row['respect_visitors_privacy'];
            }

            $data[] = $tag;
        }

        return $data;
    }
}
