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

namespace SevenTag\Api\VariableBundle\Manager;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityRepository;
use SevenTag\Api\VariableBundle\Provider\VariableProvider;
use SevenTag\Api\VariableBundle\Provider\VariableTypeProvider;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Variable\Model\Variable;

/**
 * Class VariableManager
 * @package SevenTag\Api\VariableBundle\Manager
 */
class VariableManager
{
    /**
     * @var VariableProvider
     */
    private $variableProvider;

    /**
     * @var VariableTypeProvider
     */
    private $variableTypeProvider;

    /**
     * @var EntityRepository
     */
    private $repository;

    /**
     * @param EntityRepository $repository
     * @param VariableProvider $variableProvider
     * @param VariableTypeProvider $variableTypeProvider
     */
    public function __construct(EntityRepository $repository, VariableProvider $variableProvider, VariableTypeProvider $variableTypeProvider)
    {
        $this->repository = $repository;
        $this->variableProvider = $variableProvider;
        $this->variableTypeProvider = $variableTypeProvider;
    }

    /**
     * @param ContainerInterface $container
     * @param bool $draft
     *
     * @return ArrayCollection
     */
    public function getVariables(ContainerInterface $container, $draft = true)
    {
        $definedVariables = $this->variableProvider->createVariables();
        $customVariables = $this->repository->findByContainer($container, $draft);

        $variables = new ArrayCollection(
            array_merge(array_values($definedVariables->toArray()), $customVariables)
        );

        $types = $this->getTypes();

        /** @var Variable $variable */
        foreach ($variables as $variable) {
            $typeString = $variable->getType();
            $typeData = $types->get($typeString);
            if (!is_null($typeData)) {
                $variable->setType($typeData);
            }
        }

        return $variables;
    }

    /**
     * @return ArrayCollection
     */
    public function getTypes()
    {
        return $this->variableTypeProvider->createVariableTypes();
    }
}
