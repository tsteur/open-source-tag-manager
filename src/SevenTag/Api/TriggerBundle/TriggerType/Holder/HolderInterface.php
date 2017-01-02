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

namespace SevenTag\Api\TriggerBundle\TriggerType\Holder;

use SevenTag\Api\TriggerBundle\TriggerType\Type\TypeInterface;

/**
 * Interface HolderInterface
 * @package SevenTag\Api\TriggerBundle\Holder
 */
interface HolderInterface
{
    /**
     * @param TypeInterface $type
     * @return boolean
     */
    public function add(TypeInterface $type);

    /**
     * @param TypeInterface $type
     * @return boolean
     */
    public function has(TypeInterface $type);

    /**
     * @param TypeInterface $type
     * @return boolean
     */
    public function remove(TypeInterface $type);

    /**
     * @return array
     */
    public function getTypes();
}
