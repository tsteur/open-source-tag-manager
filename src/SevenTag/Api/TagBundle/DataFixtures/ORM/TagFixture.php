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

namespace SevenTag\Api\TagBundle\DataFixtures\ORM;

use SevenTag\Api\AppBundle\DataFixtures\ORM\VersionFixture;
use SevenTag\Api\ContainerBundle\DataFixtures\ORM\ContainerFixture;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use SevenTag\Api\TagBundle\Entity\Tag;

/**
 * Class TagFixture
 * @package SevenTag\Api\Bundle\TagBundle\DataFixtures\ORM
 */
class TagFixture extends AbstractFixture implements OrderedFixtureInterface
{
    const REFERENCE_NAME = 'tag';

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i <= 10; $i++) {
            for ($y = 0; $y <= 10; $y++) {
                $tag = new Tag;
                $tag->setName(sprintf('Tag name %s_%s', $i, $y));
                $tag->setCode(sprintf('<div>%s_%s</div>', $i, $y));
                $tag->setPriority(0);
                $tag->setDocumentWrite($i % 2 ? true : false);
                $tag->setDisableInDebugMode($i % 2 ? true : false);
                $tag->setRespectVisitorsPrivacy($i % 2 ? true : false);
                $tag->setContainer(
                    $this->getReference(
                        sprintf('%s_%s', ContainerFixture::REFERENCE_NAME, $i)
                    )
                );

                $manager->persist($tag);
                $this->addReference(sprintf('%s_%s_%s', self::REFERENCE_NAME, $i, $y), $tag);
            }
        }

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 3;
    }
}
