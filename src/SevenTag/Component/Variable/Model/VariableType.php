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

namespace SevenTag\Component\Variable\Model;

/**
 * Class VariableType
 * @package SevenTag\Component\Variable\Model
 */
class VariableType implements VariableTypeInterface
{
    /**
     * @var string
     */
    protected $id;

    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    protected $collectorName;

    /**
     * @var string
     */
    protected $helper;

    /**
     * @param string $id
     * @param string $name
     * @param string$collectorName
     * @param string $helper
     */
    public function __construct($id, $name, $collectorName, $helper)
    {
        $this->id = $id;
        $this->name = $name;
        $this->collectorName = $collectorName;
        $this->helper = $helper;
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
    public function getName()
    {
        return $this->name;
    }

    /**
     * {@inheritdoc}
     */
    public function getCollectorName()
    {
        return $this->collectorName;
    }

    /**
     * {@inheritdoc}
     */
    public function getHelper()
    {
        return $this->helper;
    }
}
