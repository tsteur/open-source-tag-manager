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

use Doctrine\Common\Collections\ArrayCollection;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use SevenTag\Api\AppBundle\Controller\RestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use SevenTag\Api\SecurityBundle\Entity\IntegrationRepository;
use SevenTag\Api\SecurityBundle\Integration\Event\IntegrationEvent;
use SevenTag\Api\SecurityBundle\Integration\IntegrationEvents;
use SevenTag\Component\Integration\Model\IntegrationInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;

/**
 * Class IntegrationRestController
 * @package SevenTag\Api\SecurityBundle\Controller
 */
class IntegrationRestController extends RestController
{
    /**
     * @ParamConverter(
     *      "integration",
     *      class="SevenTagSecurityBundle:Integration"
     * )
     *
     * @Rest\Get("/integration/{id}")
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"integration"}
     * )
     *
     * @param IntegrationInterface $integration
     *
     * @return array
     */
    public function getIntegrationAction(IntegrationInterface $integration)
    {
        return ['data' => $integration];
    }

    /**
     * @Rest\Post("/integration", name="seventag_api_integration_post")
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"integration"},
     *      statusCode=201
     * )
     *
     * @param Request $request
     * @return View
     */
    public function postIntegrationAction(Request $request)
    {
        $repository = $this->getRepository();

        /** @var IntegrationInterface $integration */
        $integration = $repository->create();

        $form = $this->createFormTypeAndHandleRequest(
            $this->get('seven_tag_security.form_type.create_integration_form_type'),
            $integration,
            'POST',
            $request
        );

        if ($form->isValid()) {
            $dispatcher = $this->get('event_dispatcher');
            $dispatcher->dispatch(IntegrationEvents::CREATE_PRE_SAVE, new IntegrationEvent($integration));

            $repository->save($integration);

            return ['data' => $integration];
        }

        return $this->view($form, Response::HTTP_BAD_REQUEST);
    }

    /**
     * @ParamConverter(
     *      "integration",
     *      class="SevenTagSecurityBundle:Integration"
     * )
     *
     * @Rest\Put("/integration/{id}", name="seventag_api_integration_put")
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"integration"}
     * )
     *
     * @param Request $request
     * @param IntegrationInterface $integration
     * @return array
     */
    public function putIntegrationAction(Request $request, IntegrationInterface $integration)
    {
        $form = $this->createFormTypeAndHandleRequest(
            $this->get('seven_tag_security.form_type.edit_integration_form_type'),
            $integration,
            'PUT',
            $request
        );

        if ($form->isValid()) {
            $dispatcher = $this->get('event_dispatcher');
            $dispatcher->dispatch(IntegrationEvents::UPDATE_PRE_SAVE, new IntegrationEvent($integration));

            $this->getRepository()->save($integration);

            return ['data' => $integration];
        }

        return $this->view($form, Response::HTTP_BAD_REQUEST);
    }

    /**
     * @ParamConverter(
     *      "integration",
     *      class="SevenTagSecurityBundle:Integration"
     * )
     *
     * @Rest\Delete("/integration/{id}", name="seventag_api_integration_delete")
     * @Rest\Post("/integration/{id}/remove", name="_remove")
     *
     * @param IntegrationInterface $integration
     *
     * @return View
     */
    public function deleteIntegrationAction(IntegrationInterface $integration)
    {
        $this->getRepository()->delete($integration);

        return $this->view(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * @Rest\QueryParam(
     *  name="offset",
     *  requirements="\d+",
     *  default="0",
     *  description="Offset for integration list pagination"
     * )
     * @Rest\QueryParam(
     *  name="limit",
     *  requirements="\d+",
     *  default="10",
     *  description="Limit for integration list pagination"
     * )
     *
     * @Rest\Get("/integration")
     * @Rest\View(
     *  statusCode=200,
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"integrations"}
     * )
     *
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return ArrayCollection<SevenTag\Component\Integration\Model\IntegrationInterface>
     */
    public function getIntegrationsAction(ParamFetcherInterface $paramFetcher)
    {
        $repository = $this->getRepository();

        return [
            'data' => $repository->findWithLimitAndOffset(
                $paramFetcher->get('limit'),
                $paramFetcher->get('offset')
            ),
            'total' => $repository->countAll()
        ];
    }

    /**
     * @return IntegrationRepository
     */
    private function getRepository()
    {
        return $this->get('seven_tag_security.repository.integration_repository');
    }
}
