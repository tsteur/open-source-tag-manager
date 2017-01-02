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

namespace SevenTag\Api\AppBundle\Kernel;

use Symfony\Component\HttpKernel\Kernel as BaseKernel;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\Config\Loader\LoaderInterface;

/**
 * Class Kernel
 * @package SevenTag\Api\AppBundle\Kernel
 */
abstract class Kernel extends BaseKernel
{
    /**
     * @return array
     */
    public function registerBundles()
    {
        $bundles = [
            new \Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new \Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new \Symfony\Bundle\TwigBundle\TwigBundle(),
            new \Symfony\Bundle\MonologBundle\MonologBundle(),
            new \Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new \Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new \Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
            new \Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new \Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle(),
            new \FOS\RestBundle\FOSRestBundle(),
            new \FOS\UserBundle\FOSUserBundle(),
            new \FOS\OAuthServerBundle\FOSOAuthServerBundle(),
            new \FOS\HttpCacheBundle\FOSHttpCacheBundle(),
            new \Knp\Bundle\GaufretteBundle\KnpGaufretteBundle(),
            new \JMS\SerializerBundle\JMSSerializerBundle(),
            new \Liip\MonitorBundle\LiipMonitorBundle(),
            new \Nelmio\ApiDocBundle\NelmioApiDocBundle(),
            new \Stof\DoctrineExtensionsBundle\StofDoctrineExtensionsBundle(),
            new \Sonata\NotificationBundle\SonataNotificationBundle(),

            new \SevenTag\Api\ContainerBundle\SevenTagContainerBundle(),
            new \SevenTag\Api\TagBundle\SevenTagTagBundle(),
            new \SevenTag\Api\TestBundle\SevenTagTestBundle(),
            new \SevenTag\Api\UserBundle\SevenTagUserBundle(),
            new \SevenTag\Api\SecurityBundle\SevenTagSecurityBundle(),
            new \SevenTag\Api\TriggerBundle\SevenTagTriggerBundle(),
            new \SevenTag\Api\AppBundle\SevenTagAppBundle(),
            new \SevenTag\Api\VariableBundle\SevenTagVariableBundle(),
        ];

        if (in_array($this->getEnvironment(), ['dev', 'test'])) {
            $bundles[] = new \Symfony\Bundle\DebugBundle\DebugBundle();
            $bundles[] = new \Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new \Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            $bundles[] = new \Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
            $bundles[] = new \Doctrine\Bundle\FixturesBundle\DoctrineFixturesBundle();
            $bundles[] = new \Liip\FunctionalTestBundle\LiipFunctionalTestBundle();
        }

        return $bundles;
    }

    /**
     * {@inheritdoc}
     */
    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $rootDir = $this->getRootDir();
        $loader->load($rootDir.'/config/config_'.$this->getEnvironment().'.yml');
    }

    /**
     * @param string $pluginPath
     * @return array
     */
    protected function registerPluginBundles($pluginPath)
    {
        $bundles = [];
        $rootDir = $this->getRootDir();
        $basePathSrc = realpath($rootDir.'/../src');
        $searchPath = realpath($pluginPath);
        $finder = Finder::create();
        $finder
            ->files()
            ->in($searchPath)
            ->name('*Bundle.php');

        /** @var SplFileInfo $file */
        foreach ($finder as $file) {
            $pluginPath = $file->getRealpath();
            $pluginClassNamespace = str_replace([$basePathSrc . '/', '.php', '/'], ['', '', '\\'], $pluginPath);
            $bundles[] = new $pluginClassNamespace();
        }

        return $bundles;
    }
}
