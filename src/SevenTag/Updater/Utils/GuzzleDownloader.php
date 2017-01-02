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

use Guzzle\Http\Client;

/**
 * Class GuzzleDownloader
 * @package SevenTag\Updater\Utils
 */
class GuzzleDownloader implements DownloaderInterface
{
    /**
     * @var Client
     */
    protected $clientFactory;

    /**
     * @var DomainProviderInterface
     */
    protected $downloader;

    /**
     * @param GuzzleClientFactoryInterface $clientFactory
     * @param DomainProviderInterface $downloader
     */
    public function __construct(GuzzleClientFactoryInterface $clientFactory, DomainProviderInterface $downloader)
    {
        $this->clientFactory = $clientFactory;
        $this->downloader = $downloader;
    }

    /**
     * {@inheritdoc}
     */
    public function download($version, $currentVersion)
    {
        $tarFile = tempnam(
            sys_get_temp_dir(),
            uniqid('7tag_updater_newest_version_downloader_', true)
        );
        $handle = fopen($tarFile, 'w');

        $client = $this->clientFactory->createClient();
        $client->setBaseUrl('');
        $client->setConfig([Client::CURL_OPTIONS => [
            'CURLOPT_RETURNTRANSFER' => true,
            'CURLOPT_FILE' => $handle
        ]]);

        $client->get(sprintf('http://download.7tag.org/seventag-%s.zip?version=%s&domain=%s', $version, $currentVersion, $this->downloader->getDomain()))
            ->send();

        fclose($handle);
        unset($handle);

        return $tarFile;
    }
}
