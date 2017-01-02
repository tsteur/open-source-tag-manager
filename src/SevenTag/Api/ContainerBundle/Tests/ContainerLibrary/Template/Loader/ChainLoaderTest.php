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

namespace SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Template\Loader;

use Prophecy\Argument;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Loader\ChainLoader;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Loader\LoaderInterface;

/**
 * Class ChainLoaderTest
 * @package SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Template\Loader
 */
class ChainLoaderTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itHandlesContext()
    {
        $chainLoader = new ChainLoader();
        $result1 = $chainLoader->add($this->getLoaderMock('1'), 255);
        $result2 = $chainLoader->add($this->getLoaderMock('abs'), 0);
        $content = $chainLoader->load();

        $this->assertTrue($result1);
        $this->assertTrue($result2);
        $this->assertEquals('1abs', $content);
    }

    /**
     * @param string $result
     * @return LoaderInterface
     */
    private function getLoaderMock($result)
    {
        $loader = $this->prophesize('SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Loader\LoaderInterface');

        $loader
            ->load()
            ->shouldBeCalled()
            ->willReturn($result);

        return $loader->reveal();
    }
}
