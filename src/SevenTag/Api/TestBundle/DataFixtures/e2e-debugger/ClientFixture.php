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

namespace SevenTag\Api\TestBundle\DataFixtures\e2eDebugger;

use SevenTag\Api\SecurityBundle\Entity\Client;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class ClientFixture
 * @package SevenTag\Api\TestBundle\DataFixtures\e2eDebugger
 */
class ClientFixture extends AbstractFixture implements OrderedFixtureInterface
{
    const RANDOM_ID = '1234567890';
    const SECRET = 'sec1234567890';

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $client = new Client();
        $client->setAllowedGrantTypes(['password', 'refresh_token']);
        $client->setRandomId(self::RANDOM_ID);
        $client->setSecret(self::SECRET);

        $manager->persist($client);
        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 0;
    }
}
