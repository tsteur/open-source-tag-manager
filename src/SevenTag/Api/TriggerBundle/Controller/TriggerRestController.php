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

namespace SevenTag\Api\TriggerBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use SevenTag\Api\AppBundle\Controller\RestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Trigger\Model\TriggerInterface;
use SevenTag\Api\SecurityBundle\Acl\PermissionMap;
use SevenTag\Api\TriggerBundle\Entity\TriggerRepository;
use SevenTag\Api\TriggerBundle\Form\Type\TriggerType;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\HttpFoundation\Response;

class TriggerRestController extends RestController
{
    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         400="Returned when data are invalid",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the container is not found"
     *     },requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Container id"
     *          }
     *     },
     *     authentication=true,
     *     description="Get container triggers"
     * )
     *
     * @ParamConverter("container", class="SevenTagContainerBundle:Container", converter="versionable_converter")
     *
     * @Rest\Get("/containers/{id}/triggers", name="seventag_api_triggers_get", requirements={"id" = "\d+"})
     * @Rest\View(serializerEnableMaxDepthChecks="true", serializerGroups={"triggers"})
     * @Rest\QueryParam(name="offset", requirements="\d+", default="0", description="Offset for triggers list pagination")
     * @Rest\QueryParam(name="limit", requirements="\d+", default="20", description="Limit for triggers list pagination")
     * @Rest\QueryParam(name="exclude", array=true, requirements="\d+", strict=true, nullable=true, description="Exclude selected trigger Id's")
     * @Rest\QueryParam(name="types", array=true, requirements="\d+", strict=true, nullable=true, description="Include selected trigger types")
     *
     * @param ContainerInterface $container
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return array
     */
    public function getTriggersAction(ContainerInterface $container, ParamFetcherInterface $paramFetcher)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_VIEW, $container);

        /** @var TriggerRepository $repository */
        $repository = $this->getRepository();
        $exclude = $paramFetcher->get('exclude');
        $types = $paramFetcher->get('types');

        $triggers = $repository->findByContainer(
            $container,
            $paramFetcher->get('limit'),
            $paramFetcher->get('offset'),
            $exclude,
            $types
        );

        $totalCount = $repository->countByContainer($container, $exclude, $types);

        return [
            'data' => $triggers,
            'total' => $totalCount
        ];
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         400="Returned when data are invalid",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the trigger is not found"
     *     },requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Trigger id"
     *          }
     *     },
     *     authentication=true,
     *     resource=true,
     *     description="Get trigger"
     * )
     *
     * @ParamConverter("trigger", class="SevenTagTriggerBundle:Trigger", converter="versionable_converter")
     *
     * @Rest\Get("/triggers/{id}", requirements={"id" = "\d+"})
     * @Rest\View(serializerEnableMaxDepthChecks="true", serializerGroups={"triggers", "conditions"})
     *
     * @param TriggerInterface $trigger
     * @return array
     */
    public function getTriggerAction(TriggerInterface $trigger)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_VIEW, $trigger->getContainer());

        return [
            'data' => $trigger
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
     *     },requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Container id"
     *          }
     *     },
     *     authentication=true,
     *     input="SevenTag\Api\TriggerBundle\Form\Type\TriggerType",
     *     description="Add new trigger to container"
     * )
     *
     * @ParamConverter("container", class="SevenTagContainerBundle:Container", converter="versionable_converter")
     *
     * @Rest\Post("/containers/{id}/triggers", name="seventag_api_triggers_post", requirements={"id" = "\d+"})
     * @Rest\View(serializerEnableMaxDepthChecks="true", serializerGroups={"trigger"})
     *
     * @param ContainerInterface $container
     *
     * @return View
     */
    public function postTriggerAction(ContainerInterface $container)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_EDIT, $container);

        $repository = $this->getRepository();

        /** @var TriggerInterface $trigger */
        $trigger = $repository->create();
        $trigger->setContainer($container);

        $form = $this->createFormType(
            $this->get('seven_tag_trigger.form_type.trigger_form_type'),
            $trigger
        );

        $form->handleRequest($this->get('request_stack')->getCurrentRequest());

        if ($form->isValid()) {
            $repository->save($trigger);

            return $this->view(['data' => $trigger], Response::HTTP_CREATED);
        }

        return $this->view($form, Response::HTTP_BAD_REQUEST);
    }


    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         400="Returned when data are invalid",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the trigger is not found"
     *     },requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Trigger id"
     *          }
     *     },
     *     authentication=true,
     *     input="SevenTag\Api\TriggerBundle\Form\Type\TriggerType",
     *     description="Update trigger"
     * )
     *
     * @ParamConverter("trigger", class="SevenTagTriggerBundle:Trigger", converter="versionable_converter")
     *
     * @Rest\Put("/triggers/{id}", name="seventag_api_triggers_update", requirements={"id" = "\d+"})
     * @Rest\View(serializerEnableMaxDepthChecks="true", serializerGroups={"tags", "triggers", "conditions"})
     *
     * @param TriggerInterface $trigger
     *
     * @return View
     */
    public function putTriggerAction(TriggerInterface $trigger)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_EDIT, $trigger->getContainer());

        $form = $this->createFormType(
            new TriggerType,
            $trigger,
            'PUT'
        );

        $form->handleRequest($this->get('request_stack')->getCurrentRequest());

        if ($form->isValid()) {
            $repository = $this->getRepository();
            $repository->save($trigger);

            return $this->view(['data' => $trigger], Response::HTTP_OK);
        }

        return $this->view($form, Response::HTTP_BAD_REQUEST);
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         204="Returned when successful",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the trigger is not found"
     *     },requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Trigger id"
     *          }
     *     },
     *     authentication=true,
     *     description="Remove trigger"
     * )
     *
     * @ParamConverter("trigger", class="SevenTagTriggerBundle:Trigger", converter="versionable_converter")
     * @Rest\Delete("/triggers/{id}", name="seventag_api_triggers_delete", requirements={"id" = "\d+"})
     *
     * @param TriggerInterface $trigger
     * @return View
     */
    public function deleteTriggerAction(TriggerInterface $trigger)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_DELETE, $trigger->getContainer());

        $this->getRepository()->delete($trigger);

        return $this->view(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * @ParamConverter("trigger", class="SevenTagTriggerBundle:Trigger", converter="versionable_converter")
     * @Rest\Post("/triggers/{id}/remove", name="_remove", requirements={"id" = "\d+"})
     *
     * @param TriggerInterface $trigger
     * @return View
     */
    public function postDeleteTriggerAction(TriggerInterface $trigger)
    {
        return $this->deleteTriggerAction($trigger);
    }

    /**
     * @return TriggerRepository
     */
    private function getRepository()
    {
        return $this->get('seven_tag.repository.trigger_repository');
    }
}
