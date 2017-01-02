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

namespace SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Template\Handler;

use Prophecy\Argument;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler\DebuggerHandler;
use SevenTag\Api\ContainerBundle\ModeResolver\ModeResolverInterface;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context;
use SevenTag\Component\Container\Model\ContainerInterface;

/**
 * Class DebuggerHandlerTest
 * @package SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Template\Handler
 */
class DebuggerHandlerTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itHandlesWithoutDebugOptions()
    {
        $context = $this->getContextWithoutDebugOptionsMock();
        $modelResolver = $this->getModelResolverMock();
        $debuggerHandler = new DebuggerHandler($modelResolver);
        $debuggerHandler->handle($context);
    }

    /**
     * @test
     */
    public function itHandleWithDebugOptions()
    {
        $context = $this->getContextWithDebugOptionsMock();
        $modelResolver = $this->getModelResolverMock(true);
        $debuggerHandler = new DebuggerHandler($modelResolver);
        $debuggerHandler->handle($context);
    }

    /**
     * @return Context
     */
    private function getContextWithoutDebugOptionsMock()
    {
        $context = $this->prophesize('SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context');
        $content = '##debugOptions##';

        $context
            ->isDebugVerification()
            ->shouldBeCalled()
            ->willReturn(false);

        $context
            ->getContent()
            ->shouldBeCalled()
            ->willReturn($content);

        $context
            ->setContent('{"enabled":false,"containerName":""}')
            ->shouldBeCalled();

        return $context->reveal();
    }

    /**
     * @return Context
     */
    private function getContextWithDebugOptionsMock()
    {
        $context = $this->prophesize('SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context');
        $content = '##debugOptions##';

        $context
            ->getContainer()
            ->shouldBeCalled()
            ->willReturn($this->getContainerMock());

        $context
            ->isDebugVerification()
            ->shouldBeCalled()
            ->willReturn(true);

        $context
            ->getContent()
            ->shouldBeCalled()
            ->willReturn($content);

        $context
            ->setContent('{"enabled":true,"containerName":"Container Name 123"}')
            ->shouldBeCalled();

        return $context->reveal();
    }

    /**
     * @param bool $debugMode
     * @return ModeResolverInterface
     */
    private function getModelResolverMock($debugMode = false)
    {
        $accessId = 123;
        $modelResolver = $this->prophesize('SevenTag\Api\ContainerBundle\ModeResolver\ModeResolverInterface');

        if ($debugMode) {
            $modelResolver
                ->isInMode(Argument::exact(ModeResolverInterface::MODE_DEBUG), Argument::exact($accessId))
                ->shouldBeCalled()
                ->willReturn(true);
        }

        return $modelResolver->reveal();
    }

    /**
     * @return ContainerInterface
     */
    private function getContainerMock()
    {
        $accessId = 123;
        $container = $this->prophesize('SevenTag\Component\Container\Model\ContainerInterface');
        $name = 'Container Name 123';

        $container
            ->getAccessId()
            ->shouldBeCalled()
            ->willReturn($accessId);

        $container
            ->getName()
            ->shouldBeCalled()
            ->willReturn($name);

        return $container->reveal();
    }
}
