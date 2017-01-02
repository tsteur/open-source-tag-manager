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

use SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Context;
use SevenTag\Api\ContainerBundle\TagTree\Builder\TagTreeBuilderInterface;

/**
 * Class TagTreeHandler
 * @package SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Handler
 */
class TagTreeHandler implements HandlerInterface
{
    /**
     * @var TagTreeBuilderInterface
     */
    private $tagTreeBuilder;

    /**
     * @param TagTreeBuilderInterface $tagTreeBuilder
     */
    public function __construct(TagTreeBuilderInterface $tagTreeBuilder)
    {
        $this->tagTreeBuilder = $tagTreeBuilder;
    }

    /**
     * {@inheritdoc}
     */
    public function handle(Context $context)
    {
        $content =  str_replace(
            '##tagTree##',
            json_encode($this->tagTreeBuilder->buildTree($context->getContainer())),
            $context->getContent()
        );

        $context->setContent($content);
    }
}
