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

namespace SevenTag\Api\AppBundle\Tests\Locale;

use Prophecy\Argument;
use SevenTag\Api\AppBundle\Locale\LocaleProvider;

class LocaleProviderTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldReturnListOfAvailableLocales()
    {
        $localeFinder = $this->prophesize('SevenTag\Api\AppBundle\Locale\LocaleFinderInterface');
        $localeFinder->findLocales()->willReturn([
            'en' => 'English',
            'pl' => 'Polish',
        ]);
        $localeProvider = new LocaleProvider($localeFinder->reveal());

        $this->assertCount(2, $localeProvider->getLocales());
        $this->assertArrayHasKey('en', $localeProvider->getLocales());
        $this->assertArrayHasKey('pl', $localeProvider->getLocales());
    }

    /**
     * @test
     */
    public function itShouldReturnEmptyArrayIfLocalesNotFound()
    {
        $localeFinder = $this->prophesize('SevenTag\Api\AppBundle\Locale\LocaleFinderInterface');
        $localeFinder->findLocales()->willReturn([]);
        $localeProvider = new LocaleProvider($localeFinder->reveal());

        $this->assertCount(0, $localeProvider->getLocales());
    }

    /**
     * @test
     */
    public function itShouldReturnLocaleIfLocaleExists()
    {
        $testLocaleEnFile = new \SplFileInfo('test');
        $localeFinder = $this->prophesize('SevenTag\Api\AppBundle\Locale\LocaleFinderInterface');
        $localeFinder->findLocales()->willReturn(['en' => $testLocaleEnFile]);
        $localeProvider = new LocaleProvider($localeFinder->reveal());

        $this->assertEquals(true, is_array($localeProvider->getLocale('en')));
    }

    /**
     * @test
     */
    public function itShouldReturnNullIfLocaleNotExists()
    {
        $testLocaleEnFile = new \SplFileInfo('test');
        $localeFinder = $this->prophesize('SevenTag\Api\AppBundle\Locale\LocaleFinderInterface');
        $localeFinder->findLocales()->willReturn(['en' => $testLocaleEnFile]);
        $localeProvider = new LocaleProvider($localeFinder->reveal());

        $this->assertNull($localeProvider->getLocale('pl'));
    }
}
