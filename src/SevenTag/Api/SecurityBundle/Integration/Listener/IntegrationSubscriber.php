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

namespace SevenTag\Api\SecurityBundle\Integration\Listener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use SevenTag\Api\UserBundle\Entity\User;
use SevenTag\Api\SecurityBundle\Integration\IntegrationEvents;
use SevenTag\Api\SecurityBundle\Integration\Event\IntegrationEvent;
use SevenTag\Api\SecurityBundle\Integration\UserManipulator\UserManipulator;

/**
 * Class IntegrationUserSubscriber
 * @package SevenTag\Api\SecurityBundle\Integration
 */
class IntegrationSubscriber implements EventSubscriberInterface
{
    /**
     * Returns an array of events this subscriber wants to listen to.
     *
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            IntegrationEvents::CREATE_PRE_SAVE => 'createdIntegration',
            IntegrationEvents::UPDATE_PRE_SAVE => 'updatedIntegration'
        ];
    }

    /**
     * @var UserManipulator
     */
    private $userManipulator;

    /**
     * @param UserManipulator $userManipulator
     */
    public function __construct(UserManipulator $userManipulator)
    {
        $this->userManipulator = $userManipulator;
    }

    /**
     * @param IntegrationEvent $integrationEvent
     */
    public function createdIntegration(IntegrationEvent $integrationEvent)
    {
        $integration = $integrationEvent->getIntegration();
        /** @var User $user */
        $user = $integration->getUser();

        $this->userManipulator->activateUser($user);
        $this->userManipulator->assignUserToApiRole($user);
        $this->userManipulator->autoCompleteUserPersonalInfo($user, $integration->getName());
    }

    /**
     * @param IntegrationEvent $integrationEvent
     */
    public function updatedIntegration(IntegrationEvent $integrationEvent)
    {
        $integration = $integrationEvent->getIntegration();
        /** @var User $user */
        $user = $integration->getUser();

        $this->userManipulator->autoCompleteUserPersonalInfo($user, $integration->getName());
    }
}
