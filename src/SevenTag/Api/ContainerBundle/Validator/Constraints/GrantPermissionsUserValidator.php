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

namespace SevenTag\Api\ContainerBundle\Validator\Constraints;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use FOS\UserBundle\Model\UserInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Class GrantPermissionsUserValidator
 * @package SevenTag\Api\ContainerBundle\Validator\Constraints
 */
class GrantPermissionsUserValidator extends ConstraintValidator
{
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @param UserInterface $user
     * @param Constraint $constraint
     */
    public function validate($user, Constraint $constraint)
    {
        $requestUser = $this->tokenStorage->getToken()->getUser();
        if (!$requestUser instanceof UserInterface) {
            throw new \LogicException(
                sprintf('TokenStorage must contains user object. Check your security configuration.')
            );
        }

        if ($user->isSuperAdmin()) {
            $this->context
                ->buildViolation($constraint->messageGrantPermissionsSuperAdmin)
                ->addViolation();
        }

        if ($user->getId() === $requestUser->getId()) {
            $this->context
                ->buildViolation($constraint->messageGrantPermissionsItself)
                ->addViolation();
        }
    }
}
