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
use SevenTag\Updater\Exception\UpdaterException;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

/**
 * Class CurrentVersionBackupStep
 * @package SevenTag\Updater\Step
 */
class CurrentVersionBackupStep extends LocalInstanceStep
{
    /**
     * {@inheritdoc}
     */
    protected function doPerform(EnvironmentInterface $environment)
    {
        $currentInstance = $environment->getCurrentInstance();
        $currentFilesystem = $currentInstance->getFilesystem();

        if ($currentFilesystem->has('updater_backup.zip')) {
            $currentFilesystem->delete('updater_backup.zip');
        }

        $backupPath = sprintf(
            '%s/updater_backup.zip',
            $currentInstance->getRootPath()
        );

        $zip = new \ZipArchive();
        if (!$zip->open($backupPath, \ZipArchive::CREATE)) {
            throw new UpdaterException(sprintf('Cannot create ZIP archive in "%s".', $backupPath));
        }

        $finder = new Finder();
        $finder
            ->in($currentInstance->getRootPath())
            ->ignoreDotFiles(true)
            ->ignoreVCS(true);

        $notPaths = [
            '/(?<!admin-panel\/)bower_components/',
            '/(?<!admin-panel\/)node_modules/'
        ];

        foreach ($notPaths as $notPath) {
            $finder->notPath($notPath);
        }

        /** @var SplFileInfo $blob */
        foreach ($finder as $blob) {
            if ($blob->isDir()) {
                $zip->addEmptyDir($blob->getRelativePathname());
            }

            if ($blob->isFile()) {
                $zip->addFile($blob->getRealPath(), $blob->getRelativePathname());
            }
        }

        $zip->close();

        $this->logger->info(sprintf('Backup was successfully created in: %s.', $backupPath));
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return 'Current version backup';
    }
}
