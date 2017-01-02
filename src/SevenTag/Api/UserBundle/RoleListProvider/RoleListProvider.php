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

namespace SevenTag\Api\UserBundle\RoleListProvider;

/**
 * Class RoleListProvider
 * @package SevenTag\Api\UserBundle\RoleListProvider
 */
class RoleListProvider implements RoleListProviderInterface
{
    /**
     * @var array
     */
    private $roles;

    /**
     * @param array $roles
     */
    public function __construct(array $roles)
    {
        $this->roles = $roles;
    }

    /**
     * {@inheritdoc}
     */
    public function getRoles()
    {
        $roles = [];
        foreach ($this->roles as $name => $rolesHierarchy) {
            $roles[$name] = $name.': '.implode(', ', $rolesHierarchy);

            foreach ($rolesHierarchy as $role) {
                if (!isset($roles[$role])) {
                    $roles[$role] = $role;
                }
            }
        }

        return $roles;
    }
}
