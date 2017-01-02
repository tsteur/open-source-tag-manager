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

namespace SevenTag\Updater\Utils;

use SevenTag\Updater\Exception\UpdaterException;
use SevenTag\Updater\Instance\InstanceInterface;

/**
 * Class NewestInstancePreparator
 * @package SevenTag\Updater\Utils
 */
class NewestInstancePreparator implements NewestInstancePreparatorInterface
{
    /**
     * {@inheritdoc}
     */
    public function prepareNewestVersion(InstanceInterface $newestInstance, $downloadedFile)
    {
        $zip = new \ZipArchive();
        if (!$zip->open($downloadedFile)) {
            throw new UpdaterException(sprintf('Cannot open ZIP archive from path "%s".', $downloadedFile));
        }

        $zip->extractTo($this->normalize7TagPath($newestInstance->getRootPath()));
        $zip->close();
    }

    /**
     * @param string $path
     * @return string
     */
    protected function normalize7TagPath($path)
    {
        return rtrim($path, 'seventag');
    }
}
