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

namespace SevenTag\Api\SecurityBundle\Tests\Utils;

use SevenTag\Api\ContainerBundle\Entity\ContainerPermission;
use SevenTag\Api\ContainerBundle\Entity\ContainerPermissionRepository;
use SevenTag\Api\SecurityBundle\Acl\MaskBuilder;
use SevenTag\Api\SecurityBundle\Permissions;
use SevenTag\Api\SecurityBundle\Utils\BitMaskToPermissionsMapper;
use SevenTag\Api\UserBundle\Entity\User;
use SevenTag\Api\SecurityBundle\Utils\UserPermissionsMapProvider;

/**
 * Class UserPermissionsMapProviderTest
 * @package SevenTag\Api\SecurityBundle\Tests\Utils
 */
class UserPermissionsMapProviderTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itReturnsPermissionsMap()
    {
        $user = $this->getUserMock();
        $repository = $this->getContainerPermissionRepository($user);
        $userPermissionsMapProvider = new UserPermissionsMapProvider($repository, new BitMaskToPermissionsMapper());
        $containerAccessIds = [123, 251];
        $result = $userPermissionsMapProvider->getPermissionsMap($user, $containerAccessIds);

        $this->assertEquals($result, [
            123 => [
                Permissions::PERMISSION_PUBLISH,
                Permissions::PERMISSION_VIEW,
                Permissions::PERMISSION_EDIT
            ]
        ]);
    }

    /**
     * @param User $user
     * @return ContainerPermissionRepository
     */
    private function getContainerPermissionRepository(User $user)
    {
        $containerAccessIds = [123, 251];
        $containerPermission = new ContainerPermission();
        $containerPermission->setPermissions(MaskBuilder::MASK_PUBLISH);
        $containerPermission->setContainerAccessId(123);
        $containerPermissions = [$containerPermission];

        $containerPermissionRepository = $this
            ->prophesize('SevenTag\Api\ContainerBundle\Entity\ContainerPermissionRepository');

        $containerPermissionRepository
            ->findByUserAndContainerAccessIds($user, $containerAccessIds)
            ->willReturn($containerPermissions);

        return $containerPermissionRepository->reveal();
    }

    /**
     * @return User
     */
    private function getUserMock()
    {
        $user = $this->prophesize('SevenTag\Api\UserBundle\Entity\User');

        return $user->reveal();
    }
}
