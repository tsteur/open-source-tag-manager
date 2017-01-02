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

use FOS\OAuthServerBundle\Security\Firewall\OAuthListener as BaseOAuthListener;
use OAuth2\OAuth2;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\Security\Core\Authentication\AuthenticationManagerInterface;
use Symfony\Component\Security\Core\SecurityContextInterface;

/**
 * Class OAuthListener
 * @package SevenTag\Api\SecurityBundle\Security\Firewall
 */
class OAuthListener extends BaseOAuthListener
{
    /**
     * @var OAuthTokenUserResolver
     */
    protected $tokenUserResolver;

    /**
     * OAuthListener constructor.
     *
     * @param SecurityContextInterface $securityContext
     * @param AuthenticationManagerInterface $authenticationManager
     * @param OAuth2 $serverService
     * @param OAuthTokenUserResolver $tokenUserResolver
     */
    public function __construct(
        SecurityContextInterface $securityContext,
        AuthenticationManagerInterface $authenticationManager,
        OAuth2 $serverService,
        OAuthTokenUserResolver $tokenUserResolver
    ) {
        parent::__construct($securityContext, $authenticationManager, $serverService);

        $this->tokenUserResolver = $tokenUserResolver;
    }

    /**
     * @param GetResponseEvent $event The event.
     */
    public function handle(GetResponseEvent $event)
    {
        parent::handle($event);

        $token = $this->securityContext->getToken();
        if (!$token) {
            return;
        }

        $resolvedToken = $this
            ->tokenUserResolver
            ->resolveTokenUser($token);

        $this->securityContext->setToken($resolvedToken);
    }
}
