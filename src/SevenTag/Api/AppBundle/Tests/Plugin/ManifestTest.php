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

use Doctrine\Common\Collections\ArrayCollection;
use SevenTag\Api\AppBundle\Plugin\Asset;
use SevenTag\Api\AppBundle\Plugin\ContainerjsConfig;
use SevenTag\Api\AppBundle\Plugin\Manifest;

/**
 * Class ManifestTest
 * @package SevenTag\Api\AppBundle\Tests\Plugin
 */
class ManifestTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function createManifest()
    {
        $asset1 = new Asset('test/asset1.js', 'bottom');
        $asset2 = new Asset('test/asset2.js', 'top');
        $containerjsConfig1 = new ContainerjsConfig('/bundles/test/js/test1.js');
        $containerjsConfig2 = new ContainerjsConfig('/bundles/test/js/test2.js');
        $assetsCollections = new ArrayCollection([
            $asset1,
            $asset2
        ]);
        $containerjsConfigs = new ArrayCollection([
            $containerjsConfig1,
            $containerjsConfig2
        ]);
        $manifest = new Manifest('test_manifest', '1.0.1', $assetsCollections, $containerjsConfigs);

        $this->assertEquals($manifest->getName(), 'test_manifest');
        $this->assertEquals($manifest->getVersion(), '1.0.1');
        $this->assertCount(1, $manifest->getAssetsJS('bottom'));
        $this->assertCount(1, $manifest->getAssetsJS('top'));
        $this->assertCount(2, $manifest->getAssetsJS());
        $this->assertCount(2, $manifest->getContainerjsConfigs());
    }
}
