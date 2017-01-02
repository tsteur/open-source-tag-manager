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

use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use SevenTag\Api\AppBundle\Controller\RestController;
use SevenTag\Api\SecurityBundle\Acl\PermissionMap;
use SevenTag\Api\VariableBundle\Entity\Variable;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Variable\Model\VariableInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class VariableRestController
 * @package SevenTag\Api\VariableBundle\Controller
 */
class VariableRestController extends RestController
{
    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the variable is not found"
     *     },
     *     requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Variable id"
     *          }
     *     },
     *     authentication=true,
     *     resource=true,
     *     description="Get variable"
     * )
     *
     * @ParamConverter(
     *      "variable",
     *      class="SevenTagVariableBundle:Variable",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\Get("/variables/{id}", requirements={"id" = "\d+"})
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"variable"}
     * )
     *
     * @param VariableInterface $variable
     * @return array
     */
    public function getVariableAction(VariableInterface $variable)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_VIEW, $variable->getContainer());

        return ['data' => $variable];
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         400="Returned when data are invalid",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the variable is not found"
     *     },
     *     requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Variable id"
     *          }
     *     },
     *     authentication=true,
     *     input="SevenTag\Api\VariableBundle\Form\Type\VariableType",
     *     description="Update variable"
     * )
     *
     * @ParamConverter(
     *      "variable",
     *      class="SevenTagVariableBundle:Variable",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\Put("/variables/{id}", requirements={"id" = "\d+"})
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"variable"}
     * )
     *
     * @param Request $request
     * @param VariableInterface $variable
     * @return mixed
     */
    public function putVariableAction(Request $request, VariableInterface $variable)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_EDIT, $variable->getContainer());

        $form = $this->createFormType(
            $this->get('seven_tag_variable.form_type.variable_form_type'),
            $variable,
            'PUT'
        );

        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->get('seven_tag_variable.repository.variable_repository')
                ->save($variable);

            return ['data' => $variable];
        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         204="Returned when successful",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the variable is not found"
     *     },
     *     requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Variable id"
     *          }
     *     },
     *     authentication=true,
     *     description="Remove variable"
     * )
     *
     * @ParamConverter(
     *      "variable",
     *      class="SevenTagVariableBundle:Variable",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\Delete("/variables/{id}", requirements={"id" = "\d+"})
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"variable"}
     * )
     *
     * @param VariableInterface $variable
     * @return View
     */
    public function deleteVariableAction(VariableInterface $variable)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_DELETE, $variable->getContainer());

        $this->get('seven_tag_variable.repository.variable_repository')
            ->delete($variable);

        return $this->view('', Codes::HTTP_NO_CONTENT);
    }

    /**
     * @ParamConverter(
     *      "variable",
     *      class="SevenTagVariableBundle:Variable",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\Post("/variables/{id}/remove", name="_remove")
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"variable"}
     * )
     *
     * @param VariableInterface $variable
     * @return View
     */
    public function postDeleteVariableAction(VariableInterface $variable)
    {
        return $this->deleteVariableAction($variable);
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         201="Returned when successful",
     *         400="Returned when data are invalid",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the container is not found"
     *     },
     *     requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Container id"
     *          }
     *     },
     *     input="SevenTag\Api\VariableBundle\Form\Type\VariableType",
     *     authentication=true,
     *     description="Add new variable to container"
     * )
     *
     * @ParamConverter(
     *  "container",
     *  class="SevenTagContainerBundle:Container",
     *  converter="versionable_converter"
     * )
     *
     * @Rest\Post("/containers/{id}/variables", requirements={"id" = "\d+"})
     * @Rest\View(
     *  statusCode=201,
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"variable", "variableType"}
     * )
     *
     * @param Request $request
     * @param ContainerInterface $container
     * @return mixed
     */
    public function postVariableForContainerAction(Request $request, ContainerInterface $container)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_EDIT, $container);

        $repository = $this
            ->get('seven_tag_variable.repository.variable_repository');

        /** @var Variable $variable */
        $variable = $repository->create();

        $variable->setContainer($container);

        $form = $this->createFormType(
            $this->get('seven_tag_variable.form_type.variable_form_type'),
            $variable
        );

        $form->handleRequest($request);

        if ($form->isValid()) {
            $repository->save($variable);

            return ['data' => $variable];
        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         400="Returned when data are invalid",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the container is not found"
     *     },
     *     requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Container id"
     *          }
     *     },
     *     authentication=true,
     *     description="Get container variables"
     * )
     *
     * @ParamConverter(
     *  "container",
     *  class="SevenTagContainerBundle:Container",
     *  converter="versionable_converter"
     * )
     *
     * @Rest\QueryParam(
     *  name="offset",
     *  requirements="\d+",
     *  default="0",
     *  description="Offset for tags list pagination"
     * )
     * @Rest\QueryParam(
     *  name="limit",
     *  requirements="\d+",
     *  default="10",
     *  description="Limit for tags list pagination"
     * )
     *
     * @Rest\Get("/containers/{id}/variables", requirements={"id" = "\d+"})
     * @Rest\View(
     *  statusCode=200,
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"variable", "variables", "variableType"}
     * )
     *
     * @param ContainerInterface $container
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return array
     */
    public function getContainersVariablesAction(ContainerInterface $container, ParamFetcherInterface $paramFetcher)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_VIEW, $container);

        $repository = $this->get('seven_tag_variable.repository.variable_repository');
        $manager = $this->get('seven_tag_variable.variable_manager');

        $variables = $repository->findByContainerWithLimitAndOffset(
            $container,
            $paramFetcher->get('limit'),
            $paramFetcher->get('offset')
        );

        $types = $manager->getTypes();

        foreach ($variables as $variable) {
            $variable->setType(
                $types->get($variable->getType())
            );
        }

        return [
            'data' => $variables,
            'total' => $repository->countByContainer($container)
        ];
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         201="Returned when successful",
     *         400="Returned when data are invalid",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the container is not found"
     *     },
     *     requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Container id"
     *          }
     *     },
     *     authentication=true,
     *     description="Get container available variables"
     * )
     *
     * @ParamConverter(
     *  "container",
     *  class="SevenTagContainerBundle:Container",
     *  converter="versionable_converter"
     * )
     *
     * @Rest\Get("/containers/{id}/available-variables", requirements={"id" = "\d+"})
     * @Rest\View(
     *  statusCode=200,
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"variable", "variables", "variableType"}
     * )
     *
     * @param ContainerInterface $container
     * @return array
     */
    public function getContainersAvailableVariablesAction(ContainerInterface $container)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_VIEW, $container);

        $manager = $this->get('seven_tag_variable.variable_manager');

        $variables = $manager->getVariables($container);

        foreach ($variables as $variable) {
            $variable->setContainer($container);
        }

        return [
            'data' => $variables
        ];
    }
}
