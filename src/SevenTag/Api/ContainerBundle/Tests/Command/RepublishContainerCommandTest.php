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

namespace SevenTag\Api\ContainerBundle\Tests\Command;

use Doctrine\Common\Collections\ArrayCollection;
use Prophecy\Argument;
use SevenTag\Api\ContainerBundle\Command\RepublishContainerCommand;
use SevenTag\Api\ContainerBundle\Service\RepublishContainer;
use SevenTag\Api\ContainerBundle\Entity\Container;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Helper\DialogHelper;
use Symfony\Component\Console\Tester\CommandTester;

class RepublishContainerCommandTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldReturnMessageForNothingToRepublishSingleOption()
    {
        $commandTester = $this->getApplicationForSingleOptionWithoutData();

        $this->assertRegExp("/Nothing to republish./", $commandTester->getDisplay());
    }

    /**
     * @test
     */
    public function itShouldReturnMessageForNothingToRepublishMultipleOption()
    {
        $commandTester = $this->getApplicationForMultipleOptionWithoutData();

        $this->assertRegExp("/Nothing to republish./", $commandTester->getDisplay());
    }

    /**
     * @test
     */
    public function itShouldRepublishSingleContainer()
    {
        $commandTester = $this->getApplicationForSingleOptionWithData();

        $this->assertStringStartsWith("1 containers will be republished. Are you sure?", $commandTester->getDisplay());
        $this->assertRegExp("~1/1 \[============================\] 100%~", $commandTester->getDisplay());
        $this->assertRegExp("/Republish completed./", $commandTester->getDisplay());
    }

    /**
     * @test
     */
    public function itShouldRepublishMultipleContainers()
    {
        $commandTester = $this->getApplicationForMultipleOptionWithData();

        $this->assertStringStartsWith("2 containers will be republished. Are you sure?", $commandTester->getDisplay());
        $this->assertRegExp("~1/2 \[==============>-------------\]  50%~", $commandTester->getDisplay());
        $this->assertRegExp("~2/2 \[============================\] 100%~", $commandTester->getDisplay());
        $this->assertRegExp("/Republish completed./", $commandTester->getDisplay());
    }

    /**
     * @return CommandTester
     */
    private function getApplicationForSingleOptionWithoutData()
    {
        $republishContainer = $this->prophesize('SevenTag\Api\ContainerBundle\Service\RepublishContainer');
        $republishContainer
            ->getContainersToProcess(Argument::any())
            ->shouldBeCalledTimes(1)
            ->willReturn(new ArrayCollection());

        list($command, $commandTester) = $this->getBaseApplication($republishContainer->reveal());

        $commandTester->execute([
            'command' => $command->getName(),
            '--containerId' => 1,
        ]);

        return $commandTester;
    }

    /**
     * @return CommandTester
     */
    private function getApplicationForMultipleOptionWithoutData()
    {
        $republishContainer = $this->prophesize('SevenTag\Api\ContainerBundle\Service\RepublishContainer');
        $republishContainer
            ->getContainersToProcess(null)
            ->shouldBeCalledTimes(1)
            ->willReturn(new ArrayCollection());

        list($command, $commandTester) = $this->getBaseApplication($republishContainer->reveal());

        $commandTester->execute(['command' => $command->getName()]);

        return $commandTester;
    }

    /**
     * @return CommandTester
     */
    private function getApplicationForSingleOptionWithData()
    {
        $container = new Container();
        $republishContainer = $this->prophesize('SevenTag\Api\ContainerBundle\Service\RepublishContainer');
        $republishContainer
            ->getContainersToProcess(Argument::any())
            ->shouldBeCalledTimes(1)
            ->willReturn(new ArrayCollection([$container]));

        $republishContainer
            ->process($container)
            ->shouldBeCalledTimes(1);

        list($command, $commandTester) = $this->getBaseApplication($republishContainer->reveal());

        /** @var DialogHelper $dialog */
        $dialog = $command->getHelper('dialog');
        $dialog->setInputStream($this->getInputStream("y\n"));

        $commandTester->execute([
            'command' => $command->getName(),
            '--containerId' => 1,
        ]);

        return $commandTester;
    }

    /**
     * @return CommandTester
     */
    private function getApplicationForMultipleOptionWithData()
    {
        $container = new Container();
        $republishContainer = $this->prophesize('SevenTag\Api\ContainerBundle\Service\RepublishContainer');
        $republishContainer
            ->getContainersToProcess(null)
            ->shouldBeCalledTimes(1)
            ->willReturn(new ArrayCollection([$container, $container]));

        $republishContainer
            ->process($container)
            ->shouldBeCalledTimes(2);

        list($command, $commandTester) = $this->getBaseApplication($republishContainer->reveal());

        /** @var DialogHelper $dialog */
        $dialog = $command->getHelper('dialog');
        $dialog->setInputStream($this->getInputStream("y\n"));

        $commandTester->execute([
            'command' => $command->getName(),
        ]);

        return $commandTester;
    }

    /**
     * @param RepublishContainer $republishContainer
     * @return array
     */
    private function getBaseApplication(RepublishContainer $republishContainer)
    {
        $application = new Application();
        $application->add(new RepublishContainerCommand($republishContainer));

        $command = $application->find('seventag:republish');
        $commandTester = new CommandTester($command);

        return [$command, $commandTester];
    }

    /**
     * @param $input
     * @return resource
     */
    protected function getInputStream($input)
    {
        $stream = fopen('php://memory', 'r+', false);
        fputs($stream, $input);
        rewind($stream);

        return $stream;
    }
}
