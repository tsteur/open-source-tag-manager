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

namespace SevenTag\Updater\Tests\CopyStrategy;

use League\Flysystem\FilesystemInterface;
use Prophecy\Argument;
use SevenTag\Updater\Instance\InstanceInterface;
use Symfony\Component\Finder\SplFileInfo;
use SevenTag\Updater\CopyStrategy\FilesystemCopyStrategy;

/**
 * Class FilesystemCopyStrategyTest
 * @package SevenTag\Updater\Tests\CopyStrategy
 * @
 */
class FilesystemCopyStrategyTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     * @markSkipped
     */
    public function itCopysContentsFromNewestToCurrentInstance()
    {
        $this->markTestSkipped('Need to be changed.');
        $file = $this->getFileMock();
        $dir = $this->getDirMock();
        $newestInstance = $this->getLocalInstance($file, $dir);
        $filesystem = $this->getFilesystemMock();
        $currentInstance = $this->getCurrentLocalInstanceMock($filesystem);
        $filesystemCopyStrategy = new FilesystemCopyStrategy();
        $result = $filesystemCopyStrategy->copy($currentInstance, $newestInstance);

        $this->assertTrue($result);
    }

    /**
     * @test
     * @expectedException \SevenTag\Updater\Exception\UpdaterException
     */
    public function itThrowsExceptionIfCopyOperationIsNotPossible()
    {
        $this->markTestSkipped('Need to be changed.');
        $file = $this->getFileMock();
        $dir = $this->getDirMock();
        $newestInstance = $this->getLocalInstance($file, $dir);
        $filesystem = $this->getFilesystemMock(false);
        $currentInstance = $this->getCurrentLocalInstanceMock($filesystem);
        $filesystemCopyStrategy = new FilesystemCopyStrategy();
        $filesystemCopyStrategy->copy($currentInstance, $newestInstance);
    }

    /**
     * @return SplFileInfo
     */
    private function getFileMock()
    {
        $file = $this->prophesize('Symfony\Component\Finder\SplFileInfo');

        $file
            ->isFile()
            ->willReturn(true);

        $file
            ->isDir()
            ->willReturn(false);

        $file
            ->getRelativePathname()
            ->willReturn('app/Kernel.php');

        $file
            ->getContents()
            ->willReturn('<?php ?>');

        return $file->reveal();
    }

    /**
     * @return SplFileInfo
     */
    private function getDirMock()
    {
        $dir = $this->prophesize('Symfony\Component\Finder\SplFileInfo');

        $dir
            ->isFile()
            ->willReturn(false);

        $dir
            ->isDir()
            ->willReturn(true);

        $dir
            ->getRelativePathname()
            ->willReturn('app');

        return $dir->reveal();
    }

    /**
     * @param SplFileInfo $file
     * @param SplFileInfo $dir
     * @return InstanceInterface
     */
    private function getLocalInstance($file, $dir)
    {
        $localInstance = $this->prophesize('SevenTag\Updater\Instance\InstanceInterface');

        $localInstance
            ->getContents()
            ->willReturn([
                $file,
                $dir
            ]);

        return $localInstance->reveal();
    }

    /**
     * @param FilesystemInterface $filesystem
     * @return InstanceInterface
     */
    private function getCurrentLocalInstanceMock(FilesystemInterface $filesystem)
    {
        $currentInstance = $this->prophesize('SevenTag\Updater\Instance\InstanceInterface');

        $currentInstance
            ->getFilesystem()
            ->willReturn($filesystem);

        return $currentInstance->reveal();
    }

    /**
     * @param bool $isCreated
     * @return FilesystemInterface
     */
    private function getFilesystemMock($isCreated = true)
    {
        $filesystem = $this->prophesize('League\Flysystem\FilesystemInterface');

        $filesystem
            ->createDir('app')
            ->willReturn(true);

        $filesystem
            ->put('app/Kernel.php', '<?php ?>')
            ->willReturn($isCreated);

        return $filesystem->reveal();
    }
}
