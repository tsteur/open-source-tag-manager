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

namespace SevenTag\Api\ContainerBundle\Tests\ModeResolver;

use Prophecy\Argument;
use SevenTag\Api\ContainerBundle\ModeResolver\ModeResolverInterface;
use SevenTag\Api\ContainerBundle\ModeResolver\RequestModeResolver;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Class RequestModeResolverSpec
 * @package spec\SevenTag\Api\ContainerBundle\ModeResolver
 */
class RequestModeResolverTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     * @dataProvider getInModeArguments
     * @param string $mode
     * @param int $accessId
     * @param bool $expected
     */
    public function itResolvesContainerMode($mode, $accessId, $expected)
    {
        $requestModeResolver = new RequestModeResolver($this->getRequestStackMock());
        $result = $requestModeResolver->isInMode($mode, $accessId);

        $this->assertEquals($result, $expected);
    }

    public function getInModeArguments()
    {
        return [
            [ModeResolverInterface::MODE_DEBUG, 44, true],
            [ModeResolverInterface::MODE_PREVIEW, 44, false],
            [ModeResolverInterface::MODE_DEBUG, 43, false],
            [ModeResolverInterface::MODE_PREVIEW, 43, false],
        ];
    }

    /**
     * @return RequestStack
     */
    private function getRequestStackMock()
    {
        $requestStack = $this->prophesize('Symfony\Component\HttpFoundation\RequestStack');
        $request = new Request([], [], [], [
            ModeResolverInterface::MODE_DEBUG => 44
        ]);

        $requestStack
            ->getCurrentRequest()
            ->shouldBeCalledTimes(1)
            ->willReturn($request);

        return $requestStack->reveal();
    }
}
