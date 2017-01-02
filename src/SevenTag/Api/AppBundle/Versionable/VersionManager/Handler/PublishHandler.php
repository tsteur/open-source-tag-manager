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

namespace SevenTag\Api\AppBundle\Versionable\VersionManager\Handler;

use SevenTag\Component\Container\Model\ContainerInterface;

/**
 * Class PublishHandler
 * @package SevenTag\Api\AppBundle\Versionable\VersionManager\Handler
 */
class PublishHandler extends AbstractHandler
{
    /**
     * {@inheritdoc}
     */
    public function handle(ContainerInterface $container)
    {
        $version = $container->getVersion();
        if (!$version->isDraft() || $version->isPublished()) {
            throw new \LogicException('Cannot publish container from non-draft version.');
        }

        $connection = $this->entityManager->getConnection();
        $connection->beginTransaction();

        try {
            $this->resetDrafts($container);
            $this->resetPublished($container);
            $this->markContainerAsPublish($container);

            $newContainer = $this->copyManager->copy($container);
            $this->deepPersister->persist($newContainer);

            $this->markContainerAsDraft($newContainer);

            $this->entityManager->flush();
            $connection->commit();

        } catch (\Exception $e) {
            $connection->rollBack();
            throw $e;
        }

        return $container;
    }
}
