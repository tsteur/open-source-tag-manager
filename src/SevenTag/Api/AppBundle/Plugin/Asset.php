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

/**
 * Class Asset
 * @package SevenTag\Api\AppBundle\Plugin
 */
class Asset
{
    const TARGET_TOP = 'top';
    const TARGET_BOTTOM = 'bottom';

    /**
     * @var string
     */
    private $path;

    /**
     * @var string
     */
    private $target;

    /**
     * @var boolean
     */
    private $externalPath = false;

    /**
     * @param string $path
     * @param string $target
     * @param bool $externalPath
     */
    public function __construct($path, $target, $externalPath = false)
    {
        if ($target !== self::TARGET_BOTTOM && $target !== self::TARGET_TOP) {
            throw new \LogicException(sprintf("You can only place asset using options %s and %s", self::TARGET_BOTTOM, self::TARGET_TOP));
        }

        $this->path = $path;
        $this->target = $target;
        $this->externalPath = $externalPath;
    }

    /**
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * @return string
     */
    public function getTarget()
    {
        return $this->target;
    }

    /**
     * @return boolean
     */
    public function isExternalPath()
    {
        return $this->externalPath;
    }
}
