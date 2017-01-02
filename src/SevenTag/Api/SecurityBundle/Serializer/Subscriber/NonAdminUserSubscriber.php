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

use SevenTag\Api\AppBundle\Rest\View\ListView;
use SevenTag\Api\ContainerBundle\Entity\Container;
use SevenTag\Api\SecurityBundle\Utils\UserPermissionsMapProviderInterface;
use SevenTag\Api\UserBundle\Entity\User;

/**
 * Class NonAdminUserSubscriber
 * @package SevenTag\Api\SecurityBundle\Serializer\Subscriber
 */
class NonAdminUserSubscriber extends AbstractContainersPermissionsSubscriber
{
    /**
     * @var UserPermissionsMapProviderInterface
     */
    private $permissionsMapProvider;

    /**
     * @param UserPermissionsMapProviderInterface $permissionsMapProvider
     */
    public function __construct(UserPermissionsMapProviderInterface $permissionsMapProvider)
    {
        $this->permissionsMapProvider = $permissionsMapProvider;
    }

    /**
     * {@inheritdoc}
     */
    public function isSupported(User $user, ListView $object)
    {
        return !$user->isSuperAdmin();
    }

    /**
     * {@inheritdoc}
     */
    protected function handlePermissions(User $user, ListView $object)
    {
        $containersAccessIds = $this->getContainersAccessIds($object);
        $permissionsMap = $this->permissionsMapProvider->getPermissionsMap($user, $containersAccessIds);

        /** @var Container $container */
        foreach ($object->getData() as $container) {
            $container->setPermissions($permissionsMap[$container->getAccessId()]);
        }
    }

    /**
     * @param ListView $object
     * @return array
     */
    private function getContainersAccessIds(ListView $object)
    {
        $containerAccessIds = [];
        /** @var Container $container */
        foreach ($object->getData() as $container) {
            $containerAccessIds[] = $container->getAccessId();
        }

        return $containerAccessIds;
    }
}
