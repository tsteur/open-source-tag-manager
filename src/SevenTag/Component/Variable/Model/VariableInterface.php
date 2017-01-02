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

use SevenTag\Api\AppBundle\Versionable\VersionableInterface;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Model\Model\TimestampableInterface;

/**
 * Interface VariableInterface
 * @package SevenTag\Component\Variable\Model
 */
interface VariableInterface extends TimestampableInterface, VersionableInterface
{
    /**
     * Get identification
     *
     * @return mixed
     */
    public function getId();

    /**
     * Set name
     *
     * @param  string $name
     * @return self
     */
    public function setName($name);

    /**
     * Get name
     *
     * @return string
     */
    public function getName();

    /**
     * Set description
     *
     * @param string $description
     * @return self
     */
    public function setDescription($description);

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription();

    /**
     * Set value
     *
     * @param string $value
     * @return self
     */
    public function setValue($value);

    /**
     * Get value
     *
     * @return string
     */
    public function getValue();

    /**
     * Set type
     *
     * @param mixed $type
     * @return self
     */
    public function setType($type);

    /**
     * @return mixed
     */
    public function getType();

    /**
     * Get related container
     *
     * @return ContainerInterface
     */
    public function getContainer();

    /**
     * Set related container
     *
     * @param ContainerInterface $container
     * @return self
     */
    public function setContainer(ContainerInterface $container);

    /**
     * @return mixed
     */
    public function getContainerAccessId();

    /**
     * Set options
     *
     * @param array $options
     * @return self
     */
    public function setOptions(array $options = []);

    /**
     * Get options
     *
     * @return array
     */
    public function getOptions();
}
