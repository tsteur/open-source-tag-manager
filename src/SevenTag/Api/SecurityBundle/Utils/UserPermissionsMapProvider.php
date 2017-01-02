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

use SevenTag\Api\ContainerBundle\Entity\ContainerPermission;
use SevenTag\Api\ContainerBundle\Entity\ContainerPermissionRepository;
use SevenTag\Api\UserBundle\Entity\User;

/**
 * Class UserPermissionsMapProvider
 * @package SevenTag\Api\SecurityBundle\Permission\Utils
 */
class UserPermissionsMapProvider implements UserPermissionsMapProviderInterface
{
    /**
     * @var ContainerPermissionRepository
     */
    private $containerPermissionRepository;

    /**
     * @var \SevenTag\Api\SecurityBundle\Utils\BitMaskToPermissionsMapperInterface
     */
    private $bitMaskToPermissionsMapper;

    /**
     * @param ContainerPermissionRepository $containerPermissionRepository
     * @param BitMaskToPermissionsMapperInterface $bitMaskToPermissionsMapper
     */
    public function __construct(
        ContainerPermissionRepository $containerPermissionRepository,
        BitMaskToPermissionsMapperInterface $bitMaskToPermissionsMapper
    ) {
        $this->containerPermissionRepository = $containerPermissionRepository;
        $this->bitMaskToPermissionsMapper = $bitMaskToPermissionsMapper;
    }

    /**
     * {@inheritdoc}
     */
    public function getPermissionsMap(User $user, array $containerAccessIds)
    {
        $containerPermissions = $this->containerPermissionRepository
            ->findByUserAndContainerAccessIds($user, $containerAccessIds);

        $permissionsMap = [];
        /** @var ContainerPermission $containerPermission */
        foreach ($containerPermissions as $containerPermission) {
            foreach ($containerAccessIds as $containerAccessId) {
                if ($containerAccessId === $containerPermission->getContainerAccessId()) {
                    $permissionsMap[$containerAccessId] = $this->bitMaskToPermissionsMapper->getPermissions(
                        $containerPermission->getPermissions()
                    );
                }
            }
        }

        return $permissionsMap;
    }
}
