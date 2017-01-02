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

use SevenTag\Api\ContainerBundle\Entity\ContainerRepository;
use SevenTag\Api\ContainerBundle\TagTree\Builder\TagTreeBuilderInterface;
use Symfony\Bridge\Twig\TwigEngine;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Gaufrette\Filesystem;
use Symfony\Component\Form\Extension\Templating\TemplatingExtension;
use Symfony\Component\Form\Extension\Templating\TemplatingRendererEngine;

class TagtreeGeneratorCommand extends Command
{
    /**
     * @var Filesystem
     */
    private $filesystem;

    /**
     * @var TagTreeBuilderInterface
     */
    private $treeBuilder;

    /**
     * @var ContainerRepository
     */
    private $containerRepository;

    /**
     * @var TwigEngine
     */
    private $templating;

    /**
     * @param Filesystem $filesystem
     * @param TagTreeBuilderInterface $treeBuilder
     * @param ContainerRepository $containerRepository
     */
    public function __construct(Filesystem $filesystem, TagTreeBuilderInterface $treeBuilder, ContainerRepository $containerRepository, TwigEngine $templating)
    {
        $this->filesystem = $filesystem;
        $this->treeBuilder = $treeBuilder;
        $this->containerRepository = $containerRepository;
        $this->templating = $templating;

        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('container:generate:tag-tree')
            ->addArgument('access-id', InputArgument::REQUIRED, 'Access id of container that should be mocked.');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $accessId = $input->getArgument('access-id');
        $container = $this->containerRepository->findByAccessId($accessId);

        $this->filesystem->write(
            sprintf('containerjs/mock/tagTree.js', $container->getAccessId()),
            $this->templating->render(
                'SevenTagContainerBundle::tagTree.js.twig',
                ['tagTree' => json_encode($this->treeBuilder->buildTree($container))]
            ),
            true
        );
    }
}
