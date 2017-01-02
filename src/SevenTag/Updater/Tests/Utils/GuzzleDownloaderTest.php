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

namespace SevenTag\Updater\Tests\Utils;

use Prophecy\Argument;
use SevenTag\Updater\Utils\GuzzleClientFactoryInterface;
use SevenTag\Updater\Utils\GuzzleDownloader;

/**
 * Class GuzzleDownloaderTest
 * @package SevenTag\Updater\Tests\Utils
 */
class GuzzleDownloaderTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itDownloadsNewestVersionToTemporaryFile()
    {
        $downloader = $this->prophesize('SevenTag\Updater\Utils\DomainProviderInterface');
        $downloader->getDomain()
            ->shouldBeCalled()
            ->willreturn('http://example.com');

        $guzzleClientFactory = $this->getGuzzleClientFactoryMock();
        $downloader = new GuzzleDownloader($guzzleClientFactory, $downloader->reveal());
        $result = $downloader->download('1.0.0-alpha.6', '1.0.0-alpha.5');

        $this->assertTrue(is_file($result));
    }

    /**
     * @return GuzzleClientFactoryInterface
     */
    private function getGuzzleClientFactoryMock()
    {
        $guzzleClientFactory = $this->prophesize('SevenTag\Updater\Utils\GuzzleClientFactoryInterface');
        $client = $this->prophesize('Guzzle\Http\Client');
        $request = $this->prophesize('Guzzle\Http\Message\RequestInterface');

        $guzzleClientFactory
            ->createClient()
            ->willReturn($client->reveal());

        $client
            ->setBaseUrl(Argument::any())
            ->willReturn($client->reveal());

        $client
            ->get(Argument::any())
            ->willReturn($request);

        $request->send()
            ->willReturn(true);

        return $guzzleClientFactory->reveal();
    }
}
