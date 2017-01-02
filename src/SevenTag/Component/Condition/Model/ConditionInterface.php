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

namespace SevenTag\Component\Condition\Model;

use SevenTag\Api\AppBundle\Versionable\VersionableInterface;
use SevenTag\Component\Model\Model\TimestampableInterface;
use SevenTag\Component\Trigger\Model\Trigger;

interface ConditionInterface extends TimestampableInterface, VersionableInterface
{
    /**
     * @return integer
     */
    public function getId();

    /**
     * @param integer $id
     */
    public function setId($id);

    /**
     * @return string
     */
    public function getVariable();

    /**
     * @param string $variable
     */
    public function setVariable($variable);

    /**
     * @return string
     */
    public function getCondition();

    /**
     * @param string $condition
     */
    public function setCondition($condition);

    /**
     * @return string
     */
    public function getValue();

    /**
     * @param string $value
     */
    public function setValue($value);

    /**
     * @return Trigger
     */
    public function getTrigger();

    /**
     * @param Trigger $trigger
     */
    public function setTrigger(Trigger $trigger);
}
