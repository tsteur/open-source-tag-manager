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

namespace Features\Context;

use Behat\Behat\Context\Context;
use Behat\Behat\Context\SnippetAcceptingContext;
use Codeception\Util\JsonArray;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\KernelInterface;

/**
 * Class BaseContext
 * @package Behat\Context
 */
abstract class BaseContext implements Context, SnippetAcceptingContext
{
    /**
     * Returns HttpKernel instance.
     *
     * @return KernelInterface
     */
    public function getKernel()
    {
        return BoostrapContext::getKernel();
    }

    /**
     * Returns HttpKernel service container.
     *
     * @return ContainerInterface
     */
    public function getContainer()
    {
        return BoostrapContext::getContainer();
    }

    /**
     * @return \Symfony\Bundle\FrameworkBundle\Client
     */
    public static function getClient()
    {
        return BoostrapContext::getContainer()->get('clearcode_tag_manager_test.client');
    }

    /**
     * @return array
     */
    public function getJsonResponseContent()
    {
        return json_decode($this->getClient()->getResponse()->getContent(), true);
    }

    /**
     * @return null|\Symfony\Component\HttpFoundation\Response
     */
    public function getLastResponse()
    {
        return $this->getClient()->getResponse();
    }

    /**
     * @param array $json
     */
    public function assertResponseContainsJson($json = array())
    {
        $jsonResponseArray = new JsonArray($this->getLastResponse()->getContent());

        \PHPUnit_Framework_Assert::assertTrue(
            $jsonResponseArray->containsArray($json),
            "Response JSON contains provided\n" .
            "- <info>".var_export($json, true)."</info>\n" .
            "+ ".var_export($jsonResponseArray->toArray(), true)
        );
    }

    /**
     * @param integer $code
     */
    public function assertResponseStatusCode($code)
    {
        \PHPUnit_Framework_Assert::assertEquals(
            $code,
            $this->getLastResponse()->getStatusCode()
        );
    }
}