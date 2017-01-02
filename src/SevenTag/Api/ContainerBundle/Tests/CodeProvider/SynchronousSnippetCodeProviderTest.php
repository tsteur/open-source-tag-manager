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

namespace SevenTag\Api\ContainerBundle\Tests\CodeProvider;

use Prophecy\Argument;
use Symfony\Bundle\TwigBundle\TwigEngine;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use SevenTag\Api\ContainerBundle\CodeProvider\SynchronousSnippetCodeProvider;
use SevenTag\Component\Container\Model\Container;

class SynchronousSnippetCodeProviderTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldGenerateCode()
    {
        $container = $this->getValidContainer();

        $codeProvider = new SynchronousSnippetCodeProvider($this->getRouterMock(), $this->getEngineMock());
        $code = $codeProvider->getCode($container);

        $this->assertEquals('<script>var i=0;var asd=null;</script>', $code);
    }

    /**
     * @return UrlGeneratorInterface
     */
    private function getRouterMock()
    {
        $mock = $this->prophesize('Symfony\Component\Routing\Generator\UrlGeneratorInterface');
        $mock
            ->generate('get_container_javascript_synchronous', Argument::withKey('id'), UrlGeneratorInterface::NETWORK_PATH)
            ->shouldBeCalledTimes(1);

        return $mock->reveal();
    }

    /**
     * @return Container
     */
    private function getValidContainer()
    {
        $container = new Container();
        $container->setAccessId(1);
        return $container;
    }

    /**
     * @return TwigEngine
     */
    private function getEngineMock()
    {
        $mock = $this->prophesize('Symfony\Bundle\TwigBundle\TwigEngine');
        $mock
            ->render('@SevenTagContainerBundle/Resources/views/snippet.synchronous.html.twig', Argument::size(1))
            ->shouldBeCalledTimes(1)
            ->willReturn('<script>
var i = 0;
var asd = null;
</script>');

        return $mock->reveal();
    }
}
