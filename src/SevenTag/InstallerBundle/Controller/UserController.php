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

use SevenTag\InstallerBundle\Form\AdminUserFormType;
use SevenTag\InstallerBundle\Service\ConnectionProvider;
use SevenTag\Api\SecurityBundle\Entity\Client;
use SevenTag\Api\UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\MessageDigestPasswordEncoder;

/**
 * class UserController
 * @package SevenTag\InstallerBundle\Controller
 */
class UserController extends Controller
{
    /**
     * The action to verify the application environment
     *
     * @param Request $request
     *
     * @return Response
     */
    public function createAdminAction(Request $request)
    {
        $form = $this->createForm(
            new AdminUserFormType()
        );

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);

            if ($form->isValid()) {
                $this->handleForm($form);

                return new RedirectResponse('/install.php/finish');

            }

        }

        return $this->render('SevenTagInstallerBundle:user:createAdmin.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * Handle form
     *
     * @param FormInterface $form
     *
     * @return mixed
     */
    private function handleForm(FormInterface $form)
    {
        $session = $this->get('session');
        $databaseParameters = $session->get('database');

        // Add administrator user
        $userData = $form->getData();

        $connectionProvider = new ConnectionProvider(
            $this->getDoctrine()->getManager(),
            $this->get('doctrine.orm.entity_manager')->getConfiguration(),
            [
              'dbname'   => $databaseParameters['name'],
              'user'     => $databaseParameters['username'],
              'password' => $databaseParameters['password'],
              'host'     => $databaseParameters['hostname']
            ]
        );

        $em = $connectionProvider->getManager();

        $encoder = new MessageDigestPasswordEncoder();
        $user = new User();

        $usernameCanonical = trim(strtolower($userData['email']));

        $user
          ->setUsername($userData['email'])
          ->setUsernameCanonical($usernameCanonical)
          ->setEmail($userData['email'])
          ->setEmailCanonical($usernameCanonical)
          ->setPassword(
              $encoder->encodePassword(
                  $userData['password'],
                  $user->getSalt()
              )
          )
          ->setEnabled(true)
          ->setSuperAdmin(true);

        $em->persist($user);

        // Create client for oauth to add posibility to login to application
        $client = new Client();

        $client->setSecret($session->get('oauth2_secret'));
        $client->setAllowedGrantTypes([
            'password',
            'refresh_token'
        ]);
        $client->setRandomId($session->get('random_id'));

        $em->persist($client);

        $em->flush();

        $this->writeOAuthClientSettings($client);
    }

    /**
     * Write OAuth client settings into JavaScript file
     *
     * @param Client $client
     * @throws \Exception
     * @throws \Twig_Error
     */
    private function writeOAuthClientSettings(Client $client)
    {
        $filesystem = new Filesystem();
        $filesystem->dumpFile(
            $this->getParameter('kernel.cache_dir').'/OAuthClientSettings.php',
            $this->get('templating')->render('SevenTagInstallerBundle::oauthClientSettings.html.twig', [
                'client' => $client
            ])
        );
    }
}
