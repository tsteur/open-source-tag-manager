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

namespace SevenTag\Api\TriggerBundle\TriggerType\ViewPreparator;

use Doctrine\Common\Collections\ArrayCollection;
use SevenTag\Api\TriggerBundle\TriggerType\Holder\HolderInterface;
use SevenTag\Api\TriggerBundle\TriggerType\Type\TypeInterface;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Variable\Model\Variable;
use Doctrine\ORM\EntityRepository;
use SevenTag\Api\VariableBundle\Provider\VariableProvider;
use SevenTag\Api\VariableBundle\Provider\VariableTypeProvider;

/**
 * Class ConditionViewPreparator
 * @package SevenTag\Api\TriggerBundle\TriggerType\ViewPreparator
 */
class ConditionViewPreparator implements ViewPreparatorInterface
{

    /**
     * @var VariableProvider
     */
    private $variableProvider;

    /**
     * @var EntityRepository
     */
    private $repository;

    /**
     * @param EntityRepository $repository
     * @param VariableProvider $variableProvider
     */
    public function __construct(EntityRepository $repository, VariableProvider $variableProvider)
    {
        $this->repository = $repository;
        $this->variableProvider = $variableProvider;
    }

    /**
     * {@inheritdoc}
     */
    public function getView(HolderInterface $holder, ContainerInterface $container)
    {
        $view = [];

        $definedVariables = $this->variableProvider->createVariables()->toArray();
        $customVariables = $this->repository->findByContainer($container, true);

        /** @var TypeInterface $type */
        foreach ($holder->getTypes() as $type) {
            $definedVariablesForType = $this->getDefinedVariablesForTriggerType($definedVariables, $type);

            $typeVariables = new ArrayCollection(
                array_merge($definedVariablesForType, $customVariables)
            );

            $row = [
                'type' => $type->getType(),
                'name' => $type->getName(),
                'strategies' => $type->getAllowedStrategies(),
                'actions' => $this->getActionsForTriggerType($type),
                'variables' => $this->mapVariablesToViewRepresentation($typeVariables),
            ];

            $view[] = $row;

        }

        return $view;
    }

    private function getActionsForTriggerType(TypeInterface $type)
    {
        $actions = [];

        foreach ($type->getAllowedActions() as $actionType => $actionName) {
            $actions[] = [
                'type' => $actionType,
                'name' => $actionName
            ];
        }

        return $actions;
    }

    private function mapVariablesToViewRepresentation(ArrayCollection $variables)
    {
        $variablesTmp = [];

        /** @var Variable $variable */
        foreach ($variables as $variable) {
            $var = [
                'type' => $variable->getType(),
                'name' => $variable->getName(),
                'options' => $variable->getOptions(),
            ];

            $variablesTmp[] = $var;
        }

        return $variablesTmp;
    }

    private function getDefinedVariablesForTriggerType($definedVariables, TypeInterface $type)
    {
        return array_filter($definedVariables, function ($variable) use ($type) {
            return $this->isVariableAllowedForTriggerType($type, $variable);
        });
    }

    private function isVariableAllowedForTriggerType(TypeInterface $type, $variable)
    {
        $allowedVariables = $type->getAllowedVariables();

        $matchedAllowedVariables = array_filter($allowedVariables, function ($allowedVariable) use ($variable) {
            return strcasecmp($allowedVariable->getName(), $variable->getName()) === 0;
        });

        return !empty($matchedAllowedVariables);
    }
}
