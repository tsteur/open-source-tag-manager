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

namespace SevenTag\Api\AppBundle\EventListener;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Class LocaleListener
 * @package SevenTag\Api\AppBundle\EventListener
 */
class LocaleListener implements EventSubscriberInterface
{
    const PRIORITY_FOR_LOCALE_LISTENER = 17;

    /**
     * @var string
     */
    private $defaultLocale;

    /**
     * @param string $defaultLocale
     */
    public function __construct($defaultLocale = 'en')
    {
        $this->defaultLocale = $defaultLocale;
    }

    /**
     * @param GetResponseEvent $event
     */
    public function onKernelRequest(GetResponseEvent $event)
    {
        $request = $event->getRequest();

        if ($this->isMasterRequest($request, $event)) {
            return;
        }

        $requestedLocale = $request->headers->get('Locale');
        $locale = $requestedLocale ? $requestedLocale : $this->defaultLocale;
        $request->setLocale($locale);
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => [
                ['onKernelRequest', self::PRIORITY_FOR_LOCALE_LISTENER]
            ],
        ];
    }

    /**
     * @param Request $request
     * @param GetResponseEvent $event
     * @return bool
     */
    private function isMasterRequest(Request $request, GetResponseEvent $event)
    {
        return $request->isXmlHttpRequest() || !$event->isMasterRequest();
    }
}
