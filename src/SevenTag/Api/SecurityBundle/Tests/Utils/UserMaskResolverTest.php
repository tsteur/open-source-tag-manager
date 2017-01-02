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

use Prophecy\Argument;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Api\ContainerBundle\Entity\ContainerPermission;
use SevenTag\Api\ContainerBundle\Entity\ContainerPermissionRepository;
use SevenTag\Api\SecurityBundle\Acl\MaskBuilder;
use SevenTag\Api\UserBundle\Entity\User;
use SevenTag\Api\SecurityBundle\Utils\UserMaskResolver;

/**
 * Class UserMaskResolverTest
 * @package SevenTag\Api\SecurityBundle\Tests\Utils
 */
class UserMaskResolverTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itResolvesOperatorMaskForSuperAdminUser()
    {
        $user = $this->getUserMock(true);
        $containerPermissionRepository = $this->getContainerPermissionRepositoryMock();
        $container = $this->getContainerMock();
        $resolver = new UserMaskResolver($containerPermissionRepository);
        $result = $resolver->resolve($user, $container);

        $this->assertEquals(MaskBuilder::MASK_OPERATOR, $result);
    }

    /**
     * @test
     */
    public function itResolvesMaskForNonSuperAdminUser()
    {
        $permission = new ContainerPermission();
        $permission->setPermissions(MaskBuilder::MASK_PUBLISH);
        $user = $this->getUserMock();
        $containerPermissionRepository = $this->getContainerPermissionRepositoryMock($permission);
        $container = $this->getContainerMock();
        $resolver = new UserMaskResolver($containerPermissionRepository);
        $result = $resolver->resolve($user, $container);

        $this->assertEquals(MaskBuilder::MASK_PUBLISH, $result);
    }

    /**
     * @test
     */
    public function itResolvesZeroMaskForNonSuperAdminUserWithoutPermissions()
    {
        $user = $this->getUserMock();
        $container = $this->getContainerMock();
        $containerPermissionRepository = $this->getContainerPermissionRepositoryMock();
        $resolver = new UserMaskResolver($containerPermissionRepository);
        $result = $resolver->resolve($user, $container);

        $this->assertEquals($result, 0);
    }

    /**
     * @param bool $isSuperAdmin
     * @return User
     */
    private function getUserMock($isSuperAdmin = false)
    {
        $user = $this->prophesize('SevenTag\Api\UserBundle\Entity\User');

        $user
            ->isSuperAdmin()
            ->willReturn($isSuperAdmin);

        return $user->reveal();
    }

    /**
     * @return ContainerInterface
     */
    private function getContainerMock()
    {
        $container = $this->prophesize('SevenTag\Component\Container\Model\ContainerInterface');

        return $container->reveal();
    }

    /**
     * @param ContainerPermission $permission
     * @return ContainerPermissionRepository
     */
    private function getContainerPermissionRepositoryMock(ContainerPermission $permission = null)
    {
        $containerPermissionRepository = $this
            ->prophesize('SevenTag\Api\ContainerBundle\Entity\ContainerPermissionRepository');

        $containerPermissionRepository->findOneBy(Argument::any())
            ->willReturn($permission);

        return $containerPermissionRepository->reveal();
    }
}
