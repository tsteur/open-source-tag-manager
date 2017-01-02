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

namespace SevenTag\Api\TriggerBundle\TriggerType\Type;

use SevenTag\Api\TriggerBundle\VariableType\Click\ClassesVariableType;
use SevenTag\Api\TriggerBundle\VariableType\Click\IdVariableType;
use SevenTag\Api\TriggerBundle\VariableType\Click\UrlVariableType;

/**
 * Class ClickType
 * @package SevenTag\Api\TriggerBundle\Type
 */
class ClickType extends PageViewType
{
    /**
     * {@inheritdoc}
     */
    public function getAllowedVariables()
    {
        return array_merge(
            parent::getAllowedVariables(),
            [
                new ClassesVariableType(),
                new IdVariableType(),
                new UrlVariableType()
            ]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getType()
    {
        return self::TYPE_CLICK;
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'Click';
    }
}
