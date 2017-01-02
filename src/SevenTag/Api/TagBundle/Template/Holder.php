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

use SevenTag\Api\TagBundle\Template;

/**
 * Class ProviderHolder
 * @package SevenTag\Api\TagBundle\TemplateProvider
 */
class Holder implements HolderInterface
{
    /**
     * @var array
     */
    private $providers = [];

    /**
     * {@inheritdoc}
     */
    public function add(ProviderInterface $provider)
    {
        if ($this->has($provider->getKey())) {
            throw new \LogicException(sprintf('Provider with key %s already exists.', $provider->getKey()));
        }

        $this->providers[$provider->getKey()] = $provider;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function has($key)
    {
        return isset($this->providers[$key]);
    }

    /**
     * {@inheritdoc}
     */
    public function get($key)
    {
        if (!$this->has($key)) {
            throw new \LogicException(sprintf('Provider with key %s does not exists.', $key));
        }

        return $this->providers[$key];
    }

    /**
     * {@inheritdoc}
     */
    public function getIterator()
    {
        return new \ArrayIterator($this->providers);
    }
}
