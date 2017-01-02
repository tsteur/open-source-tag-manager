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

namespace SevenTag\Api\UserBundle\Tests\Entity;

use SevenTag\Api\UserBundle\Entity\User;

class UserTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldReturnFirstNameAsFullNameIfOnlyFirstNameIsDefined()
    {
        $testedUser = new User();
        $testedUser->setFirstName('Jean');

        $this->assertEquals('Jean', $testedUser->getFullName());
    }

    /**
     * @test
     */
    public function itShouldReturnLastNameAsFullNameIfOnlyLastNameIsDefined()
    {
        $testedUser = new User();
        $testedUser->setLastName('Doe');

        $this->assertEquals('Doe', $testedUser->getFullName());
    }

    /**
     * @test
     */
    public function itShouldReturnFirstNameAndLastNameAsFullNameIfBothAreNotEmpty()
    {
        $testedUser = new User();
        $testedUser->setFirstName('Jean');
        $testedUser->setLastName('Doe');

        $this->assertEquals('Jean Doe', $testedUser->getFullName());
    }

    /**
     * @test
     */
    public function itShouldReturnEmailAsDisplayNameIfFullNameIsNotDefined()
    {
        $expectedResult = 'user1@example.com';

        $testedUser = new User();
        $testedUser->setEmail($expectedResult);

        $this->assertEquals($expectedResult, $testedUser->getDisplayName());
    }

    /**
     * @test
     */
    public function itShouldReturnFullNameAsDisplayNameIfIsDefined()
    {
        $testedUser = new User();
        $testedUser->setEmail('user1@example.com');
        $testedUser->setFirstName('Jean');
        $testedUser->setLastName('Doe');

        $this->assertEquals('Jean Doe', $testedUser->getDisplayName());
    }

    /**
     * @test
     */
    public function itShouldSetFullName()
    {
        $testedUser = new User();
        $this->assertEquals('', $testedUser->getFullName());

        $testedUser->setFullName('Jan', 'Doe');
        $this->assertEquals('Jan Doe', $testedUser->getFullName());
    }

    /**
     * @test
     */
    public function itShouldSetLanguage()
    {
        $testedUser = new User();
        $this->assertNull($testedUser->getLanguage());

        $testedUser->setLanguage('en');
        $this->assertEquals('en', $testedUser->getLanguage());
    }
}
