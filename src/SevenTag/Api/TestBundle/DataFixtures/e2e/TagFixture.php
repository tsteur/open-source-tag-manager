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

namespace SevenTag\Api\TestBundle\DataFixtures\e2e;

use SevenTag\Api\TestBundle\DataFixtures\e2e\ContainerFixture;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use SevenTag\Api\TagBundle\Entity\Tag;

/**
 * Class TagFixture
 * @package SevenTag\Api\TestBundle\DataFixtures\e2e
 */
class TagFixture extends AbstractFixture implements OrderedFixtureInterface
{
    const REFERENCE_NAME = 'tag';

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $templates = $this->getTemplateKeys();
        $y = 0;

        foreach ($templates as $templateName => $templateOptions) {
            $tag = new Tag;
            $tag->setName(sprintf('Tag name %s: %s', $y, $templateName));
            $tag->setCode(sprintf('<div>%s</div>', $y));
            $tag->setPriority(0);
            $tag->setDocumentWrite(false);
            $tag->setDisableInDebugMode(false);
            $tag->setRespectVisitorsPrivacy(false);
            $isHtmlTemplate = $templateName === 'HTML' || $templateName === 'HTML_synchronous';
            if (!$isHtmlTemplate) {
                $tag->setTemplate($templateName);
                $tag->setTemplateOptions($templateOptions);
            } else {
                $tag->setIsSynchronous($templateOptions['isSynchronous']);
            }

            $tag->setContainer(
                $this->getReference(ContainerFixture::REFERENCE_NAME)
            );

            $manager->persist($tag);
            $this->addReference(sprintf('%s_%s', self::REFERENCE_NAME, $y), $tag);

            $y++;
        }

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 3;
    }

    public static function getTemplateKeys()
    {
        return [
            'HTML_synchronous' => [
                'isSynchronous' => true
            ],
            'optimizely' => [
                'projectId' => 123
            ],
            'visual_website_optimizer' => [
                'accountId' => 123
            ],
            'click_tale' => [
                'partition' => 'www01',
                'guid' => '4473e195-a0e0-4271-96be-144ce4eXXXX'
            ],
            'piwik' => [
                'piwikUrl' => 'piwik.site.com',
                'piwikSiteId' => 'PIWIK-123'
            ],
            'sales_manago' => [
                'smid' => 123
            ],
            'crazy_egg' => [
                'accountNumber' => '00405418'
            ],
            'qualaroo' => [
                'customerId' => '37282',
                'siteToken' => '9F2'
            ],
            'facebook_retargeting_pixel' => [
                'pixelId' => 123,
                'event' => 'ViewContent'
            ],
            'google_analytics' => [
                'id' => 'GA-1234'
            ],
            'marketo' => [
                  'accountId' => 123
            ],
            'google_adwords' => [
                'conversionId' => 871234,
                'conversionLabel' => 'GA-1234 Label',
                'remarketingOnly' => true
            ],
            'HTML' => [
                'isSynchronous' => false
                ]
        ];
    }
}
