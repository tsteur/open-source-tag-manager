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

namespace SevenTag\Api\AppBundle\Versionable\CopyManager;

use DeepCopy\DeepCopy;
use DeepCopy\Filter\Doctrine\DoctrineCollectionFilter;
use DeepCopy\Filter\KeepFilter;
use DeepCopy\Filter\SetNullFilter;
use DeepCopy\Matcher\PropertyNameMatcher;
use DeepCopy\Matcher\PropertyTypeMatcher;
use SevenTag\Component\Container\Model\ContainerInterface;

/**
 * Class CopyManager
 * @package SevenTag\Api\AppBundle\Versionable\CopyManager
 */
class CopyManager implements CopyManagerInterface
{
    /**
     * @var DeepCopy
     */
    private $deepCopy;

    /**
     * {@inheritdoc}
     */
    public function copy(ContainerInterface $container)
    {
        return $this->getDeepCopy()->copy($container);
    }

    /**
     * @return DeepCopy
     */
    private function getDeepCopy()
    {
        if (null === $this->deepCopy) {
            $this->deepCopy = new DeepCopy();
            $this->deepCopy->addFilter(new SetNullFilter(), new PropertyNameMatcher('id'));
            $this->deepCopy->addFilter(
                new DoctrineCollectionFilter(),
                new PropertyTypeMatcher('Doctrine\Common\Collections\Collection')
            );
            $this->deepCopy->addFilter(new KeepFilter(), new PropertyTypeMatcher('SevenTag\Api\UserBundle\Entity\User'));
        }

        return $this->deepCopy;
    }
}
