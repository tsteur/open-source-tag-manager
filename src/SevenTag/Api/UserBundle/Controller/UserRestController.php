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

namespace SevenTag\Api\UserBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\FOSUserEvents;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use SevenTag\Api\UserBundle\Entity\User;
use SevenTag\Api\UserBundle\Entity\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use SevenTag\Api\AppBundle\Controller\RestController;

/**
 * Class UserController
 * @package SevenTag\Api\UserBundle\Controller
 */
class UserRestController extends RestController
{
    /**
     * @Rest\Get("/users/me")
     * @Rest\View(
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"users"}
     * )
     */
    public function getUsersMeAction()
    {
        return [
            'data' => $this->getUser()
        ];
    }

    /**
     * @Rest\Put("/users/me")
     * @Rest\View(
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"users"}
     * )
     */
    public function putUsersMeAction()
    {
        $user = $this->getUser();

        $form = $this->createFormType(
            $this->get('seven_tag_user.form_type.me_form_type'),
            $user,
            'PUT'
        );

        $form->handleRequest($this->get('request_stack')->getCurrentRequest());

        if ($form->isValid()) {
            $userManager = $this->get('fos_user.user_manager');
            $userManager->updateUser($user);

            return ['data' => $user];
        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }

    /**
     * @Rest\Put("/users/me/others-settings")
     * @Rest\View(
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"users"}
     * )
     */
    public function othersSettingsAction(Request $request)
    {
        $user = $this->getUser();

        $form = $this->createFormType(
            $this->get('seven_tag_user.form_type.others_settings_form_type'),
            $user,
            'PUT'
        );

        $form->handleRequest($request);

        if ($form->isValid()) {
            $userManager = $this->get('fos_user.user_manager');
            $userManager->updateUser($user);

            return ['data' => $user];
        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }

    /**
     * @Rest\Post("/users/me/change-password")
     * @Rest\View(
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"users"}
     * )
     * @param Request $request
     * @return array|View
     */
    public function changePasswordAction(Request $request)
    {
        $user = $this->getUser();

        /** @var $dispatcher \Symfony\Component\EventDispatcher\EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::CHANGE_PASSWORD_INITIALIZE, $event);

        if (null !== $event->getResponse()) {
            return $event->getResponse();
        }

        $form = $this->createFormType($this->get('fos_user.change_password.form.type'), $user);
        $form->handleRequest($request);

        if ($form->isValid()) {
            /** @var $userManager \FOS\UserBundle\Model\UserManagerInterface */
            $userManager = $this->get('fos_user.user_manager');

            $event = new FormEvent($form, $request);
            $dispatcher->dispatch(FOSUserEvents::CHANGE_PASSWORD_SUCCESS, $event);

            $userManager->updateUser($user);

            $translator = $this->get('translator');

            return [
                'data' => [
                    'message' => $translator->trans('change_password.flash.success', [], 'FOSUserBundle')
                ]
            ];
        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }

    /**
     * @ParamConverter("user", class="SevenTagUserBundle:User")
     *
     * @Rest\Post("/users/{id}/reset-password")
     *
     * @Security("user.getId() !== userRequest.getId()")
     *
     * @param User $userRequest
     * @return View
     */
    public function resetPasswordUsersAction(User $userRequest)
    {
        $this->get('seven_tag_user.reset_password.request')->handle($userRequest);

        return $this->view('', Codes::HTTP_NO_CONTENT);
    }

    /**
     * @ParamConverter("user", class="SevenTagUserBundle:User")
     *
     * @Rest\Delete("/users/{id}")
     * @Rest\Post("/users/{id}/remove", name="_remove")
     * @Security("user.getId() !== userRequest.getId()")
     *
     * @param User $userRequest
     * @return View
     */
    public function deleteUsersAction(User $userRequest)
    {
        $this->get('fos_user.user_manager')
            ->deleteUser($userRequest);

        return $this->view('', Codes::HTTP_NO_CONTENT);
    }

    /**
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
     * @Rest\Get("/users")
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"users"}
     * )
     *
     * @param ParamFetcherInterface $paramFetcher
     * @return array
     */
    public function getUsersAction(ParamFetcherInterface $paramFetcher)
    {
        /** @var UserRepository $repository */
        $repository = $this
            ->get('seven_tag_user.repository.user_repository');

        return [
            'data' => $repository->findNonApiUserAndWithoutUser(
                $this->getUser(),
                $paramFetcher->get('limit'),
                $paramFetcher->get('offset')
            ),
            'total' => $repository->countNonApiUserAndWithoutUser($this->getUser())
        ];
    }

    /**
     * @Rest\Post("/users")
     * @Rest\View(
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"users"}
     * )
     */
    public function postUsersAction(Request $request)
    {
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->createUser();

        $form = $this->createFormType(
            $this->get('seven_tag_user.form_type.create_form_type'),
            $user
        );
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->get('seven_tag_user.user_manipulator')
                ->completePersistentAndCreate($user);

            return ['data' => $user];
        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }

    /**
     * @ParamConverter("user", class="SevenTagUserBundle:User")
     *
     * @Rest\Put("/users/{id}")
     * @Rest\View(
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"users"}
     * )
     */
    public function putUsersAction(User $user)
    {
        $form = $this->createFormType(
            $this->get('seven_tag_user.form_type.edit_form_type'),
            $user,
            'PUT'
        );
        $form->handleRequest($this->get('request_stack')->getCurrentRequest());

        if ($form->isValid()) {
            $userManager = $this->get('fos_user.user_manager');
            $userManager->updateUser($user);

            return ['data' => $user];
        }

        return $this->view($form, Codes::HTTP_BAD_REQUEST);
    }

    /**
     * @ParamConverter("user", class="SevenTagUserBundle:User")
     *
     * @Rest\Get("/users/{id}")
     * @Rest\View(
     *  serializerEnableMaxDepthChecks="true",
     *  serializerGroups={"users"}
     * )
     */
    public function getUsersByIdAction(User $user)
    {
        return ['data' => $user];
    }
}
