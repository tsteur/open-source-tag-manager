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
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler\ChainHandler;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler\HandlerInterface;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context;

/**
 * Class ChainHandlerTest
 * @package SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Template\Handler
 */
class ChainHandlerTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var Context
     */
    private $context;

    /**
     * @test
     */
    public function itHandlesContext()
    {
        $this->context = $this->getContextMock();
        $chainHandler = new ChainHandler();
        $result1 = $chainHandler->add($this->getHandlerMock(), 255);
        $result2 = $chainHandler->add($this->getHandlerMock(), 0);
        $chainHandler->handle($this->context);

        $this->assertTrue($result1);
        $this->assertTrue($result2);
    }

    /**
     * @return Context
     */
    private function getContextMock()
    {
        $context = $this->prophesize('SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context');

        return $context->reveal();
    }

    /**
     * @return HandlerInterface
     */
    private function getHandlerMock()
    {
        $handler = $this->prophesize('SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler\HandlerInterface');

        $handler
            ->handle(Argument::exact($this->context))
            ->shouldBeCalled();

        return $handler->reveal();
    }
}
