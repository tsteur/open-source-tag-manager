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

namespace SevenTag\Api\TriggerBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use SevenTag\Api\AppBundle\DataFixtures\ORM\VersionFixture;
use SevenTag\Api\ContainerBundle\DataFixtures\ORM\ContainerFixture;
use SevenTag\Api\TriggerBundle\Entity\Trigger;
use SevenTag\Api\TagBundle\DataFixtures\ORM\TagFixture;
use SevenTag\Api\TriggerBundle\Entity\Condition;

class TriggerFixture extends AbstractFixture implements OrderedFixtureInterface
{
    const REFERENCE_NAME = 'trigger_';

    /** @var array */
    private $conditions = [
        ['domain', 'starts_with', 'google'],
        ['path', 'contains', '/search'],
        ['hostname', 'ends_with', '.pl'],
        ['domain', 'contains', 'wykop.p'],
        ['path', 'contains', 'mirko'],
        ['domain', 'equals', 'korwin-mikke.pl']
    ];

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {

        for ($i = 0; $i <= 10; $i++) {
            for ($j = 0; $j <= 22; $j++) {
                $trigger = new Trigger;
                $trigger->setName(sprintf('Trigger %s_%s', $i, $j));
                $trigger->setContainer($this->getReference(sprintf('%s_%s', ContainerFixture::REFERENCE_NAME, $i)));

                for ($y = 0; $y <= 10; $y++) {
                    $tag = $this->getReference(sprintf('%s_%s_%s', TagFixture::REFERENCE_NAME, $i, $y));
                    $tag->addTrigger($trigger);

                    $trigger->addTag($tag);
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
                $this->addReference(sprintf(self::REFERENCE_NAME . '_%s_%s', $i, $j), $trigger);
            }
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
