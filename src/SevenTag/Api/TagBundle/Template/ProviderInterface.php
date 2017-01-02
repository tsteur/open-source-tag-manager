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

namespace SevenTag\Api\TagBundle\Template;

use SevenTag\Component\Tag\Model\TagInterface;
use Symfony\Component\Form\FormTypeInterface;

/**
 * Interface ProviderInterface
 * @package SevenTag\Api\TagBundle
 */
interface ProviderInterface
{
    /**
     * @return string
     */
    public function getKey();

    /**
     * @return FormTypeInterface
     */
    public function getFormType();

    /**
     * @param TagInterface $tag
     * @return string
     */
    public function generateCode(TagInterface $tag);

    /**
     * @param TagInterface $tag
     * @return $tag
     */
    public function prePersist(TagInterface $tag);
}
