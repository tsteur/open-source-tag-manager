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

namespace SevenTag\Plugin\MarketoCustomTemplateBundle\Tests\Template;

use Liip\FunctionalTestBundle\Test\WebTestCase;
use SevenTag\Api\TagBundle\Entity\Tag;
use SevenTag\Plugin\MarketoCustomTemplateBundle\Template\MarketoProvider;
use SevenTag\Plugin\MarketoCustomTemplateBundle\Form\MarketoFormType;

/**
 * Class MarketoProviderTest
 * @package SevenTag\Plugin\MarketoCustomTemplateBundle\Template
 */
class MarketoProviderTest extends WebTestCase
{
    /**
     * @var MarketoProvider
     */
    private $provider;

    /**
     * @before
     */
    public function beforeEach()
    {
        $this->provider = new MarketoProvider();
        $this->provider->setContainer($this->getContainer());
    }

    /**
     * @test
     */
    public function itReturnsProviderKey()
    {
        $this->assertEquals($this->provider->getKey(), MarketoProvider::KEY);
    }

    /**
     * @test
     */
    public function itReturnsFormType()
    {
        $formType = new MarketoFormType();
        $this->assertEquals($formType->getName(), $this->provider->getFormType());
    }

    /**
     * @test
     */
    public function itIsAbleToPrePersistTag()
    {
        $accountId = 123;
        $tag = new Tag();
        $tag->setTemplateOptions([
            'accountId' => $accountId
        ]);
        $tag = $this->provider->prePersist($tag);
        $code = $tag->getCode();
        $this->assertRegExp(sprintf('/%s/i', preg_quote($accountId)), $code);
        $this->assertFalse($tag->getDocumentWrite());
    }
}
