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

namespace SevenTag\Api\ContainerBundle\ContainerLibrary;

use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use SevenTag\Api\ContainerBundle\TagTree\Builder\TagTreeBuilderInterface;
use SevenTag\Api\VariableBundle\Manager\VariableManager;
use SevenTag\Component\Container\Model\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TagTreeResponseInitializer
{
    /**
     * @var VariableManager
     */
    private $variableManager;

    /**
     * @var SerializerInterface
     */
    private $serializer;

    /**
     * TagTreeResponseInitializer constructor.
     * @param VariableManager $variableManager
     * @param SerializerInterface $serializer
     */
    public function __construct(VariableManager $variableManager, SerializerInterface $serializer)
    {
        $this->variableManager = $variableManager;
        $this->serializer = $serializer;
    }

    /**
     * @param TagTreeBuilderInterface $tagTreeBuilder
     * @param ContainerInterface $container
     * @param Request $request
     * @return Response
     */
    public function prepareTagTreeResponse(TagTreeBuilderInterface $tagTreeBuilder, ContainerInterface $container, Request $request)
    {
        $response = new Response();
        $response->headers->set('Access-Control-Allow-Origin', $request->headers->get('Origin'));
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Allow-Methods', 'GET');

        $serializationContext = SerializationContext::create()->setGroups(['containerVariable']);

        $response->setContent($this->serializer->serialize([
            'tagtree' => $tagTreeBuilder->buildTree($container),
            'debug' => [
                'enabled' => true,
                'containerName' => $container->getName()
            ],
            'variables' => $this->variableManager->getVariables($container)
        ], 'json', $serializationContext));

        $response->headers->set('Content-Type', 'application/javascript');

        return $response;
    }
}
