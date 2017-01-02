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

class VariablesContext extends BaseContext
{
    /**
     * @When I delete variable :id
     *
     * @param integer $id
     */
    public function iDeleteUser($id)
    {
        $client = $this->getClient();

        $client->request(
            'DELETE',
            sprintf('/api/variables/%s', $id)
        );
    }

    /**
     * @When I get variable type list
     */
    public function iAmOnVariableTypesListResource()
    {
        $client = $this->getClient();
        $client->request(
            'GET',
            sprintf('/api/variable-types')
        );
    }

    /**
     * @When I get variable list for container :id
     */
    public function iAmOnVariableListResource($id)
    {
        $client = $this->getClient();
        $client->request(
            'GET',
            sprintf('/api/containers/%s/variables', $id)
        );
    }

    /**
     * @When I update variable :id with data
     *
     * @param integer $id
     * @param TableNode $table
     */
    public function iAttemptToUpdateContainerWithData($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'PUT',
            sprintf('/api/variables/%s', $id),
            $this->transformVariablesRows($table)[0]
        );
    }

    /**
     * @When I get :id variable
     */
    public function iGet($id)
    {
        $client = $this->getClient();

        $client->request('GET', sprintf('/api/variables/%s', $id));
    }

    /**
     * @When I create variable for container :id with data
     *
     * @param TableNode $table
     */
    public function iAttemptToCreateVariableWithData($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/containers/%s/variables', $id),
            $this->transformVariablesRows($table)[0]
        );
    }

    /**
     * @Then response should contains changed files
     *
     * @param TableNode $table
     */
    public function responseShouldContainsChangedFiles(TableNode $table)
    {
        $data = $this->getJsonResponseContent();

        foreach ($table as $row) {

            foreach ($row as $key => $field) {

                \PHPUnit_Framework_Assert::assertEquals($data['data'][$key], $field);

            }

        }
    }

    /**
     * @Then response should contains tag
     *
     * @param TableNode $table
     */
    public function responseShouldContainsTag(TableNode $table)
    {
        $this->assertResponseContainsJson(array('data' => $this->transformVariablesRows($table)[0]));
    }

    /**
     * @Then response should have :length variables
     *
     * @param integer $length
     */
    public function responseShouldContainsNumberOfElements($length)
    {
        $data = $this->getJsonResponseContent();

        \PHPUnit_Framework_Assert::assertEquals(count($data['data']), $length);
    }

    /**
     * @Then response should contains valid variable
     */
    public function responseShouldContainerList()
    {
        $data = $this->getJsonResponseContent();

        $this->assertVariableTypes($data['data']);
    }

    /**
     * @param array $variable
     */
    protected function assertVariableTypes(array $variable)
    {
        \PHPUnit_Framework_Assert::assertInternalType('int', $variable['id']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $variable['name']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $variable['value']);
        \PHPUnit_Framework_Assert::assertInternalType('array', $variable['options']);
        \PHPUnit_Framework_Assert::assertTrue(
            is_null($variable['updated_at']) || is_string($variable['updated_at'])
        );
    }

    /**
     * @param TableNode $table
     * @return array
     */
    private function transformVariablesRows(TableNode $table)
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

            if (isset($row['description'])) {
                $tag['description'] = $row['description'];
            }

            if (isset($row['value'])) {
                $tag['value'] = $row['value'];
            }

            if (isset($row['options'])) {
                $tag['options'] = json_decode($row['options']);
            }

            if (isset($row['container'])) {
                $tag['container'] = (int)$row['container'];
            }

            if (isset($row['type'])) {
                $tag['type'] = (int)$row['type'];
            }

            $data[] = $tag;
        }

        return $data;
    }
}
