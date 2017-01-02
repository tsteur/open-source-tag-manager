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

namespace SevenTag\Api\UserBundle\PermissionsProvider;

use SevenTag\Api\SecurityBundle\Utils\BitMaskToPermissionsMapperInterface;
use SevenTag\Api\SecurityBundle\Utils\UserMaskResolverInterface;
use SevenTag\Api\UserBundle\Entity\User;
use SevenTag\Api\UserBundle\Entity\UserRepository;
use SevenTag\Component\Container\Model\ContainerInterface;

/**
 * Class PermissionsProvider
 * @package SevenTag\Api\UserBundle\PermissionsProvider
 */
class PermissionsProvider implements PermissionsProviderInterface
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var BitMaskToPermissionsMapperInterface
     */
    private $bitMaskPermissionsMapper;

    /**
     * @var UserMaskResolverInterface
     */
    private $userMaskResolver;

    /**
     * @param UserRepository $userRepository
     * @param BitMaskToPermissionsMapperInterface $bitMaskPermissionsMapper
     * @param UserMaskResolverInterface $userMaskResolver
     */
    public function __construct(
        UserRepository $userRepository,
        BitMaskToPermissionsMapperInterface $bitMaskPermissionsMapper,
        UserMaskResolverInterface $userMaskResolver
    ) {
        $this->userRepository = $userRepository;
        $this->bitMaskPermissionsMapper = $bitMaskPermissionsMapper;
        $this->userMaskResolver = $userMaskResolver;
    }


    /**
     * {@inheritdoc}
     */
    public function getPermissions(ContainerInterface $container, User $excludedUser, $limit = 20, $offset = 0)
    {
        $users = $this->userRepository->findWithoutUser(
            $excludedUser,
            $limit,
            $offset
        );

        $userWithPermissions = [];
        /** @var User $user */
        foreach ($users as $user) {
            $userWithPermissions[] = [
                'user' => $user,
                'permissions' => $this->bitMaskPermissionsMapper->getPermissions(
                    $this->userMaskResolver->resolve($user, $container)
                )
            ];
        }

        return [
            'data' => $userWithPermissions,
            'total' => $this->userRepository->countWithoutUser($excludedUser)
        ];
    }
}
