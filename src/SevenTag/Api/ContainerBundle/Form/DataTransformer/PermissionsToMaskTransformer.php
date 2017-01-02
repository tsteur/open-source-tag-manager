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

namespace SevenTag\Api\ContainerBundle\Form\DataTransformer;

use SevenTag\Api\SecurityBundle\Acl\MaskBuilder;
use Symfony\Component\Form\DataTransformerInterface;
use SevenTag\Api\SecurityBundle\Permissions;

/**
 * Class PermissionsToMaskTransformer
 * @package SevenTag\Api\ContainerBundle\Form\DataTransformer
 */
class PermissionsToMaskTransformer implements DataTransformerInterface
{
    /**
     * {@inheritdoc}
     */
    public function transform($bitMask)
    {
        if ($this->checkBitMask(MaskBuilder::MASK_OPERATOR, $bitMask)) {
            return Permissions::PERMISSION_OPERATOR;
        }

        if ($this->checkBitMask(MaskBuilder::MASK_PUBLISH, $bitMask)) {
            return Permissions::PERMISSION_PUBLISH;
        }

        if ($this->checkBitMask(MaskBuilder::MASK_EDIT, $bitMask)) {
            return Permissions::PERMISSION_EDIT;
        }

        if ($this->checkBitMask(MaskBuilder::MASK_VIEW, $bitMask)) {
            return Permissions::PERMISSION_VIEW;
        }

        return Permissions::PERMISSION_NOACCES;
    }

    /**
     * {@inheritdoc}
     */
    public function reverseTransform($permission)
    {
        $maskBuilder = new MaskBuilder();

        if (Permissions::PERMISSION_OPERATOR === $permission) {
            $maskBuilder
                ->add('operator')
                ->add('publish')
                ->add('edit')
                ->add('view')
                ->add('delete');
        }

        if (Permissions::PERMISSION_PUBLISH === $permission) {
            $maskBuilder
                ->add('publish')
                ->add('edit')
                ->add('view')
                ->add('delete');
        }

        if (Permissions::PERMISSION_EDIT === $permission) {
            $maskBuilder
                ->add('edit')
                ->add('view')
                ->add('delete');
        }

        if (Permissions::PERMISSION_VIEW === $permission) {
            $maskBuilder->add('view');
        }

        return $maskBuilder->get();
    }

    /**
     * @param int $mask
     * @param int $bitmask
     * @return bool
     */
    private function checkBitMask($mask, $bitmask)
    {
        return ($mask & $bitmask) === $mask;
    }
}
