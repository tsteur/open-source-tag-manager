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

namespace SevenTag\Api\ContainerBundle\Tests\Privacy\CodeProvider;

use SevenTag\Api\ContainerBundle\Entity\Container;
use SevenTag\Api\ContainerBundle\Privacy\CodeProvider\SnippetProvider;
use Symfony\Component\Templating\EngineInterface;

class SnippetProviderTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldReturnCode()
    {
        $container = new Container();
        $container->setAccessId(1);
        $provider = new SnippetProvider(
            $this->getEngineMock('SevenTagContainerBundle:privacy:snippet.html.twig', [
                'id' => 1
            ])
        );

        $this->assertEquals('<iframe>1</iframe>', $provider->getCode($container));
    }

    /**
     * @param $templatePath
     * @param $parameters
     * @return EngineInterface
     */
    private function getEngineMock($templatePath, $parameters)
    {
        $engine = $this->prophesize('Symfony\Component\Templating\EngineInterface');
        $engine->render($templatePath, $parameters)
            ->shouldBeCalledTimes(1)
            ->willReturn(sprintf('<iframe>%s</iframe>', $parameters['id']));

        return $engine->reveal();
    }
}
