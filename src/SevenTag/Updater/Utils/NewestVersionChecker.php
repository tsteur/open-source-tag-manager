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

namespace SevenTag\Updater\Utils;

/**
 * Class NewestVersionChecker
 * @package SevenTag\Updater\Utils
 */
class NewestVersionChecker implements NewestVersionCheckerInterface
{
    const VERSION_RESOURCE = 'http://download.7tag.org/version.json';

    /**
     * @var string
     */
    private $versionResource;

    /**
     * @var GuzzleClientFactoryInterface
     */
    private $clientFactory;

    /**
     * @var DomainProviderInterface
     */
    private $domainProvider;

    /**
     * @param GuzzleClientFactoryInterface $clientFactory
     * @param DomainProviderInterface $domainProvider
     * @param string $versionResource
     */
    public function __construct(
        GuzzleClientFactoryInterface $clientFactory,
        DomainProviderInterface $domainProvider,
        $versionResource = self::VERSION_RESOURCE
    ) {
        $this->clientFactory = $clientFactory;
        $this->domainProvider = $domainProvider;
        $this->versionResource = $versionResource;
    }

    /**
     * {@inheritdoc}
     */
    public function getNewestVersion($currentVersion)
    {
        $client = $this->clientFactory->createClient();
        $response = $client->get(
            sprintf(
                '%s?version=%s&domain=%s',
                $this->versionResource,
                $currentVersion,
                $this->domainProvider->getDomain()
            )
        )
            ->send();
        $body = $response->json();

        return $response->isSuccessful() && isset($body['version']) && $body['version'] !== $currentVersion
            ? $body['version'] : false;
    }
}
