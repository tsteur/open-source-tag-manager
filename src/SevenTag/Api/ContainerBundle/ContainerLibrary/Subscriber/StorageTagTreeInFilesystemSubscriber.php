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
use SevenTag\Api\ContainerBundle\ContainerLibrary\ContainerLibraryEvent;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Events;
use SevenTag\Api\ContainerBundle\TagTree\Builder\TagTreeBuilderInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Class StorageTagTreeInFilesystemSubscriber
 * @package SevenTag\Api\ContainerBundle\ContainerLibrary\Subscriber
 */
class StorageTagTreeInFilesystemSubscriber implements EventSubscriberInterface
{
    /**
     * @var Filesystem
     */
    private $filesystem;

    /**
     * @var TagTreeBuilderInterface
     */
    private $treeBuilder;

    /**
     * @param TagTreeBuilderInterface $treeBuilder
     * @param Filesystem $filesystem
     */
    public function __construct(
        TagTreeBuilderInterface $treeBuilder,
        Filesystem $filesystem
    ) {
        $this->treeBuilder = $treeBuilder;
        $this->filesystem = $filesystem;
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            Events::CONTAINER_PUBLISHED => ['generateTagTree', 0],
            Events::CONTAINER_CREATED => ['generateTagTree', 0],
            Events::CONTAINER_REMOVED => ['removeTagTree', 0]
        ];
    }

    /**
     * @param ContainerLibraryEvent $event
     */
    public function generateTagTree(ContainerLibraryEvent $event)
    {
        $container = $event->getContainer();

        $tagtree = [
            'tagtree' => $this->treeBuilder->buildTree($container),
            'debug' => [
                'enabled' => false,
                'containerName' => $container->getName()
            ]
        ];

        $this->filesystem->write(
            sprintf('tagtree/%s.jsonp', $container->getAccessId()),
            "SevenTag_TagTreeCallback_0(" . json_encode($tagtree) . ");",
            true
        );
    }

    /**
     * @param ContainerLibraryEvent $event
     */
    public function removeTagTree(ContainerLibraryEvent $event)
    {
        $container = $event->getContainer();

        $filename = sprintf('tagtree/%s.jsonp', $container->getAccessId());

        if ($this->filesystem->has($filename)) {
            $this->filesystem->delete($filename);
        }
    }
}
