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

/**
 * Class BaseType
 * @package SevenTag\Api\TriggerBundle\Type
 */
abstract class BaseType implements TypeInterface
{
    /**
     * {@inheritdoc}
     */
    public function getAllowedStrategies()
    {
        return [
            self::STRATEGY_ALWAYS,
            self::STRATEGY_CONDITIONS
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getAllowedActions($variable = null)
    {
        return [
            self::ACTION_CONTAINS => 'contains',
            self::ACTION_DOES_NOT_CONTAIN => 'doesn\'t contain',
            self::ACTION_STARTS_WITH => 'starts with',
            self::ACTION_ENDS_WITH => 'ends with',
            self::ACTION_EQUALS => 'equals',
            self::ACTION_DOES_NOT_EQUAL => 'doesn\'t equal',
            self::ACTION_REGEXP => 'regexp',
            self::ACTION_DOES_NOT_START_WITH => 'doesn\'t start with',
            self::ACTION_DOES_NOT_END_WITH => 'doesn\'t end with',
            self::ACTION_DOES_NOT_REGEXP => 'regexp doesn\'t equal',
        ];
    }
}
