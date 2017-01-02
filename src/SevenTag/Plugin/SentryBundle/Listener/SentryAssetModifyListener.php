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

namespace SevenTag\Plugin\SentryBundle\Listener;

use SevenTag\Api\AppBundle\Plugin\Asset;
use SevenTag\Api\AppBundle\Plugin\AssetJsEvent;
use SevenTag\Plugin\SentryBundle\Provider\SentryProvider;

/**
 * Class SentryAssetModifyListener
 * @package SevenTag\Plugin\SentryBundle\Listener
 */
class SentryAssetModifyListener
{
    /**
     * @var SentryProvider
     */
    private $sentryProvider;

    /**
     * @param SentryProvider $sentryProvider
     */
    public function __construct(SentryProvider $sentryProvider)
    {
        $this->sentryProvider = $sentryProvider;
    }

    /**
     * @param AssetJsEvent $event
     */
    public function appendSentryTrackingCode(AssetJsEvent $event)
    {
        if ($event->getTarget() !== Asset::TARGET_TOP) {
            return;
        }

        $scripts = $event->getScripts();
        $trackingCode = $this->sentryProvider->getJsTrackingCode();

        if ($trackingCode) {
            $scripts->add($trackingCode);
            $event->setScripts($scripts);
        }
    }
}
