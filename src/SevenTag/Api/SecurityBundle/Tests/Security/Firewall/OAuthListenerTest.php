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

namespace SevenTag\Api\SecurityBundle\Tests\Security\Firewall;

use FOS\OAuthServerBundle\Security\Authentication\Token\OAuthToken;
use SevenTag\Api\SecurityBundle\Entity\AccessToken;
use SevenTag\Api\SecurityBundle\Entity\Integration;
use SevenTag\Api\SecurityBundle\Security\Firewall\OAuthListener;
use SevenTag\Api\UserBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

/**
 * Class OAuthListenerTest
 * @package SevenTag\Api\SecurityBundle\Tests\Security\Firewall
 */
class OAuthListenerTest extends \PHPUnit_Framework_TestCase
{
    protected $securityContext;

    protected $authenticationManager;

    protected $serverService;

    protected $tokenUserResolver;

    protected $event;

    /**
     * {@inheritDoc}
     */
    public function setUp()
    {
        parent::setUp();

        $this->securityContext = $this->prophesize('Symfony\Component\Security\Core\SecurityContextInterface');
        $this->authenticationManager = $this->prophesize('Symfony\Component\Security\Core\Authentication\AuthenticationManagerInterface');
        $this->serverService = $this->prophesize('OAuth2\OAuth2');
        $this->tokenUserResolver = $this->prophesize('SevenTag\Api\SecurityBundle\Security\Firewall\OAuthTokenUserResolver');
        $this->event = $this->prophesize('Symfony\Component\HttpKernel\Event\GetResponseEvent');
    }

    /**
     * @test
     */
    public function itShouldHandleTokenWithUser()
    {
        $listener = new OAuthListener(
            $this->securityContext->reveal(),
            $this->authenticationManager->reveal(),
            $this->serverService->reveal(),
            $this->tokenUserResolver->reveal()
        );

        $token = new OAuthToken();

        $this
            ->securityContext
            ->getToken()
            ->shouldBeCalled()
            ->willReturn($token);

        $this
            ->tokenUserResolver
            ->resolveTokenUser($token)
            ->shouldBeCalled()
            ->willReturn($token);

        $this
            ->securityContext
            ->setToken($token)
            ->shouldBeCalled()
            ->willReturn($token);

        $listener->handle($this->event->reveal());
    }

    /**
     * @test
     */
    public function itShouldNotHandleTokenWithUser()
    {
        $listener = new OAuthListener(
            $this->securityContext->reveal(),
            $this->authenticationManager->reveal(),
            $this->serverService->reveal(),
            $this->tokenUserResolver->reveal()
        );

        $token = new OAuthToken();

        $this
            ->securityContext
            ->getToken()
            ->shouldBeCalled()
            ->willReturn(null);

        $this
            ->tokenUserResolver
            ->resolveTokenUser($token)
            ->shouldNotBeCalled();

        $listener->handle($this->event->reveal());
    }
}
