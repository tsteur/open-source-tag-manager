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

use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use SevenTag\Api\AppBundle\Controller\RestController;

/**
 * Class SecurityRestController
 * @package SevenTag\Api\SecurityBundle\Controller
 */
class SecurityRestController extends RestController
{
    /**
     * @Rest\Get("/users/me/logout")
     * @Rest\View(
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"rest_api"}
     * )
     */
    public function logoutAction(Request $request)
    {
        $this->get('seven_tag_security.logout_handler.rest_logout')
            ->logout($request);

        return [];
    }
}
