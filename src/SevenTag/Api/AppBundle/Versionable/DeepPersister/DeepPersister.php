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

namespace SevenTag\Api\AppBundle\Versionable\DeepPersister;

use Doctrine\ORM\EntityManagerInterface;
use SevenTag\Api\TagBundle\Entity\Tag;
use SevenTag\Api\TriggerBundle\Entity\Trigger;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Variable\Model\Variable;

/**
 * Class DeepPersister
 * @package SevenTag\Api\AppBundle\Versionable\DeepPersister
 */
class DeepPersister implements DeepPersisterIntreface
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * {@inheritdoc}
     */
    public function persist(ContainerInterface $container)
    {
        /** @var Trigger $trigger */
        foreach ($container->getTriggers() as $trigger) {
            $this->entityManager->persist($trigger);
        }

        /** @var Tag $tag */
        foreach ($container->getTags() as $tag) {
            $this->entityManager->persist($tag);
        }

        /** @var Variable $variable */
        foreach ($container->getVariables() as $variable) {
            $this->entityManager->persist($variable);
        }

        $this->entityManager->persist($container);
    }
}
