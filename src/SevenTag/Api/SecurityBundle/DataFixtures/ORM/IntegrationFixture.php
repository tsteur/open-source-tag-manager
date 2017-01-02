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

namespace SevenTag\Api\SecurityBundle\DataFixtures\ORM;

use SevenTag\Api\SecurityBundle\Entity\Client;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use SevenTag\Api\SecurityBundle\Entity\Integration;
use SevenTag\Api\UserBundle\Entity\User;

class IntegrationFixture extends AbstractFixture implements OrderedFixtureInterface
{
    const REFERENCE_NAME = 'integration';

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < 10; $i++) {
            $integration = new Integration();
            $integration->setName(sprintf('Integration name %s', $i));

            $username = sprintf('integration_%s@example.com', $i);
            $user = new User();
            $user->setFullName('Integration', $i);
            $user->addRole(User::ROLE_API);
            $user->setEmail($username);

            $integration->setUser($user);

            $manager->persist($integration);
            $this->addReference(sprintf('%s_%s', self::REFERENCE_NAME, $i), $integration);
        }

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 1;
    }
}
