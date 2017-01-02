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
use SevenTag\Api\ContainerBundle\ContainerLibrary\Subscriber\StorageJavascriptInFilesystemSubscriber;

/**
 * Class StorageJavascriptInFilesystemSubscriberTest
 * @package SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Template\Handler
 */
class StorageJavascriptInFilesystemSubscriberTest extends \PHPUnit_Framework_TestCase
{

    const GENERATOR_RESULT = ' container code';

    /**
     * @test
     */
    public function itShouldGenerateJavascriptFile()
    {
        $subscriber = new StorageJavascriptInFilesystemSubscriber(
            $this->getGeneratorMock(true),
            $this->getFilesystemWriteMock(),
            "%s.js",
            $this->getCdnMock()
        );
        $subscriber->generateContainer($this->getEventMock());
    }

    /**
     * @test
     */
    public function itShouldRemoveJavascriptFileIfExists()
    {
        $subscriber = new StorageJavascriptInFilesystemSubscriber(
            $this->getGeneratorMock(false),
            $this->getFilesystemRemoveMock(true),
            "%s.js",
            $this->getCdnMock()
        );
        $subscriber->removeContainer($this->getEventMock());
    }

    /**
     * @test
     */
    public function itShouldNotRemoveJavascriptFileIfItDoesNotExists()
    {
        $subscriber = new StorageJavascriptInFilesystemSubscriber(
            $this->getGeneratorMock(false),
            $this->getFilesystemRemoveMock(false),
            "%s.js",
            $this->getCdnMock()
        );
        $subscriber->removeContainer($this->getEventMock());
    }

    /**
     * @return GeneratorInterface
     */
    private function getGeneratorMock($expectGenerate)
    {
        $generator = $this->prophesize('SevenTag\Api\ContainerBundle\ContainerLibrary\Generator\GeneratorInterface');
        if ($expectGenerate) {
            $generator->generate(Argument::any())->willReturn(self::GENERATOR_RESULT)->shouldBeCalled();
        }
        return $generator->reveal();
    }

    /**
     * @return Filesystem
     */
    private function getFilesystemWriteMock()
    {
        $filesystem = $this->prophesize('Gaufrette\Filesystem');
        $filePath = '44.js';
        $filesystem
            ->write($filePath, self::GENERATOR_RESULT, true)
            ->shouldBeCalled();
        return $filesystem->reveal();
    }

    /**
     * @return CdnInterface
     */
    private function getCdnMock()
    {
        $cdn = $this->prophesize('SevenTag\Api\ContainerBundle\Cdn\CdnInterface');
        $cdn->invalidate(Argument::any())->shouldBeCalled();
        return $cdn->reveal();
    }

    /**
     * @return Filesystem
     */
    private function getFilesystemRemoveMock($fileExists)
    {
        $filesystem = $this->prophesize('Gaufrette\Filesystem');
        $filePath = '44.js';
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
