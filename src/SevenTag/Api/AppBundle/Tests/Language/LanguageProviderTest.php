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

namespace SevenTag\Api\AppBundle\Tests\Language;

use SevenTag\Api\AppBundle\Language\LanguageProvider;
use SevenTag\Api\AppBundle\Locale\LocaleProviderInterface;
use Symfony\Component\Intl\Intl;

/**
 * Class LanguageProviderTest
 * @package SevenTag\Api\AppBundle\Tests\Language
 */
class LanguageProviderTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldBuildLanguagesMapFromValidLocales()
    {
        $localeProvider = $this->getLocaleProviderMock([
            'pl' => Intl::getLanguageBundle()->getLanguageName('pl'),
            'fr' => Intl::getLanguageBundle()->getLanguageName('fr'),
            'ger' => Intl::getLanguageBundle()->getLanguageName('ger'),
        ]);

        $provider = new LanguageProvider($localeProvider);

        $this->assertCount(2, $provider->getLanguages());
        $this->assertFalse($provider->hasLanguage('ger'));
    }
    /**
     * @test
     */
    public function itShouldReturnLanguagesMapFromLocales()
    {
        \Locale::setDefault('en');

        $localeProvider = $this->getLocaleProviderMock([
            'pl' => Intl::getLanguageBundle()->getLanguageName('pl'),
            'fr' => Intl::getLanguageBundle()->getLanguageName('fr')
        ]);

        $provider = new LanguageProvider($localeProvider);

        $this->assertLanguagesMap($provider->getLanguages());
    }

    /**
     * @test
     */
    public function itShouldReturnBooleanIfLanguageExists()
    {
        $localeProvider = $this->getLocaleProviderMock([
            'pl' => Intl::getLanguageBundle()->getLanguageName('pl'),
            'fr' => Intl::getLanguageBundle()->getLanguageName('fr')
        ]);

        $provider = new LanguageProvider($localeProvider);

        $this->assertTrue($provider->hasLanguage('pl'));
        $this->assertFalse($provider->hasLanguage('de'));
    }

    /**
     * @param array $returnValues
     * @return LocaleProviderInterface
     */
    protected function getLocaleProviderMock(array $returnValues = [])
    {
        $localeProvider = $this->prophesize('SevenTag\Api\AppBundle\Locale\LocaleProviderInterface');
        $localeProvider->getLocales()
            ->shouldBeCalled()
            ->willReturn($returnValues);

        return $localeProvider->reveal();
    }

    /**
     * @param array $languagesMap
     */
    protected function assertLanguagesMap(array $languagesMap)
    {
        $this->assertCount(2, $languagesMap);
        $this->assertArrayHasKey('pl', $languagesMap);
        $this->assertArrayHasKey('fr', $languagesMap);
        $this->assertEquals('Polish', $languagesMap['pl']);
        $this->assertEquals('French', $languagesMap['fr']);
    }
}
