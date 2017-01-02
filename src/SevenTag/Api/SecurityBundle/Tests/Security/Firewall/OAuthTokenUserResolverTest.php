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
use SevenTag\Api\SecurityBundle\Entity\Client;
use SevenTag\Api\SecurityBundle\Entity\Integration;
use SevenTag\Api\SecurityBundle\Security\Firewall\OAuthTokenUserResolver;
use SevenTag\Api\UserBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

/**
 * Class OAuthTokenUserResolverTest
 * @package SevenTag\Api\SecurityBundle\Tests\Security\Firewall
 */
class OAuthTokenUserResolverTest extends \PHPUnit_Framework_TestCase
{
    protected $tokenManager;

    /**
     * {@inheritDoc}
     */
    public function setUp()
    {
        parent::setUp();

        $this->tokenManager = $this->prophesize('FOS\OAuthServerBundle\Model\TokenManagerInterface');
    }

    /**
     * @test
     */
    public function itShouldReturnTokenWithUser()
    {
        $token = new OAuthToken();
        $token->setToken('test');

        $user = new User();
        $accessToken = new AccessToken();
        $client = new Integration();
        $client->setUser($user);
        $accessToken->setClient($client);

        $this->findAccessTokenByToken($accessToken, $token->getToken());

        $tokenUserProvider = new OAuthTokenUserResolver($this->tokenManager->reveal());
        $resolvedToken = $tokenUserProvider->resolveTokenUser($token);

        $this->assertEquals($resolvedToken->getUser(), $user);
        $this->assertNotEquals($resolvedToken, $token);
        $this->assertTrue($resolvedToken->isAuthenticated());
    }

    /**
     * @test
     */
    public function itShouldReturnTokenWithoutUser()
    {
        $token = new OAuthToken();
        $token->setToken('test');

        $accessToken = new AccessToken();
        $client = new Client();
        $accessToken->setClient($client);

        $this->findAccessTokenByToken($accessToken, $token->getToken());

        $tokenUserProvider = new OAuthTokenUserResolver($this->tokenManager->reveal());
        $resolvedToken = $tokenUserProvider->resolveTokenUser($token);

        $this->assertEquals($resolvedToken->getUser(), null);
        $this->assertEquals($resolvedToken, $token);
    }

    /**
     * @test
     */
    public function itShouldReturnInputTokenBecauseOfInputTokenWithUser()
    {
        $user = new User();

        $token = new OAuthToken();
        $token->setToken('test');
        $token->setUser($user);

        $tokenUserProvider = new OAuthTokenUserResolver($this->tokenManager->reveal());
        $resolvedToken = $tokenUserProvider->resolveTokenUser($token);

        $this->assertEquals($resolvedToken, $token);
    }

    /**
     * @test
     */
    public function itShouldReturnInputTokenBecauseOfAccessTokenWithUser()
    {
        $token = new OAuthToken();
        $token->setToken('test');

        $user = new User();
        $accessToken = new AccessToken();
        $accessToken->setUser($user);

        $this->findAccessTokenByToken($accessToken, $token->getToken());

        $tokenUserProvider = new OAuthTokenUserResolver($this->tokenManager->reveal());
        $resolvedToken = $tokenUserProvider->resolveTokenUser($token);

        $this->assertEquals($resolvedToken, $token);
    }

    /**
     * @test
     */
    public function itShouldNotFoundAccessToken()
    {
        $token = new OAuthToken();
        $token->setToken('test');

        $this->findAccessTokenByToken(null, $token->getToken());

        $tokenUserProvider = new OAuthTokenUserResolver($this->tokenManager->reveal());
        $resolvedToken = $tokenUserProvider->resolveTokenUser($token);

        $this->assertEquals($resolvedToken, $token);
    }

    /**
     * @param AccessToken $accessToken
     * @param $tokenString
     */
    protected function findAccessTokenByToken(AccessToken $accessToken = null, $tokenString = '')
    {
        $this->tokenManager
            ->findTokenByToken($tokenString)
            ->shouldBeCalled()
            ->willReturn($accessToken);
    }
}
