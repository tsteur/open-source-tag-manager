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
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Form\Model\ChangePassword;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Model\UserInterface;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use SevenTag\Api\AppBundle\Controller\RestController;
use SevenTag\Api\UserBundle\Entity\User;
use SevenTag\Api\UserBundle\Form\ResettingFormType;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class ResettingPasswordRestController
 * @package SevenTag\Api\UserBundle\Controller
 */
class ResettingPasswordRestController extends RestController
{
    /**
     * @Rest\Post("/reset-password/token/{token}")
     */
    public function resetPasswordTokenAction($token)
    {
        $user = $this->findUserByConfirmationToken($token);

        if (null === $user) {
            return $this->createNotFoundException();
        }

        /** @var $dispatcher \Symfony\Component\EventDispatcher\EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        $form = $this->createFormType($this->get('fos_user.resetting.form.type'), $user);

        $request = $this->get('request_stack')->getCurrentRequest();
        $form->submit($request);

        if ($form->isValid()) {
            $event = new FormEvent($form, $request);
            $dispatcher->dispatch(FOSUserEvents::RESETTING_RESET_SUCCESS, $event);

            $this->get('seven_tag_user.reset_password.token')->handle($user);

            return $this->createResetPasswordTokenResponseData();
        }

        return $this->view($form, 400);
    }

    /**
     * @Rest\RequestParam(
     *      name="username",
     *      allowBlank=false,
     *      strict=true,
     *      description="Username for resetting password request."
     * )
     *
     * @Rest\Post("/reset-password/request")
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return \FOS\RestBundle\View\View
     */
    public function resetPasswordRequestAction(ParamFetcherInterface $paramFetcher)
    {
        try {
            $user = $this->findUserByUsernameOrEmail($paramFetcher->get('username'));
            $this->get('seven_tag_user.reset_password.request')->handle($user);

            return $this->createResetPasswordRequestResponseData($user);

        } catch (NotFoundHttpException $e) {
        }
    }

    /**
     * @param string $username
     * @return User
     */
    private function findUserByUsernameOrEmail($username)
    {
        $user = $this
            ->get('fos_user.user_manager')
            ->findUserByUsernameOrEmail($username);

        if (!$user) {
            throw new NotFoundHttpException();
        }

        return $user;
    }

    /**
     * @param string $token
     * @return User
     */
    private function findUserByConfirmationToken($token)
    {
        $user = $this
            ->get('fos_user.user_manager')
            ->findUserByConfirmationToken($token);

        if (!$user) {
            throw new NotFoundHttpException();
        }

        return $user;
    }

    /**
     * @param User $user
     * @return array
     */
    private function createResetPasswordRequestResponseData(User $user)
    {
        return [
            'data' => [
                'message' => $this->get('translator')->trans(
                    'resetting.check_email',
                    ['%email%' => $user->getEmail()],
                    'FOSUserBundle'
                ),
            ],
        ];
    }

    /**
     * @return array
     */
    private function createResetPasswordTokenResponseData()
    {
        return [
            'data' => [
                'message' => $this->get('translator')->trans('change_password.flash.success', [], 'FOSUserBundle'),
            ],
        ];
    }
}
