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
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class ManifestFactory
 * @package SevenTag\Api\AppBundle\Plugin
 */
class ManifestFactory implements ManifestFactoryInterface
{
    /**
     * @var string
     */
    private $manifestFilePath;

    /**
     * @param string $manifestFilePath
     */
    public function __construct($manifestFilePath)
    {
        if (!is_file($manifestFilePath)) {
            throw new \LogicException(sprintf('Cannot find manifest.json file in path %s.', $manifestFilePath));
        }

        $this->manifestFilePath = $manifestFilePath;
    }

    /**
     * {@inheritdoc}
     */
    public function createManifest($bundleName)
    {
        $manifestData = $this->validateManifest(json_decode(file_get_contents($this->manifestFilePath), true));
        $assetCollection = new ArrayCollection();
        $containerjsConfigs = new ArrayCollection();
        $this->collectAssetsJs($assetCollection, $manifestData);
        $this->collectContainerjsConfig($containerjsConfigs, $manifestData, $bundleName);

        return new Manifest($manifestData['name'], $manifestData['version'], $assetCollection, $containerjsConfigs);
    }

    /**
     * @param array $manifest
     * @return array
     */
    private function validateManifest(array $manifest)
    {
        $optionResolver = new OptionsResolver();
        $optionResolver->setRequired([
            'name',
            'version'
        ]);

        $optionResolver->setDefined([
            'assets-js',
            'containerjs-configs'
        ]);

        $optionResolver->setAllowedTypes([
            'name' => 'string',
            'version' => 'string',
            'assets-js' => 'array',
            'containerjs-configs' => 'array'
        ]);

        return $optionResolver->resolve($manifest);
    }

    /**
     * @param string $bundleName
     * @return string
     */
    private function getBundleTargetDir($bundleName)
    {
        $bundlesDir = '/bundles/';

        return $bundlesDir.preg_replace('/bundle$/', '', strtolower($bundleName));
    }

    /**
     * @param ArrayCollection $assetCollection
     * @param array $manifestData
     */
    private function collectAssetsJs(ArrayCollection $assetCollection, array $manifestData)
    {
        foreach ($manifestData['assets-js'] as $asset) {
            $assetCollection->add(new Asset($asset['path'], $asset['target'], $asset['externalPath']));
        }
    }

    /**
     * @param ArrayCollection $containerjsConfigs
     * @param array $manifestData
     * @param string $bundleName
     */
    private function collectContainerjsConfig(ArrayCollection $containerjsConfigs, array $manifestData, $bundleName)
    {
        foreach ($manifestData['containerjs-configs'] as $containerjsConfig) {
            $path = sprintf("%s/%s", $this->getBundleTargetDir($bundleName), $containerjsConfig['path']);
            $containerjsConfigs->add(new ContainerjsConfig($path));
        }
    }
}
