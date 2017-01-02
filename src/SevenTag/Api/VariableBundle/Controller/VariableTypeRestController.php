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

namespace SevenTag\Api\VariableBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use SevenTag\Api\AppBundle\Controller\RestController;
use FOS\RestBundle\Controller\Annotations as Rest;

/**
 * Class VariableTypeRestController
 * @package SevenTag\Api\VariableBundle\Controller
 */
class VariableTypeRestController extends RestController
{
    /**
     * @ApiDoc(
     *     section="internal",
     *     statusCodes={
     *         200="Returned when successful",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access"
     *     },
     *     authentication=true,
     *     resource=true
     * )
     *
     * @Rest\Get("/variable-types")
     * @Rest\View(
     *  statusCode=200,
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"variableType"}
     * )
     *
     * @return array
     */
    public function getVariablesTypesAction()
    {
        $types = $this->get('seven_tag_variable.variable_manager')->getTypes();

        return [
            'data' => array_values($types->toArray()),
            'total' => $types->count()
        ];
    }
}
