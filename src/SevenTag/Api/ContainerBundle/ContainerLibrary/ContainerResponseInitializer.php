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

use SevenTag\Api\ContainerBundle\ContainerLibrary\Generator\GeneratorInterface;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context;
use SevenTag\Component\Container\Model\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;

class ContainerResponseInitializer
{
    /**
     * @param GeneratorInterface $generator
     * @param ContainerInterface $container
     * @return Response
     */
    public function prepareContainerLibraryResponse(GeneratorInterface $generator, ContainerInterface $container)
    {
        $response = new Response();
        $response->setExpires(new \DateTime('Tue, 1 Jan 1980 00:00:00 GMT'));

        $headers = $response->headers;
        $headers->set('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
        $headers->set('Pragma', 'no-cache');
        $headers->set('Content-Type', 'application/javascript');

        $response->setContent($generator->generate(new Context($container), true));

        return $response;
    }
}
