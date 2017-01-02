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

namespace SevenTag\Updater\Tests\Environment;

use SevenTag\Updater\Environment\Environment;
use SevenTag\Updater\Instance\InstanceInterface;
use Psr\Log\LoggerInterface;

/**
 * Class EnvironmentTest
 * @package SevenTag\Updater\Tests\Environment
 */
class EnvironmentTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itProvidersEnvironmentInterface()
    {
        $environment = new Environment($this->getInstanceMock(), $this->getInstanceMock(), $this->getLoggerMock());

        $this->assertInstanceOf('SevenTag\Updater\Instance\InstanceInterface', $environment->getCurrentInstance());
        $this->assertInstanceOf('SevenTag\Updater\Instance\InstanceInterface', $environment->getNewestInstance());
        $this->assertInstanceOf('Psr\Log\LoggerInterface', $environment->getLogger());
    }

    /**
     * @return InstanceInterface
     */
    private function getInstanceMock()
    {
        $instance = $this->prophesize('SevenTag\Updater\Instance\InstanceInterface');

        return $instance->reveal();
    }

    /**
     * @return LoggerInterface
     */
    private function getLoggerMock()
    {
        $logger = $this->prophesize('Psr\Log\LoggerInterface');

        return $logger->reveal();
    }
}
