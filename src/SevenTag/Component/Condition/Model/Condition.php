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

use SevenTag\Api\AppBundle\Versionable\Traits\VersionableEntity;
use SevenTag\Component\Model\Traits\TimestampableEntity;
use SevenTag\Component\Trigger\Model\Trigger;

class Condition implements ConditionInterface
{
    use TimestampableEntity;
    use VersionableEntity;

    /** @var integer */
    protected $id;

    /** @var string */
    protected $variable;

    /** @var string */
    protected $condition;

    /** @var string */
    protected $value;

    /** @var Trigger */
    protected $trigger;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->initTimestampable();
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * {@inheritdoc}
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * {@inheritdoc}
     */
    public function getVariable()
    {
        return $this->variable;
    }

    /**
     * {@inheritdoc}
     */
    public function setVariable($variable)
    {
        $this->variable = $variable;
    }

    /**
     * {@inheritdoc}
     */
    public function getCondition()
    {
        return $this->condition;
    }

    /**
     * {@inheritdoc}
     */
    public function setCondition($condition)
    {
        $this->condition = $condition;
    }

    /**
     * {@inheritdoc}
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * {@inheritdoc}
     */
    public function setValue($value)
    {
        $this->value = $value;
    }

    /**
     * {@inheritdoc}
     */
    public function getTrigger()
    {
        return $this->trigger;
    }

    /**
     * {@inheritdoc}
     */
    public function setTrigger(Trigger $trigger)
    {
        $this->trigger = $trigger;
    }
}
