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

namespace SevenTag\Api\TagBundle\Template;

use SevenTag\Component\Tag\Model\TagInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Templating\EngineInterface;

/**
 * Class TemplatingProvider
 * @package SevenTag\Api\TagBundle\Template
 */
abstract class TemplatingProvider implements ProviderInterface, ContainerAwareInterface
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * {@inheritdoc}
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * @return EngineInterface
     */
    protected function getTemplating()
    {
        return $this->container->get('templating');
    }

    /**
     * {@inheritdoc}
     */
    public function generateCode(TagInterface $tag)
    {
        return $this->getTemplating()->render(
            $this->getTemplatePath(),
            $this->getTemplateOptions($tag)
        );
    }

    /**
     * @param TagInterface $tag
     * @return array
     */
    protected function getTemplateOptions(TagInterface $tag)
    {
        return $tag->getTemplateOptions();
    }

    /**
     * @return string
     */
    abstract public function getTemplatePath();
}
