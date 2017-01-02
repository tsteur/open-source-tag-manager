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

namespace SevenTag\Api\UserBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use SevenTag\Component\User\Model\UserInterface;
use SevenTag\Component\Model\Model\TimestampableInterface;
use SevenTag\Component\Model\Traits\TimestampableEntity;

/**
 * Class User
 * @package SevenTag\Api\UserBundle\Entity
 */
class User extends BaseUser implements UserInterface, TimestampableInterface
{
    use TimestampableEntity;

    /**
     * @var string
     */
    private $firstName;

    /**
     * @var string
     */
    private $lastName;

    /**
     * @var string
     */
    private $language;

    public function __construct()
    {
        parent::__construct();

        $this->initTimestampable();
    }

    /**
     * Set firstName
     *
     * @param string $firstName
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Get language
     *
     * @return string
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * Set language
     *
     * @param string $language
     * @return $this
     */
    public function setLanguage($language)
    {
        $this->language = $language;

        return $this;
    }

    /**
     * @param string $firstName
     * @param string $lastName
     */
    public function setFullName($firstName, $lastName)
    {
        $this->setFirstName($firstName);
        $this->setLastName($lastName);
    }

    /**
     * @return string
     */
    public function getFullName()
    {
        return trim(sprintf('%s %s', $this->getFirstName(), $this->getLastName()));
    }

    /**
     * @return string
     */
    public function getDisplayName()
    {
        $fullName = $this->getFullName();
        
        if (!empty($fullName)) {
            return $fullName;
        }

        return $this->getEmail();
    }

    /**
     * @param string $email
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;
        $this->setUsername($email);

        return $this;
    }
}
