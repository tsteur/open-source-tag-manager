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

namespace SevenTag\Api\AppBundle\Plugin;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * Class Manifest
 * @package SevenTag\Api\AppBundle\Plugin
 */
class Manifest
{
    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $version;

    /**
     * @var Asset[]|ArrayCollection
     */
    private $assetsJS = [];

    /**
     * @var ContainerjsConfig[]|ArrayCollection
     */
    private $containerjsConfigs = [];

    /**
     * @param string $name
     * @param string $version
     * @param Asset[]|ArrayCollection $assetsJS
     * @param ArrayCollection $containerjsConfigs
     */
    public function __construct($name, $version, ArrayCollection $assetsJS, ArrayCollection $containerjsConfigs)
    {
        $this->name = $name;
        $this->version = $version;
        $this->assetsJS = $assetsJS;
        $this->containerjsConfigs = $containerjsConfigs;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getVersion()
    {
        return $this->version;
    }

    /**
     * @param null $target
     * @return ArrayCollection|Asset[]
     */
    public function getAssetsJS($target = null)
    {
        if ($target === null) {
            return $this->assetsJS;
        }

        return $this->assetsJS->filter(function (Asset $item) use ($target) {
            return $item->getTarget() === $target;
        });
    }

    /**
     * @return ArrayCollection|ContainerjsConfig[]
     */
    public function getContainerjsConfigs()
    {
        return $this->containerjsConfigs;
    }
}
