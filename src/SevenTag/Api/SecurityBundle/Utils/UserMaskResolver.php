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

namespace SevenTag\Api\SecurityBundle\Utils;

use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Api\ContainerBundle\Entity\ContainerPermission;
use SevenTag\Api\ContainerBundle\Entity\ContainerPermissionRepository;
use SevenTag\Api\SecurityBundle\Acl\MaskBuilder;
use SevenTag\Api\UserBundle\Entity\User;

/**
 * Class UserMaskResolver
 * @package SevenTag\Api\SecurityBundle\Permission\Utils
 */
class UserMaskResolver implements UserMaskResolverInterface
{
    /**
     * @var ContainerPermissionRepository
     */
    private $containerPermissionRepository;

    /**
     * @param ContainerPermissionRepository $containerPermissionRepository
     */
    public function __construct(ContainerPermissionRepository $containerPermissionRepository)
    {
        $this->containerPermissionRepository = $containerPermissionRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function resolve(User $user, ContainerInterface $container)
    {
        if ($user->isSuperAdmin()) {
            return MaskBuilder::MASK_OPERATOR;
        }

        $containerPermission = $this->findContainerPermission($user, $container);

        if ($containerPermission) {
            return $containerPermission->getPermissions();
        }

        return 0;
    }

    /**
     * @param User $user
     * @param ContainerInterface $container
     * @return ContainerPermission
     */
    private function findContainerPermission(User $user, ContainerInterface $container)
    {
        /** @var ContainerPermission $containerPermission */
        $containerPermission = $this->containerPermissionRepository->findOneBy(
            [
                'user' => $user,
                'containerAccessId' => $container->getAccessId()
            ]
        );

        return $containerPermission;
    }
}
