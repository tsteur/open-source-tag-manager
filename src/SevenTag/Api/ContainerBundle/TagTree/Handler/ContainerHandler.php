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

namespace SevenTag\Api\ContainerBundle\TagTree\Handler;

use Doctrine\ORM\Query;
use SevenTag\Api\ContainerBundle\Entity\ContainerRepository;

/**
 * Class ContainerHandler
 * @package SevenTag\Api\ContainerBundle\TagTree\Handler
 */
class ContainerHandler extends ChainOfResponsibilityHandler
{
    /**
     * @var ContainerRepository
     */
    private $repository;

    /**
     * @param ContainerRepository $repository
     */
    public function __construct(ContainerRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * {@inheritdoc}
     */
    public function handle($data)
    {
        $tree = [];

        $container = $this->repository->findOneWithConditions((int)$data, Query::HYDRATE_ARRAY);
        if ($container) {
            $tree = $this->nextHandler->handle($container);
        }

        return $tree;
    }
}
