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

namespace SevenTag\Api\ContainerBundle\ContainerLibrary\Template;

use SevenTag\Component\Container\Model\ContainerInterface;

/**
 * Class Context
 * @package SevenTag\Api\ContainerBundle\ContainerLibrary\Template
 */
class Context
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * @var bool
     */
    private $debugVerification;

    /**
     * @var string
     */
    private $content = '';

    /**
     * @param ContainerInterface $container
     * @param bool $debugVerification
     */
    public function __construct(ContainerInterface $container, $debugVerification = true)
    {
        $this->container = $container;
        $this->debugVerification = $debugVerification;
    }

    /**
     * @return string
     */
    public function getContent()
    {
        return (string)$this->content;
    }

    /**
     * @param string $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return ContainerInterface
     */
    public function getContainer()
    {
        return $this->container;
    }

    /**
     * @return boolean
     */
    public function isDebugVerification()
    {
        return $this->debugVerification;
    }
}
