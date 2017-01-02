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

namespace SevenTag\Api\AppBundle\Tests\Versionalbe\VersionManager;

use SevenTag\Api\AppBundle\Versionable\VersionManager\VersionManagerInterface;
use SevenTag\Api\ContainerBundle\Entity\Container;
use SevenTag\Api\TagBundle\Entity\Tag;
use SevenTag\Api\TestBundle\Tests\TestCase\WebTestCase;
use SevenTag\Api\TriggerBundle\Entity\Condition;
use SevenTag\Api\TriggerBundle\Entity\Trigger;
use SevenTag\Api\UserBundle\Entity\User;

/**
 * Class VersionManagerTest
 * @package SevenTag\Api\AppBundle\Tests\VersionManager
 */
class VersionManagerTest extends WebTestCase
{
    /**
     * {@inheritDoc}
     */
    public function setUp()
    {
        parent::setUp();
    }

    /**
     * @test
     */
    public function whetherContainerIsPublished()
    {
        $container = $this->createContainer();

        /** @var VersionManagerInterface $versioManager */
        $versioManager = $this->getContainer()->get('seven_tag_app.version_manager');
        $published = $versioManager->publish($container);

        $this->assertSame($container, $published);
        $this->assertTrue($published->getVersion()->isPublished());
        $this->assertFalse($published->getVersion()->isDraft());
    }

    /**
     * @test
     */
    public function whetherContainerIsRestored()
    {
        $container = $this->createContainer();

        /** @var VersionManagerInterface $versioManager */
        $versioManager = $this->getContainer()->get('seven_tag_app.version_manager');
        $published = $versioManager->publish($container);

        $draft = $versioManager->restore($published);

        $this->assertFalse($draft->getVersion()->isPublished());
        $this->assertTrue($draft->getVersion()->isDraft());
    }

    /**
     * @return Container
     */
    private function createContainer()
    {
        $container = new Container();
        $container->setName('Versionable Container');
        $container->setDescription('Versionable Description');
        $container->setCode('<code>Versionable Code</code>');

        $tag = new Tag();
        $tag->setName('Versionable Tag');
        $tag->setCode('<code>Versionable Tag</code>');
        $tag->setContainer($container);

        $container->addTag($tag);

        $trigger = new Trigger();
        $trigger->setName('Versionable Trigger');
        $trigger->addTag($tag);
        $trigger->setContainer($container);

        $container->addTrigger($trigger);

        /** @var array */
        $conditions = [
            ['domain', 'starts_with', 'google'],
            ['path', 'contains', '/search'],
            ['hostname', 'ends_with', '.pl'],
            ['domain', 'contains', 'wykop.p'],
            ['path', 'contains', 'mirko'],
            ['domain', 'equals', 'korwin-mikke.pl']
        ];

        for ($z = 0; $z <= 2; $z++) {
            $condition = new Condition();
            $condition->setVariable($conditions[$z][0]);
            $condition->setCondition($conditions[$z][1]);
            $condition->setValue($conditions[$z][2]);

            $trigger->addCondition($condition);
        }

        $tag->addTrigger($trigger);

        $container->addTag($tag);

        $user = new User();
        $user->setEmail('versionable@example.com');
        $user->setUsername('versionable');
        $user->setPlainPassword('testing');
        $user->setFirstName('Versioning FirstName');
        $user->setLastName('Versioning LastName');

        $container->setCreatedBy($user);

        $this->entityManager->persist($container);
        $this->entityManager->persist($trigger);
        $this->entityManager->persist($tag);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $container;
    }
}
