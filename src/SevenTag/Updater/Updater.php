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

namespace SevenTag\Updater;

use Monolog\Logger;
use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerInterface;
use SevenTag\Updater\Environment\EnvironmentInterface;
use SevenTag\Updater\Step\EnvironmentalStep;
use SevenTag\Updater\Step\HolderInterface;
use SevenTag\Updater\Step\StepInterface;

/**
 * Class Updater
 * @package SevenTag\Updater
 */
class Updater implements UpdaterInterface
{
    /**
     * @var HolderInterface
     */
    private $holder;

    /**
     * @var EnvironmentInterface
     */
    private $environment;

    /**
     * @var Logger
     */
    private $logger;

    /**
     * @param HolderInterface $holder
     * @param EnvironmentInterface $environment
     */
    public function __construct(
        HolderInterface $holder,
        EnvironmentInterface $environment
    ) {
        $this->holder = $holder;
        $this->environment = $environment;
        $this->logger = $this->environment->getLogger();
    }

    /**
     * {@inheritdoc}
     */
    public function update()
    {
        $this->logger->info('Start updating...');

        /** @var StepInterface $step */
        foreach ($this->holder as $step) {
            if ($step instanceof LoggerAwareInterface) {
                $step->setLogger($this->logger);
            }

            $this->logger->info(sprintf('Starting executing step "%s"...', $step->getDescription()));

            $step->perform($this->environment);

            $this->logger->info(sprintf('Step "%s" completed.', $step->getDescription()));
        }

        $this->logger->info('Update completed.');
    }
}
