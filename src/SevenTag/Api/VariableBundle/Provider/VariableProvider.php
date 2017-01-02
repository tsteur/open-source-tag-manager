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

namespace SevenTag\Api\VariableBundle\Provider;

use Doctrine\Common\Collections\ArrayCollection;
use SevenTag\Component\Variable\Model\Variable;

/**
 * Class VariableProvider
 * @package SevenTag\VariableBundle\Provider
 */
class VariableProvider
{
    /**
     * @var array
     */
    private $variables;

    /**
     * @param array $variables
     */
    public function __construct(array $variables)
    {
        $this->variables = $variables;
    }

    /**
     * @return ArrayCollection
     */
    public function createVariables()
    {
        $types = new ArrayCollection();

        foreach ($this->variables as $id => $variable) {
            $types->set($id, (new Variable())
                ->setName($variable['name'])
                ->setType($variable['type'])
                ->setValue($variable['value']));
        }

        return $types;
    }
}
