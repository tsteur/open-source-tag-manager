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

use Doctrine\ORM\Tools\SchemaTool;
use FOS\OAuthServerBundle\Util\Random;
use SevenTag\InstallerBundle\Form\DatabaseConfigurationFormType;
use SevenTag\InstallerBundle\Service\ConnectionProvider;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Yaml\Yaml;

/**
 * class ConfigurationController
 * @package SevenTag\InstallerBundle\Controller
 */
class ConfigurationController extends Controller
{
    /**
     * The action to display dump of configuration
     *
     * @param Request $request
     *
     * @return Response
     */
    public function showAction(Request $request)
    {
        $session = $this->get('session');

        if (!$session->has('database')) {
            return new RedirectResponse('/install.php');

        }

        $parameters = Yaml::parse($this->get('kernel')->getRootDir() . '/config/parameters.yml.dist');

        $parametersPath = $this->get('kernel')->getRootDir() . '/config/parameters.yml';

        $connectionParameters = $session->get('database');

        $oAuth2Secret = Random::generateToken();
        $randomId = Random::generateToken();

        $parameters['parameters']['database_host'] = $connectionParameters['hostname'];
        $parameters['parameters']['database_name'] = $connectionParameters['name'];
        $parameters['parameters']['database_user'] = $connectionParameters['username'];
        $parameters['parameters']['database_password'] = $connectionParameters['password'];
        $parameters['parameters']['oauth2_secret'] = $oAuth2Secret;
        $parameters['parameters']['random_id'] = $randomId;
        $parameters['parameters']['seventag_domain'] = '//' . $request->getHost();

        $session->set('oauth2_secret', $oAuth2Secret);
        $session->set('random_id', $randomId);

        $parameters = Yaml::dump($parameters);

        return $this->render('SevenTagInstallerBundle:configuration:show.html.twig', [
            'parameters' => $parameters,
            'parametersPath' => $parametersPath
        ]);
    }

    /**
     * The action to configure database
     *
     * @param Request $request
     *
     * @return Response
     */
    public function databaseAction(Request $request)
    {
        $error = false;
        $form = $this->createForm(
            new DatabaseConfigurationFormType()
        );
        $session = $this->get('session');

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);

            if ($form->isValid()) {
                $connectionParameters = $form->getData();

                try {
                    $connection = $this->getEntityManager(
                        [
                            'dbname' => 'information_schema',
                            'user' => $connectionParameters['username'],
                            'password' => $connectionParameters['password'],
                            'host' => $connectionParameters['hostname'],
                        ]
                    )->getConnection();

                    if ($connectionParameters['createDatabase']) {
                        try {
                            $connection->exec(
                                sprintf(
                                    'CREATE DATABASE IF NOT EXISTS %s',
                                    $connectionParameters['name']
                                )
                            );
                        } catch (\Exception $e) {
                            $form->get('createDatabase')->addError(new FormError('Database not created. Do you have permission to create a database?'));
                            $error = true;
                        }
                    }

                    $databaseExistsQuery = $connection->query(
                        sprintf(
                            'SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = "%s";',
                            $connectionParameters['name']
                        )
                    );
                    $databaseExistsQuery->execute();
                    $databaseExists = $databaseExistsQuery->fetch();

                    if (!$databaseExists) {
                        $form->get('name')->addError(new FormError('Database not exists.'));
                        $error = true;
                    } else {
                        $hasSchemaQuery = $connection->query(
                            sprintf(
                                "select count(*) as cnt from information_schema.tables where table_type = 'BASE TABLE' and table_schema = '%s'",
                                $connectionParameters['name']
                            )
                        );
                        $hasSchemaQuery->execute();
                        $hasSchema = $hasSchemaQuery->fetch();
                        $hasSchema = (int)$hasSchema['cnt'];
                        $connection->close();

                        if ($hasSchema === 0) {
                            $em = $this->getEntityManager(
                                [
                                    'dbname' => $connectionParameters['name'],
                                    'user' => $connectionParameters['username'],
                                    'password' => $connectionParameters['password'],
                                    'host' => $connectionParameters['hostname']
                                ]
                            );

                            $appDirectory = $this->get('kernel')->getRootDir();

                            $connection = $em->getConnection();
                            $connection->beginTransaction();

                            try {
                                $connection->query(file_get_contents($appDirectory . '/Resources/schema.sql'));

                                $finder = new Finder();
                                $finder->files()->name('*.php')->in($appDirectory . '/DoctrineMigrations');

                                $migrations = [];
                                foreach ($finder as $file) {
                                    $migrations[] = '(' . $connection->quote(str_replace("Version", "", $file->getBasename('.php'))) . ')';
                                }

                                if (count($migrations) > 0) {
                                    $connection->query('CREATE TABLE IF NOT EXISTS `migration_versions` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci');
                                    $connection->query(sprintf('INSERT IGNORE INTO `migration_versions` (`version`) VALUES%s', implode(',', $migrations)));
                                }

                                $session->set('database', $connectionParameters);
                                $connection->commit();
                            } catch (\Exception $exception) {
                                $connection->rollBack();
                                throw $exception;
                            }

                        } else {
                            $form->get('name')->addError(new FormError('Database not empty.'));
                            $error = true;
                        }
                    }
                } catch (\PDOException $e) {
                    if ($e->getCode() === 1045) {
                        $form->get('username')->addError(new FormError('Please verify your user name and password!'));
                        $form->get('password')->addError(new FormError('Please verify your user name and password!'));
                    }
                    $error = true;
                } catch (\Exception $e) {
                    $error = true;
                }

                if ($error === false) {
                    return new RedirectResponse('/install.php');
                }
            } //form valid
        }

        return $this->render('SevenTagInstallerBundle:configuration:database.html.twig', [
            'form' => $form->createView(),
            'error' => $error
        ]);
    }

    /**
     * @param array $connectionData
     * @return \Doctrine\ORM\EntityManager
     */
    private function getEntityManager(array $connectionData = [])
    {
        $connectionProvider = new ConnectionProvider(
            $this->getDoctrine()->getManager(),
            $this->get('doctrine.orm.entity_manager')->getConfiguration(),
            $connectionData
        );
        return $connectionProvider->getManager();
    }
}
