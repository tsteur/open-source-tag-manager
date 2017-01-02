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
 * Interface TypeInterface
 * @package SevenTag\Api\TriggerBundle\Type
 */
interface TypeInterface
{
    const TYPE_PAGE_VIEW = 0;
    const TYPE_CLICK = 1;
    const TYPE_EVENT = 2;
    const TYPE_FORM_SUBMISSION = 3;
    const TYPE_DOM_READY = 4;
    const TYPE_PAGE_LOAD = 5;

    const STRATEGY_ALWAYS = 0;
    const STRATEGY_CONDITIONS = 1;

    const ACTION_CONTAINS = 'contains';
    const ACTION_DOES_NOT_CONTAIN = 'does_not_contain';
    const ACTION_STARTS_WITH = 'starts_with';
    const ACTION_DOES_NOT_START_WITH = 'does_not_start_with';
    const ACTION_DOES_NOT_END_WITH = 'does_not_end_with';
    const ACTION_ENDS_WITH = 'ends_with';
    const ACTION_EQUALS = 'equals';
    const ACTION_DOES_NOT_EQUAL = 'does_not_equal';
    const ACTION_REGEXP = 'regexp';
    const ACTION_DOES_NOT_REGEXP = 'does_not_regexp';

    /**
     * @return array
     */
    public function getAllowedStrategies();

    /**
     * @return array
     */
    public function getAllowedVariables();

    /**
     * @param $variable
     * @return array
     */
    public function getAllowedActions($variable = null);

    /**
     * @return int
     */
    public function getType();

    /**
     * @return string
     */
    public function getName();
}
