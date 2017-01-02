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

namespace SevenTag\Api\SecurityBundle\Warmer;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpKernel\CacheWarmer\CacheWarmerInterface;

class OAuthClientSettingsWarmer implements CacheWarmerInterface
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * OAuthClientSettingsWarmer constructor.
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * @return bool
     */
    public function isOptional()
    {
        return false;
    }

    public function warmUp($cacheDir)
    {
        if (!$this->container->hasParameter('oauth2_secret') || !$this->container->hasParameter('random_id')) {
            return;
        }

        try {
            $oauth2Secret = $this->container->getParameter('oauth2_secret');
            $randomId = $this->container->getParameter('random_id');

            $client = $this->container
                ->get('doctrine.orm.entity_manager')
                ->getRepository('SevenTagSecurityBundle:Client')
                ->findOneBy(['randomId' => $randomId, 'secret' => $oauth2Secret]);

            if ($client) {
                $cacheDir = $cacheDir . '/..';
                $filesystem = new Filesystem();
                $filesystem->dumpFile(
                    $cacheDir . '/OAuthClientSettings.php',
                    $this->container->get('templating')->render('SevenTagAppBundle::oauthClientSettings.html.twig', [
                        'client' => $client
                    ])
                );
            }
        } catch (\Exception $e) {
            $this->container->get('logger')->info(sprintf('OAuth Warmer Error %s', $e->getMessage()));
        }
    }
}
