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

namespace SevenTag\Api\SecurityBundle\Acl;

use Symfony\Component\Security\Acl\Permission\BasicPermissionMap;

/**
 * Class PermissionMap
 * @package SevenTag\Api\ContainerBundle\Acl
 */
class PermissionMap extends BasicPermissionMap
{
    const PERMISSION_PUBLISH = 'PUBLISH';

    public function __construct()
    {
        parent::__construct();

        array_push($this->map[self::PERMISSION_VIEW], MaskBuilder::MASK_PUBLISH);
        array_push($this->map[self::PERMISSION_EDIT], MaskBuilder::MASK_PUBLISH);

        array_push($this->map[self::PERMISSION_OPERATOR], MaskBuilder::MASK_PUBLISH);

        $this->map[self::PERMISSION_PUBLISH] = [
            MaskBuilder::MASK_PUBLISH,
            MaskBuilder::MASK_OPERATOR,
            MaskBuilder::MASK_MASTER,
            MaskBuilder::MASK_OWNER,
        ];
    }
}
