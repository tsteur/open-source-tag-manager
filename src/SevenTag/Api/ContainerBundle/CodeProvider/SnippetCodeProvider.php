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

namespace SevenTag\Api\ContainerBundle\CodeProvider;

use Symfony\Bundle\TwigBundle\TwigEngine;
use SevenTag\Component\Container\Model\ContainerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use MatthiasMullie\Minify;

/**
 * Class SnippetCodeProvider
 * @package SevenTag\Api\ContainerBundle\CodeProvider
 */
class SnippetCodeProvider implements CodeProviderInterface
{
    /**
     * @var UrlGeneratorInterface
     */
    private $urlGenerator;
    /**
     * @var TwigEngine
     */
    private $engine;

    /**
     * @param UrlGeneratorInterface $urlGenerator
     * @param TwigEngine $engine
     */
    public function __construct(UrlGeneratorInterface $urlGenerator, TwigEngine $engine)
    {
        $this->urlGenerator = $urlGenerator;
        $this->engine = $engine;
    }

    /**
     * {@inheritdoc}
     */
    public function getCode(ContainerInterface $container)
    {
        $code = $this->engine->render($this->getTemplatePath(), [
            'id' => $container->getAccessId(),
            'path' => $this->urlGenerator->generate('get_container_javascript', ['id' => $container->getAccessId()], UrlGeneratorInterface::NETWORK_PATH),
            'noScriptPath' => $this->urlGenerator->generate('get_no_script', ['id' => $container->getAccessId()], UrlGeneratorInterface::NETWORK_PATH),
        ]);
        $minifier = new Minify\JS($code);

        return $minifier->minify();
    }

    /**
     * @return string
     */
    private function getTemplatePath()
    {
        return '@SevenTagContainerBundle/Resources/views/snippet.html.twig';
    }
}
