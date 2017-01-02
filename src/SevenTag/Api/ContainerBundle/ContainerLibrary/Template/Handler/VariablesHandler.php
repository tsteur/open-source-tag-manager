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

namespace SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler;

use JMS\Serializer\SerializationContext;
use JMS\Serializer\Serializer;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context;
use SevenTag\Api\VariableBundle\Manager\VariableManager;

/**
 * Class VariablesHandler
 * @package SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler
 */
class VariablesHandler implements HandlerInterface
{
    /**
     * @var VariableManager
     */
    private $manager;

    /**
     * @var Serializer
     */
    private $serializer;

    /**
     * @param VariableManager $manager
     * @param Serializer $serializer
     */
    public function __construct(VariableManager $manager, Serializer $serializer)
    {
        $this->manager = $manager;
        $this->serializer = $serializer;
    }

    /**
     * {@inheritdoc}
     */
    public function handle(Context $context)
    {
        $serializationContext = SerializationContext::create()->setGroups(['containerVariable']);

        $variables = $this->manager->getVariables($context->getContainer(), false);

        $content =  str_replace(
            '##variables##',
            $this->serializer->serialize(
                $variables,
                'json',
                $serializationContext
            ),
            $context->getContent()
        );

        $context->setContent($content);
    }
}
