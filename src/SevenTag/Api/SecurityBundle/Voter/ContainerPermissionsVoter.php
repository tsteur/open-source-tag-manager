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

namespace SevenTag\Api\SecurityBundle\Voter;

use SevenTag\Api\ContainerBundle\Entity\ContainerPermission;
use SevenTag\Api\ContainerBundle\Entity\ContainerPermissionRepository;
use SevenTag\Api\SecurityBundle\Acl\PermissionMap;
use SevenTag\Api\UserBundle\Entity\User;
use Symfony\Component\Security\Core\Authorization\Voter\AbstractVoter;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Class ContainerPermissionsVoter
 * @package SevenTag\Api\ContainerBundle\Voter
 */
class ContainerPermissionsVoter extends AbstractVoter
{
    /**
     * @var ContainerPermissionRepository
     */
    private $containerPermissionRepository;

    /**
     * @param $containerPermissionRepository
     */
    public function __construct(ContainerPermissionRepository $containerPermissionRepository)
    {
        $this->containerPermissionRepository = $containerPermissionRepository;
    }

    /**
     * {@inheritdoc}
     */
    protected function getSupportedAttributes()
    {
        return [
            PermissionMap::PERMISSION_PUBLISH,
            PermissionMap::PERMISSION_DELETE,
            PermissionMap::PERMISSION_VIEW,
            PermissionMap::PERMISSION_EDIT,
            PermissionMap::PERMISSION_OPERATOR
        ];
    }

    /**
     * {@inheritdoc}
     */
    protected function getSupportedClasses()
    {
        return ['SevenTag\Api\ContainerBundle\Entity\Container'];
    }

    /**
     * {@inheritdoc}
     */
    protected function isGranted($attribute, $container, $user = null)
    {
        if (!$user instanceof UserInterface) {
            return false;
        }

        if (in_array(User::ROLE_SUPER_ADMIN, $user->getRoles())) {
            return true;
        }
        
        $containerPermission = $this->findContainerPermission($container, $user);
        if ($containerPermission) {
            $permissionMap = new PermissionMap();
            $permissions = $containerPermission->getPermissions();
            foreach ($permissionMap->getMasks($attribute, null) as $mask) {
                if (($permissions & $mask) === $mask) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * @param $container
     * @param $user
     * @return ContainerPermission
     */
    private function findContainerPermission($container, $user)
    {
        /** @var ContainerPermission $containerPermission */
        $containerPermission = $this->containerPermissionRepository
            ->findOneBy(
                [
                    'containerAccessId' => $container->getAccessId(),
                    'user' => $user
                ]
            );

        return $containerPermission;
    }
}
