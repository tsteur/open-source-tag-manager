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
use SevenTag\Updater\Utils\DownloaderInterface;
use SevenTag\Updater\Utils\NewestInstancePreparatorInterface;
use SevenTag\Updater\Utils\NewestVersionCheckerInterface;

/**
 * Class PrepareNewestVersionStep
 * @package SevenTag\Updater\Step
 */
class PrepareNewestVersionStep extends LocalInstanceStep
{
    const VERSION_RESOURCE = '//download.7tag.org/version.json';

    /**
     * @var NewestVersionCheckerInterface
     */
    private $newestVersionChecker;

    /**
     * @var NewestInstancePreparatorInterface
     */
    private $newestVersionPreparator;

    /**
     * @var DownloaderInterface
     */
    private $downloader;

    /**
     * @param NewestVersionCheckerInterface $newestVersionChecker
     * @param NewestInstancePreparatorInterface $newestVersionPreparator
     * @param DownloaderInterface $downloader
     */
    public function __construct(
        NewestVersionCheckerInterface $newestVersionChecker,
        NewestInstancePreparatorInterface $newestVersionPreparator,
        DownloaderInterface $downloader
    ) {
        $this->newestVersionChecker = $newestVersionChecker;
        $this->newestVersionPreparator = $newestVersionPreparator;
        $this->downloader = $downloader;
    }

    /**
     * {@inheritdoc}
     */
    protected function doPerform(EnvironmentInterface $environment)
    {
        $currentVersion = $environment->getCurrentInstance()->getVersion();
        if ($newestVersion = $this->newestVersionChecker->getNewestVersion($currentVersion)) {
            if (!version_compare($newestVersion, $currentVersion, ">")) {
                throw new AbortedStepException(
                    sprintf(
                        'Your 7tag version "%s" is newest.',
                        $environment->getCurrentInstance()->getVersion()
                    )
                );
            }

            $this->logger->info(
                sprintf('Starting downloading newest version "%s".', $newestVersion)
            );

            $downloadedFile = $this->downloader->download($newestVersion, $currentVersion);

            $this->logger->info(
                sprintf('Completed downloading newest version "%s".', $newestVersion)
            );

            $this->logger->info(
                sprintf('Extracting file "%s"...', $downloadedFile)
            );

            $this->newestVersionPreparator->prepareNewestVersion(
                $environment->getNewestInstance(),
                $downloadedFile
            );

            $this->logger->info(
                sprintf('Extracting file "%s" completed.', $downloadedFile)
            );

            $this->logger->info(
                sprintf('Version "%s" is ready for update.', $newestVersion)
            );

            return;
        }

        throw new AbortedStepException(sprintf('Your current version "%s" of 7tag instance is newest.', $currentVersion));
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return 'Prepare newest version';
    }
}
