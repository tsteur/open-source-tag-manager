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

namespace SevenTag\Api\ContainerBundle\Creator;

use Doctrine\ORM\EntityManagerInterface;
use FOS\UserBundle\Model\UserInterface;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Api\ContainerBundle\Entity\ContainerPermission;
use SevenTag\Api\SecurityBundle\Acl\MaskBuilder;

/**
 * Class Creator
 * @package SevenTag\Api\ContainerBundle\Creator
 */
class Creator implements CreatorInterface
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
    public function create(ContainerInterface $container, UserInterface $user)
    {
        $connection = $this->entityManager->getConnection();
        $connection->transactional(
            function () use ($container, $user) {
                $containerRepository = $this->entityManager
                    ->getRepository('SevenTagContainerBundle:Container');
                $containerPermissionRepository = $this->entityManager
                    ->getRepository('SevenTagContainerBundle:ContainerPermission');

                $containerRepository->save($container);
                $containerPermissionRepository->recreateContainerPermissions(
                    $this->createContainerPermission($container, $user)
                );
            }
        );
    }

    /**
     * @param ContainerInterface $container
     * @param UserInterface $user
     * @return ContainerPermission
     */
    private function createContainerPermission(ContainerInterface $container, UserInterface $user)
    {
        $maskBuilder = new MaskBuilder();
        $maskBuilder
            ->add('operator')
            ->add('publish')
            ->add('edit')
            ->add('view')
            ->add('delete');

        $containerPermission = new ContainerPermission();
        $containerPermission->setContainerAccessId($container->getAccessId());
        $containerPermission->setUser($user);
        $containerPermission->setPermissions($maskBuilder->get());

        return $containerPermission;
    }
}
