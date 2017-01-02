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

namespace SevenTag\Api\SecurityBundle\Serializer\Subscriber;

use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use JMS\Serializer\EventDispatcher\ObjectEvent;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Api\ContainerBundle\Entity\Container;
use SevenTag\Api\SecurityBundle\Utils\BitMaskToPermissionsMapperInterface;
use SevenTag\Api\SecurityBundle\Utils\UserMaskResolverInterface;
use SevenTag\Api\UserBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

/**
 * Class ContainerPermissionsSubscriber
 * @package SevenTag\Api\ContainerBundle\Serializer
 */
class ContainerPermissionsSubscriber implements EventSubscriberInterface
{
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * @var \SevenTag\Api\SecurityBundle\Permission\\SevenTag\Api\SecurityBundle\Utils\BitMaskToPermissionsMapperInterface
     */
    private $bitMaskPermissionsMapper;

    /**
     * @var \SevenTag\Api\SecurityBundle\Utils\UserMaskResolverInterface
     */
    private $userMaskResolver;

    /**
     * @param TokenStorageInterface $tokenStorage
     * @param \SevenTag\Api\SecurityBundle\Utils\BitMaskToPermissionsMapperInterface $bitMaskPermissionsMapper
     * @param UserMaskResolverInterface $userMaskResolver
     */
    public function __construct(
        TokenStorageInterface $tokenStorage,
        BitMaskToPermissionsMapperInterface $bitMaskPermissionsMapper,
        UserMaskResolverInterface $userMaskResolver
    ) {
        $this->tokenStorage = $tokenStorage;
        $this->bitMaskPermissionsMapper = $bitMaskPermissionsMapper;
        $this->userMaskResolver = $userMaskResolver;
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            [
                'event' => 'serializer.pre_serialize',
                'method' => 'addPermissionsToContainer'
            ]
        ];
    }

    /**
     * @param ObjectEvent $event
     */
    public function addPermissionsToContainer(ObjectEvent $event)
    {
        /** @var Container $object */
        $object = $event->getObject();
        if ($object instanceof ContainerInterface) {
            $permissions = $object->getPermissions();
            if (empty($permissions)) {
                $user = $this->getUser();

                if ($user instanceof User) {
                    $object->setPermissions(
                        $this->bitMaskPermissionsMapper->getPermissions(
                            $this->userMaskResolver->resolve($user, $object)
                        )
                    );
                }
            }
        }
    }

    /**
     * @return User|false
     */
    private function getUser()
    {
        $token = $this->tokenStorage->getToken();

        if ($token instanceof TokenInterface) {
            return $this->tokenStorage->getToken()->getUser();
        }

        return null;
    }
}
