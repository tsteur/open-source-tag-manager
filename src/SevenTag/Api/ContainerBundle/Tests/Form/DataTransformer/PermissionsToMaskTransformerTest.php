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

namespace SevenTag\Api\ContainerBundle\Tests\Form\DataTransformer;

use Prophecy\Argument;
use SevenTag\Api\ContainerBundle\Form\DataTransformer\PermissionsToMaskTransformer;
use SevenTag\Api\SecurityBundle\Acl\MaskBuilder;
use SevenTag\Api\SecurityBundle\Permissions;

/**
 * Class PermissionsToMaskTransformerTest
 * @package SevenTag\Api\ContainerBundle\Tests\ModelResolver
 */
class PermissionsToMaskTransformerTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     * @dataProvider getTransformValues
     * @param int $argument
     * @param int $expected
     */
    public function itTransformsBitmaskToPermission($argument, $expected)
    {
        $maskTransformer = new PermissionsToMaskTransformer();
        $result = $maskTransformer->transform($argument);

        $this->assertEquals($result, $expected);
    }

    /**
     * @test
     * @dataProvider getReverseValues
     * @param int $argument
     * @param int $expected
     */
    public function itReversesTransform($argument, $expected)
    {
        $maskTransformer = new PermissionsToMaskTransformer();
        $result = $maskTransformer->reverseTransform($argument);

        $this->assertEquals($result, $expected);
    }

    /**
     * @return array
     */
    public function getTransformValues()
    {
        return [
            [MaskBuilder::MASK_OPERATOR, Permissions::PERMISSION_OPERATOR],
            [MaskBuilder::MASK_PUBLISH, Permissions::PERMISSION_PUBLISH],
            [MaskBuilder::MASK_EDIT, Permissions::PERMISSION_EDIT],
            [MaskBuilder::MASK_VIEW, Permissions::PERMISSION_VIEW],
            [MaskBuilder::MASK_CREATE, Permissions::PERMISSION_NOACCES]
        ];
    }

    /**
     * @return array
     */
    public function getReverseValues()
    {
        return [
            [Permissions::PERMISSION_OPERATOR, 301],
            [Permissions::PERMISSION_PUBLISH, 269],
            [Permissions::PERMISSION_EDIT, 13],
            [Permissions::PERMISSION_VIEW, 1],
            ['unknown', 0]
        ];
    }
}
