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

namespace SevenTag\Api\SecurityBundle\Security\Firewall;

use FOS\OAuthServerBundle\Model\TokenManagerInterface;
use FOS\OAuthServerBundle\Model\Token;
use FOS\OAuthServerBundle\Security\Authentication\Token\OAuthToken;
use FOS\UserBundle\Model\UserInterface;
use SevenTag\Component\Integration\Model\IntegrationInterface;

/**
 * Class OAuthTokenUserResolver
 * @package SevenTag\Api\SecurityBundle\Security\Firewall
 */
class OAuthTokenUserResolver
{
    /**
     * @var TokenManagerInterface
     */
    private $tokenManager;

    /**
     * @param TokenManagerInterface $tokenManager
     */
    public function __construct(TokenManagerInterface $tokenManager)
    {
        $this->tokenManager = $tokenManager;
    }

    /**
     * @param OAuthToken $token
     * @return OAuthToken
     */
    public function resolveTokenUser(OAuthToken $token)
    {
        return is_null($token->getUser())
            ? $this->resolveAccessTokenUser($token)
            : $token;
    }

    /**
     * @param OAuthToken $token
     * @return OAuthToken
     */
    protected function resolveAccessTokenUser(OAuthToken $token)
    {
        /** @var Token $accessToken */
        $accessToken = $this->tokenManager->findTokenByToken($token->getToken());
        if (!$this->validateAccessToken($accessToken)) {
            return $token;
        }

        $user = $this->getUserFromAccessTokenClient($accessToken);
        if (!($user instanceof UserInterface)) {
            return $token;
        }

        return $this->createToken($accessToken, $user);
    }

    /**
     * @param Token $accessToken
     * @param UserInterface $user
     * @return OAuthToken
     */
    protected function createToken(Token $accessToken, UserInterface $user)
    {
        $roles = $this
            ->resolveUserRolesByScope(
                $user->getRoles(),
                $accessToken->getScope()
            );

        $token = new OAuthToken($roles);
        $token->setAuthenticated(true);
        $token->setToken($accessToken->getToken());
        $token->setUser($user);

        return $token;
    }

    /**
     * @param array $roles
     * @param $scope
     * @return array
     */
    protected function resolveUserRolesByScope(array $roles, $scope)
    {
        if (!empty($scope)) {
            foreach (explode(' ', $scope) as $role) {
                $roles[] = 'ROLE_' . strtoupper($role);
            }
        }

        return $roles;
    }

    /**
     * @param Token $token
     * @return UserInterface|null
     */
    protected function getUserFromAccessTokenClient(Token $token)
    {
        $client = $token->getClient();

        return $client instanceof IntegrationInterface
            ? $client->getUser()
            : null;
    }

    /**
     * @param $accessToken
     * @return bool
     */
    protected function validateAccessToken($accessToken)
    {
        return $accessToken instanceof Token && is_null($accessToken->getUser());
    }
}
