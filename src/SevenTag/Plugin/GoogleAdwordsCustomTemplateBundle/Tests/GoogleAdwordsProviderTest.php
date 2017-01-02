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

namespace SevenTag\Plugin\GoogleAdwordsCustomTemplateBundle\Tests;

use Liip\FunctionalTestBundle\Test\WebTestCase;
use SevenTag\Api\TagBundle\Entity\Tag;
use SevenTag\Plugin\GoogleAdwordsCustomTemplateBundle\Template\GoogleAdwordsProvider;

/**
 * Class GoogleAdwordsProviderTest
 * @package SevenTag\Plugin\GoogleAdwordsCustomTemplateBundle\Tests
 */
class GoogleAdwordsProviderTest extends WebTestCase
{
    /**
     * @var GoogleAdwordsProvider
     */
    private $provider;

    /**
     * @before
     */
    public function beforeEach()
    {
        $this->provider = new GoogleAdwordsProvider();
        $this->provider->setContainer($this->getContainer());
    }

    /**
     * @test
     */
    public function itReturnKey()
    {
        $this->assertEquals(GoogleAdwordsProvider::KEY, $this->provider->getKey());
    }

    /**
     * @test
     */
    public function itReturnFormType()
    {
        $this->assertEquals('google_adwords_template_form_type', $this->provider->getFormType());
    }

    /**
     * @test
     */
    public function itPrePersistTag()
    {
        $tag = new Tag();
        $tag->setTemplateOptions([
            'conversionId' => 871234,
            'conversionLabel' => 'GA-1234 Label',
            'remarketingOnly' => true
        ]);

        $tag = $this->provider->prePersist($tag);

        $code = $tag->getCode();

        $this->assertRegExp(sprintf('/%s/i', preg_quote('var google_conversion_id = 871234;')), $code);
        $this->assertRegExp(sprintf('/%s/i', preg_quote('var google_conversion_label = \'GA-1234 Label\';')), $code);
        $this->assertRegExp(sprintf('/%s/i', preg_quote('var google_remarketing_only = 1;')), $code);

        $this->assertTrue($tag->getDocumentWrite());
    }
}
