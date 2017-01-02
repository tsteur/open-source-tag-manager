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

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use SevenTag\Api\TestBundle\DataFixtures\e2e\ContainerFixture;
use SevenTag\Api\TriggerBundle\Entity\Trigger;
use SevenTag\Api\TestBundle\DataFixtures\e2e\TagFixture;
use SevenTag\Api\TriggerBundle\Entity\Condition;

/**
 * Class TriggerFixture
 * @package SevenTag\Api\TestBundle\DataFixtures\e2e
 */
class TriggerFixture extends AbstractFixture implements OrderedFixtureInterface
{
    const REFERENCE_NAME = 'trigger_';

    /** @var array */
    private $conditions = [
        ['Page Hostname', 'starts_with', 'google'],
        ['Page Path', 'contains', '/search'],
        ['Page Hostname', 'ends_with', '.pl'],
        ['Page Hostname', 'contains', 'wykop.p'],
        ['Page Path', 'contains', 'mirko'],
        ['Page Hostname', 'equals', 'korwin-mikke.pl']
    ];

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {

        for ($j = 0; $j <= 23; $j++) {
            $trigger = new Trigger;
            $trigger->setName(sprintf('Trigger %s', $j));
            $trigger->setContainer($this->getReference(ContainerFixture::REFERENCE_NAME));

            for ($y = 0; $y < count(TagFixture::getTemplateKeys()); $y++) {
                $tag = $this->getReference(sprintf('%s_%s', TagFixture::REFERENCE_NAME, $y));

                $tagIsAsync = $tag->getIsSynchronous() == null;
                $addToAllTags = $j === 23;
                if ($tagIsAsync || $addToAllTags) {
                    $tag->addTrigger($trigger);
                    $trigger->addTag($tag);
                }
            }

            shuffle($this->conditions);

            for ($z = 0; $z <= 2; $z++) {
                $condition = new Condition;
                $condition->setVariable($this->conditions[$z][0]);
                $condition->setCondition($this->conditions[$z][1]);
                $condition->setValue($this->conditions[$z][2]);

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
}
