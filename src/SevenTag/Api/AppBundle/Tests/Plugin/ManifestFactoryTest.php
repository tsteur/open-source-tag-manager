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

namespace SevenTag\Api\AppBundle\Tests\Plugin;

use SevenTag\Api\AppBundle\Plugin\Manifest;
use SevenTag\Api\AppBundle\Plugin\ManifestFactory;

/**
 * Class ManifestFactoryTest
 * @package SevenTag\Api\AppBundle\Tests\Plugin
 */
class ManifestFactoryTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldCreateAsset()
    {
        $bundleName = 'SevenTagPluginTestBundle';
        $testManifestPath =  realpath(__DIR__.'/../Fixtures/manifest.json');
        $manifestFactory = new ManifestFactory($testManifestPath);
        $manifest = $manifestFactory->createManifest($bundleName);
        $containerConfigs = $manifest->getContainerjsConfigs();

        $this->assertTrue($manifest instanceof Manifest);
        $this->assertEquals($manifest->getName(), 'custom_plugin_for_seven_tag');
        $this->assertEquals($manifest->getVersion(), '1.0.0');
        $this->assertCount(1, $manifest->getAssetsJS('bottom'));
        $this->assertCount(1, $manifest->getAssetsJS('top'));
        $this->assertCount(2, $manifest->getAssetsJS());
        $this->assertCount(1, $manifest->getContainerjsConfigs());
        $this->assertEquals('/bundles/seventagplugintest/js/test.js', $containerConfigs[0]->getPath());
    }

    /**
     * @test
     * @expectedException \LogicException
     */
    public function itShouldThrowExceptionIfManifestIsNotFile()
    {
        $testManifestPath =  realpath(__DIR__.'/../Fixtures/fake.json');
        new ManifestFactory($testManifestPath);
    }
}
