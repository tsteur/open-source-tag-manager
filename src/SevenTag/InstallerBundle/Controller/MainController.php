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

namespace SevenTag\InstallerBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use SevenTag\InstallerBundle\Service\SevenTagRequirements;

/**
 * class MainController
 * @package SevenTag\InstallerBundle\Controller
 */
class MainController extends Controller
{
    /**
     * The action to verify the application environment
     *
     * @return Response
     */
    public function checkEnvironmentAction()
    {
        $requirements = new SevenTagRequirements(
            $this->get('session'),
            $this->get('kernel')->getRootDir()
        );

        return $this->render('SevenTagInstallerBundle::checkEnvironment.html.twig', [
            'requirements' => $requirements
        ]);
    }

    /**
     * The action display finish installation message
     * @return Response
     */
    public function finishAction()
    {
        return $this->render('SevenTagInstallerBundle::finish.html.twig', []);
    }
}
