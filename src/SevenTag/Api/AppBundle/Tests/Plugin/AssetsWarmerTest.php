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

use SevenTag\Api\AppBundle\Plugin\AssetsWarmer;
use Liip\FunctionalTestBundle\Test\WebTestCase;
use Symfony\Component\Filesystem\Filesystem;

/**
 * Class AssetsWarmer
 * @package SevenTag\Api\AppBundle\Plugin
 */
class AssetsWarmerTest extends WebTestCase
{
    /**
     * {@inheritDoc}
     */
    public function setUp()
    {
        parent::setUp();
    }

    /**
     * @test
     */
    public function itShouldWarmUpCacheWithPluginAssets()
    {
        $filesystem = new Filesystem();
        $cacheDir = $this->getContainer()->getParameter('kernel.cache_dir');
        $filesystem->remove([
            sprintf('%s/../seventagPluginsJavascriptBottom.php', $cacheDir),
            sprintf('%s/../seventagPluginsJavascriptTop.php', $cacheDir)
        ]);
        $kernel = $this->getKernelClass();
        $warmer = new AssetsWarmer(new $kernel('test', false));
        $this->assertFalse($warmer->isOptional());
        $warmer->warmUp($cacheDir);

        $this->assertFileExists(sprintf('%s/../seventagPluginsJavascriptBottom.php', $cacheDir));
        $this->assertFileExists(sprintf('%s/../seventagPluginsJavascriptTop.php', $cacheDir));
    }
}
