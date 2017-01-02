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

namespace SevenTag\Api\SecurityBundle\Tests\Integration\UserManipulator;

use SevenTag\Api\SecurityBundle\Integration\UserManipulator\UserManipulator;
use SevenTag\Api\UserBundle\Entity\User;
use SevenTag\Component\User\Model\UserInterface;

/**
 * Class UserManipulatorTest
 */
class UserManipulatorTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var UserManipulator
     */
    private $userManipulator;

    /**
     * @test
     */
    public function itShouldChangeActiveStatusOfUser()
    {
        $user = new User();
        $this->assertFalse($user->isEnabled());

        $this->userManipulator->activateUser($user);
        $this->assertTrue($user->isEnabled());
    }

    /**
     * @test
     */
    public function itShouldAssignUserToApiRole()
    {
        $user = new User();
        $this->assertFalse($user->hasRole(UserInterface::ROLE_API));

        $this->userManipulator->assignUserToApiRole($user);
        $this->assertTrue($user->hasRole(UserInterface::ROLE_API));
    }

    /**
     * @test
     */
    public function itShouldAutoCompleteUserPersonalInformation()
    {
        $user = new User();
        $this->assertNull($user->getFirstName());
        $this->assertNull($user->getLastName());

        $this->userManipulator->autoCompleteUserPersonalInfo($user, 'Test');
        $this->assertEquals('Integration', $user->getFirstName());
        $this->assertEquals('Test', $user->getLastName());
        $this->assertEquals('Integration Test', $user->getFullName());
    }

    public function setUp()
    {
        $this->userManipulator = new UserManipulator();
    }
}
