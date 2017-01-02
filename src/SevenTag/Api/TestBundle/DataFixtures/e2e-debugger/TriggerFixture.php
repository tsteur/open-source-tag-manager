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
use SevenTag\Api\TriggerBundle\Entity\Trigger;
use SevenTag\Api\TriggerBundle\TriggerType\Type\TypeInterface;
use SevenTag\Api\TriggerBundle\Entity\Condition;
use Doctrine\Common\Proxy\Exception\OutOfBoundsException;

/**
 * Class TriggerFixture
 * @package SevenTag\Api\TestBundle\DataFixtures\e2eDebugger
 */
class TriggerFixture extends AbstractFixture implements OrderedFixtureInterface
{
    const REFERENCE_NAME = 'trigger_';

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {

        $data = $this->getData();
        for ($j = 0; $j < count($data); $j++) {
            $triggerData = $data[$j];

            $trigger = new Trigger;
            $trigger->setName($triggerData['name']);
            $trigger->setType($triggerData['type']);
            $trigger->setContainer($this->getReference(ContainerFixture::REFERENCE_NAME));

            foreach ($triggerData['tags'] as $tagName) {
                $tagId = TagFixture::getIdOfTagByName($tagName);
                if ($tagId === false) {
                    throw new OutOfBoundsException(sprintf('Cannot add trigger "%s" to tag "%s". Tag does not exist.', $triggerData['name'], $tagName));
                }
                $tag = $this->getReference(sprintf('%s_%s', TagFixture::REFERENCE_NAME, $tagId));
                $tag->addTrigger($trigger);
                $trigger->addTag($tag);
            }

            foreach ($triggerData['conditions'] as $key => $conditionData) {
                $condition = new Condition;
                $condition->setVariable($conditionData[0]);
                $condition->setCondition($conditionData[1]);
                $condition->setValue($conditionData[2]);

                $trigger->addCondition($condition);
            }

            $manager->persist($trigger);
            $this->addReference(sprintf(self::REFERENCE_NAME . '_%s', $j), $trigger);
        }

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 10;
    }

    /**
     * @return array
     */
    private function getData()
    {
        return [
            [
                'name' => 'page url contains index.test.html',
                'type' => TypeInterface::TYPE_PAGE_VIEW,
                'conditions' => [['Page Url', TypeInterface::ACTION_CONTAINS, 'index.test.html']],
                'tags' => ['Tag name 9: HTML']
            ],
            [
                'name' => 'submission form',
                'type' => TypeInterface::TYPE_FORM_SUBMISSION,
                'conditions' => [['Form ID', TypeInterface::ACTION_CONTAINS, 'test-form']],
                'tags' => ['Tag name 4: qualaroo']
            ],
            [
                'name' => 'click class contain',
                'type' => TypeInterface::TYPE_CLICK,
                'conditions' => [['Click Classes', TypeInterface::ACTION_CONTAINS, 'simple-btn']],
                'tags' => ['Tag name 5: facebook_retargeting_pixel']
            ],
            [
                'name' => 'click',
                'type' => TypeInterface::TYPE_CLICK,
                'conditions' => [],
                'tags' => ['click']
            ],
            [
                'name' => 'page hostname',
                'type' => TypeInterface::TYPE_PAGE_VIEW,
                'conditions' => [['Page Hostname', TypeInterface::ACTION_CONTAINS, '7tag']],
                'tags' => ['Tag name 6: google_analytics']
            ],
            [
                'name' => 'page path doesn\'t contain referrer',
                'type' => TypeInterface::TYPE_PAGE_VIEW,
                'conditions' => [['Referrer', TypeInterface::ACTION_DOES_NOT_CONTAIN, 'referrer']],
                'tags' => ['Tag name 7: marketo']
            ],
            [
                'name' => 'referrer doesn\'t contain index.test.html',
                'type' => TypeInterface::TYPE_PAGE_VIEW,
                'conditions' => [['Referrer', TypeInterface::ACTION_DOES_NOT_CONTAIN, 'index.test.html']],
                'tags' => ['Tag name 8: google_adwords']
            ],
            [
                'name' => 'event customEvent',
                'type' => TypeInterface::TYPE_EVENT,
                'conditions' => [['Event', TypeInterface::ACTION_CONTAINS, 'customEvent']],
                'tags' => ['event: customEvent']
            ],
            [
                'name' => 'event: Event',
                'type' => TypeInterface::TYPE_EVENT,
                'conditions' => [['Event', TypeInterface::ACTION_EQUALS, 'Event']],
                'tags' => ['event: Event']
            ],
            [
                'name' => 'page view',
                'type' => TypeInterface::TYPE_PAGE_VIEW,
                'conditions' => [],
                'tags' => ['DNT', 'page view']
            ],
            [
                'name' => 'asdasd',
                'type' => TypeInterface::TYPE_PAGE_LOAD,
                'conditions' => [],
                'tags' => []
            ]
        ];
    }
}
