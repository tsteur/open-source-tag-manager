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
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

/**
 * Class CleanUpMigrationsFiles
 * @package SevenTag\Updater\Step
 */
class CleanUpMigrationsFiles extends LocalInstanceStep
{
    /**
     * {@inheritdoc}
     */
    protected function doPerform(EnvironmentInterface $environment)
    {
        $currentInstance = $environment->getCurrentInstance();
        $currentFilesystem = $currentInstance->getFilesystem();

        $finder = new Finder();
        $finder
            ->in($currentInstance->getRootPath())
            ->ignoreDotFiles(true)
            ->ignoreVCS(true)
            ->path('app/DoctrineMigrations')
            ->files();

        /** @var SplFileInfo $blob */
        foreach ($finder as $blob) {
            if ($blob->isFile() && $currentFilesystem->has($blob->getRelativePathname())) {
                $currentFilesystem->delete($blob->getRelativePathname());
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return 'Clean up migrations files';
    }
}
