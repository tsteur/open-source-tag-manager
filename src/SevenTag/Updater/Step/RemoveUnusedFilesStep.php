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
use SevenTag\Updater\Instance\InstanceInterface;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

/**
 * Class RemoveUnusedFilesStep
 * @package SevenTag\Updater\Step
 */
class RemoveUnusedFilesStep extends LocalInstanceStep
{
    /**
     * {@inheritdoc}
     */
    protected function doPerform(EnvironmentInterface $environment)
    {
        $currentInstance = $environment->getCurrentInstance();
        $newestInstance = $environment->getNewestInstance();

        $currentFilesystem = $currentInstance->getFilesystem();
        $newestFilesystem = $newestInstance->getFilesystem();

        $finder = new Finder();
        $finder->in($currentInstance->getRootPath())
            ->ignoreVCS(true)
            ->exclude(
                [
                    'bin',
                    'app/cache',
                    'app/logs',
                    'app/spool',
                    'var/logs',
                    'var/cache',
                    'var/spool',
                    'web/containers',
                    'web/bundles'
                ]
            );

        $notPaths = [
            'updater_backup.zip',
            'app/config/parameters.yml',
        ];

        foreach ($notPaths as $notPath) {
            $finder->notPath($notPath);
        }

        /** @var SplFileInfo $blob */
        foreach (iterator_to_array($finder, true) as $blob) {
            if ($blob->isDir()) {
                $newestInstanceDir = $this->fixDirectoryPath($newestInstance, $blob);
                $currentInstanceDir = $this->fixDirectoryPath($currentInstance, $blob);
                if (!is_dir($newestInstanceDir) && is_dir($currentInstanceDir)) {
                    $currentFilesystem->deleteDir($blob->getRelativePathname());
                }
            }

            if ($blob->isFile() && !$newestFilesystem->has($blob->getRelativePathname())) {
                $currentFilesystem->delete($blob->getRelativePathname());
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return 'Remove unused files';
    }

    /**
     * @param InstanceInterface $instance
     * @param SplFileInfo $blob
     * @return string
     */
    protected function fixDirectoryPath(InstanceInterface $instance, SplFileInfo $blob)
    {
        return $instance->getRootPath().DIRECTORY_SEPARATOR.$blob->getRelativePathname();
    }
}
