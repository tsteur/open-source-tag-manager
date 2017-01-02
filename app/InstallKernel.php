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

require __DIR__ . '/AppKernel.php';

/**
 * Class InstallKernel
 */
class InstallKernel extends AppKernel
{
    /**
     * {@inheritdoc}
     */
    public function registerBundles()
    {
        $bundles = parent::registerBundles();

        $bundles[] = new SevenTag\InstallerBundle\SevenTagInstallerBundle();

        return $bundles;
    }

    /**
     * {@inheritdoc}
     */
    public function getCacheDir()
    {
        return is_writable($this->getVarPath() . '/cache') ? $this->getVarPath() . '/cache' : sys_get_temp_dir() . '/' . $this->getPath() . '/cache';
    }

    /**
     * {@inheritdoc}
     *
     * @api
     */
    public function getLogDir()
    {
        return is_writable($this->getVarPath() . '/logs') ? $this->getVarPath() . '/logs' : sys_get_temp_dir() . '/' . $this->getPath() . '/logs';
    }

    /**
     * @return string
     */
    protected function getPath()
    {
        if (!isset($_COOKIE['install_path'])) {
            $path = sprintf('7tag_%s', md5(get_current_user() . getmypid() . uniqid() . str_replace('/', '_', __DIR__)));
            setcookie('install_path', $path);
        } else {
            $path = $_COOKIE['install_path'];
        }

        return $path;
    }

    /**
     * @return string
     */
    protected function getVarPath()
    {
        return $this->getRootDir() . '/../var';
    }
}
