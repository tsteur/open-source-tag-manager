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

namespace SevenTag\Plugin\GoogleAnalyticsCustomTemplateBundle\Tests;

use Liip\FunctionalTestBundle\Test\WebTestCase;
use SevenTag\Api\TagBundle\Entity\Tag;
use SevenTag\Plugin\GoogleAnalyticsCustomTemplateBundle\Template\GoogleAnalyticsProvider;

/**
 * Class GoogleAnalyticsProviderTest
 * @package SevenTag\Plugin\GoogleAnalyticsCustomTemplateBundle\Tests
 */
class GoogleAnalyticsProviderTest extends WebTestCase
{
    /**
     * @var GoogleAnalyticsProvider
     */
    private $provider;

    /**
     * @before
     */
    public function beforeEach()
    {
        $this->provider = new GoogleAnalyticsProvider();
        $this->provider->setContainer($this->getContainer());
    }

    /**
     * @test
     */
    public function itReturnKey()
    {
        $this->assertEquals(GoogleAnalyticsProvider::KEY, $this->provider->getKey());
    }

    /**
     * @test
     */
    public function itReturnFormType()
    {
        $this->assertEquals('google_analytics_template_form_type', $this->provider->getFormType());
    }

    /**
     * @test
     */
    public function itPrePersistTag()
    {
        $tag = new Tag();
        $tag->setTemplateOptions([
            'id' => 'GA-1234'
        ]);

        $tag = $this->provider->prePersist($tag);

        $code = $tag->getCode();

        $this->assertRegExp(sprintf('/%s/i', preg_quote('GA-1234')), $code);

        $this->assertFalse($tag->getDocumentWrite());
    }
}
