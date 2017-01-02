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

namespace SevenTag\Api\ContainerBundle\Tests\Service;

use Prophecy\Argument;
use SevenTag\Api\ContainerBundle\ContainerLibrary\ContainerLibraryEvent;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Events;
use SevenTag\Api\ContainerBundle\Entity\Container;
use SevenTag\Api\ContainerBundle\Service\RepublishContainer;

class RepublishContainerTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldDispatchEventOnProcessContainer()
    {
        $container = new Container();

        $containerRepository = $this->prophesize('SevenTag\Api\ContainerBundle\Entity\ContainerRepository');
        $eventDispatcher = $this->prophesize('Symfony\Component\EventDispatcher\EventDispatcher');
        $eventDispatcher
            ->dispatch(Events::CONTAINER_PUBLISHED, Argument::any())
            ->shouldBeCalledTimes(1);

        $republishContainer = new RepublishContainer($containerRepository->reveal(), $eventDispatcher->reveal());
        $republishContainer->process(new Container());
    }

    /**
     * @test
     */
    public function itShouldReturnEmptyArrayCollectionIfSelectedContainerNotExists()
    {
        $containerId = 1;

        $containerRepository = $this->prophesize('SevenTag\Api\ContainerBundle\Entity\ContainerRepository');
        $containerRepository
            ->findByAccessId($containerId, false)
            ->shouldBeCalledTimes(1)
            ->willReturn(null);

        $eventDispatcher = $this->prophesize('Symfony\Component\EventDispatcher\EventDispatcher');

        $republishContainer = new RepublishContainer($containerRepository->reveal(), $eventDispatcher->reveal());
        $results = $republishContainer->getContainersToProcess($containerId);

        $this->assertTrue($results->isEmpty());
    }

    /**
     * @test
     */
    public function itShouldReturnEmptyArrayCollectionIfNotASingleContainerIsPublished()
    {
        $containerRepository = $this->prophesize('SevenTag\Api\ContainerBundle\Entity\ContainerRepository');
        $containerRepository
            ->findPublished()
            ->shouldBeCalledTimes(1)
            ->willReturn(null);

        $eventDispatcher = $this->prophesize('Symfony\Component\EventDispatcher\EventDispatcher');

        $republishContainer = new RepublishContainer($containerRepository->reveal(), $eventDispatcher->reveal());
        $results = $republishContainer->getContainersToProcess();

        $this->assertTrue($results->isEmpty());
    }

    /**
     * @test
     */
    public function itShouldReturnArrayCollectionWithSelectedContainer()
    {
        $containerId = 1;
        $container = new Container();

        $containerRepository = $this->prophesize('SevenTag\Api\ContainerBundle\Entity\ContainerRepository');
        $containerRepository
            ->findByAccessId($containerId, false)
            ->shouldBeCalledTimes(1)
            ->willReturn($container);

        $eventDispatcher = $this->prophesize('Symfony\Component\EventDispatcher\EventDispatcher');

        $republishContainer = new RepublishContainer($containerRepository->reveal(), $eventDispatcher->reveal());
        $results = $republishContainer->getContainersToProcess($containerId);

        $this->assertCount(1, $results);
        $this->assertEquals($container, $results->first());
    }

    /**
     * @test
     */
    public function itShouldReturnArrayCollectionWithPublishedContainers()
    {
        $container = new Container();
        $containerRepository = $this->prophesize('SevenTag\Api\ContainerBundle\Entity\ContainerRepository');
        $containerRepository
            ->findPublished()
            ->shouldBeCalledTimes(1)
            ->willReturn([$container, $container]);

        $eventDispatcher = $this->prophesize('Symfony\Component\EventDispatcher\EventDispatcher');

        $republishContainer = new RepublishContainer($containerRepository->reveal(), $eventDispatcher->reveal());
        $results = $republishContainer->getContainersToProcess();

        $this->assertCount(2, $results);
        $this->assertEquals($container, $results->first());
        $this->assertEquals($container, $results->next());
    }
}
