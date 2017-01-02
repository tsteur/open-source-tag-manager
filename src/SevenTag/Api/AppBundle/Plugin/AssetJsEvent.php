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

use Doctrine\Common\Collections\Collection;
use Symfony\Component\EventDispatcher\Event;

/**
 * Class AssetJsEvent
 * @package SevenTag\Api\AppBundle\Plugin
 */
class AssetJsEvent extends Event
{
    /**
     * @var array
     */
    private $scripts = [];

    /**
     * @var string
     */
    private $target;

    /**
     * @param string $target
     * @param Collection $scripts
     */
    public function __construct($target, Collection $scripts)
    {
        $this->target = $target;
        $this->scripts = $scripts;
    }

    /**
     * @return Collection
     */
    public function getScripts()
    {
        return $this->scripts;
    }

    /**
     * @param Collection $scripts
     */
    public function setScripts(Collection $scripts)
    {
        $this->scripts = $scripts;
    }

    /**
     * @return string
     */
    public function getTarget()
    {
        return $this->target;
    }
}
