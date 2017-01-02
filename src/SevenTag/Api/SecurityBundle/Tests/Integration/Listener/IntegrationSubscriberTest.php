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

namespace SevenTag\Api\SecurityBundle\Tests\Integration\Listener;

use Prophecy\Argument;
use SevenTag\Api\UserBundle\Entity\User;
use SevenTag\Api\SecurityBundle\Entity\Integration;
use SevenTag\Api\SecurityBundle\Integration\Event\IntegrationEvent;
use SevenTag\Api\SecurityBundle\Integration\Listener\IntegrationSubscriber;
use SevenTag\Api\SecurityBundle\Integration\UserManipulator\UserManipulator;

/**
 * Class IntegrationSubscriberTest
 */
class IntegrationSubscriberTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldManipulateUserOnIntegrationCreate()
    {
        $userManipulator = $this->getUserManipulatorMockForCreate();

        $integration = new Integration();
        $integration->setUser(new User());
        $event = new IntegrationEvent($integration);

        $integrationListener = new IntegrationSubscriber($userManipulator);
        $integrationListener->createdIntegration($event);
    }

    /**
     * @test
     */
    public function itShouldManipulateUserOnIntegrationUpdate()
    {
        $userManipulator = $this->getUserManipulatorMockForUpdate();

        $integration = new Integration();
        $integration->setUser(new User());
        $event = new IntegrationEvent($integration);

        $integrationListener = new IntegrationSubscriber($userManipulator);
        $integrationListener->updatedIntegration($event);
    }

    /**
     * @return UserManipulator
     */
    public function getUserManipulatorMockForCreate()
    {
        $userManipulator = $this->prophesize('SevenTag\Api\SecurityBundle\Integration\UserManipulator\UserManipulator');
        $userManipulator->activateUser(Argument::type('SevenTag\Api\UserBundle\Entity\User'))->shouldBeCalledTimes(1);
        $userManipulator->assignUserToApiRole(Argument::type('SevenTag\Api\UserBundle\Entity\User'))->shouldBeCalledTimes(1);
        $userManipulator->autoCompleteUserPersonalInfo(Argument::type('SevenTag\Api\UserBundle\Entity\User'), Argument::any())->shouldBeCalledTimes(1);

        return $userManipulator->reveal();
    }

    /**
     * @return UserManipulator
     */
    public function getUserManipulatorMockForUpdate()
    {
        $userManipulator = $this->prophesize('SevenTag\Api\SecurityBundle\Integration\UserManipulator\UserManipulator');
        $userManipulator->activateUser(Argument::type('SevenTag\Api\UserBundle\Entity\User'))->shouldNotBeCalled();
        $userManipulator->assignUserToApiRole(Argument::type('SevenTag\Api\UserBundle\Entity\User'))->shouldNotBeCalled();
        $userManipulator->autoCompleteUserPersonalInfo(Argument::type('SevenTag\Api\UserBundle\Entity\User'), Argument::any())->shouldBeCalledTimes(1);

        return $userManipulator->reveal();
    }
}
