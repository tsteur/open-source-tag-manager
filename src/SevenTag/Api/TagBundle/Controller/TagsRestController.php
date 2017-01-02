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

namespace SevenTag\Api\TagBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use SevenTag\Api\SecurityBundle\Acl\PermissionMap;
use Doctrine\Common\Collections\ArrayCollection;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use SevenTag\Component\Tag\Model\Tag;
use SevenTag\Component\Tag\Model\TagInterface;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Api\AppBundle\Controller\RestController;

/**
 * Class TagsRestController
 * @package SevenTag\Api\TagBundle\Controller
 */
class TagsRestController extends RestController
{
    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the tag is not found"
     *     },
     *     requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Tag id"
     *          }
     *     },
     *     authentication=true,
     *     resource=true,
     *     description="Get tag"
     * )
     *
     * @ParamConverter(
     *      "tag",
     *      class="SevenTagTagBundle:Tag",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\Get("/tags/{id}", requirements={"id" = "\d+"})
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"tag", "triggers"}
     * )
     *
     * @param TagInterface $tag
     * @return array
     */
    public function getTagsByIdAction(TagInterface $tag)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_VIEW, $tag->getContainer());

        return ['data' => $tag];
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         200="Returned when successful",
     *         400="Returned when data are invalid",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the tag is not found"
     *     },
     *     requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Tag id"
     *          }
     *     },
     *     authentication=true,
     *     resource=true,
     *     input="SevenTag\Api\TagBundle\Form\TagType",
     *     description="Update tag"
     * )
     *
     * @ParamConverter(
     *      "tag",
     *      class="SevenTagTagBundle:Tag",
     *      converter="versionable_converter"
     * )
     *
     * @Rest\Put("/tags/{id}", requirements={"id" = "\d+"})
     * @Rest\View(
     *      statusCode=200,
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"tag", "triggers"}
     * )
     *
     * @param TagInterface $tag
     * @return array
     */
    public function putTagsAction(TagInterface $tag)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_EDIT, $tag->getContainer());

        $tag->setTemplateOptions([]);

        $form = $this->createFormType(
            $this->get('seven_tag_tag.form_type.tag_form_type'),
            $tag,
            'PUT'
        );
        $form->handleRequest($this->get('request_stack')->getCurrentRequest());

        if ($form->isValid()) {
            $this->get('seven_tag_tag.repository.tag_repository')
                ->save($tag);

            return ['data' => $tag];
        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }

    /**
     * @ApiDoc(
     *     statusCodes={
     *         204="Returned when successful",
     *         401="Returned when the user is not authorized",
     *         403="Returned when the user does not have access",
     *         404="Returned when the tag is not found"
     *     },
     *     requirements={
     *          {
     *              "name"="id",
     *              "dataType"="integer",
     *              "requirement"="\d+",
     *              "description"="Tag id"
     *          }
     *     },
     *     authentication=true,
     *     description="Delete tag"
     * )
     *
     * @ParamConverter(
     *      "tag",
     *      class="SevenTagTagBundle:Tag",
     *      converter="versionable_converter"
     * )
     * @Rest\Delete("/tags/{id}", requirements={"id" = "\d+"})
     *
     * @param TagInterface $tag
     * @return View
     */
    public function deleteTagsAction(TagInterface $tag)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_DELETE, $tag->getContainer());

        $this->get('seven_tag_tag.repository.tag_repository')
            ->delete($tag);

        return $this->view('', Codes::HTTP_NO_CONTENT);
    }

    /**
     * @ParamConverter(
     *      "tag",
     *      class="SevenTagTagBundle:Tag",
     *      converter="versionable_converter"
     * )
     * @Rest\Post("/tags/{id}/remove", name="_remove", requirements={"id" = "\d+"})
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"tag"}
     * )
     *
     * @param TagInterface $tag
     * @return View
     */
    public function postDeleteTagsAction(TagInterface $tag)
    {
        return $this->deleteTagsAction($tag);
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
     *     description="Get container tags"
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
     * @Rest\Get("/containers/{id}/tags", requirements={"id" = "\d+"})
     * @Rest\View(
     *  statusCode=200,
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"tag", "tags", "triggers"}
     * )
     *
     * @param ContainerInterface $container
     * @return ArrayCollection<SevenTag\Component\Tag\Model\TagInterface>
     */
    public function getContainersTagsAction(ContainerInterface $container, ParamFetcherInterface $paramFetcher)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_VIEW, $container);

        $repository = $this->get('seven_tag_tag.repository.tag_repository');

        return [
            'data' => $repository->findByContainerWithLimitAndOffset(
                $container,
                $paramFetcher->get('limit'),
                $paramFetcher->get('offset')
            ),
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
     *     input="SevenTag\Api\TagBundle\Form\TagType",
     *     description="Add new tag to container"
     * )
     *
     * @ParamConverter(
     *  "container",
     *  class="SevenTagContainerBundle:Container",
     *  converter="versionable_converter"
     * )
     *
     * @Rest\Post("/containers/{id}/tags", requirements={"id" = "\d+"})
     * @Rest\View(
     *  statusCode=201,
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"tag", "triggers"}
     * )
     *
     * @param ContainerInterface $container
     * @return ContainerInterface|array
     */
    public function postContainersTagsAction(ContainerInterface $container)
    {
        $this->denyAccessUnlessGranted(PermissionMap::PERMISSION_EDIT, $container);

        $repository = $this
            ->get('seven_tag_tag.repository.tag_repository');

        /** @var Tag $tag */
        $tag = $repository->create();
        $tag->setContainer($container);

        $form = $this->createFormType(
            $this->get('seven_tag_tag.form_type.tag_form_type'),
            $tag
        );
        $form->handleRequest($this->get('request_stack')->getCurrentRequest());

        if ($form->isValid()) {
            $repository->save($tag);

            return ['data' => $tag];
        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }
}
