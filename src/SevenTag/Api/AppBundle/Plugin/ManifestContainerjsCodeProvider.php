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
 * Class ManifestContainerjsCodeProvider
 * @package SevenTag\Api\AppBundle\Plugin
 */
class ManifestContainerjsCodeProvider
{
    /**
     * @var ManifestRegistry
     */
    private $manifestRegistry;

    /**
     * @var string
     */
    private $webDir;

    /**
     * @param ManifestRegistry $manifestRegistry
     * @param string $webDir
     */
    public function __construct(ManifestRegistry $manifestRegistry, $webDir)
    {
        $this->manifestRegistry = $manifestRegistry;
        $this->webDir = $webDir;
    }

    /**
     * @return string
     */
    public function getCodeFromManifests()
    {
        $manifests = $this->manifestRegistry->all();
        $containerjsConfigFileContent = '';

        foreach ($manifests as $manifest) {
            $this->iterateThroughContainersConfigFiles($manifest, $containerjsConfigFileContent);
        }

        return $containerjsConfigFileContent;
    }

    /**
     * @param Manifest $manifest
     * @param string $containerjsConfigFileContent
     */
    private function iterateThroughContainersConfigFiles(Manifest $manifest, &$containerjsConfigFileContent)
    {
        foreach ($manifest->getContainerjsConfigs() as $containerjsConfig) {
            $path = $this->webDir . '/' . $containerjsConfig->getPath();
            $containerjsConfigFileContent .= file_get_contents($path);
        }
    }
}
