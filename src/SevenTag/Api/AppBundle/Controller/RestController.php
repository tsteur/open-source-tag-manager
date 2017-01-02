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

namespace SevenTag\Api\AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController as BaseFOSRestController;
use Symfony\Component\Form\FormTypeInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class RestController
 * @package SevenTag\Api\AppBundle\Controller
 */
abstract class RestController extends BaseFOSRestController
{
    /**
     * @param FormTypeInterface $formType
     * @param mixed $data
     * @param string $method
     * @return \Symfony\Component\Form\Form|\Symfony\Component\Form\FormInterface
     */
    protected function createFormType(FormTypeInterface $formType, $data = null, $method = 'POST')
    {
        return $this->container
            ->get('form.factory')
            ->createNamed(
                '',
                $formType,
                $data,
                [
                    'method' => $method,
                    'csrf_protection' => false
                ]
            );
    }

    /**
     * @param FormTypeInterface $formType
     * @param $data
     * @param string $method
     * @param Request $request
     * @return \Symfony\Component\Form\Form|\Symfony\Component\Form\FormInterface
     */
    protected function createFormTypeAndHandleRequest(
        FormTypeInterface $formType,
        $data = null,
        $method = 'POST',
        Request $request = null
    ) {
        if (null === $request) {
            $request = $this->get('request_stack')->getCurrentRequest();
        }

        $form = $this->createFormType(
            $formType,
            $data,
            $method
        );
        $form->handleRequest($request);

        return $form;
    }
}
