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

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;

/**
 * Class AmazonCloudFrontCdnCompilerPass
 * @package SevenTag\Api\ContainerBundle\DependencyInjection\Compiler\Cdn
 */
class AmazonCloudFrontCdnCompilerPass extends AbstractCdnCompilerPass
{
    const AMAZON_CLOUDFRONT = 'amazon_cloudfront';

    /**
     * {@inheritdoc}
     */
    protected function isCdnSupported(array $configs)
    {
        return self::AMAZON_CLOUDFRONT === $configs['service'];
    }

    /**
     * {@inheritdoc}
     */
    protected function processCdnService(ContainerBuilder $container, array $configs)
    {
        $amazonCloudFrontDefinition = new Definition(
            'Aws\CloudFront\CloudFrontClient',
            [$configs['client']]
        );
        $amazonCloudFrontDefinition->setFactory('Aws\CloudFront\CloudFrontClient::factory');

        $cdnDefinition = new Definition('SevenTag\Api\ContainerBundle\Cdn\AmazonCloudFront');
        $cdnDefinition->addArgument($amazonCloudFrontDefinition);
        $cdnDefinition->addArgument($configs['distributions']);

        $container->setDefinition('seven_tag_container.amazoncloudfront', $amazonCloudFrontDefinition);
        $container->setDefinition('seven_tag_container.container_library.cdn.amazoncloudfront', $cdnDefinition);

        $container->setAlias(
            'seven_tag_container.container_library.cdn',
            'seven_tag_container.container_library.cdn.amazoncloudfront'
        );
    }

    /**
     * {@inheritdoc}
     */
    protected function getCdnServiceOptions()
    {
        $tree = new TreeBuilder();
        $root = $tree->root('service_options');

        $root
            ->children()
                ->variableNode('distributions')
                    ->isRequired()
                ->end()
            ->end()
            ->children()
                ->arrayNode('client')
                    ->children()
                        ->scalarNode('region')
                            ->isRequired()
                            ->cannotBeEmpty()
                        ->end()
                    ->end()
                    ->children()
                        ->scalarNode('version')
                            ->isRequired()
                            ->cannotBeEmpty()
                        ->end()
                    ->end()
                    ->children()
                        ->arrayNode('credentials')
                            ->isRequired()
                            ->cannotBeEmpty()
                            ->children()
                                ->scalarNode('key')
                                    ->isRequired()
                                    ->cannotBeEmpty()
                                ->end()
                            ->end()
                            ->children()
                                ->scalarNode('secret')
                                    ->isRequired()
                                    ->cannotBeEmpty()
                                ->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end();

        return $tree->buildTree();
    }
}
