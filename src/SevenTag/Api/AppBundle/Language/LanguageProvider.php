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

namespace SevenTag\Api\AppBundle\Language;

use SevenTag\Api\AppBundle\Locale\LocaleProvider;
use SevenTag\Api\AppBundle\Locale\LocaleProviderInterface;
use Symfony\Component\Intl\Intl;

/**
 * Class LanguageProvider
 * @package SevenTag\Api\AppBundle\Language
 */
class LanguageProvider implements LanguageProviderInterface
{
    /**
     * @var array
     */
    private $languages = [];

    /**
     * LanguageProvider constructor.
     * @param LocaleProviderInterface $localeProvider
     */
    public function __construct(LocaleProviderInterface $localeProvider)
    {
        $this->buildLanguagesFromLocales($localeProvider->getLocales());
    }

    /**
     * {@inheritdoc}
     */
    public function getLanguages()
    {
        return $this->languages;
    }

    /**
     * {@inheritdoc}
     */
    public function hasLanguage($language)
    {
        return array_key_exists($language, $this->languages);
    }

    /**
     * @param array $locales
     */
    private function buildLanguagesFromLocales(array $locales)
    {
        /** @var \SplFileInfo $locale */
        foreach (array_keys($locales) as $localeCode) {
            $languageName = Intl::getLanguageBundle()->getLanguageName($localeCode);

            if (null !== $languageName) {
                $this->languages[$localeCode] = $languageName;
            }
        }
    }
}
