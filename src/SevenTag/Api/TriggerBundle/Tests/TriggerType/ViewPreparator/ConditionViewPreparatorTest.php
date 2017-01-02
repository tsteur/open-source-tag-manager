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

use Prophecy\Argument;
use Doctrine\Common\Collections\ArrayCollection;
use SevenTag\Api\TriggerBundle\TriggerType\Holder\HolderInterface;
use SevenTag\Component\Container\Model\ContainerInterface;
use SevenTag\Component\Variable\Model\Variable;
use Doctrine\ORM\EntityRepository;
use SevenTag\Api\VariableBundle\Provider\VariableProvider;

/**
 * Class ViewPreparatorTest
 * @package SevenTag\Api\ContainerBundle\Tests\ContainerLibrary\Generator
 */
class ViewPreparatorTest extends \PHPUnit_Framework_TestCase
{

    /**
     * @test
     */
    public function itShouldReturnConditionViewThatContainsVariables()
    {
        $conditionViewPreparator = new ConditionViewPreparator($this->getEntityRepositoryMock(), $this->getVariableProviderMock());
        $result = $conditionViewPreparator->getView($this->getHolderMock(), $this->getContainerMock());

        $this->assertEquals(1, count($result));

        $result = reset($result);

        $this->assertEquals('test', $result['name']);
        $this->assertEquals('test', $result['type']);
        $this->assertEquals(2, count($result['variables']));

        $definedVariable = $result['variables'][0];
        $myVariable = $result['variables'][1];
        $this->assertEquals('defined-variable', $definedVariable['type']);
        $this->assertEquals('my-variable', $myVariable['type']);
    }

    /**
     * @return EntityRepository
     */
    private function getEntityRepositoryMock()
    {
        $mock = $this->prophesize('SevenTag\Api\VariableBundle\Entity\VariableRepository');

        $variablesForContainer = [$this->createVariableMock('my-variable')];

        $mock
            ->findByContainer(Argument::any(), true)
            ->willReturn($variablesForContainer);

        return $mock->reveal();
    }

    /**
     * @return VariableProvider
     */
    private function getVariableProviderMock()
    {
        $mock = $this->prophesize('SevenTag\Api\VariableBundle\Provider\VariableProvider');

        $definedVariables = [$this->createVariableMock('defined-variable'), $this->createVariableMock('defined-variable-not-allowed-for-trigger-type')];

        $mock
            ->createVariables()
            ->willReturn(new ArrayCollection($definedVariables));

        return $mock->reveal();
    }

    /**
     * @return HolderInterface
     */
    private function getHolderMock()
    {
        $mock = $this->prophesize('SevenTag\Api\TriggerBundle\TriggerType\Holder\HolderInterface');

        $triggerTypeMock = $this->getTriggerTypeMock();

        $mock
            ->getTypes()
            ->willReturn([$triggerTypeMock]);

        return $mock->reveal();
    }

    private function getTriggerTypeMock()
    {
        $mock = $this->prophesize('SevenTag\Api\TriggerBundle\TriggerType\Type\TypeInterface');

        $allowedStrategies = [];
        $allowedActions = [];
        $allowedVariables = [$this->createVariableMock('defined-variable')];

        $mock
            ->getType()
            ->willReturn('test');

        $mock
            ->getName()
            ->willReturn('test');

        $mock
            ->getAllowedStrategies()
            ->willReturn($allowedStrategies);

        $mock
            ->getAllowedActions()
            ->willReturn($allowedActions);

        $mock
            ->getAllowedVariables()
            ->willReturn($allowedVariables);

        return $mock->reveal();
    }

    /**
     * @return ContainerInterface
     */
    private function getContainerMock()
    {
        $mock = $this->prophesize('SevenTag\Component\Container\Model\ContainerInterface');

        return $mock->reveal();
    }

    /**
     * @return Variable
     */
    private function createVariableMock($name)
    {
        $mock = $this->prophesize('SevenTag\Component\Variable\Model\Variable');

        $mock
            ->getType()
            ->willReturn($name);

        $mock
            ->getName()
            ->willReturn($name);

        $mock
            ->getOptions()
            ->willReturn([]);

        return $mock->reveal();
    }
}
