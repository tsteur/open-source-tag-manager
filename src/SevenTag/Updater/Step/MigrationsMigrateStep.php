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

namespace SevenTag\Updater\Step;

use SevenTag\Updater\Environment\EnvironmentInterface;
use SevenTag\Updater\Exception\AbortedStepException;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;

/**
 * Class MigrationsMigrateStep
 * @package SevenTag\Updater\Step
 */
class MigrationsMigrateStep extends KernelStep
{
    /**
     * {@inheritdoc}
     */
    protected function doPerform(EnvironmentInterface $environment, \AppKernel $kernel)
    {
        $application = new Application($kernel);
        $application->setAutoExit(false);

        $migrationCommand = new \Doctrine\Bundle\MigrationsBundle\Command\MigrationsMigrateDoctrineCommand();

        if (!$application->has($migrationCommand->getName())) {
            $application->add($migrationCommand);
        }

        $input = new ArrayInput([
            'command' => 'doctrine:migrations:migrate',
            '--no-interaction' => true,
            '--no-debug' => true
        ]);
        $output = new BufferedOutput();

        if ($application->run($input, $output) === 0) {
            $this->logger->info($output->fetch());
        } else {
            throw new AbortedStepException($output->fetch());
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return 'Migrations Migrate';
    }
}
