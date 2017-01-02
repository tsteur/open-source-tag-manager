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

namespace SevenTag\Plugin\SentryBundle;

/**
 * Class Dsn
 * @package SevenTag\Plugin\SentryBundle
 */
class Dsn
{
    /**
     * @var array
     */
    private $dsn;

    /**
     * @var array
     */
    private $availableSchemas = ['http', 'https'];

    /**
     * @param $dsn
     */
    public function __construct($dsn)
    {
        $this->dsn = parse_url($dsn);
    }

    /**
     * @return null|string
     */
    public function getProject()
    {
        if (false === isset($this->dsn['path'])) {
            return null;
        }

        $position = strrpos($this->dsn['path'], '/', 1);
        if ($position !== false) {
            return substr($this->dsn['path'], $position + 1);
        }

        return substr($this->dsn['path'], 1);
    }

    /**
     * @return bool
     */
    public function isValid()
    {
        if (null === $this->getPublicKey()) {
            return false;
        }

        if (null === $this->getPrivateKey()) {
            return false;
        }

        if (!in_array($this->getSchema(), $this->availableSchemas)) {
            return false;
        }

        if (null === $this->getProject()) {
            return false;
        }

        return true;
    }

    /**
     * @return null|string
     */
    public function getPublicKey()
    {
        return !empty($this->dsn['user']) ? $this->dsn['user'] : null;
    }

    /**
     * @return null|string
     */
    public function getPrivateKey()
    {
        return !empty($this->dsn['pass']) ? $this->dsn['pass'] : null;
    }

    /**
     * @return null
     */
    public function getSchema()
    {
        return !empty($this->dsn['scheme']) ? $this->dsn['scheme'] : null;
    }

    /**
     * @return string
     */
    public function getPublicDsn()
    {
        return sprintf('%s://%s@%s/%s', $this->getSchema(), $this->getPublicKey(), $this->getNetLocation(), $this->getProject());
    }

    /**
     * @return string
     */
    public function getNetLocation()
    {
        if (isset($this->dsn['port'])) {
            return sprintf('%s:%s', $this->dsn['host'], $this->dsn['port']);
        }

        return $this->dsn['host'];
    }
}
