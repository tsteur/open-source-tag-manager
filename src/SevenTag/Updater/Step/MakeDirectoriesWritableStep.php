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
 * Class MakeDirectoriesWritableStep
 * @package SevenTag\Updater\Step
 */
class MakeDirectoriesWritableStep extends LocalInstanceStep
{
    /**
     * {@inheritdoc}
     */
    protected function doPerform(EnvironmentInterface $environment)
    {
        $currentInstance = $environment->getCurrentInstance();

        $finder = new Finder();
        $finder
            ->in($currentInstance->getRootPath())
            ->ignoreDotFiles(true)
            ->ignoreVCS(true)
            ->path('app/cache')
            ->path('app/logs')
            ->path('var/cache')
            ->path('var/logs')
            ->directories();

        /** @var SplFileInfo $blob */
        foreach ($finder as $blob) {
            if ($blob->isDir()) {
                if (@chmod($blob->getRealPath(), 0777) === false) {
                    $this->logger->info(
                        sprintf(
                            'Cannot set writable permissions for %s. Do it by hand after update.',
                            $blob->getRelativePathname()
                        )
                    );
                }
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return 'Make cache, logs, spool and containers directories writable';
    }
}
