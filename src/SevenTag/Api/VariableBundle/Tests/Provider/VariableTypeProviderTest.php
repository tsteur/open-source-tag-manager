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

namespace SevenTag\Api\VariableBundle\Tests\Provider;

use Prophecy\Argument;
use SevenTag\Api\VariableBundle\Provider\VariableTypeProvider;
use SevenTag\Api\VariableBundle\VariableTypeEvent;
use Symfony\Component\Yaml\Parser;

/**
 * Class VariableTypeProviderTest
 * @package SevenTag\Api\VariableBundle\Tests\Provider
 */
class VariableTypeProviderTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     * @dataProvider variableProvider
     * @param $data
     */
    public function itShouldProvideOneVariableType($data)
    {
        $typeEventClass = 'SevenTag\Api\VariableBundle\Event\LoadVariableTypeEvent';
        $translator = $this->prophesize('Symfony\Component\Translation\Translator');
        $eventDispatcher = $this->prophesize('Symfony\Component\EventDispatcher\EventDispatcherInterface');
        $eventDispatcher
            ->dispatch(VariableTypeEvent::LOAD_VARIABLES_TYPE, Argument::type($typeEventClass))
            ->shouldBeCalled();
        $provider = new VariableTypeProvider($translator->reveal(), [$data], $eventDispatcher->reveal());

        $this->assertCount(1, $provider->createVariableTypes());
        $this->assertEquals($data['name'], $provider->createVariableTypes()->first()->getName());
    }

    /**
     * @return mixed
     */
    public function variableProvider()
    {
        $parser = new Parser();
        $data = $parser->parse(file_get_contents(__DIR__ . '/Fixtures/types.yml'));

        return $data;
    }
}
