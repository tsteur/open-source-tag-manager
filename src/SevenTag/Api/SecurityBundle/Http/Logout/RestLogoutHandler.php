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

namespace SevenTag\Api\SecurityBundle\Http\Logout;

use SevenTag\Api\SecurityBundle\Entity\AccessTokenRepository;
use FOS\OAuthServerBundle\Security\Authentication\Token\OAuthToken;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * Class RestLogoutHandler
 * @package SevenTag\Api\SecurityBundle\Http\Logout
 */
class RestLogoutHandler
{
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * @var AccessTokenRepository
     */
    private $accessTokenRepository;

    /**
     * @param AccessTokenRepository $accessTokenRepository
     */
    public function __construct(TokenStorageInterface $tokenStorage, AccessTokenRepository $accessTokenRepository)
    {
        $this->tokenStorage = $tokenStorage;
        $this->accessTokenRepository = $accessTokenRepository;
    }

    /**
     * @param Request $request
     * @return bool
     */
    public function logout(Request $request)
    {
        $this->invalidateAccessToken($request);
        $this->invalidateSession($request);

        return true;
    }

    /**
     * @throws \OAuth2\OAuth2AuthenticateException
     */
    private function invalidateAccessToken()
    {
        $token = $this->tokenStorage->getToken();
        if (!$token instanceof OAuthToken) {
            throw new BadRequestHttpException(sprintf('Token storage should return OAuthToken.'));
        }

        $accessToken = $this->accessTokenRepository
            ->findOneByToken($token->getToken());

        if ($accessToken) {
            $this->accessTokenRepository->delete($accessToken);
        }
    }

    /**
     * @param Request $request
     */
    private function invalidateSession(Request $request)
    {
        $session = $request->getSession();
        if ($session) {
            $session->invalidate();
        }
    }
}
