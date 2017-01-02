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

namespace SevenTag\Plugin\ClickTaleCustomTemplateBundle\Tests;

use Liip\FunctionalTestBundle\Test\WebTestCase;
use SevenTag\Api\TagBundle\Entity\Tag;
use SevenTag\Plugin\ClickTaleCustomTemplateBundle\Template\ClickTaleProvider;

/**
 * Class ClickTaleProviderTest
 * @package SevenTag\Plugin\ClickTaleCustomTemplateBundle\Tests
 */
class ClickTaleProviderTest extends WebTestCase
{
    /**
     * @var ClickTaleProvider
     */
    private $provider;

    /**
     * @before
     */
    public function beforeEach()
    {
        $this->provider = new ClickTaleProvider();
        $this->provider->setContainer($this->getContainer());
    }

    /**
     * @test
     */
    public function itReturnKey()
    {
        $this->assertEquals(ClickTaleProvider::KEY, $this->provider->getKey());
    }

    /**
     * @test
     */
    public function itReturnFormType()
    {
        $this->assertEquals('click_tale_template_form_type', $this->provider->getFormType());
    }

    /**
     * @test
     */
    public function itPrePersistTag()
    {
        $partition = 'www01';
        $guid = '4473e195-a0e0-4271-96be-144ce4eXXXX';

        $tag = new Tag();
        $tag->setTemplateOptions([
            'partition' => $partition,
            'guid' => $guid
        ]);

        $tag = $this->provider->prePersist($tag);

        $code = $tag->getCode();

        $this->assertRegExp(sprintf('/%s/i', preg_quote($partition)), $code);
        $this->assertRegExp(sprintf('/%s/i', preg_quote($guid)), $code);

        $this->assertTrue($tag->getDocumentWrite());
    }
}
