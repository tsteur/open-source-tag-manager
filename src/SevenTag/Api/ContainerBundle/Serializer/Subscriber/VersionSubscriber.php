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

namespace SevenTag\Api\ContainerBundle\Serializer\Subscriber;

use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use JMS\Serializer\EventDispatcher\ObjectEvent;
use SevenTag\Api\ContainerBundle\CodeProvider\CodeProviderInterface;
use SevenTag\Component\Container\Model\ContainerInterface;

/**
 * Class VersionSubscriber
 * @package SevenTag\Api\ContainerBundle\Serializer\Subscriber
 */
class VersionSubscriber implements EventSubscriberInterface
{
    /**
     * @var CodeProviderInterface
     */
    private $snippetProvider;

    /**
     * @param CodeProviderInterface $snippetProvider
     */
    public function __construct(CodeProviderInterface $snippetProvider)
    {
        $this->snippetProvider = $snippetProvider;
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            [
                'event' => 'serializer.pre_serialize',
                'method' => 'addCodeToContainer'
            ]
        ];
    }

    /**
     * @param ObjectEvent $event
     */
    public function addCodeToContainer(ObjectEvent $event)
    {
        $container = $event->getObject();
        if ($container instanceof ContainerInterface) {
            $container->setCode($this->snippetProvider->getCode($container));
        }
    }
}
