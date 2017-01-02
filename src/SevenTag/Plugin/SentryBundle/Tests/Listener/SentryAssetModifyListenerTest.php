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

namespace SevenTag\Plugin\SentryBundle\Tests\Listener;

use Doctrine\Common\Collections\ArrayCollection;
use SevenTag\Api\AppBundle\Plugin\Asset;
use SevenTag\Api\AppBundle\Plugin\AssetJsEvent;
use SevenTag\Plugin\SentryBundle\Listener\SentryAssetModifyListener;
use SevenTag\Plugin\SentryBundle\Provider\SentryProvider;

/**
 * Class SentryAssetModifyListenerTest
 * @package SevenTag\Plugin\SentryBundle\Tests\Listener
 */
class SentryAssetModifyListenerTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldAddNewAssetToCollection()
    {
        $sentryProvider = $this->getSentryProviderMock('TrackingCode');

        $assetJsEvent = new AssetJsEvent(Asset::TARGET_TOP, new ArrayCollection());

        $this->assertCount(0, $assetJsEvent->getScripts());

        $listener = new SentryAssetModifyListener($sentryProvider);
        $listener->appendSentryTrackingCode($assetJsEvent);

        $this->assertCount(1, $assetJsEvent->getScripts());
    }

    /**
     * @test
     */
    public function itShouldNotAddNewAssetToCollectionIfTargetIsBottom()
    {
        $sentryProvider = $this->prophesize('SevenTag\Plugin\SentryBundle\Provider\SentryProvider')
            ->reveal();

        $assetJsEvent = new AssetJsEvent(Asset::TARGET_BOTTOM, new ArrayCollection());

        $this->assertCount(0, $assetJsEvent->getScripts());

        $listener = new SentryAssetModifyListener($sentryProvider);
        $listener->appendSentryTrackingCode($assetJsEvent);

        $this->assertCount(0, $assetJsEvent->getScripts());
    }
    /**
     * @test
     */
    public function itShouldNotAddNewAssetToCollectionIfTrackingCodeNotExists()
    {
        $sentryProvider = $this->getSentryProviderMock(null);

        $assetJsEvent = new AssetJsEvent(Asset::TARGET_TOP, new ArrayCollection());

        $this->assertCount(0, $assetJsEvent->getScripts());

        $listener = new SentryAssetModifyListener($sentryProvider);
        $listener->appendSentryTrackingCode($assetJsEvent);

        $this->assertCount(0, $assetJsEvent->getScripts());
    }

    /**
     * @param string|null $returnValue
     * @return SentryProvider
     */
    protected function getSentryProviderMock($returnValue = null)
    {
        $sentryProvider = $this->prophesize('SevenTag\Plugin\SentryBundle\Provider\SentryProvider');

        $sentryProvider
            ->getJsTrackingCode()
            ->shouldBeCalled()
            ->willReturn($returnValue);

        return $sentryProvider->reveal();
    }
}
