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

namespace SevenTag\Api\ContainerBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class SevenTagContainerExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $loader->load('services.yml');

        $this->configureSearchEngine($container, $config);
    }

    public function configureSearchEngine(ContainerBuilder $container, array $config)
    {
        if (!isset($config['search_engine']) || !in_array($config['search_engine'], ['orm'])) {
            throw new \InvalidArgumentException(sprintf('SevenTagContainerBundle - Invalid search engine "%s".', $config['search_engine']));
        }

        $searchEngineDefinition = new Definition('SevenTag\Api\ContainerBundle\Search\Engine\DoctrineORMEngine');
        $searchEngineDefinition->addArgument($container->getDefinition('seven_tag_container.repository.container_repository'));

        $container->setDefinition(
            sprintf('seven_tag_container.container_library.search_engine.%s', $config['search_engine']),
            $searchEngineDefinition
        );

        $container->setAlias(
            'seven_tag_container.container_library.search_engine',
            'seven_tag_container.container_library.search_engine.orm'
        );
    }
}
