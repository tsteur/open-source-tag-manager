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

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use SevenTag\Api\AppBundle\Rest\View as RestView;
use SevenTag\Api\AppBundle\Search\Criteria;
use SevenTag\Api\ContainerBundle\Entity\ContainerPermission;
use SevenTag\Api\AppBundle\Controller\RestController;
use SevenTag\Component\Container\Model\Container;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Api\ContainerBundle\ContainerLibrary\ContainerLibraryEvent;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Events;
use SevenTag\Api\ContainerBundle\Entity\ContainerRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use SevenTag\Api\SecurityBundle\Acl\PermissionMap;

/**
 * Class ContainersRestController
 *
 * @package SevenTag\Api\ContainerBundle\Controller
 */
class ContainersRestController extends RestController
{
    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
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
     *     resource=true,
     *     description="Get container"
     * )
     *
     * @ParamConverter(
     *      "container",
     *      class="SevenTagContainerBundle:Container",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\Get("/containers/{id}", requirements={"id" = "\d+"})
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"container", "version", "version_details", "tags", "triggers", "conditions", "permissions"}
     * )
     *
     * @param Container $container
     * @return array
     */
    public function getContainersByIdAction(Container $container)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_VIEW, $container);

        /** @var ContainerRepository $repository */
        $repository = $this->get('seven_tag_container.repository.container_repository');
        $lastPublish = $repository->findLastPublishedVersionByAccessId($container->getAccessId());

        if (null !== $lastPublish) {
            $container->setLastPublishVersion($lastPublish->getVersion());
        }

        return [
            'data' => $container
        ];
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
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
     *     description="Publish container"
     * )
     *
     * @ParamConverter(
     *      "container",
     *      class="SevenTagContainerBundle:Container",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\Post("/containers/{id}/version-publish", requirements={"id" = "\d+"})
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"container", "version"}
     * )
     *
     * @param ContainerInterface $container
     * @return ContainerInterface
     */
    public function publishContainerByIdAction(ContainerInterface $container)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_PUBLISH, $container);

        $versionManager = $this->get('seven_tag_app.version_manager');
        $container = $versionManager->publish($container);

        $this->get('event_dispatcher')
            ->dispatch(Events::CONTAINER_PUBLISHED, new ContainerLibraryEvent($container));

        return [
            'data' => $container
        ];
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
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
     *     description="Restore container"
     * )
     *
     * @Rest\Post("/containers/{id}/version-restore", requirements={"id" = "\d+"})
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"container", "version"}
     * )
     * @param $id
     * @return array
     */
    public function restoreContainerByIdAction($id)
    {
        $repository = $this->get('doctrine.orm.entity_manager')
            ->getRepository('SevenTagContainerBundle:Container');

        $container = $repository->findLastPublishedVersionByAccessId($id);

        if (null === $container) {
            throw $this->createNotFoundException();
        }

        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_PUBLISH, $container);

        $versionManager = $this->get('seven_tag_app.version_manager');
        $container = $versionManager->restore($container);

        return [
            'data' => $container
        ];
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
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
     *     description="Get latest publish version of container"
     * )
     *
     * @Rest\Get("/containers/{id}/version-published", requirements={"id" = "\d+"})
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"container", "version"}
     * )
     * @param $id
     * @return array
     */
    public function getLastPublishedContainerByIdAction($id)
    {
        $repository = $this->get('doctrine.orm.entity_manager')
            ->getRepository('SevenTagContainerBundle:Container');

        $container = $repository->findLastPublishedVersionByAccessId($id);

        if (null === $container) {
            throw $this->createNotFoundException();
        }

        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_VIEW, $container);

        return [
            'data' => $container
        ];
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
     *     input="SevenTag\Api\ContainerBundle\Form\ContainerType",
     *     description="Update container"
     * )
     *
     * @ParamConverter(
     *      "container",
     *      class="SevenTagContainerBundle:Container",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\Put("/containers/{id}", requirements={"id" = "\d+"})
     * @Rest\View(
     *      statusCode=200,
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"container", "container_edit", "permissions"}
     * )
     *
     * @return ContainerInterface|array
     */
    public function putContainersAction(ContainerInterface $container)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_EDIT, $container);

        $form = $this->createFormTypeAndHandleRequest(
            $this->get('seven_tag_container.form_type.container_form_type'),
            $container,
            'PUT'
        );

        if ($form->isValid()) {
            $this->get('seven_tag_container.repository.container_repository')
                ->save($container);

            return ['data' => $container];

        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }

    /**
     * @ApiDoc(
     *     section="internal",
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
     *     input="SevenTag\Api\ContainerBundle\Form\ContainerType"
     * )
     *
     * @ParamConverter(
     *      "container",
     *      class="SevenTagContainerBundle:Container",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\Put("/containers/{id}/permissions", requirements={"id" = "\d+"})
     * @Rest\View(
     *      statusCode=200,
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"users"}
     * )
     *
     * @param ContainerInterface $container
     * @return array
     */
    public function putContainersPermissionsAction(ContainerInterface $container)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_OPERATOR, $container);

        $permission = new ContainerPermission();
        $permission->setContainerAccessId($container->getAccessId());

        $form = $this->createFormTypeAndHandleRequest(
            $this->get('seven_tag_container.form_type.container_permissions_type'),
            $permission,
            'PUT'
        );

        if ($form->isValid()) {
            $repository = $this->get('seven_tag_container.repository.container_permissions_repository');
            $repository->recreateContainerPermissions($permission);

            $permissionsMapper = $this->get('seven_tag_security.utils.bitmask_to_permissions_mapper');

            return ['data' => [
                'permissions' => $permissionsMapper->getPermissions($permission->getPermissions()),
                'user' => $permission->getUser()
            ]];

        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }

    /**
     * @ApiDoc(
     *     section="internal",
     *     statusCodes={
     *         200="Returned when successful",
     *         400="Returned when data are invalid",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the container is not found"
     *     },
     *     authentication=true
     * )
     *
     * @ParamConverter(
     *      "container",
     *      class="SevenTagContainerBundle:Container",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\QueryParam(
     *      name="offset",
     *      requirements="\d+",
     *      default="0",
     *      description="Offset for users list pagination"
     * )
     * @Rest\QueryParam(
     *      name="limit",
     *      requirements="\d+",
     *      default="10",
     *      description="Limit for users list pagination"
     * )
     *
     * @Rest\Get("/containers/{id}/permissions", requirements={"id" = "\d+"})
     * @Rest\View(
     *      statusCode=200,
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"container_permission", "users"}
     * )
     *
     * @param ContainerInterface $container
     * @return array
     */
    public function getContainersPermissionsAction(ContainerInterface $container, ParamFetcherInterface $paramFetcher)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_OPERATOR, $container);

        return $this->get('seven_tag_user.permissions_provider')
            ->getPermissions(
                $container,
                $this->getUser(),
                $paramFetcher->get('limit'),
                $paramFetcher->get('offset')
            );
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         204="Returned when successful",
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
     *     description="Remove container"
     * )
     *
     * @ParamConverter(
     *  "container",
     *  class="SevenTagContainerBundle:Container",
     *  converter="versionable_converter"
     * )
     *
     * @Rest\Delete("/containers/{id}", requirements={"id" = "\d+"})
     *
     * @param ContainerInterface $container
     * @return View
     */
    public function deleteContainersAction(ContainerInterface $container)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_DELETE, $container);

        $this->get('seven_tag_container.repository.container_repository')
            ->deleteByAccessId($container->getAccessId());

        $this->get('event_dispatcher')
            ->dispatch(Events::CONTAINER_REMOVED, new ContainerLibraryEvent($container));

        return $this->view('', Codes::HTTP_NO_CONTENT);
    }

    /**
     * @ParamConverter(
     *  "container",
     *  class="SevenTagContainerBundle:Container",
     *  converter="versionable_converter"
     * )
     * @Rest\Post("/containers/{id}/remove", name="_remove", requirements={"id" = "\d+"})
     *
     * @param ContainerInterface $container
     * @return View
     */
    public function postDeleteContainersAction(ContainerInterface $container)
    {
        return $this->deleteContainersAction($container);
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access"
     *     },
     *     authentication=true,
     *     resource=true,
     *     description="Get list of containers"
     * )
     *
     * @Rest\QueryParam(
     *      name="offset",
     *      requirements="\d+",
     *      default="0",
     *      description="Offset for containers list pagination"
     * )
     * @Rest\QueryParam(
     *      name="limit",
     *      requirements="\d+",
     *      default="10",
     *      description="Limit for containers list pagination"
     * )
     * @Rest\QueryParam(
     *      name="name",
     *      description="Container name search criteria"
     * )
     *
     * @Rest\Get("/containers")
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"containers", "list_view", "permissions", "version_details"}
     * )
     *
     * @param ParamFetcherInterface $paramFetcher
     * @return array
     */
    public function getContainersAction(ParamFetcherInterface $paramFetcher)
    {
        $criteria = new Criteria($paramFetcher->all());
        $criteria->user = $this->getUser();

        $searchEngine = $this->get('seven_tag_container.container_library.search_engine');

        return $searchEngine->findByCriteria($criteria);
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         201="Returned when successful",
     *         400="Returned when data are invalid",
     *         403="Returned when the user does not have access",
     *         401="Returned when the user is not authorized"
     *     },
     *     authentication=true,
     *     input="SevenTag\Api\ContainerBundle\Form\ContainerType",
     *     description="Add new container"
     * )
     *
     * @Rest\Post("/containers")
     * @Rest\View(
     *      statusCode=201,
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"container", "tags", "triggers", "version", "permissions"}
     * )
     *
     * @return ContainerInterface|array
     */
    public function postContainersAction()
    {
        $repository = $this->get('seven_tag_container.repository.container_repository');

        /** @var ContainerInterface $container */
        $container = $repository->create();
        $container->setCreatedBy($this->getUser());

        $form = $this->createFormTypeAndHandleRequest(
            $this->get('seven_tag_container.form_type.container_form_type'),
            $container
        );

        if ($form->isValid()) {
            $this->get('seven_tag_container.creator')->create($container, $this->getUser());

            $this->get('event_dispatcher')
                ->dispatch(Events::CONTAINER_CREATED, new ContainerLibraryEvent($container));

            return ['data' => $container];
        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }
}
