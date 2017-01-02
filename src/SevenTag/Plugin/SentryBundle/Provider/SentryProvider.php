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

namespace SevenTag\Plugin\SentryBundle\Provider;

use SevenTag\Plugin\SentryBundle\Dsn;
use Symfony\Bundle\TwigBundle\TwigEngine;
use Symfony\Component\Templating\EngineInterface;

/**
 * Class SentryProvider
 * @package SevenTag\Plugin\SentryBundle\Provider
 */
class SentryProvider
{
    /**
     * @var Dsn
     */
    private $dsn;

    /**
     * @var EngineInterface|TwigEngine
     */
    private $engine;

    /**
     * @param string $dsn
     * @param EngineInterface $engine
     */
    public function __construct($dsn, EngineInterface $engine)
    {
        $this->dsn = new Dsn($dsn);
        $this->engine = $engine;
    }

    /**
     * @return string|null
     */
    public function getJsTrackingCode()
    {
        if ($this->dsn->isValid()) {
            return $this->engine->render($this->getTemplatePath(), ['dsn' => $this->dsn->getPublicDsn()]);
        }

        return null;
    }

    /**
     * @return string
     */
    private function getTemplatePath()
    {
        return 'SevenTagPluginSentryBundle:Template:SentryProvider.js.twig';
    }
}
