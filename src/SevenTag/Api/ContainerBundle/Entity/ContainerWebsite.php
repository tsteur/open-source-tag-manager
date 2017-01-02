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

namespace SevenTag\Api\ContainerBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ContainerWebsite
 */
class ContainerWebsite
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var Container
     */
    private $container;

    /**
     * @var string
     */
    private $url;
    
    /**
     * @var integer
     */
    private $parameterType;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return Container
     */
    public function getContainer()
    {
        return $this->container;
    }

    /**
     * @param Container $container
     * @return ContainerWebsite
     */
    public function setContainer(Container $container)
    {
        $this->container = $container;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param string $url
     * @return ContainerWebsite
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * @return integer
     */
    public function getParameterType()
    {
        return $this->parameterType;
    }

    /**
     * @param integer $parameterType
     * @return ContainerWebsite
     */
    public function setParameterType($parameterType)
    {
        $this->parameterType = $parameterType;

        return $this;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->url;
    }
}
