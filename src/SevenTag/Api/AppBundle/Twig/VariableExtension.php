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

namespace SevenTag\Api\AppBundle\Twig;

use Twig_Extension;

class VariableExtension extends Twig_Extension
{
    /**
     * @return array
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('variable', [$this, 'variableFilter']),
        ];
    }

    /**
     * @param $string
     * @return null
     */
    public function variableFilter($string)
    {
        if ($this->isVariable($string)) {
            $string = $this->addApostropheIntoString($string);
        }

        return $string;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'variable_extension';
    }

    /**
     * @param $string
     * @return bool
     */
    private function isVariable($string)
    {
        return substr($string, 0, 2) !== '{{' || substr($string, -2) !== '}}';
    }

    /**
     * @param $string
     * @return string
     */
    private function addApostropheIntoString($string)
    {
        return '\'' . trim($string, '"\'') . '\'';
    }
}
