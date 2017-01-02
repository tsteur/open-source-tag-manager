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

namespace SevenTag\Api\ContainerBundle\ContainerLibrary\Subscriber;

use Gaufrette\Filesystem;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Api\ContainerBundle\Cdn\CdnInterface;
use SevenTag\Api\ContainerBundle\ContainerLibrary\ContainerLibraryEvent;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Events;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Generator\GeneratorInterface;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Class StorageJavascriptInFilesystemSubscriber
 * @package SevenTag\Api\ContainerBundle\ContainerLibrary\Subscriber
 */
class StorageJavascriptInFilesystemSubscriber implements EventSubscriberInterface
{
    /**
     * @var Filesystem
     */
    private $filesystem;

    /**
     * @var GeneratorInterface
     */
    private $generator;

    /**
     * @var CdnInterface
     */
    private $cdn;

    /**
     * @var string
     */
    private $filename;

    /**
     * @param GeneratorInterface $generator
     * @param Filesystem $filesystem
     * @param CdnInterface $cdn
     */
    public function __construct(GeneratorInterface $generator, Filesystem $filesystem, $filename, CdnInterface $cdn = null)
    {
        $this->generator = $generator;
        $this->filesystem = $filesystem;
        $this->cdn = $cdn;
        $this->filename = $filename;
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

        $this->removeFromFilesystem($container);
        $this->invalidateCdn($container);
    }

    /**
     * @param ContainerLibraryEvent $event
     */
    public function generateContainer(ContainerLibraryEvent $event)
    {
        $container = $event->getContainer();

        $this->storageInFilesystem($container);
        $this->invalidateCdn($container);
    }

    /**
     * @param ContainerInterface $container
     */
    private function storageInFilesystem(ContainerInterface $container)
    {
        $this->filesystem->write(
            sprintf($this->filename, $container->getAccessId()),
            $this->generator->generate(new Context($container, false)),
            true
        );
    }

    /**
     * @param ContainerInterface $container
     */
    private function removeFromFilesystem(ContainerInterface $container)
    {
        $filename = sprintf($this->filename, $container->getAccessId());

        if ($this->filesystem->has($filename)) {
            $this->filesystem->delete($filename);
        }
    }

    /**
     * @param ContainerInterface $container
     */
    private function invalidateCdn(ContainerInterface $container)
    {
        if (null !== $this->cdn) {
            $this->cdn->invalidate($container);
        }
    }
}
