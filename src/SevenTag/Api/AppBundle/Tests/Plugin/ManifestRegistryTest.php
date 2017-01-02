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

namespace SevenTag\Api\AppBundle\Tests\Plugin;

use Doctrine\Common\Collections\ArrayCollection;
use SevenTag\Api\AppBundle\Plugin\Manifest;
use SevenTag\Api\AppBundle\Plugin\ManifestRegistry;

/**
 * Class ManifestRegistryTest
 * @package SevenTag\Api\AppBundle\Tests\Plugin
 */
class ManifestRegistryTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldRegisterNonRegisteredManifest()
    {
        $registry = new ManifestRegistry();
        $registry->register(new Manifest(
            'test',
            '1.0.1',
            new ArrayCollection(),
            new ArrayCollection()
        ));

        $this->assertCount(1, $registry->all());
    }

    /**
     * @test
     */
    public function itShouldRetrieveManifestList()
    {
        $registry = new ManifestRegistry();
        $registry->register(new Manifest(
            'test1',
            '1.0.1',
            new ArrayCollection(),
            new ArrayCollection()
        ));
        $registry->register(new Manifest(
            'test2',
            '1.0.1',
            new ArrayCollection(),
            new ArrayCollection()
        ));

        $this->assertCount(2, $registry->all());
    }

    /**
     * @test
     */
    public function itShouldUnregisterAlreadyRegisteredManifest()
    {
        $manifest1 = new Manifest(
            'test1',
            '1.0.1',
            new ArrayCollection(),
            new ArrayCollection()
        );
        $manifest2 = new Manifest(
            'test2',
            '1.0.1',
            new ArrayCollection(),
            new ArrayCollection()
        );
        $registry = new ManifestRegistry();
        $registry->register($manifest1);
        $registry->register($manifest2);
        $registry->unregister('test2');

        $this->assertCount(1, $registry->all());
    }

    /**
     * @test
     * @expectedException \SevenTag\Api\AppBundle\Plugin\Exception\ExistingManifestException
     */
    public function itShouldThrowExceptionDuringRegisteringExistingManifest()
    {
        $registry = new ManifestRegistry();
        $registry->register(new Manifest(
            'test',
            '1.0.1',
            new ArrayCollection(),
            new ArrayCollection()
        ));
        $registry->register(new Manifest(
            'test',
            '1.0.1',
            new ArrayCollection(),
            new ArrayCollection()
        ));
    }

    /**
     * @test
     * @expectedException \SevenTag\Api\AppBundle\Plugin\Exception\NonExistingManifestException
     */
    public function itShouldThrowExceptionDuringUnregisteringNonExistingManifest()
    {
        $manifest1 = new Manifest(
            'test1',
            '1.0.1',
            new ArrayCollection(),
            new ArrayCollection()
        );

        $registry = new ManifestRegistry();
        $registry->register($manifest1);
        $registry->unregister('test2');
    }

    /**
     * @test
     */
    public function itShouldRetrieveManifest()
    {
        $manifest1 = new Manifest(
            'test1',
            '1.0.1',
            new ArrayCollection(),
            new ArrayCollection()
        );

        $registry = new ManifestRegistry();
        $registry->register($manifest1);

        $this->assertEquals('test1', $registry->get('test1')->getName());
    }

    /**
     * @test
     * @expectedException \SevenTag\Api\AppBundle\Plugin\Exception\NonExistingManifestException
     */
    public function itShouldRetrieveExceptionDuringGettingNonRegisteredManifest()
    {
        $manifest1 = new Manifest(
            'test1',
            '1.0.1',
            new ArrayCollection(),
            new ArrayCollection()
        );

        $registry = new ManifestRegistry();
        $registry->register($manifest1);

        $registry->get('test2');
    }

    /**
     * @test
     */
    public function itShouldCheckIfManifestIsRegistered()
    {
        $manifest1 = new Manifest(
            'test1',
            '1.0.1',
            new ArrayCollection(),
            new ArrayCollection()
        );

        $registry = new ManifestRegistry();
        $registry->register($manifest1);

        $this->assertTrue($registry->has('test1'));
        $this->assertFalse($registry->has('test2'));
    }
}
