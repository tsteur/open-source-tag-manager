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
 * Class Holder
 * @package SevenTag\Api\TriggerBundle\TypeHolder
 */
class Holder implements HolderInterface
{
    /**
     * @var array
     */
    private $types = [];

    /**
     * {@inheritdoc}
     */
    public function add(TypeInterface $type)
    {
        if ($this->has($type)) {
            throw new \LogicException(
                sprintf('Trigger type "%s" already exists in factory.', $type->getType())
            );
        }

        $this->types[$type->getType()] = $type;
    }

    /**
     * {@inheritdoc}
     */
    public function has(TypeInterface $type)
    {
        return isset($this->types[$type->getType()]);
    }

    /**
     * {@inheritdoc}
     */
    public function remove(TypeInterface $type)
    {
        if ($this->has($type)) {
            unset($this->types[$type->getType()]);

            return true;
        }

        return false;
    }

    /**
     * {@inheritdoc}
     */
    public function getTypes()
    {
        return $this->types;
    }
}
