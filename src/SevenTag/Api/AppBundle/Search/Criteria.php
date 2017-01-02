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

namespace SevenTag\Api\AppBundle\Search;

use SevenTag\Api\ContainerBundle\Search\Exception\SearchEngineException;
use SevenTag\Component\User\Model\UserInterface;

class Criteria extends \ArrayObject
{
    /**
     * @param array
     */
    public function __construct(array $array)
    {
        parent::__construct($array, \ArrayObject::ARRAY_AS_PROPS);
    }

    /**
     * @return UserInterface
     */
    public function getUser()
    {
        if (!$this->hasUser()) {
            throw new SearchEngineException('Criteria does not contains user.');
        }

        return $this->user;
    }

    /**
     * @return bool
     */
    public function hasUser()
    {
        return isset($this->user) && $this->user instanceof UserInterface;
    }

    /**
     * @return bool
     */
    public function hasLimit()
    {
        return isset($this->limit);
    }

    /**
     * @return int
     */
    public function getLimit()
    {
        if (!$this->hasLimit()) {
            throw new SearchEngineException('Criteria does not contains limit.');
        }

        return (int)$this->limit;
    }

    /**
     * @return bool
     */
    public function hasOffset()
    {
        return isset($this->offset);
    }

    /**
     * @return int
     */
    public function getOffset()
    {
        if (!$this->hasOffset()) {
            throw new SearchEngineException('Criteria does not contains offset.');
        }

        return (int)$this->offset;
    }
}
