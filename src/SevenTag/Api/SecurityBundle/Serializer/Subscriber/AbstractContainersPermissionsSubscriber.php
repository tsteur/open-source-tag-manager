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
use JMS\Serializer\EventDispatcher\PreSerializeEvent;
use SevenTag\Api\AppBundle\Rest\View\ListView;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Api\SecurityBundle\Utils\BitMaskToPermissionsMapperInterface;
use SevenTag\Api\UserBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * Class AbstractContainersPermissionsSubscriber
 * @package SevenTag\Api\SecurityBundle\Serializer\Subscriber
 */
abstract class AbstractContainersPermissionsSubscriber implements EventSubscriberInterface
{
    /**
     * @var TokenStorageInterface
     */
    protected $tokenStorage;

    /**
     * @var \SevenTag\Api\SecurityBundle\Utils\BitMaskToPermissionsMapperInterface
     */
    protected $bitMaskToPermissionsMapper;

    /**
     * @param TokenStorageInterface $tokenStorage
     * @return self
     */
    public function setTokenStorage(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;

        return $this;
    }

    /**
     * @param BitMaskToPermissionsMapperInterface $bitMaskToPermissionsMapper
     * @return $this
     */
    public function setBitMaskToPermissionsMapper(BitMaskToPermissionsMapperInterface $bitMaskToPermissionsMapper)
    {
        $this->bitMaskToPermissionsMapper = $bitMaskToPermissionsMapper;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            [
                'event' => 'serializer.pre_serialize',
                'method' => 'addPermissionsToContainers'
            ]
        ];
    }

    /**
     * @param PreSerializeEvent $event
     */
    public function addPermissionsToContainers(PreSerializeEvent $event)
    {
        /** @var ListView $object */
        $object = $event->getObject();
        if ($this->isListView($object) && $this->haveRecords($object) && $this->haveContainerRecords($object)) {
            $user = $this->tokenStorage->getToken()->getUser();
            if ($this->isSupported($user, $object)) {
                $this->handlePermissions($user, $object);
            }
        }
    }

    /**
     * @param $object
     * @return bool
     */
    protected function isListView($object)
    {
        return $object instanceof ListView;
    }

    /**
     * @param ListView $object
     * @return bool
     */
    protected function haveRecords(ListView $object)
    {
        return $object->getTotal() > 0;
    }

    /**
     * @param ListView $object
     * @return bool
     */
    protected function haveContainerRecords(ListView $object)
    {
        return $object->getData()[0] instanceof ContainerInterface;
    }

    /**
     * @param User $user
     * @param ListView $object
     * @return boolean
     */
    abstract protected function isSupported(User $user, ListView $object);

    /**
     * @param User $user
     * @param ListView $object
     * @return void
     */
    abstract protected function handlePermissions(User $user, ListView $object);
}
