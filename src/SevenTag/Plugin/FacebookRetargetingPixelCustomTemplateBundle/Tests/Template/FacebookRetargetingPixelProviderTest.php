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

namespace SevenTag\Plugin\FacebookRetargetingPixelCustomTemplateBundle\Tests\Template;

use Liip\FunctionalTestBundle\Test\WebTestCase;
use SevenTag\Plugin\FacebookRetargetingPixelCustomTemplateBundle\FacebookRetargetingPixelEvent;
use SevenTag\Plugin\FacebookRetargetingPixelCustomTemplateBundle\Form\FacebookRetargetingPixelFormType;
use SevenTag\Plugin\FacebookRetargetingPixelCustomTemplateBundle\Template\FacebookRetargetingPixelProvider;
use SevenTag\Api\TagBundle\Entity\Tag;

/**
 * Class FacebookRetargetingPixelProviderTest
 * @package SevenTag\Plugin\FacebookRetargetingPixelCustomTemplateBundle\Template
 */
class FacebookRetargetingPixelProviderTest extends WebTestCase
{
    /**
     * @var FacebookRetargetingPixelProvider
     */
    private $provider;

    /**
     * @before
     */
    public function beforeEach()
    {
        $this->provider = new FacebookRetargetingPixelProvider();
        $this->provider->setContainer($this->getContainer());
    }

    /**
     * @test
     */
    public function itReturnsProviderKey()
    {
        $this->assertEquals($this->provider->getKey(), FacebookRetargetingPixelProvider::KEY);
    }

    /**
     * @test
     */
    public function itReturnsFormType()
    {
        $formType = new FacebookRetargetingPixelFormType();
        $this->assertEquals($formType->getName(), $this->provider->getFormType());
    }

    /**
     * @test
     */
    public function itIsAbleToPrePersistTag()
    {
        $pixelId = 123;
        $event = FacebookRetargetingPixelEvent::VIEW_CONTENT;
        $tag = new Tag();
        $tag->setTemplateOptions([
            'pixelId' => $pixelId,
            'event' => $event
        ]);
        $tag = $this->provider->prePersist($tag);
        $code = $tag->getCode();
        $this->assertRegExp(sprintf('/%s/i', preg_quote($pixelId)), $code);
        $this->assertRegExp(sprintf('/%s/i', preg_quote($event)), $code);
        $this->assertFalse($tag->getDocumentWrite());
    }
}
