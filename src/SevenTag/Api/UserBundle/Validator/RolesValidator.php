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

namespace SevenTag\Api\UserBundle\Validator;

use SevenTag\Api\UserBundle\RoleListProvider\RoleListProviderInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\ChoiceValidator;

/**
 * Class Roles
 * @package SevenTag\Api\UserBundle\Validator
 */
class RolesValidator extends ChoiceValidator
{
    /**
     * @var RoleListProviderInterface
     */
    private $roleListProvider;

    /**
     * @param RoleListProviderInterface $roleListProvider
     */
    public function __construct(RoleListProviderInterface $roleListProvider)
    {
        $this->roleListProvider = $roleListProvider;
    }

    /**
     * @param array $value
     * @param Constraint $constraint
     */
    public function validate($value, Constraint $constraint)
    {
        $constraint->choices = array_keys($this->roleListProvider->getRoles());

        parent::validate($value, $constraint);
    }
}
