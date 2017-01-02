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

namespace SevenTag\Api\TestBundle\DataFixtures\e2e;

use SevenTag\Api\ContainerBundle\Entity\Container;
use SevenTag\Api\UserBundle\DataFixtures\ORM\UserFixture;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class ContainerFixture
 * @package SevenTag\Api\TestBundle\DataFixtures\e2e
 */
class ContainerFixture extends AbstractFixture implements OrderedFixtureInterface
{
    const REFERENCE_NAME = 'container';

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $container = new Container();
        $container->setName('Container name');
        $container->setDescription('Container description');
        $container->setDelay(1000);
        $container->setCreatedBy($this->getReference(sprintf(
            '%s_%s',
            UserFixture::REFERENCE_NAME,
            0
        ), 0));

        $manager->persist($container);
        $this->addReference(self::REFERENCE_NAME, $container);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2;
    }
}
