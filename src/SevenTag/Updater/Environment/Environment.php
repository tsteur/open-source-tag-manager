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

namespace SevenTag\Updater\Environment;

use Psr\Log\LoggerInterface;
use SevenTag\Updater\Instance\InstanceInterface;

/**
 * Class Environment
 * @package SevenTag\Updater\Environment
 */
class Environment implements EnvironmentInterface
{
    /**
     * @var InstanceInterface
     */
    protected $currentInstance;

    /**
     * @var InstanceInterface
     */
    protected $newestInstance;

    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * @param InstanceInterface $currentInstance
     * @param InstanceInterface $newestInstance
     * @param LoggerInterface $logger
     */
    public function __construct(
        InstanceInterface $currentInstance,
        InstanceInterface $newestInstance,
        LoggerInterface $logger
    ) {
        $this->currentInstance = $currentInstance;
        $this->newestInstance = $newestInstance;
        $this->logger = $logger;
    }

    /**
     * {@inheritdoc}
     */
    public function getCurrentInstance()
    {
        return $this->currentInstance;
    }

    /**
     * {@inheritdoc}
     */
    public function getNewestInstance()
    {
        return $this->newestInstance;
    }

    /**
     * {@inheritdoc}
     */
    public function getLogger()
    {
        return $this->logger;
    }
}
