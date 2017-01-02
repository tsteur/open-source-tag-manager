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
 * Class UsersContext
 * @package Features\Context
 */
class UsersContext extends BaseContext
{
    /**
     * @When I reset password for user :id
     */
    public function iResetPasswordForUser($id)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf('/api/users/%s/reset-password', $id)
        );
    }

    /**
     * @When I delete user :id
     */
    public function iDeleteUser($id)
    {
        $client = $this->getClient();

        $client->request(
            'DELETE',
            sprintf('/api/users/%s', $id)
        );
    }

    /**
     * @When I am on user list resource
     */
    public function iAmOnUserListResource()
    {
        $client = $this->getClient();

        $client->request('GET', '/api/users');
    }

    /**
     * @When I get :id user
     */
    public function iGet($id)
    {
        $client = $this->getClient();

        $client->request('GET', sprintf('/api/users/%s', $id));
    }

    /**
     * @When I create user with data
     */
    public function iCreateUserWithData(TableNode $table)
    {
        $client = $this->getClient();

        $client->request('POST', '/api/users', [
            'email' => $table->getColumnsHash()[0]['email'],
            'firstName' => $table->getColumnsHash()[0]['firstName'],
            'lastName' => $table->getColumnsHash()[0]['lastName'],
            'roles' => explode(',', $table->getColumnsHash()[0]['roles'])
        ]);
    }

    /**
     * @When I create user with password
     */
    public function iCreateUserWithPassword(TableNode $table)
    {
        $client = $this->getClient();

        $client->request('POST', '/api/users', [
            'email' => $table->getColumnsHash()[0]['email'],
            'firstName' => $table->getColumnsHash()[0]['firstName'],
            'lastName' => $table->getColumnsHash()[0]['lastName'],
            'roles' => explode(',', $table->getColumnsHash()[0]['roles']),
            'plainPassword'  => [
               'first' => $table->getColumnsHash()[0]['password'],
               'second' => $table->getColumnsHash()[0]['repeat']
            ]
        ]);
    }

    /**
     * @When I update :id user with data
     */
    public function iUpdateUserWithData($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'PUT',
            sprintf('/api/users/%s', $id),
            array(
                'firstName' => $table->getRow(1)[0],
                'lastName' => $table->getRow(1)[1],
                'roles' => explode(',', $table->getColumnsHash()[0]['roles'])
            )
        );
    }

    /**
     * @When I update :id user with password
     */
    public function iUpdateUserWithPassword($id, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'PUT',
            sprintf('/api/users/%s', $id),
            array(
                'firstName' => $table->getRow(1)[0],
                'lastName' => $table->getRow(1)[1],
                'roles' => explode(',', $table->getColumnsHash()[0]['roles']),
                'plainPassword'  => [
                   'first' => $table->getColumnsHash()[0]['password'],
                   'second' => $table->getColumnsHash()[0]['repeat']
                ]
            )
        );
    }

    /**
     * @When I update my profile with data
     */
    public function iUpdateMyProfileWithData(TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'PUT',
            sprintf('/api/users/me'),
            array(
                'firstName' => $table->getRow(1)[0],
                'lastName' => $table->getRow(1)[1],
            )
        );
    }

    /**
     * @When I update my profile with roles
     */
    public function iUpdateMyProfileWithRoles(TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'PUT',
            sprintf('/api/users/me'),
            array(
                'firstName' => $table->getRow(1)[0],
                'lastName' => $table->getRow(1)[1],
                'roles' => $table->getRow(1)[2],
            )
        );
    }

    /**
     * @When I change my current password :currentPassword
     */
    public function iAttemptToChangeMyCurrentPassword($currentPassword, TableNode $table)
    {
        $client = $this->getClient();

        $client->request('POST', '/api/users/me/change-password', [
            'current_password' => $currentPassword,
            'plainPassword' => [
                'first' => $table->getColumnsHash()[0]['first'],
                'second' => $table->getColumnsHash()[0]['second']
            ]
        ]);
    }

    /**
     * @When I do logout
     */
    public function iDoLogout()
    {
        $client = $this->getClient();

        $client->request('GET', '/api/users/me/logout');
    }

    /**
     * @When I go to my profile resource
     */
    public function iGoToMyProfileResource()
    {
        $client = $this->getClient();

        $client->request('GET', '/api/users/me');
    }

    /**
     * @Then response should contains successful change password message
     */
    public function iResponseShouldContainsSuccessfulChangePasswordMessage()
    {
        $this->assertResponseContainsJson([
            'message' => 'The password has been changed'
        ]);
    }

    /**
     * @Then I should see user data
     */
    public function iShouldSeeUserData(TableNode $table)
    {
        $this->assertResponseContainsJson([
            'email' => $table->getColumnsHash()[0]['email'],
            'username' => $table->getColumnsHash()[0]['username'],
            'first_name' => $table->getColumnsHash()[0]['first_name'],
            'last_name' => $table->getColumnsHash()[0]['last_name'],
            'status' => filter_var($table->getColumnsHash()[0]['status'], FILTER_VALIDATE_BOOLEAN)
        ]);
    }

    /**
     * @When I send request for reset password for user :username
     */
    public function iSendRequestForResetPassword($username)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            '/api/reset-password/request',
            [
                'username' => $username
            ]
        );
    }

    /**
     * @Then response should contains successful reset password request message for :user
     */
    public function responseShouldContainsSuccessfulResetPasswordRequestMessage($user)
    {
        $this->assertResponseContainsJson([
            'message' => sprintf('An email has been sent to %s. It contains a link you must click to reset your password.', $user)
        ]);
    }


    /**
     * @When I reset password using token :token
     */
    public function iAttemptResetPasswordUsingToken($token, TableNode $table)
    {
        $client = $this->getClient();

        $client->request(
            'POST',
            sprintf(
                '/api/reset-password/token/%s',
                $token
            ),
            [
                'plainPassword' => [
                    'first' => $table->getColumnsHash()[0]['first'],
                    'second' => $table->getColumnsHash()[0]['second']
                ]
            ]
        );
    }

    /**
     * @Then response should contains successful reset password message
     */
    public function responseShouldContainsSuccessfulResetPasswordMessage()
    {
        $this->assertResponseContainsJson([
            'message' => 'The password has been changed'
        ]);
    }

    /**
     * @Then I should see user roles
     */
    public function iShouldSeeUserRoles(TableNode $table)
    {
        $roles = [];
        foreach ($table as $row) {
            $roles[] = $row['role'];
        }

        $this->assertResponseContainsJson([
            'roles' => $roles,
        ]);
    }

    /**
     * @Then response should contains valid user
     */
    public function responseShouldContainsValidUser()
    {
        $data = $this->getJsonResponseContent();

        $this->assertUserTypes($data['data']);
    }

    /**
     * @Then response should contains valid users list
     */
    public function responseShouldContainsValidUsersList()
    {
        $data = $this->getJsonResponseContent();

        foreach ($data['data'] as $user) {
            $this->assertUserTypes($user);
        }
    }

    /**
     * @param array $user
     */
    protected function assertUserTypes(array $user)
    {
        $fields = array_keys($user);
        sort($fields);

        $requiredFields = ['id', 'username', 'roles', 'email', 'first_name', 'last_name', 'display_name', 'created_at', 'status', 'language'];
        sort($requiredFields);

        \PHPUnit_Framework_Assert::assertEquals($requiredFields, $fields);

        \PHPUnit_Framework_Assert::assertInternalType('int', $user['id']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $user['username']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $user['email']);
        \PHPUnit_Framework_Assert::assertInternalType('array', $user['roles']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $user['first_name']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $user['last_name']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $user['display_name']);
        \PHPUnit_Framework_Assert::assertInternalType('string', $user['created_at']);
    }
}