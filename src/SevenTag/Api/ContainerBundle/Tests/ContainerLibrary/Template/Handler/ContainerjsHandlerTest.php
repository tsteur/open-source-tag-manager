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
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler\ContainerJsHandler;

/**
 * Class ContainerJsHandlerTest
 * @package SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Template\Handler
 */
class ContainerJsHandlerTest extends \PHPUnit_Framework_TestCase
{
    const RAW_CONTENT = '##id##, ##domain##, ##host##, ##delay##';
    const DOMAIN = '7tag.dev.clearcode.cc';
    const CONTAINER_ID = 44;
    const DELAY = 700;

    /**
     * @test
     */
    public function itShouldReplaceIdDomainHostAndDelayPlaceholders()
    {
        $handler = new ContainerJsHandler(self::DOMAIN);
        $handler->handle($this->getContextMock());
    }

    /**
     * @return Context
     */
    private function getContextMock()
    {
        $context = $this->prophesize('SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context');
        $context->getContainer()->willReturn($this->getContainerMock());
        $context->getContent()->willReturn(self::RAW_CONTENT);
        $expectedContent = sprintf('%d, %s, %s, %s', self::CONTAINER_ID, self::DOMAIN, self::DOMAIN . '/container-debugger', self::DELAY);
        $context->setContent($expectedContent)->shouldBeCalled();

        return $context->reveal();
    }

    /**
     * @return ContainerInterface
     */
    private function getContainerMock()
    {
        $container = $this->prophesize('SevenTag\Component\Container\Model\ContainerInterface');
        $container->getAccessId()->willReturn(self::CONTAINER_ID);
        $container->getDelay()->willReturn(self::DELAY);

        return $container->reveal();
    }
}
