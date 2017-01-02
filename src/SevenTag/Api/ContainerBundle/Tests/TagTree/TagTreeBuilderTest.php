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

namespace SevenTag\Api\ContainerBundle\Tests\TagTree;

use SevenTag\Api\ContainerBundle\Entity\Container;
use SevenTag\Api\ContainerBundle\TagTree\Builder\TagTreeBuilder;
use SevenTag\Api\TagBundle\Entity\Tag;
use SevenTag\Api\TestBundle\Tests\TestCase\WebTestCase;
use SevenTag\Api\TriggerBundle\Entity\Condition;
use SevenTag\Api\TriggerBundle\Entity\Trigger;
use SevenTag\Api\TriggerBundle\TriggerType\Type\TypeInterface;
use SevenTag\Api\UserBundle\Entity\User;

/**
 * Class TagTreeBuilderTest
 * @package SevenTag\Api\ContainerBundle\Tests\TagTree
 */
class TagTreeBuilderTest extends WebTestCase
{
    /**
     * @test
     */
    public function whetherBuildPageViewTriggerWithConditionsStrategy()
    {
        $container = $this->loadTreeBuilderContainerFixtures(
            true,
            TypeInterface::TYPE_PAGE_VIEW
        );

        $tagTreeBuilder = $this->getTreeBuilder();
        $tagTree = $tagTreeBuilder->buildTree($container);

        $this->assertSame(
            [
                [
                    'id' => 1,
                    'name' => 'TagTreeBuilder Tag Name',
                    'code' => '<code>TagTreeBuilder Tag</code>',
                    'documentWrite' => false,
                    'disableInDebugMode' => false,
                    'respectVisitorsPrivacy' => false,
                    'isSynchronous' => false,
                    'triggers' => [
                        [
                            'id' => 1,
                            'name' => 'TagTreeBuilder Trigger name',
                            'conditions' => [
                                [
                                    'variable' => 'Event',
                                    'action' => 'equals',
                                    'value' => 'stg.pageView'
                                ],
                                [
                                    'variable' => 'Page Hostname',
                                    'action' => 'starts_with',
                                    'value' => 'google'
                                ],
                                [
                                    'variable' => 'Page Path',
                                    'action' => 'contains',
                                    'value' => '/search'
                                ],
                                [
                                    'variable' => 'Page Hostname',
                                    'action' => 'ends_with',
                                    'value' => '.pl'
                                ],
                            ]
                        ]
                    ]
                ]
            ],
            $tagTree
        );
    }

    /**
     * @test
     */
    public function whetherBuildPageViewTriggerWithAlwaysStrategy()
    {
        $container = $this->loadTreeBuilderContainerFixtures(
            false,
            TypeInterface::TYPE_PAGE_VIEW
        );

        $tagTreeBuilder = $this->getTreeBuilder();
        $tagTree = $tagTreeBuilder->buildTree($container);

        $this->assertSame(
            [
                [
                    'id' => 1,
                    'name' => 'TagTreeBuilder Tag Name',
                    'code' => '<code>TagTreeBuilder Tag</code>',
                    'documentWrite' => false,
                    'disableInDebugMode' => false,
                    'respectVisitorsPrivacy' => false,
                    'isSynchronous' => false,
                    'triggers' => [
                        [
                            'id' => 1,
                            'name' => 'TagTreeBuilder Trigger name',
                            'conditions' => [
                                [
                                    'variable' => 'Event',
                                    'action' => 'equals',
                                    'value' => 'stg.pageView'
                                ]
                            ]
                        ]
                    ]
                ]
            ],
            $tagTree
        );
    }

    /**
     * @test
     */
    public function whetherBuildPageClickTriggerWithConditionsStrategy()
    {
        $container = $this->loadTreeBuilderContainerFixtures(
            true,
            TypeInterface::TYPE_CLICK
        );

        $tagTreeBuilder = $this->getTreeBuilder();
        $tagTree = $tagTreeBuilder->buildTree($container);

        $this->assertSame(
            [
                [
                    'id' => 1,
                    'name' => 'TagTreeBuilder Tag Name',
                    'code' => '<code>TagTreeBuilder Tag</code>',
                    'documentWrite' => false,
                    'disableInDebugMode' => false,
                    'respectVisitorsPrivacy' => false,
                    'isSynchronous' => false,
                    'triggers' => [
                        [
                            'id' => 1,
                            'name' => 'TagTreeBuilder Trigger name',
                            'conditions' => [
                                [
                                    'variable' => 'Event',
                                    'action' => 'equals',
                                    'value' => 'stg.click'
                                ],
                                [
                                    'variable' => 'Page Hostname',
                                    'action' => 'starts_with',
                                    'value' => 'google'
                                ],
                                [
                                    'variable' => 'Page Path',
                                    'action' => 'contains',
                                    'value' => '/search'
                                ],
                                [
                                    'variable' => 'Page Hostname',
                                    'action' => 'ends_with',
                                    'value' => '.pl'
                                ],
                            ]
                        ]
                    ]
                ]
            ],
            $tagTree
        );
    }

    /**
     * @test
     */
    public function whetherBuildPageClickTriggerWithAlwaysStrategy()
    {
        $container = $this->loadTreeBuilderContainerFixtures(
            false,
            TypeInterface::TYPE_CLICK
        );

        $tagTreeBuilder = $this->getTreeBuilder();
        $tagTree = $tagTreeBuilder->buildTree($container);

        $this->assertSame(
            [
                [
                    'id' => 1,
                    'name' => 'TagTreeBuilder Tag Name',
                    'code' => '<code>TagTreeBuilder Tag</code>',
                    'documentWrite' => false,
                    'disableInDebugMode' => false,
                    'respectVisitorsPrivacy' => false,
                    'isSynchronous' => false,
                    'triggers' => [
                        [
                            'id' => 1,
                            'name' => 'TagTreeBuilder Trigger name',
                            'conditions' => [
                                [
                                    'variable' => 'Event',
                                    'action' => 'equals',
                                    'value' => 'stg.click'
                                ]
                            ]
                        ]
                    ]
                ]
            ],
            $tagTree
        );
    }

    /**
     * @test
     */
    public function whetherBuildFormSubmissionTriggerWithConditionsStrategy()
    {
        $container = $this->loadTreeBuilderContainerFixtures(
            true,
            TypeInterface::TYPE_FORM_SUBMISSION
        );

        $tagTreeBuilder = $this->getTreeBuilder();
        $tagTree = $tagTreeBuilder->buildTree($container);

        $this->assertSame(
            [
                [
                    'id' => 1,
                    'name' => 'TagTreeBuilder Tag Name',
                    'code' => '<code>TagTreeBuilder Tag</code>',
                    'documentWrite' => false,
                    'disableInDebugMode' => false,
                    'respectVisitorsPrivacy' => false,
                    'isSynchronous' => false,
                    'triggers' => [
                        [
                            'id' => 1,
                            'name' => 'TagTreeBuilder Trigger name',
                            'conditions' => [
                                [
                                    'variable' => 'Event',
                                    'action' => 'equals',
                                    'value' => 'stg.formSubmit'
                                ],
                                [
                                    'variable' => 'Page Hostname',
                                    'action' => 'starts_with',
                                    'value' => 'google'
                                ],
                                [
                                    'variable' => 'Page Path',
                                    'action' => 'contains',
                                    'value' => '/search'
                                ],
                                [
                                    'variable' => 'Page Hostname',
                                    'action' => 'ends_with',
                                    'value' => '.pl'
                                ],
                            ]
                        ]
                    ]
                ]
            ],
            $tagTree
        );
    }

    /**
     * @test
     */
    public function whetherBuildFormSubmissionTriggerWithAlwaysStrategy()
    {
        $container = $this->loadTreeBuilderContainerFixtures(
            false,
            TypeInterface::TYPE_FORM_SUBMISSION
        );

        $tagTreeBuilder = $this->getTreeBuilder();
        $tagTree = $tagTreeBuilder->buildTree($container);

        $this->assertSame(
            [
                [
                    'id' => 1,
                    'name' => 'TagTreeBuilder Tag Name',
                    'code' => '<code>TagTreeBuilder Tag</code>',
                    'documentWrite' => false,
                    'disableInDebugMode' => false,
                    'respectVisitorsPrivacy' => false,
                    'isSynchronous' => false,
                    'triggers' => [
                        [
                            'id' => 1,
                            'name' => 'TagTreeBuilder Trigger name',
                            'conditions' => [
                                [
                                    'variable' => 'Event',
                                    'action' => 'equals',
                                    'value' => 'stg.formSubmit'
                                ]
                            ]
                        ]
                    ]
                ]
            ],
            $tagTree
        );
    }

    /**
     * @test
     */
    public function whetherBuildEventTriggerWithConditionsStrategy()
    {
        $container = $this->loadTreeBuilderContainerFixtures(
            true,
            TypeInterface::TYPE_EVENT
        );

        $tagTreeBuilder = $this->getTreeBuilder();
        $tagTree = $tagTreeBuilder->buildTree($container);

        $this->assertSame(
            [
                [
                    'id' => 1,
                    'name' => 'TagTreeBuilder Tag Name',
                    'code' => '<code>TagTreeBuilder Tag</code>',
                    'documentWrite' => false,
                    'disableInDebugMode' => false,
                    'respectVisitorsPrivacy' => false,
                    'isSynchronous' => false,
                    'triggers' => [
                        [
                            'id' => 1,
                            'name' => 'TagTreeBuilder Trigger name',
                            'conditions' => [
                                [
                                    'variable' => 'Page Hostname',
                                    'action' => 'starts_with',
                                    'value' => 'google'
                                ],
                                [
                                    'variable' => 'Page Path',
                                    'action' => 'contains',
                                    'value' => '/search'
                                ],
                                [
                                    'variable' => 'Page Hostname',
                                    'action' => 'ends_with',
                                    'value' => '.pl'
                                ],
                            ]
                        ]
                    ]
                ]
            ],
            $tagTree
        );
    }

    /**
     * @test
     */
    public function whetherBuildEventTriggerTriggerWithAlwaysStrategy()
    {
        $container = $this->loadTreeBuilderContainerFixtures(
            false,
            TypeInterface::TYPE_EVENT
        );

        $tagTreeBuilder = $this->getTreeBuilder();
        $tagTree = $tagTreeBuilder->buildTree($container);

        $this->assertSame(
            [
                [
                    'id' => 1,
                    'name' => 'TagTreeBuilder Tag Name',
                    'code' => '<code>TagTreeBuilder Tag</code>',
                    'documentWrite' => false,
                    'disableInDebugMode' => false,
                    'respectVisitorsPrivacy' => false,
                    'isSynchronous' => false,
                    'triggers' => [
                        [
                            'id' => 1,
                            'name' => 'TagTreeBuilder Trigger name',
                            'conditions' => []
                        ]
                    ]
                ]
            ],
            $tagTree
        );
    }

    /**
     * @param boolean $addConditions
     * @param int $type
     * @return Container
     */
    private function loadTreeBuilderContainerFixtures(
        $addConditions = true,
        $type = TypeInterface::TYPE_PAGE_VIEW
    ) {
        $container = new Container();
        $container->setName('TagTreeBuilder Container Name');
        $container->setDescription('TagTreeBuilder Container Description');

        $this->entityManager->persist($container);

        $user = new User();
        $user->setEmail('tagtree@example.com');
        $user->setUsername('tagtree');
        $user->setPlainPassword('testing');
        $user->setFirstName('TagTree FirstName');
        $user->setLastName('TagTree LastName');

        $this->entityManager->persist($user);

        $tag = new Tag();
        $tag->setName('TagTreeBuilder Tag Name');
        $tag->setCode('<code>TagTreeBuilder Tag</code>');
        $tag->setDocumentWrite(false);

        $this->entityManager->persist($tag);
        $tag->setContainer($container);

        $trigger = new Trigger();
        $trigger->setName('TagTreeBuilder Trigger name');
        $trigger->setType($type);

        if ($addConditions) {
            $this->addConditionsToTrigger($trigger);
        }

        $this->entityManager->persist($trigger);
        $trigger->setContainer($container);

        $container->addTag($tag);
        $container->addTrigger($trigger);
        $container->setCreatedBy($user);

        $tag->addTrigger($trigger);
        $trigger->addTag($tag);

        $this->entityManager->flush();

        return $container;
    }

    /**
     * @return TagTreeBuilder
     */
    private function getTreeBuilder()
    {
        return $this->getContainer()->get('seven_tag_container.tag_tree_builder_async');
    }

    /**
     * @param Trigger $trigger
     */
    private function addConditionsToTrigger(Trigger $trigger)
    {
        /** @var array */
        $conditions = [
            ['Page Hostname', 'starts_with', 'google'],
            ['Page Path', 'contains', '/search'],
            ['Page Hostname', 'ends_with', '.pl'],
            ['Page Hostname', 'contains', 'wykop.p'],
            ['Page Path', 'contains', 'mirko'],
            ['Page Hostname', 'equals', 'korwin-mikke.pl']
        ];

        for ($z = 0; $z <= 2; $z++) {
            $condition = new Condition();
            $condition->setVariable($conditions[$z][0]);
            $condition->setCondition($conditions[$z][1]);
            $condition->setValue($conditions[$z][2]);

            $trigger->addCondition($condition);
        }
    }
}
