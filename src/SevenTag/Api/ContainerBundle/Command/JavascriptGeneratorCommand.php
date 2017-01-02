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

namespace SevenTag\Api\ContainerBundle\Command;

use SevenTag\Api\AppBundle\Versionable\VersionManager\VersionManager;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Generator\GeneratorInterface;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context;
use SevenTag\Api\ContainerBundle\Entity\ContainerRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Gaufrette\Filesystem;

class JavascriptGeneratorCommand extends Command
{
    /**
     * @var Filesystem
     */
    private $filesystem;

    /**
     * @var GeneratorInterface
     */
    private $generator;

    /**
     * @var ContainerRepository
     */
    private $containerRepository;

    /**
     * @var VersionManager
     */
    private $versionManager;

    /**
     * @param Filesystem $filesystem
     * @param GeneratorInterface $generator
     * @param ContainerRepository $containerRepository
     * @param VersionManager $versionManager
     */
    public function __construct(Filesystem $filesystem, GeneratorInterface $generator, ContainerRepository $containerRepository, VersionManager $versionManager)
    {
        $this->filesystem = $filesystem;
        $this->generator = $generator;
        $this->containerRepository = $containerRepository;
        $this->versionManager = $versionManager;

        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('container:generate:js')
            ->addArgument('access-id', InputArgument::REQUIRED, 'Access id of container that should be mocked.');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $accessId = $input->getArgument('access-id');
        $container = $this->containerRepository->findByAccessId($accessId);

        $container = $this->versionManager->publish($container);

        $this->filesystem->write(
            sprintf('container-debugger/tests/mock/stg.js', $container->getAccessId()),
            $this->generator->generate(new Context($container, false)),
            true
        );
    }
}
