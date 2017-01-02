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

use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * Class PluginBundleTrait
 * @package SevenTag\Api\AppBundle\Plugin
 */
abstract class PluginAwareBundle extends Bundle implements PluginInterface
{
    /**
     * @var array
     */
    private $manifest;

    /**
     * @var bool
     */
    private $isManifestReady = false;

    /**
     * {@inheritdoc}
     */
    public function boot()
    {
        parent::boot();

        $this->prepareManifest();

    }

    /**
     * {@inheritdoc}
     */
    public function getManifest()
    {
        return $this->manifest;
    }

    /**
     * Read manifest.json in bundle path.
     */
    protected function prepareManifest()
    {
        $manifestFilePath = $this->getPath() . DIRECTORY_SEPARATOR . 'manifest.json';
        $manifestFactory = new ManifestFactory($manifestFilePath);

        if (!$this->isManifestReady) {
            $this->manifest = $manifestFactory->createManifest($this->getName());
            $this->isManifestReady = true;
            $this->addManifestToRegistry($this->manifest);
        }
    }

    /**
     * @param Manifest $manifest
     */
    private function addManifestToRegistry(Manifest $manifest)
    {
        $this->container->get('seven_tag.manifest_registry')->register($manifest);
    }
}
