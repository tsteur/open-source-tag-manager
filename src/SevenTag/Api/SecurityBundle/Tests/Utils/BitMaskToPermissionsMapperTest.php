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

use SevenTag\Api\SecurityBundle\Acl\MaskBuilder;
use SevenTag\Api\SecurityBundle\Permissions;
use SevenTag\Api\SecurityBundle\Utils\BitMaskToPermissionsMapper;

/**
 * Class BitMaskToPermissionsMapperTest
 * @package SevenTag\Api\SecurityBundle\Tests\Utils
 */
class BitMaskToPermissionsMapperTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     * @dataProvider getBitmaskValues
     * @param int $input
     * @param array $expected
     */
    public function itRetrievesPermissionsForGivenBitmask($input, array $expected)
    {
        $mapper = new BitMaskToPermissionsMapper();
        $result = $mapper->getPermissions($input);

        $this->assertEquals($result, $expected);
    }

    public function getBitmaskValues()
    {
        return [
            [
                MaskBuilder::MASK_OPERATOR | MaskBuilder::MASK_PUBLISH, [
                    Permissions::PERMISSION_VIEW,
                    Permissions::PERMISSION_EDIT,
                    Permissions::PERMISSION_PUBLISH,
                    Permissions::PERMISSION_OPERATOR
                ]
            ],
            [
                MaskBuilder::MASK_EDIT | MaskBuilder::MASK_PUBLISH, [
                    Permissions::PERMISSION_PUBLISH,
                    Permissions::PERMISSION_VIEW,
                    Permissions::PERMISSION_EDIT
                ]
            ],
            [
                MaskBuilder::MASK_EDIT, [
                    Permissions::PERMISSION_VIEW,
                    Permissions::PERMISSION_EDIT
                ]
            ],
            [
                MaskBuilder::MASK_VIEW, [
                    Permissions::PERMISSION_VIEW
                ]
            ],
            [
                MaskBuilder::MASK_CREATE, [
                    Permissions::PERMISSION_NOACCES
                ]
            ]
        ];
    }
}
