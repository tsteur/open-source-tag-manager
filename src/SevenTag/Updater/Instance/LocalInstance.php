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

namespace SevenTag\Updater\Instance;

use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;
use League\Flysystem\FilesystemInterface;
use Symfony\Component\Finder\Finder;

/**
 * Class LocalInstance
 * @package SevenTag\Updater\LocalInstance
 */
class LocalInstance implements InstanceInterface
{
    /**
     * @var string
     */
    protected $rootPath;

    /**
     * @var FilesystemInterface
     */
    protected $filesystem;

    /**
     * @param $rootPath
     */
    public function __construct($rootPath)
    {
        $this->rootPath = $rootPath;
    }

    /**
     * {@inheritdoc}
     */
    public function getVersion()
    {
        $version = json_decode($this->getFilesystem()->read('version.json'), true);

        return $version['version'];
    }

    /**
     * {@inheritdoc}
     */
    public function isValid()
    {
        if (!$this->getFilesystem()->has('composer.json')) {
            return false;
        }

        $composer = json_decode($this->getFilesystem()->read('composer.json'), true);

        return isset($composer['name']) && 'seventag/seventag' === $composer['name'];
    }

    /**
     * {@inheritdoc}
     */
    public function getContents()
    {
        $finder = new Finder();
        $finder
            ->in($this->rootPath)
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
                    'web/bundles',
                    'build'
                ]
            );

        $notPaths = [
            'app/config/parameters.yml',
            'version.json',
            'updater_backup.zip',
            '/(?<!admin-panel\/)bower_components/',
            '/(?<!admin-panel\/)node_modules/'
        ];

        foreach ($notPaths as $notPath) {
            $finder->notPath($notPath);
        }

        return $finder;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilesystem()
    {
        if (is_null($this->filesystem)) {
            $this->filesystem = new Filesystem(new Local($this->rootPath, LOCK_EX, Local::SKIP_LINKS));
        }

        return $this->filesystem;
    }

    /**
     * {@inheritdoc}
     */
    public function getRootPath()
    {
        return $this->rootPath;
    }
}
