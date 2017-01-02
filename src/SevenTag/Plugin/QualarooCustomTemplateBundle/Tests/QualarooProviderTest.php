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

namespace SevenTag\Plugin\QualarooCustomTemplateBundle\Tests;

use Liip\FunctionalTestBundle\Test\WebTestCase;
use SevenTag\Api\TagBundle\Entity\Tag;
use SevenTag\Plugin\QualarooCustomTemplateBundle\Template\QualarooProvider;

/**
 * Class QualarooProviderTest
 * @package SevenTag\Plugin\QualarooCustomTemplateBundle\Tests
 */
class QualarooProviderTest extends WebTestCase
{
    /**
     * @var QualarooProvider
     */
    private $provider;

    /**
     * @before
     */
    public function beforeEach()
    {
        $this->provider = new QualarooProvider();
        $this->provider->setContainer($this->getContainer());
    }

    /**
     * @test
     */
    public function itReturnKey()
    {
        $this->assertEquals(QualarooProvider::KEY, $this->provider->getKey());
    }

    /**
     * @test
     */
    public function itReturnFormType()
    {
        $this->assertEquals('qualaroo_template_form_type', $this->provider->getFormType());
    }

    /**
     * @test
     */
    public function itPrePersistTag()
    {
        $customerId = '37282';
        $siteToken = '9F2';

        $tag = new Tag();
        $tag->setTemplateOptions([
            'customerId' => $customerId,
            'siteToken' => $siteToken
        ]);

        $tag = $this->provider->prePersist($tag);

        $code = $tag->getCode();

        $this->assertRegExp(sprintf('/%s/i', preg_quote($customerId)), $code);
        $this->assertRegExp(sprintf('/%s/i', preg_quote($siteToken)), $code);

        $this->assertTrue($tag->getDocumentWrite());
    }
}
