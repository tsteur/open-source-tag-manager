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

namespace SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Subscriber;

use Prophecy\Argument;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Subscriber\StorageTagTreeInFilesystemSubscriber;

/**
 * Class StorageTagTreeInFilesystemSubscriberTest
 * @package SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Template\Handler
 */
class StorageTagTreeInFilesystemSubscriberTest extends \PHPUnit_Framework_TestCase
{

    /**
     * @test
     */
    public function itShouldGenerateTagTreeFile()
    {
        $subscriber = new StorageTagTreeInFilesystemSubscriber($this->getTagTreeBuilderMock(true), $this->getFilesystemWriteMock());
        $subscriber->generateTagTree($this->getEventMock());
    }

    /**
     * @test
     */
    public function itShouldRemoveTagTreeFileIfExists()
    {
        $subscriber = new StorageTagTreeInFilesystemSubscriber($this->getTagTreeBuilderMock(false), $this->getFilesystemRemoveMock(true));
        $subscriber->removeTagTree($this->getEventMock());
    }

    /**
     * @test
     */
    public function itShouldNotRemoveTagTreeFileIfItDoesNotExists()
    {
        $subscriber = new StorageTagTreeInFilesystemSubscriber($this->getTagTreeBuilderMock(false), $this->getFilesystemRemoveMock(false));
        $subscriber->removeTagTree($this->getEventMock());
    }

    /**
     * @return TagTreeBuilderInterface
     */
    private function getTagTreeBuilderMock($expectBuildTree)
    {
        $tagTree = ['a' => 1, 'b' => 2, 'c' => 3];
        $tagTreeBuilder = $this->prophesize('SevenTag\Api\ContainerBundle\TagTree\Builder\TagTreeBuilderInterface');

        if ($expectBuildTree) {
            $tagTreeBuilder
                ->buildTree(Argument::any())
                ->willReturn($tagTree)
                ->shouldBeCalled();
        }

        return $tagTreeBuilder->reveal();
    }

    /**
     * @return Filesystem
     */
    private function getFilesystemWriteMock()
    {
        $filesystem = $this->prophesize('Gaufrette\Filesystem');
        $filePath = 'tagtree/44.jsonp';
        $filesystem
            ->write($filePath, Argument::any(), true)
            ->shouldBeCalled();
        return $filesystem->reveal();
    }

    /**
     * @return Filesystem
     */
    private function getFilesystemRemoveMock($fileExists)
    {
        $filesystem = $this->prophesize('Gaufrette\Filesystem');
        $filePath = 'tagtree/44.jsonp';
        $filesystem->has($filePath)->willReturn($fileExists)->shouldBeCalled();
        if ($fileExists) {
            $filesystem->delete($filePath)->shouldBeCalled();
        }
        return $filesystem->reveal();
    }

    /**
     * @return ContainerLibraryEvent
     */
    private function getEventMock()
    {
        $event = $this->prophesize('SevenTag\Api\ContainerBundle\ContainerLibrary\ContainerLibraryEvent');
        $event->getContainer()->willReturn($this->getContainerMock());
        return $event->reveal();
    }

    /**
     * @return ContainerInterface
     */
    private function getContainerMock()
    {
        $container = $this->prophesize('SevenTag\Component\Container\Model\ContainerInterface');
        $container->getName()->willReturn('Test Container');
        $container->getAccessId()->willReturn(44);
        return $container->reveal();
    }
}
