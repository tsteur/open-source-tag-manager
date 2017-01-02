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

namespace SevenTag\InstallerBundle\Service;

use Doctrine\ORM\Configuration;
use Doctrine\ORM\EntityManager;

/**
 * Class ConnectionProvider
 * @package SevenTag\InstallerBundle\Service
 */
class ConnectionProvider
{
    private $manager;

    public function __construct(EntityManager $em, Configuration $configuration, array $parameters)
    {
        $connection = $em->getConnection();
        $connectionParameters = $connection->getParams();

        $params = array_merge($connectionParameters, $parameters);

        $this->manager = EntityManager::create($params, $em->getConfiguration());
    }

    public function getManager()
    {
        return $this->manager;
    }
}
