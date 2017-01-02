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

namespace SevenTag\Api\SecurityBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use OAuth2\OAuth2ServerException;
use FOS\RestBundle\Controller\Annotations as Rest;
use SevenTag\Api\AppBundle\Controller\RestController;

/**
 * Class TokenRestController
 * @package FOS\OAuthServerBundle\Controller
 */
class TokenRestController extends RestController
{
    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         400="Returned when data are invalid"
     *     },
     *     input="SevenTag\Api\SecurityBundle\Form\Type\TokenType",
     *     resource=true,
     *     description="Log in to application and get token"
     * )
     *
     * @Rest\Post("/oauth/v2/token")
     * @Rest\View()
     *
     * @param  Request $request
     * @return array
     */
    public function tokenAction(Request $request)
    {
        $oauthServer = $this->get('fos_oauth_server.server');

        try {
            return $oauthServer->grantAccessToken($request);
        } catch (OAuth2ServerException $e) {
            return $this->get('seven_tag_security.oauth_server_exception_to_response_transformer')
                ->transform($e);
        }
    }
}
