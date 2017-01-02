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

use SevenTag\Updater\CopyStrategy\FilesystemCopyStrategy;
use SevenTag\Updater\Environment\EnvironmentInterface;
use SevenTag\Updater\Utils\DomainProvider;
use SevenTag\Updater\Utils\GuzzleClientFactory;
use SevenTag\Updater\Utils\GuzzleDownloader;
use SevenTag\Updater\Utils\NewestInstancePreparator;
use SevenTag\Updater\Utils\NewestVersionChecker;

/**
 * Class HolderFactory
 * @package SevenTag\Updater\Step
 */
class HolderFactory
{
    /**
     * @var  EnvironmentInterface
     */
    private $environment;

    /**
     * @param EnvironmentInterface $environment
     */
    public function __construct(EnvironmentInterface $environment)
    {
        $this->environment = $environment;
    }

    /**
     * @return Holder
     */
    public function createHolder()
    {
        $clientFactory = new GuzzleClientFactory();
        $domainProvider = new DomainProvider($this->environment);

        $holder = new Holder();
        $holder->add(new CheckPHPSettingsStep());
        $holder->add(
            new PrepareNewestVersionStep(
                new NewestVersionChecker($clientFactory, $domainProvider),
                new NewestInstancePreparator(),
                new GuzzleDownloader($clientFactory, $domainProvider)
            )
        );
        $holder->add(new InstancesValidationStep());
        $holder->add(new CurrentVersionBackupStep());
        $holder->add(new MergeParametersYmlStep());
        $holder->add(new CleanUpMigrationsFiles());
        $holder->add(
            new CopyNewestToCurrentInstanceStep(
                new FilesystemCopyStrategy()
            )
        );
        $holder->add(new CacheClearStep());
        $holder->add(new MakeDirectoriesWritableStep());
        $holder->add(new CacheWarmupStep());
        $holder->add(new MigrationsMigrateStep());
        $holder->add(new UpdateVersionJson());
        $holder->add(new RemoveUnusedFilesStep());
        $holder->add(new RepublishContainerStep());

        return $holder;
    }
}
