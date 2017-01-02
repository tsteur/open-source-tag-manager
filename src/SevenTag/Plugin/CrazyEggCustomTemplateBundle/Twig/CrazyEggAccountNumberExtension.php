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

namespace SevenTag\Plugin\CrazyEggCustomTemplateBundle\Twig;

/**
 * Class CrazyEggAccountNumberExtension
 * @package SevenTag\Plugin\CrazyEggCustomTemplateBundle\Twig
 */
class CrazyEggAccountNumberExtension extends \Twig_Extension
{
    /**
     * @return array
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('crazyEggAccountNumber', [$this, 'accountNumberFilter'])
        ];
    }

    /**
     * @param string $accountNumber
     * @return string
     */
    public function accountNumberFilter($accountNumber)
    {
        $accountNumber = str_pad($accountNumber, 8, "0", STR_PAD_LEFT);
        return substr($accountNumber, 0, 4).'/'.substr($accountNumber, 4, 8);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'crazy_egg_account_number_extension';
    }
}
