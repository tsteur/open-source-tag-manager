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

namespace SevenTag\Updater\HttpRequestChecker;

use SevenTag\Updater\Authenticator\Authenticator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class HttpRequestChecker
 * @package SevenTag\Updater\HttpRequestChecker
 */
class HttpRequestChecker
{
    const START_UPDATE_BUTTON_HTML = '<form method="post"><button>Start update...</button></form>';
    const CLEAR_AUTH_TOKEN_HTML = '<script>localStorage.removeItem(\'accessToken\')</script>';

    /**
     * @var Authenticator
     */
    private $authenticator;

    /**
     * @var Response
     */
    private $fallbackResponse;

    /**
     * @param Authenticator $authenticator
     */
    public function __construct(Authenticator $authenticator)
    {
        $this->authenticator = $authenticator;
    }

    /**
     * @return boolean
     */
    public function checkHttpRequest(Request $request, $clearAuthorizationToken)
    {
        if (php_sapi_name() === 'cli') {
            return true;
        }

        if (!$this->authenticator->isAuthenticated()) {
            $this->fallbackResponse = new Response('', 404);

            return false;
        }

        if ($request->isMethod('GET')) {
            $newPageContent = $clearAuthorizationToken ? self::START_UPDATE_BUTTON_HTML . self::CLEAR_AUTH_TOKEN_HTML : self::START_UPDATE_BUTTON_HTML;
            $this->fallbackResponse = new Response($newPageContent);

            return false;
        }

        return true;
    }

    /**
     * @return Response
     */
    public function getFallbackResponse()
    {
        return $this->fallbackResponse;
    }
}
