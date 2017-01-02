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

namespace SevenTag\Api\AppBundle\Locale;

use Symfony\Component\Finder\Finder;

/**
 * Class LocaleFinder
 * @package SevenTag\Api\AppBundle\Locale
 */
class LocaleFinder implements LocaleFinderInterface
{
    /**
     * @var Finder
     */
    protected $finder;

    /**
     * @var array
     */
    protected $localeDirectories;

    /**
     * LocaleFinder constructor.
     * @param Finder $finder
     * @param string $kernelRootDirectory
     * @param array $pluginsDirectories
     */
    public function __construct(Finder $finder, $kernelRootDirectory, array $pluginsDirectories)
    {
        $this->finder = $finder;
        $this->localeDirectories = array_merge([$kernelRootDirectory], $pluginsDirectories);
    }

    /**
     * {@inheritdoc}
     */
    public function findLocales()
    {
        $localesIterator = $this
            ->finder
            ->in($this->localeDirectories)
            ->path('locales')
            ->ignoreDotFiles(true)
            ->files()
            ->name('*.json')
            ->getIterator();

        $locales = [];

        /** @var \SplFileInfo $locale */
        foreach ($localesIterator as $locale) {
            $locales[$this->getLocaleName($locale)][] = $locale;
        }

        return $locales;
    }

    /**
     * @param \SplFileInfo $file
     * @return string
     */
    private function getLocaleName(\SplFileInfo $file)
    {
        return $file->getBasename(sprintf('.%s', $file->getExtension()));
    }
}
