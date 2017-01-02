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

namespace SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Generator;

use Prophecy\Argument;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Generator\TemplateGenerator;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Loader\LoaderInterface;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler\HandlerInterface;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context;

/**
 * Class TemplateGeneratorTest
 * @package SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Generator
 */
class TemplateGeneratorTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itGeneratesByUsingLoaderAndHandler()
    {
        $templateGenerator = new TemplateGenerator($this->getLoaderMock(), $this->getHandlerMock());
        $result = $templateGenerator->generate($this->getContextMock());

        $this->assertEquals('test', $result);
    }

    /**
     * @return LoaderInterface
     */
    private function getLoaderMock()
    {
        $mock = $this->prophesize('SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Loader\LoaderInterface');

        $mock
            ->load()
            ->willReturn('test');

        return $mock->reveal();
    }

    /**
     * @return HandlerInterface
     */
    private function getHandlerMock()
    {
        $mock = $this->prophesize('SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler\HandlerInterface');

        $mock
            ->handle(Argument::any())
            ->shouldBeCalled();

        return $mock->reveal();
    }

    /**
     * @return Context
     */
    private function getContextMock()
    {
        $mock = $this->prophesize('SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context');

        $mock
            ->setContent('test')
            ->shouldBeCalled();

        $mock
            ->getContent()
            ->willReturn('test');

        return $mock->reveal();
    }
}
