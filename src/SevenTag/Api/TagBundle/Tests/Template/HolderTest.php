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

namespace SevenTag\Api\TagBundle\Tests\Template;

use SevenTag\Api\TagBundle\Template\ProviderInterface;
use SevenTag\Api\TagBundle\Template\Holder;

/**
 * Class HolderTest
 * @package SevenTag\Api\TagBundle\Tests\Template
 */
class HolderTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itAddsProvider()
    {
        $expected = false;
        $holder = new Holder();
        $holder->add($this->getProviderMock('it_add_holder'));

        foreach ($holder->getIterator() as $result) {
            if ($result->getKey() === 'it_add_holder') {
                $expected = true;
            }
        }

        $this->assertTrue($expected);
    }

    /**
     * @test
     */
    public function itHasProvider()
    {
        $holder = new Holder();
        $holder->add($this->getProviderMock('it_has_holder'));
        $result = $holder->has('it_has_holder');

        $this->assertTrue($result);
    }

    /**
     * @test
     * @expectedException \LogicException
     */
    public function itDoesNotAllowToAddProviderTwice()
    {
        $holder = new Holder();
        $holder->add($this->getProviderMock('it_has_holder'));
        $holder->add($this->getProviderMock('it_has_holder'));
    }

    /**
     * @test
     */
    public function itRetrievesProvider()
    {
        $provider = $this->getProviderMock('it_has_holder');
        $holder = new Holder();
        $holder->add($provider);
        $result = $holder->get('it_has_holder');

        $this->assertEquals($provider, $result);
    }

    /**
     * @test
     * @expectedException \LogicException
     */
    public function itThrowsExceptionIfProviderDoesNotExist()
    {
        $holder = new Holder();
        $holder->get('it_has_holder');
    }


    /**
     * @param string $key
     * @return ProviderInterface
     */
    private function getProviderMock($key)
    {
        $provider = $this->prophesize('SevenTag\Api\TagBundle\Template\ProviderInterface');

        $provider
            ->getKey()
            ->willReturn($key);

        return $provider->reveal();
    }
}
