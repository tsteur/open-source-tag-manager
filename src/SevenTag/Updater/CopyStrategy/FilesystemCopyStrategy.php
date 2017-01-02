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

namespace SevenTag\Updater\CopyStrategy;

use SevenTag\Updater\Exception\UpdaterException;
use SevenTag\Updater\Instance\InstanceInterface;
use Symfony\Component\Finder\SplFileInfo;

/**
 * Class FilesystemCopyStrategy
 * @package SevenTag\Updater\CopyStrategy
 */
class FilesystemCopyStrategy implements CopyStrategyInterface
{
    /**
     * {@inheritdoc}
     */
    public function copy(InstanceInterface $currentInstance, InstanceInterface $newestInstance)
    {
        $currentInstanceFilesystem = $currentInstance->getFilesystem();
        /** @var SplFileInfo $blob */
        foreach ($newestInstance->getContents() as $blob) {
            $status = false;

            if ($blob->isDir()) {
                $status = $currentInstanceFilesystem->createDir($blob->getRelativePathname());
            }

            if ($blob->isFile()) {
                $stream = $newestInstance->getFilesystem()->readStream($blob->getRelativePathname());
                $contents = stream_get_contents($stream);
                fclose($stream);

                $putStream = tmpfile();
                fwrite($putStream, $contents);
                rewind($putStream);
                $status = $currentInstanceFilesystem->putStream($blob->getRelativePathname(), $putStream);

                if (is_resource($putStream)) {
                    fclose($putStream);
                }
            }

            if (!$status) {
                throw new UpdaterException(
                    sprintf(
                        'Cannot copy "%s" blob. Check filesystem permissions.',
                        $blob->getRelativePathname()
                    )
                );
            }
        }

        return true;
    }
}
