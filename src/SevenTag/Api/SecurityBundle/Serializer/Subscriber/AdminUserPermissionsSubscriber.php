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
use SevenTag\Api\SecurityBundle\Acl\MaskBuilder;
use SevenTag\Api\UserBundle\Entity\User;

/**
 * Class AdminUserPermissionsSubscriber
 * @package SevenTag\Api\SecurityBundle\Serializer\Subscriber
 */
class AdminUserPermissionsSubscriber extends AbstractContainersPermissionsSubscriber
{
    /**
     * {@inheritdoc}
     */
    protected function isSupported(User $user, ListView $object)
    {
        return $user->isSuperAdmin();
    }

    /**
     * {@inheritdoc}
     */
    protected function handlePermissions(User $user, ListView $object)
    {
        /** @var Container $container */
        foreach ($object->getData() as $container) {
            $container->setPermissions(
                $this->bitMaskToPermissionsMapper->getPermissions(MaskBuilder::MASK_OPERATOR)
            );
        }
    }
}
