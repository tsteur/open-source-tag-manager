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

namespace SevenTag\Api\ContainerBundle\NoScript;

use Symfony\Component\DomCrawler\Crawler;

class NoScriptCrawler
{
    /**
     * @var Crawler
     */
    private $crawler;

    /**
     * NoScriptCrawler constructor.
     * @param Crawler $crawler
     */
    public function __construct(Crawler $crawler = null)
    {
        $this->crawler = is_null($crawler) ? new Crawler() : $crawler;
    }

    /**
     * {@inheritdoc}
     */
    public function getNoScriptContentFromTag($code)
    {
        $this->crawler->clear();
        $this->crawler->addHtmlContent($code);

        $noscript = '';
        foreach ($this->crawler->filter('noscript > *') as $node) {
            $noscript .= $node->ownerDocument->saveHTML($node);
        }

        return $noscript;
    }
}
