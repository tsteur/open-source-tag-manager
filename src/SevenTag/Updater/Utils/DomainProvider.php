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

namespace SevenTag\Updater\Utils;

use SevenTag\Updater\Environment\EnvironmentInterface;
use Symfony\Component\Yaml\Parser;

/**
 * Class DomainProvider
 * @package SevenTag\Updater\Utils
 */
class DomainProvider implements DomainProviderInterface
{
    /**
     * @var EnvironmentInterface
     */
    private $environment;

    /**
     * @param EnvironmentInterface $environment
     */
    public function __construct(EnvironmentInterface $environment)
    {
        $this->environment = $environment;
    }

    /**
     * {@inheritdoc}
     */
    public function getDomain()
    {
        $filesystem = $this->environment->getCurrentInstance()
            ->getFilesystem();

        $parameters = [];

        if ($filesystem->has('app/config/parameters.yml')) {
            $yaml = new Parser();
            $parameters = $yaml->parse($filesystem->read('app/config/parameters.yml'));
        }

        return isset($parameters['parameters']['seventag_domain']) ? $parameters['parameters']['seventag_domain'] : '';
    }
}
