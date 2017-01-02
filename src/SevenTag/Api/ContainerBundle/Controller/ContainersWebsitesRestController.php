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

namespace SevenTag\Api\ContainerBundle\Controller;

use Doctrine\Common\Collections\ArrayCollection;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use SevenTag\Api\AppBundle\Controller\RestController;
use SevenTag\Api\AppBundle\Rest\View as RestView;
use SevenTag\Api\SecurityBundle\Acl\PermissionMap;
use SevenTag\Component\Container\Model\ContainerInterface;

/**
 * Class ContainersRestController
 *
 * @package SevenTag\Api\ContainerBundle\Controller
 */
class ContainersWebsitesRestController extends RestController
{

    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access"
     *     },requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Container id"
     *          }
     *     },
     *     authentication=true,
     *     description="Get container websites"
     * )
     *
     * @ParamConverter(
     *  "container",
     *  class="SevenTagContainerBundle:Container",
     *  converter="versionable_converter"
     * )
     *
     * @Rest\Get("/containers/{id}/websites")
     * @Rest\View(
     *    statusCode=200,
     *    serializerEnableMaxDepthChecks="true",
     *    serializerGroups={"container", "websites"}
     * )
     *
     * @param ContainerInterface $container
     * @return ArrayCollection<SevenTag\Api\ContainerBundle\Entity\ContainerWebsite>
     */
    public function getWebsitesAction(ContainerInterface $container)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_VIEW, $container);

        $websites = $container->getWebsites();

        return [
            'data' => $websites,
            'total' => count($websites)
        ];
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         400="Returned when data are invalid",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access"
     *     },requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Container id"
     *          }
     *     },
     *     authentication=true,
     *     description="Update website assigned to container"
     * )
     *
     * @ParamConverter(
     *      "container",
     *      class="SevenTagContainerBundle:Container",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\Put("/containers/{id}/websites")
     * @Rest\View(
     *      statusCode=200,
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"container", "websites"}
     * )
     *
     * @param ContainerInterface $container
     * @return array|View
     */
    public function putWebsitesAction(ContainerInterface $container)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_EDIT, $container);

        $form = $this->createFormTypeAndHandleRequest(
            $this->get('seven_tag_container.form_type.container_websites_type'),
            $container,
            'PUT'
        );

        if ($form->isValid()) {
            $repository = $this->get('seven_tag_container.repository.container_repository');
            $repository->save($container);

            return ['data' => $container];
        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }
}
