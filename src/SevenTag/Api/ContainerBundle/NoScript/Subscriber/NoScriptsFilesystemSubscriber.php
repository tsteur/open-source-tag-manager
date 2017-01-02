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

namespace SevenTag\Api\ContainerBundle\NoScript\Subscriber;

use Gaufrette\Filesystem;
use SevenTag\Api\ContainerBundle\ContainerLibrary\ContainerLibraryEvent;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Events;
use SevenTag\Api\ContainerBundle\NoScript\NoScriptInterceptor;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class NoScriptsFilesystemSubscriber implements EventSubscriberInterface
{
    /**
     * @var NoScriptInterceptor
     */
    private $noScriptInterceptor;

    /**
     * @var Filesystem
     */
    private $filesystem;

    /**
     * StorageJavascriptInFilesystemSubscriber constructor.
     * @param NoScriptInterceptor $noScriptInterceptor
     */
    public function __construct(NoScriptInterceptor $noScriptInterceptor, Filesystem $filesystem)
    {
        $this->noScriptInterceptor = $noScriptInterceptor;
        $this->filesystem = $filesystem;
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            Events::CONTAINER_PUBLISHED => ['generateContainer', 0],
            Events::CONTAINER_CREATED => ['generateContainer', 0],
            Events::CONTAINER_REMOVED => ['removeContainer', 0]
        ];
    }

    /**
     * @param ContainerLibraryEvent $event
     */
    public function removeContainer(ContainerLibraryEvent $event)
    {
        $container = $event->getContainer();

        $filename = sprintf('%s/noscript.html', $container->getAccessId());
        if ($this->filesystem->has($filename)) {
            $this->filesystem->delete($filename);
        }
    }

    /**
     * @param ContainerLibraryEvent $event
     */
    public function generateContainer(ContainerLibraryEvent $event)
    {
        $container = $event->getContainer();

        $this->filesystem->write(
            sprintf('%s/noscript.html', $container->getAccessId()),
            $this->noScriptInterceptor->intercept($container),
            true
        );
    }
}
