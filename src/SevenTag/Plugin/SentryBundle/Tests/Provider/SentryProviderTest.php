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

namespace SevenTag\Plugin\SentryBundle\Tests\Provider;

use Prophecy\Argument;
use SevenTag\Plugin\SentryBundle\Provider\SentryProvider;
use Symfony\Component\Templating\EngineInterface;

/**
 * Class SentryProviderTest
 * @package SevenTag\Plugin\SentryBundle\Tests\Provider
 */
class SentryProviderTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldReturnTrackingCodeIfDsnIsSet()
    {
        $dsn = 'https://00112233445566778899001122334455:001122334455667788990011223344550@app.getsentry.com/12345';
        $engine = $this->getEngineMock($dsn);

        $provider = new SentryProvider($dsn, $engine);
        $result = $provider->getJsTrackingCode();

        $this->assertEquals($dsn, $result);
    }

    /**
     * @test
     */
    public function itShouldReturnNullIfDsnIsNotSet()
    {
        $engine = $this->prophesize('Symfony\Component\Templating\EngineInterface')
            ->reveal();

        $provider = new SentryProvider('', $engine);
        $result = $provider->getJsTrackingCode();

        $this->assertNull($result);
    }

    /**
     * @test
     */
    public function itShouldReturnNullIfDsnIsInvalid()
    {
        $engine = $this->prophesize('Symfony\Component\Templating\EngineInterface')
            ->reveal();

        $provider = new SentryProvider('not10', $engine);
        $result = $provider->getJsTrackingCode();

        $this->assertNull($result);
    }

    /**
     * @param string $valueToReturn
     * @return EngineInterface
     */
    protected function getEngineMock($valueToReturn)
    {
        /** @var EngineInterface $engine */
        $engine = $this->prophesize('Symfony\Component\Templating\EngineInterface');
        $engine->render(Argument::any(), Argument::any())
            ->shouldBeCalled()
            ->willReturn($valueToReturn);

        return $engine->reveal();
    }
}
