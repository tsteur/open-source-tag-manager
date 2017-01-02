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

use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\Symfony2Extension\Context\KernelAwareContext;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\KernelInterface;

/**
 * Class BoostrapContext
 * @package Features\Context
 */
class BoostrapContext implements SnippetAcceptingContext, KernelAwareContext
{
    /**
     * @var KernelInterface
     */
    private static $kernel;

    /**
     * @var ContainerInterface
     */
    private static $container;

    /**
     * Sets Kernel instance.
     *
     * @param KernelInterface $kernel
     */
    public function setKernel(KernelInterface $kernel)
    {
        self::$kernel = $kernel;
        self::$container = self::$kernel->getContainer();
    }

    /**
     * Returns HttpKernel instance.
     *
     * @return KernelInterface
     */
    public static function getKernel()
    {
        return self::$kernel;
    }

    /**
     * Returns HttpKernel service container.
     *
     * @return ContainerInterface
     */
    public static function getContainer()
    {
        return self::$container;
    }

    /**
     * @return \Symfony\Bundle\FrameworkBundle\Client
     */
    public static function getClient()
    {
        return self::getContainer()->get('test.client');
    }
}