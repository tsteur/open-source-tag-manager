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

namespace SevenTag\Api\AppBundle\Versionable\VersionManager;

use SevenTag\Api\AppBundle\Versionable\VersionManager\Handler\HandlerInterface;
use SevenTag\Component\Container\Model\ContainerInterface;

/**
 * Class VersionManager
 * @package SevenTag\Api\AppBundle\Versionable\VersionManager
 */
class VersionManager implements VersionManagerInterface
{
    /**
     * @var HandlerInterface
     */
    private $publishHandler;

    /**
     * @var HandlerInterface
     */
    private $restoreHandler;

    /**
     * @param HandlerInterface $publishHandler
     * @param HandlerInterface $restoreHandler
     */
    public function __construct(HandlerInterface $publishHandler, HandlerInterface $restoreHandler)
    {
        $this->publishHandler = $publishHandler;
        $this->restoreHandler = $restoreHandler;
    }

    /**
     * {@inheritdoc}
     */
    public function publish(ContainerInterface $container)
    {
        return $this->publishHandler->handle($container);
    }

    /**
     * {@inheritdoc}
     */
    public function restore(ContainerInterface $container)
    {
        return $this->restoreHandler->handle($container);
    }
}
