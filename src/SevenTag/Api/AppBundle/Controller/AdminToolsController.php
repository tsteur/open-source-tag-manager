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

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Class AdminToolsController
 * @package SevenTag\AppBundle\Controller
 */
class AdminToolsController extends Controller
{
    /**
     * @Route("/update")
     */
    public function updateAction()
    {
        $session = new Session();
        $session->setName('admin-tools');
        if (!$session->isStarted()) {
            $session->start();
        }

        $session->set('updaterEnabled', true);

        return new JsonResponse(
            [
                'url' => 'update.php'
            ]
        );
    }
}
