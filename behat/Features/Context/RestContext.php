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

use SevenTag\Api\SecurityBundle\DataFixtures\ORM\ClientFixture;
use Behat\Gherkin\Node\TableNode;
use SevenTag\Api\SecurityBundle\Entity\Integration;
use Symfony\Bundle\FrameworkBundle\Client;

/**
 * Class RestContext
 * @package Features\Context
 */
class RestContext extends BaseContext
{
    /**
     * @Given /I am logged in as admin$/
     */
    public function iAmLoggedInAsAdmin()
    {
        $this->iAmLoggedInAs('user1@example.com', 'testing');
    }

    /**
     * @Given /I am logged in as user$/
     */
    public function iAmLoggedInAsUser()
    {
        $this->iAmLoggedInAs('user4@example.com', 'testing');
    }

    /**
     * @Given /I am logged in as "([^"]*)"(?:| with password "([^"]*)")$/
     */
    public function iAmLoggedInAs($user, $password = 'testing')
    {
        $client = $this->getClient();

        $client
            ->request(
                'POST',
                '/api/oauth/v2/token',
                array(
                    'client_id' => sprintf('1_%s', ClientFixture::RANDOM_ID),
                    'client_secret' => ClientFixture::SECRET,
                    'grant_type' => 'password',
                    'username' => $user,
                    'password' => $password,
                )
            );

        $this->loginWithClient($client);
    }

    /**
     * @Given I am logged in by OAuth client credentials
     */
    public function iAmLoggedByOAuthClientCredentials()
    {
        /** @var Integration $integration */
        $integration = $this->getContainer()
            ->get('doctrine.orm.default_entity_manager')
            ->getRepository('SevenTagSecurityBundle:Integration')
            ->findAll()[0];

        $client = $this->getClient();

        $client
            ->request(
                'POST',
                '/api/oauth/v2/token',
                [
                    'client_id' => $integration->getPublicId(),
                    'client_secret' => $integration->getSecret(),
                    'grant_type' => 'client_credentials'
                ]
            );

        $this->loginWithClient($client);
    }

    /**
     * @param Client $client
     */
    private function loginWithClient(Client $client)
    {
        $response = $client->getResponse();
        $content = $response->getContent();

        \PHPUnit_Framework_Assert::assertSame(200, $response->getStatusCode());
        \PHPUnit_Framework_Assert::assertJson($content);

        $data = json_decode($content, true);

        \PHPUnit_Framework_Assert::assertArrayHasKey('access_token', $data);

        $client->setServerParameter('HTTP_Authorization', sprintf('Bearer %s', $data['access_token']));
    }

    /**
     * @Then I expect successful list response
     */
    public function iExpectSuccessfulListResponse()
    {
        \PHPUnit_Framework_Assert::assertSame(
            200,
            $this->getLastResponse()->getStatusCode()
        );
    }

    /**
     * @Then I expect unauthorized access response
     */
    public function iExpectUnauthorizedResponse()
    {
        \PHPUnit_Framework_Assert::assertSame(
            401,
            $this->getLastResponse()->getStatusCode()
        );
    }

    /**
     * @Then I expect already reported response
     */
    public function iExpectAlreadyReportedResponse()
    {
        \PHPUnit_Framework_Assert::assertSame(
            208,
            $this->getLastResponse()->getStatusCode()
        );
    }

    /**
     * @Then I expect successful create response
     */
    public function iExpectSuccessfulCreateResponse()
    {
        $response = $this->getLastResponse();

        \PHPUnit_Framework_Assert::assertSame(
            201,
            $response->getStatusCode()
        );

        \PHPUnit_Framework_Assert::assertSame(
            'application/json',
            $response->headers->get('Content-Type'),
            'Response content-type header should be application/json.'
        );
    }

    /**
     * @Then I expect successful update response
     */
    public function iExpectSuccessfulUpdateResponse()
    {
        \PHPUnit_Framework_Assert::assertSame(
            200,
            $this->getClient()->getResponse()->getStatusCode()
        );
    }

    /**
     * @Then I expect valid json response
     */
    public function iExpectValidJsonResponse()
    {
        \PHPUnit_Framework_Assert::assertJson(
            $this->getLastResponse()->getContent()
        );

        \PHPUnit_Framework_Assert::assertArrayHasKey(
            'data',
            $this->getJsonResponseContent()
        );
    }

    /**
     * @Then I expect status code :code
     *
     * @param integer $code
     */
    public function iExpectStatusCode($code)
    {
        $this->assertResponseStatusCode($code);
    }

    /**
     * @Then /response should contains information at least "([^"]*)" total records/
     */
    public function responseShouldContainTotalRecordsField($total)
    {
        $data = $this->getJsonResponseContent();

        \PHPUnit_Framework_Assert::assertArrayHasKey('total', $data);
        \PHPUnit_Framework_Assert::assertGreaterThanOrEqual((int)$total, $data['total']);
    }

    /**
     * @Then response should contains data rows
     */
    public function responseShouldContainsDataRows(TableNode $table)
    {
        $data = $table->getColumnsHash();

        foreach($data as &$row) {
            foreach($row as $field => &$value) {
                if('status' === $field) {
                    $value = filter_var($value, FILTER_VALIDATE_BOOLEAN);
                }
            }
        }

        $this->assertResponseContainsJson(array('data' => $data));
    }

    /**
     * @Then response should contains data
     */
    public function responseShouldContainsDataRow(TableNode $table)
    {
        $this->assertResponseContainsJson(array('data' => $table->getColumnsHash()[0]));
    }

    /**
     * @Then I expect successful delete response
     */
    public function iExpectSuccessfulDeleteResponse()
    {
        \PHPUnit_Framework_Assert::assertEquals(204, $this->getLastResponse()->getStatusCode());
        \PHPUnit_Framework_Assert::assertEmpty($this->getLastResponse()->getContent());
    }

    /**
     * @Then I expect successful response
     */
    public function iExpectSuccessfulResponse()
    {
        \PHPUnit_Framework_Assert::assertTrue($this->getLastResponse()->isSuccessful());
    }

    /**
     * @Then I expect not found response
     */
    public function iExpectNotFoundResponse()
    {
        \PHPUnit_Framework_Assert::assertTrue($this->getLastResponse()->isNotFound());
    }

    /**
     * @Then I expect forbidden response
     */
    public function iExpectForbiddenResponse()
    {
        \PHPUnit_Framework_Assert::assertTrue($this->getLastResponse()->isForbidden());
    }

    /**
     * @Then response should contains form errors
     */
    public function responseShouldContainsFormErrors()
    {
        $response = $this->getClient()->getResponse();

        \PHPUnit_Framework_Assert::assertJson(
            $this->getLastResponse()->getContent()
        );

        \PHPUnit_Framework_Assert::assertSame(
            400,
            $response->getStatusCode()
        );

        $this->assertResponseContainsJson(array(
            'message' => 'Validation Failed',
            'code' => 400
        ));
    }

    /**
     * @Then response row should contains created date
     */
    public function responseRowShouldContainsCreatedDate()
    {
        $data = $this->getJsonResponseContent();

        \PHPUnit_Framework_Assert::assertNotEmpty(strtotime($data['data']['created_at']));
    }

    /**
     * @Then response row should contains updated date
     */
    public function responseRowShouldContainsUpdatedDate()
    {
        $data = $this->getJsonResponseContent();

        \PHPUnit_Framework_Assert::assertNotEmpty(strtotime($data['data']['updated_at']));
    }

    /**
     * @Then response rows should contains created date
     */
    public function responseRowsShouldContainsCreatedDate()
    {
        $data = $this->getJsonResponseContent();

        foreach($data['data'] as $row) {
            \PHPUnit_Framework_Assert::assertNotEmpty(strtotime($row['created_at']));
        }
    }

    /**
     * @Then response rows should contains updated date
     */
    public function responseRowsShouldContainsUpdatedDate()
    {
        $data = $this->getJsonResponseContent();

        foreach($data['data'] as $row) {
            \PHPUnit_Framework_Assert::assertNotEmpty(strtotime($row['created_at']));
        }
    }

    /**
     * @Given I wait for :seconds seconds
     */
    public function iWaitForSeconds($seconds)
    {
        sleep((int)$seconds);
    }

    /**
     * @Then response row updated date and created date should be equal
     */
    public function responseRowUpdatedDateAndCreatedDateShouldBeEqual()
    {
        $data = $this->getJsonResponseContent();

        \PHPUnit_Framework_Assert::assertEquals(
            $data['data']['created_at'],
            $data['data']['updated_at']
        );
    }

    /**
     * @Then response row updated date and created date should not be equal
     */
    public function responseRowUpdatedDateAndCreatedDateShouldNotBeEqual()
    {
        $data = $this->getJsonResponseContent();

        \PHPUnit_Framework_Assert::assertNotEquals(
            $data['data']['created_at'],
            $data['data']['updated_at']
        );
    }
}
