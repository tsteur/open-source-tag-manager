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
 * Class IntegrationsContext
 * @package Features\Context
 */
class IntegrationsContext extends BaseContext
{
    /**
     * @When I am on integration list resource
     */
    public function iAttemptToGetIntegrationList()
    {
        $client = $this->getClient();
        $client->request('GET', '/api/integration');
    }

    /**
     * @When I create integration with data
     */
    public function iAttemptToCreateIntegration(TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            '/api/integration',
            [
                'name'  => $table->getRow(1)[0],
                'user'  =>
                [
                    'email' => $table->getRow(1)[1]
                ]
            ]
        );
    }

    /**
     * @When I update integration :id
     */
    public function iAttemptToUpdateIntegration($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'PUT',
            sprintf('/api/integration/%s', $id),
            [
                'name' => $table->getRow(1)[0]
            ]
        );
    }

    /**
     * @When I delete integration :id
     */
    public function iAttemptToDeleteIntegration($id)
    {
        $client = $this->getClient();

        $client->request('DELETE', sprintf('/api/integration/%s', $id));
    }

    /**
     * @When I get integration :id
     */
    public function iAttemptToGetIntegration($id)
    {
        $client = $this->getClient();

        $client->request('GET', sprintf('/api/integration/%s', $id));
    }

    /**
     * @Then response should contains valid integration
     */
    public function responseShouldContainsValidIntegration()
    {
        $data = $this->getJsonResponseContent();

        $this->assertIntegrationTypes($data['data']);
    }

    /**
     * @Then response should contains valid integrations list
     */
    public function responseShouldContainsValidIntegrationsList()
    {
        $data = $this->getJsonResponseContent();

        foreach ($data['data'] as $integration) {
            $this->assertIntegrationTypes($integration, false);
        }
    }

    /**
     * @param array $integration
     * @param bool $privateScope
     */
    protected function assertIntegrationTypes(array $integration, $privateScope = true)
    {
        $expectedColumns = [
            'id',
            'name',
            'user',
            'created_at',
            'updated_at'
        ];

        if ($privateScope) {
            $expectedColumns[] = 'client_id';
            $expectedColumns[] = 'client_secret';
        }

        $columns = array_keys($integration);
        sort($expectedColumns);
        sort($columns);

        \PHPUnit_Framework_Assert::assertSame(
            $expectedColumns,
            $columns
        );

        \PHPUnit_Framework_Assert::assertInternalType('int', $integration['id']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $integration['name']);
        \PHPUnit_Framework_Assert::assertTrue(
            is_null($integration['updated_at']) || is_string($integration['updated_at'])
        );

        if ($privateScope) {
            \PHPUnit_Framework_Assert::assertInternalType('string', $integration['client_id']);
            \PHPUnit_Framework_Assert::assertInternalType('string', $integration['client_secret']);
        }
    }
}
