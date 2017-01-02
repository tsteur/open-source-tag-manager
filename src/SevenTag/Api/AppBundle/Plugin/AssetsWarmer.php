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
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpKernel\CacheWarmer\CacheWarmerInterface;
use Symfony\Component\HttpKernel\KernelInterface;

/**
 * Class AssetsWarmer
 * @package SevenTag\Api\AppBundle\Plugin
 */
class AssetsWarmer implements CacheWarmerInterface
{
    const EVENT_MANIFEST_LOAD = 'asset.event.manifest_load';
    const EVENT_SCRIPTS_WARMED_UP = 'asset.event.scripts_warmed_up';

    /**
     * @var KernelInterface
     */
    private $kernel;

    /**
     * @var EventDispatcherInterface
     */
    private $eventDispatcher;

    /**
     * @param KernelInterface $kernel
     */
    public function __construct(KernelInterface $kernel)
    {
        $this->kernel = $kernel;
        $this->kernel->boot();
        $this->eventDispatcher = $this->kernel->getContainer()->get('event_dispatcher');
    }

    /**
     * {@inheritdoc}
     */
    public function isOptional()
    {
        return false;
    }

    /**
     * {@inheritdoc}
     */
    public function warmUp($cacheDir)
    {
        $filesystem = new Filesystem();

        foreach ([Asset::TARGET_TOP, Asset::TARGET_BOTTOM] as $target) {
            $filesystem->dumpFile(
                sprintf('%s/../%s%s.php', $cacheDir, 'seventagPluginsJavascript', ucfirst($target)),
                $this->generatePluginsJS($target)
            );
        }
    }

    /**
     * @param string $target
     * @return array
     */
    protected function generatePluginsJS($target)
    {
        $scripts = new ArrayCollection();
        /** @var PluginInterface $bundle */
        foreach ($this->kernel->getBundles() as $bundle) {
            if ($this->canBeWarmedUp($bundle)) {
                /** @var Manifest $manifest */
                $manifest = $bundle->getManifest();
                $this->eventDispatcher->dispatch(self::EVENT_MANIFEST_LOAD, new LoadManifestEvent($manifest));

                foreach ($manifest->getAssetsJS($target) as $assetsJS) {
                    if (false === $assetsJS->isExternalPath()) {
                        $scripts->add(sprintf("\n\t<script src=\"%s/%s\"></script>\n", $this->getBundleAssetTargetDir($bundle), $assetsJS->getPath()));
                    } else {
                        $scripts->add(sprintf("\n\t<script src=\"%s\"></script>\n", $assetsJS->getPath()));
                    }
                }
            }
        }

        $event = new AssetJsEvent($target, $scripts);
        $this->eventDispatcher->dispatch(self::EVENT_SCRIPTS_WARMED_UP, $event);

        return implode("\n\t", $event->getScripts()->toArray());
    }

    /**
     * @param PluginAwareBundle $bundle
     * @return string
     */
    protected function getBundleAssetTargetDir(PluginAwareBundle $bundle)
    {
        $bundlesDir = '/bundles/';

        return $bundlesDir.preg_replace('/bundle$/', '', strtolower($bundle->getName()));
    }

    /**
     * @param $bundle
     * @return bool
     */
    protected function canBeWarmedUp($bundle)
    {
        return $bundle instanceof PluginInterface && $bundle->getManifest() instanceof Manifest;
    }
}
