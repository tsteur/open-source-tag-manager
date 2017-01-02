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

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use SevenTag\Api\VariableBundle\Entity\Variable;

/**
 * Class VariablesFixture
 * @package SevenTag\Api\TestBundle\DataFixtures\e2eDebugger
 */
class VariablesFixture extends AbstractFixture implements OrderedFixtureInterface
{
    const REFERENCE_NAME = 'Variable';

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $data = $this->getData();
        $y = 0;

        foreach ($data as $variableName => $variableOptions) {
            $variable = new Variable;
            $variable->setName($variableName);
            $variable->setDescription('Variable description');
            $variable->setType($variableOptions['type']);
            $variable->setValue($variableOptions['value']);
            $variable->setContainer(
                $this->getReference(ContainerFixture::REFERENCE_NAME)
            );

            $manager->persist($variable);
            $this->addReference(sprintf('%s_%s', self::REFERENCE_NAME, $y), $variable);

            $y++;
        }

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 15;
    }

    public static function getData()
    {
        return [
            'cookie' => [
                'type' => 'cookie',
                'value' => '_gat'
            ],
            'document' => [
                'type' => 'document',
                'value' => 'baseURI'
            ],
            'dataLayer' => [
                'type' => 'dataLayer',
                'value' => 'event'
            ],
            'random number' => [
                'type' => 'random',
                'value' => ''
            ],
            'constant' => [
                'type' => 'constant',
                'value' => 'const_test'
            ],
            'url variable' => [
                'type' => 'url',
                'value' => '7tag.test.com'
            ]
        ];
    }
}
