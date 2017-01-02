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

namespace SevenTag\Api\AppBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * Class JMSSerializerCompilerPass
 * @package SevenTag\Api\AppBundle\DependencyInjection\Compiler
 */
class JMSSerializerCompilerPass implements CompilerPassInterface
{
    /**
     * @param ContainerBuilder $container
     */
    public function process(ContainerBuilder $container)
    {
        if ($container->hasDefinition('jms_serializer.datetime_handler')) {
            $definition = $container->getDefinition('jms_serializer.datetime_handler');
            $definition->setClass('SevenTag\Api\AppBundle\Serializer\Handler\DateHandler');
        }

        if ($container->hasDefinition('jms_serializer.form_error_handler')) {
            $definition = $container->getDefinition('jms_serializer.form_error_handler');
            $definition->setClass('SevenTag\Api\AppBundle\Serializer\Handler\FormErrorHandler');
        }
    }
}
