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

use SevenTag\Api\SecurityBundle\Acl\MaskBuilder;
use SevenTag\Api\SecurityBundle\Permissions;

/**
 * Class BitMaskToPermissionsMapper
 * @package SevenTag\Api\SecurityBundle\Utils
 */
class BitMaskToPermissionsMapper implements \SevenTag\Api\SecurityBundle\Utils\BitMaskToPermissionsMapperInterface
{
    /**
     * @var array
     */
    protected $map;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->map = [
            MaskBuilder::MASK_OPERATOR => [
                Permissions::PERMISSION_VIEW,
                Permissions::PERMISSION_EDIT,
                Permissions::PERMISSION_PUBLISH,
                Permissions::PERMISSION_OPERATOR
            ],
            MaskBuilder::MASK_PUBLISH => [
                Permissions::PERMISSION_PUBLISH,
                Permissions::PERMISSION_VIEW,
                Permissions::PERMISSION_EDIT
            ],
            MaskBuilder::MASK_EDIT => [
                Permissions::PERMISSION_VIEW,
                Permissions::PERMISSION_EDIT
            ],
            MaskBuilder::MASK_VIEW => [
                Permissions::PERMISSION_VIEW
            ]
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getPermissions($bitmask)
    {
        foreach ($this->map as $mask => $permissions) {
            if (($mask & $bitmask) === $mask) {
                return $permissions;
            }
        }

        return [Permissions::PERMISSION_NOACCES];
    }
}
