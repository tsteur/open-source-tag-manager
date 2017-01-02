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

namespace SevenTag\Api\ContainerBundle\DependencyInjection\Compiler\Cdn;

use Symfony\Component\Config\Definition\NodeInterface;
use Symfony\Component\Config\Definition\Processor;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Reference;

/**
 * Class AbstractCdnCompilerPass
 * @package SevenTag\Api\ContainerBundle\DependencyInjection\Compiler\Cdn
 */
abstract class AbstractCdnCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasParameter('seventag_container_library_cdn')) {
            return false;
        }

        $configs = $container->getParameter('seventag_container_library_cdn');

        if ($this->isCdnEnabled($configs) && $this->isCdnSupported($configs)) {
            $this->processCdnService(
                $container,
                $this->processCdnServiceOptions($configs)
            );
            $this->replaceCdnUrlGenerator($container);
        }
    }

    /**
     * @param array $configs
     * @return array
     */
    protected function processCdnServiceOptions($configs)
    {
        $processor = new Processor();
        $config = $processor->process(
            $this->getCdnServiceOptions(),
            ['service_options' => $configs['service_options']]
        );

        return $config;
    }

    /**
     * @param ContainerBuilder $container
     */
    protected function replaceCdnUrlGenerator(ContainerBuilder $container)
    {
        $snippetProviderDefinition = $container->getDefinition('seven_tag_container.code_provider.snippet_provider');
        $snippetProviderDefinition->replaceArgument(0, new Reference('seven_tag_container.code_provider.cdn_url_generator'));

        $snippetProviderDefinition = $container->getDefinition('seven_tag_container.code_provider.synchronous_snippet_provider');
        $snippetProviderDefinition->replaceArgument(0, new Reference('seven_tag_container.code_provider.cdn_url_generator'));
    }

    /**
     * @param $configsCdn
     * @return bool
     */
    protected function isCdnEnabled($configsCdn)
    {
        return true === $configsCdn['enabled'];
    }

    /**
     * @param array $configsCdn
     * @return boolean
     */
    abstract protected function isCdnSupported(array $configsCdn);

    /**
     * @param ContainerBuilder $container
     * @param array $configs
     * @return void
     */
    abstract protected function processCdnService(ContainerBuilder $container, array $configs);

    /**
     * @return NodeInterface
     */
    abstract protected function getCdnServiceOptions();
}
