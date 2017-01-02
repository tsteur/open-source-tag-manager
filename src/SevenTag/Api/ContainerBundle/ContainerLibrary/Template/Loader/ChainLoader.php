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

namespace SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Loader;

use SevenTag\Api\AppBundle\Utils\Queue\Prioritized;

/**
 * Class ChainLoader
 * @package SevenTag\Api\ContainerBundle\ContainerLibrary\Template\Loader
 */
class ChainLoader implements ChainInterface
{
    /**
     * @var \Iterator
     */
    private $queue;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->queue = new Prioritized();
    }

    /**
     * {@inheritdoc}
     */
    public function add(LoaderInterface $loader, $priority = 0)
    {
        $this->queue->insert($loader, (int)$priority);

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function load()
    {
        $content = '';

        /** @var LoaderInterface $loader */
        foreach (clone($this->queue) as $loader) {
            $content .= $loader->load();
        }

        return $content;
    }
}
