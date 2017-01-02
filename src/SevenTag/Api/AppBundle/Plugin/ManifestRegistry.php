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

use SevenTag\Api\AppBundle\Plugin\Exception\ExistingManifestException;
use SevenTag\Api\AppBundle\Plugin\Exception\NonExistingManifestException;

/**
 * Class ManifestRegistry
 * @package SevenTag\Api\AppBundle\Plugin
 */
class ManifestRegistry
{
    /**
     * @var array
     */
    private $manifests = [];

    /**
     * @return Manifest[]|array
     */
    public function all()
    {
        return $this->manifests;
    }

    /**
     * @param Manifest $manifest
     */
    public function register(Manifest $manifest)
    {
        if ($this->has($manifest->getName())) {
            throw new ExistingManifestException($manifest->getName());
        }

        $this->manifests[$manifest->getName()] = $manifest;
    }

    /**
     * @param string $manifestName
     */
    public function unregister($manifestName)
    {
        if (!$this->has($manifestName)) {
            throw new NonExistingManifestException($manifestName);
        }

        unset($this->manifests[$manifestName]);
    }

    /**
     * @param string $manifestName
     * @return bool
     */
    public function has($manifestName)
    {
        return isset($this->manifests[$manifestName]);
    }

    /**
     * @param string $manifestName
     * @return Manifest
     */
    public function get($manifestName)
    {
        if (!$this->has($manifestName)) {
            throw new NonExistingManifestException($manifestName);
        }

        return $this->manifests[$manifestName];
    }
}
