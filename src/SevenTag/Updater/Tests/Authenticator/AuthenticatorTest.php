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

namespace SevenTag\Updater\Tests\Authenticator;

use Prophecy\Argument;
use SevenTag\Updater\Authenticator\Authenticator;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

/**
 * Class AuthenticatorTest
 * @package SevenTag\Updater\Tests\Authenticator
 */
class AuthenticatorTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itChecksIsAuthenticated()
    {
        $authenticator = new Authenticator($this->getSessionMock());

        $this->assertTrue($authenticator->isAuthenticated());
    }

    /**
     * @return SessionInterface
     */
    private function getSessionMock()
    {
        $session = $this->prophesize('Symfony\Component\HttpFoundation\Session\SessionInterface');
        $session
            ->get(Argument::exact('updaterEnabled'), Argument::exact(false))
            ->willReturn(true);

        return $session->reveal();
    }
}
