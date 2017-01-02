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
use SevenTag\Api\AppBundle\Locale\LocaleFinder;

class LocaleFinderTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldReturnLocalesFile()
    {
        $file1 = new \SplFileInfo('en.json');
        $file2 = new \SplFileInfo('en.json');
        $file3 = new \SplFileInfo('fr.json');

        $finder = $this->getFinderMock([$file1, $file2, $file3]);
        $localeFinder = new LocaleFinder($finder->reveal(), 'app', [
            'src/plugins/dir1'
        ]);
        $localesFiles = $localeFinder->findLocales();

        $this->assertCount(2, $localesFiles['en']);
        $this->assertCount(1, $localesFiles['fr']);
        $this->assertArrayHasKey('en', $localesFiles);
        $this->assertArrayHasKey('fr', $localesFiles);
        $this->assertEquals($file1, $localesFiles['en'][0]);
        $this->assertEquals($file2, $localesFiles['en'][1]);
        $this->assertEquals($file3, $localesFiles['fr'][0]);
    }

    /**
     * @param $return
     * @return \Prophecy\Prophecy\ObjectProphecy
     */
    protected function getFinderMock($return)
    {
        $finder = $this->prophesize('Symfony\Component\Finder\Finder');
        $finder->in(Argument::any())->willReturn($finder);
        $finder->path(Argument::any())->willReturn($finder);
        $finder->ignoreDotFiles(Argument::any())->willReturn($finder);
        $finder->files(Argument::any())->willReturn($finder);
        $finder->name(Argument::any())->willReturn($finder);
        $finder->getIterator()->willReturn($return);

        return $finder;
    }
}
