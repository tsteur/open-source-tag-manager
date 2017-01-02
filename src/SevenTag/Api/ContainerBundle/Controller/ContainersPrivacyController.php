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
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class ContainersPrivacyController
 * @package SevenTag\Api\ContainerBundle\Controller
 */
class ContainersPrivacyController extends Controller
{
    const GLOBAL_OPT_OUT = 'stg_global_opt_out';
    const COOKIE_OPT_OUT_LIFETIME = '+1 year';

    /**
     * @Route(
     *  "/containers/privacy/global-opt-out",
     *  name="global_opt_out",
     * )
     * @param Request $request
     * @return Response
     */
    public function setGlobalOptOutAction(Request $request)
    {
        $response = new Response();

        if ($this->isOptOutCookieSet($request)) {
            $this->setOptOutCookie($request, $response, 0);
        } else {
            $this->setOptOutCookie($request, $response, 1);
        }

        return $response;
    }

    /**
     * @Route(
     *  "/containers/privacy/script.js",
     *  name="get_privacy_optout_iframe"
     * )
     * @param Request $request
     * @return Response
     */
    public function getPrivacyOptOutIframeAction(Request $request)
    {
        $response = $this->render('SevenTagContainerBundle:privacy:script.js.twig', [
            'isGlobalCookieSet' => $this->isOptOutCookieSet($request)
        ]);
        $response->headers->set('Content-Type', 'text/javascript');

        return $response;
    }

    /**
     * @Route(
     *  "/containers/privacy/script.v2.js",
     *  name="get_privacy_optout_script_v2"
     * )
     * @param Request $request
     * @return Response
     */
    public function getPrivacyOptOutScriptActionV2(Request $request)
    {
        $response = $this->render('SevenTagContainerBundle:privacy:script.v2.js.twig');
        $response->headers->set('Content-Type', 'text/javascript');

        return $response;
    }

    /**
     * @Route(
     *  "/containers/privacy/global-opt-out/v2",
     *  name="get_global_opt_out_v2",
     * )
     * @param Request $request
     * @return Response
     */
    public function getGlobalOptOutActionV2(Request $request)
    {
        $response = new JsonResponse();
        $response->setData([
            'status' => $this->isOptOutCookieSet($request)
        ]);
        $response->headers->set('Access-Control-Allow-Origin', $request->headers->get('Origin'));
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Allow-Methods', 'GET');

        return $response;
    }

    /**
     * @Route(
     *  "/containers/privacy/global-opt-out/v2/{id}", requirements={"id" = "\d+"},
     *  name="set_global_opt_out_v2",
     * )
     * @param Request $request
     * @return Response
     */
    public function setGlobalOptOutActionV2(Request $request)
    {
        $response = new JsonResponse();
        $response->setData([
            'status' => $this->isOptOutCookieSet($request)
        ]);
        $response->headers->set('Access-Control-Allow-Origin', $request->headers->get('Origin'));
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Allow-Methods', 'GET');

        $globalOptOutStatus = $request->get('id') === '1' ? 1 : 0;
        $this->setOptOutCookie($request, $response, $globalOptOutStatus);

        return $response;
    }

    /**
     * @param Request $request
     * @param Response $response
     * @param $value
     */
    public function setOptOutCookie(Request $request, Response $response, $value)
    {
        $response
            ->headers
            ->setCookie(
                new Cookie(self::GLOBAL_OPT_OUT, $value, (new \DateTime())->modify(self::COOKIE_OPT_OUT_LIFETIME), '/', '.' . $request->getHost(), false, false)
            );
    }

    /**
     * @param Request $request
     * @return bool
     */
    public function isOptOutCookieSet(Request $request)
    {
        return $request->cookies->has(self::GLOBAL_OPT_OUT) && $request->cookies->get(self::GLOBAL_OPT_OUT) == 1;
    }
}
