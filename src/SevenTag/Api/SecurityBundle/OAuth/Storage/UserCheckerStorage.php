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

namespace SevenTag\Api\SecurityBundle\OAuth\Storage;

use FOS\OAuthServerBundle\Model\ClientInterface;
use FOS\OAuthServerBundle\Storage\OAuthStorage;
use OAuth2\Model\IOAuth2Client;
use OAuth2\OAuth2;
use OAuth2\OAuth2ServerException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Class UserCheckerStorage
 * @package SevenTag\Api\SecurityBundle\OAuth\Storage
 */
class UserCheckerStorage extends OAuthStorage
{
    /**
     * @var UserCheckerInterface
     */
    protected $userChecker;

    /**
     * @param UserCheckerInterface $userChecker
     */
    public function setUserChecker(UserCheckerInterface $userChecker)
    {
        $this->userChecker = $userChecker;
    }

    /**
     * {@inheritdoc}
     */
    public function checkUserCredentials(IOAuth2Client $client, $username, $password)
    {
        if (!$client instanceof ClientInterface) {
            throw new \InvalidArgumentException('Client has to implement the ClientInterface');
        }

        try {
            $user = $this->userProvider->loadUserByUsername($username);
        } catch (AuthenticationException $e) {
            return false;
        }

        $this->checkUser($user);

        if (null !== $user) {
            $encoder = $this->encoderFactory->getEncoder($user);

            if ($encoder->isPasswordValid($user->getPassword(), $password, $user->getSalt())) {
                return [
                    'data' => $user,
                ];
            }
        }

        return false;
    }

    /**
     * @param UserInterface $user
     * @throws OAuth2ServerException
     */
    protected function checkUser(UserInterface $user)
    {
        try {
            $this->userChecker->checkPreAuth($user);
        } catch (AuthenticationException $e) {
            throw new OAuth2ServerException(OAuth2::HTTP_BAD_REQUEST, OAuth2::ERROR_INVALID_CLIENT, $e->getMessage());
        }
    }
}
