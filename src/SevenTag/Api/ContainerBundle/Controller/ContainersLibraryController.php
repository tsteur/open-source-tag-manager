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

use JMS\Serializer\SerializationContext;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context;
use SevenTag\Api\ContainerBundle\ModeResolver\ModeResolverInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class ContainersLibraryController
 * @package SevenTag\Api\ContainerBundle\Controller
 */
class ContainersLibraryController extends Controller
{
    /**
     * @ParamConverter(
     *      "container",
     *      class="SevenTagContainerBundle:Container",
     *      converter="versionable_converter"
     * )
     *
     * @Route(
     *  "/containers/tagtree/{id}.sync.json",
     *  requirements={"id" = "\d+"}
     * )
     */
    public function getContainerTagTreeSyncAction(ContainerInterface $container)
    {
        return $this->get('seven_tag_container.tagtree_response_initializer')->prepareTagTreeResponse(
            $this->get('seven_tag_container.tag_tree_builder_sync'),
            $container,
            $this->get('request_stack')->getCurrentRequest()
        );
    }

    /**
     * @ParamConverter(
     *      "container",
     *      class="SevenTagContainerBundle:Container",
     *      converter="versionable_converter"
     * )
     *
     * @Route(
     *  "/containers/tagtree/{id}.json",
     *  requirements={"id" = "\d+"}
     * )
     */
    public function getContainerTagTreeAction(ContainerInterface $container)
    {
        return $this->get('seven_tag_container.tagtree_response_initializer')->prepareTagTreeResponse(
            $this->get('seven_tag_container.tag_tree_builder_async'),
            $container,
            $this->get('request_stack')->getCurrentRequest()
        );
    }

    /**
     * @ParamConverter(
     *      "container",
     *      class="SevenTagContainerBundle:Container",
     *      converter="previewmode_converter"
     * )
     * @Route("/containers/{id}.js", name="get_container_javascript")
     * @param ContainerInterface $container
     * @return Response
     */
    public function getContainerJavascriptAction(ContainerInterface $container)
    {
        return $this->get('seven_tag_container.response_initializer')->prepareContainerLibraryResponse(
            $this->get('seven_tag_container.container_library.generator'),
            $container
        );
    }

    /**
     * @ParamConverter(
     *      "container",
     *      class="SevenTagContainerBundle:Container",
     *      converter="previewmode_converter"
     * )
     * @Route("/containers/{id}.sync.js", name="get_container_javascript_synchronous")
     * @param ContainerInterface $container
     * @return Response
     */
    public function getContainerJavascriptSynchronousAction(ContainerInterface $container)
    {
        return $this->get('seven_tag_container.response_initializer')->prepareContainerLibraryResponse(
            $this->get('seven_tag_container.container_library_sync.generator'),
            $container
        );
    }
}
