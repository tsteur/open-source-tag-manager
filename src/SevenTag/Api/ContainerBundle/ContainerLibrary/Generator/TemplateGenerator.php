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

namespace SevenTag\Api\ContainerBundle\ContainerLibrary\Generator;

use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler\HandlerInterface;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context;
use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Loader\LoaderInterface;

/**
 * Class TemplateGenerator
 * @package SevenTag\Api\ContainerBundle\ContainerLibrary\Generator
 */
class TemplateGenerator implements GeneratorInterface
{
    /**
     * @var LoaderInterface
     */
    private $loader;

    /**
     * @var HandlerInterface
     */
    private $handler;

    /**
     * @param LoaderInterface $loader
     * @param HandlerInterface $handler
     */
    public function __construct(LoaderInterface $loader, HandlerInterface $handler)
    {
        $this->loader = $loader;
        $this->handler = $handler;
    }

    /**
     * {@inheritdoc}
     */
    public function generate(Context $context)
    {
        $context->setContent($this->loader->load());

        $this->handler->handle($context);

        return $context->getContent();
    }
}
