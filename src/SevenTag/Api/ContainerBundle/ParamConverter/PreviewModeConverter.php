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

namespace SevenTag\Api\ContainerBundle\ParamConverter;

use Doctrine\Common\Persistence\ManagerRegistry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Request\ParamConverter\ParamConverterInterface;
use SevenTag\Api\ContainerBundle\Entity\ContainerRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Api\ContainerBundle\ModeResolver\ModeResolverInterface;

/**
 * Class PreviewModeConverter
 * @package SevenTag\Api\ContainerBundle\ParamConverter
 */
class PreviewModeConverter implements ParamConverterInterface
{
    /**
     * @var ManagerRegistry $registry
     */
    private $registry;

    /**
     * @var ContainerRepository
     */
    private $repository;

    /**
     * @var ModeResolverInterface
     */
    private $modeResolver;

    /**
     * @param ManagerRegistry $registry AclManager registry
     * @param ModeResolverInterface $modeResolver
     */
    public function __construct(ManagerRegistry $registry, ModeResolverInterface $modeResolver)
    {
        $this->registry = $registry;
        $this->repository = $registry->getRepository('SevenTagContainerBundle:Container');
        $this->modeResolver = $modeResolver;
    }

    /**
     * {@inheritdoc}
     *
     * Check, if object supported by our converter
     */
    public function supports(ParamConverter $configuration)
    {
        // If there is no manager, this means that only Doctrine DBAL is configured
        // In this case we can do nothing and just return
        if (null === $this->registry || !count($this->registry->getManagers())) {
            return false;
        }

        // Check, if option class was set in configuration
        if (null === $configuration->getClass()) {
            return false;
        }

        // Get actual entity manager for class
        $entityManager = $this->registry->getManagerForClass($configuration->getClass());
        $interfaces = $entityManager->getClassMetadata($configuration->getClass())
            ->getReflectionClass()
            ->getInterfaceNames();

        if (!in_array('SevenTag\Component\Container\Model\ContainerInterface', $interfaces)) {
            return false;
        }

        return true;
    }

    /**
     * {@inheritdoc}
     *
     * Applies converting
     *
     * @throws \InvalidArgumentException When route attributes are missing
     * @throws NotFoundHttpException     When object not found
     */
    public function apply(Request $request, ParamConverter $configuration)
    {
        $accessId = $request->attributes->get('id');

        // Check, if route attributes exists
        if (null === $accessId) {
            throw new \InvalidArgumentException('Route attribute is missing');
        }

        $entity = $this->findEntity($accessId);

        if (null === $entity || !($entity instanceof ContainerInterface)) {
            throw new NotFoundHttpException(sprintf('%s object not found.', $configuration->getClass()));
        }

        // Map found village to the route's parameter
        $request->attributes->set($configuration->getName(), $entity);
    }

    /**
     * @param $accessId
     * @return ContainerInterface|null
     */
    private function findEntity($accessId)
    {
        if ($this->modeResolver->isInMode(ModeResolverInterface::MODE_PREVIEW, $accessId)) {
            return $this->repository->findByAccessId((int)$accessId);
        }

        return $this->repository->findLastPublishedVersionByAccessId((int)$accessId);
    }
}
