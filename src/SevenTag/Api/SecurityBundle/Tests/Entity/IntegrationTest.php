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

namespace SevenTag\Api\SecurityBundle\Tests\Entity;

use SevenTag\Api\SecurityBundle\Entity\Integration;
use SevenTag\Api\UserBundle\Entity\User;

class IntegrationTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldAllowToSetName()
    {
        $expectedName = 'MyNewName';

        $integration = new Integration();
        $integration->setName($expectedName);

        $this->assertEquals($expectedName, $integration->getName());
    }

    /**
     * @test
     */
    public function itShouldSetCreatedAndUpdatedAtOnInit()
    {
        $integration = new Integration();

        $this->assertInstanceOf('\DateTime', $integration->getCreatedAt());
        $this->assertInstanceOf('\DateTime', $integration->getUpdatedAt());
    }

    /**
     * @test
     */
    public function itShouldReturnPublicId()
    {
        $integration = new Integration();

        $this->assertEquals(
            sprintf(
                '%s_%s',
                $integration->getId(),
                $integration->getRandomId()
            ),
            $integration->getPublicId()
        );
    }

    /**
     * @test
     */
    public function itShouldReturnUser()
    {
        $user = new User();
        $integration = new Integration();
        $integration->setUser($user);

        $this->assertEquals($integration->getUser(), $user);
    }
}
