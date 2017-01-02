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

namespace SevenTag\Api\TestBundle\DataFixtures\e2eDebugger;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use SevenTag\Api\TagBundle\Entity\Tag;

/**
 * Class TagFixture
 * @package SevenTag\Api\TestBundle\DataFixtures\e2eDebugger
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

        foreach ($templates as $tagName => $templateOptions) {
            $tag = new Tag;
            $templateName = $templateOptions['templateName'];
            $tag->setName($tagName);
            $tag->setPriority(0);
            $tag->setDocumentWrite(false);
            $tag->setRespectVisitorsPrivacy(false);
            $tag->setDisableInDebugMode(isset($templateOptions['doNotFireInDebugMode']) ? $templateOptions['doNotFireInDebugMode'] : false);
            if (isset($templateOptions['code'])) {
                $tag->setCode($templateOptions['code']);
            }
            if ($templateName !== 'HTML') {
                $tag->setTemplate($templateName);
                $tag->setTemplateOptions($templateOptions);
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

    public static function getIdOfTagByName($tagName)
    {
        return array_search($tagName, array_keys(TagFixture::getTemplateKeys()));
    }

    public static function getTemplateKeys()
    {
        return [
            'Tag name 9: HTML' => [
                'templateName' => 'HTML',
                'code' => '<div>9</div>'
            ],
            'Tag name 4: qualaroo' => [
                'templateName' => 'qualaroo',
                'customerId' => '12345678',
                'siteToken' => '12'
            ],
            'Tag name 5: facebook_retargeting_pixel' => [
                'templateName' => 'facebook_retargeting_pixel',
                'pixelId' => 213123,
                'event' => 'ViewContent'
            ],
            'click' => [
                'templateName' => 'HTML',
                'code' => '{{ Page Url }}'
            ],
            'page view' => [
                'templateName' => 'HTML',
                'code' => '{{ url variable }}{{ Page Url }}'
            ],
            'Tag name 6: google_analytics' => [
                'templateName' => 'google_analytics',
                'id' => '312312'
            ],
            'Tag name 7: marketo' => [
                'templateName' => 'marketo',
                'accountId' => 24323423
            ],
            'Tag name 8: google_adwords' => [
                'templateName' => 'google_adwords',
                'type' => 'conversion_tracking',
                'conversionId' => 123213,
                'conversionLabel' => 'sdas',
                'remarketingOnly' => false,
                'conversionValue' => 23123
            ],
            'event: customEvent' => [
                'templateName' => 'HTML',
                'code' => '{{ Page Url }}'
            ],
            'event: Event' => [
                'templateName' => 'HTML',
                'code' => '{{ Page Url }}'
            ],
            'DNT' => [
                'templateName' => 'HTML',
                'code' => '{{ Page Url }}',
                'doNotFireInDebugMode' => true
            ]
        ];
    }
}
