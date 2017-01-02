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

namespace SevenTag\Updater\Tests\Instance;

use SevenTag\Updater\Instance\LocalInstance;

/**
 * Class LocalInstanceTest
 * @package SevenTag\Updater\Tests\Instance
 */
class LocalInstanceTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itAssertsIsValid()
    {
        $localInstance = new LocalInstance(__DIR__ . '/../../../../..');

        $this->assertTrue($localInstance->isValid());
    }

    /**
     * @test
     */
    public function itReturnsVersion()
    {
        $localInstance = new LocalInstance(__DIR__ . '/../../../../..');

        $this->assertTrue(is_string($localInstance->getVersion()));
    }

    /**
     * @test
     */
    public function itReturnsFilesystem()
    {
        $localInstance = new LocalInstance(__DIR__ . '/../../../..');

        $this->assertInstanceOf('League\Flysystem\FilesystemInterface', $localInstance->getFilesystem());
    }

    /**
     * @test
     */
    public function itReturnsContents()
    {
        $localInstance = new LocalInstance(__DIR__ . '/../../../..');

        $this->assertInstanceOf('Symfony\Component\Finder\Finder', $localInstance->getContents());
    }

    /**
     * @test
     */
    public function itReturnsRootPath()
    {
        $localInstance = new LocalInstance(__DIR__ . '/../../../..');
        $this->assertTrue(is_string($localInstance->getRootPath()));
    }
}
