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

namespace SevenTag\Component\Model\Repository;

/**
 * Interface RepositoryInterface
 * @package SevenTag\Component\Model
 */
interface RepositoryInterface
{
    /**
     * Return model class name.
     *
     * @return string
     */
    public function getClass();

    /**
     * Create underlying model object.
     *
     * @return object
     */
    public function create();

    /**
     * Find one object by id.
     *
     * @param  mixed $id
     * @return object
     */
    public function find($id);

    /**
     * Find all elements.
     *
     * @return \Traversable|array
     */
    public function findAll();

    /**
     * Return total count.
     *
     * @return integer
     */
    public function countAll();

    /**
     * Save an object in database source.
     *
     * @param object  $object   The object to save
     * @param boolean $andFlush Flush after saving the object?
     */
    public function save($object, $andFlush = true);

    /**
     * Delete an object from source.
     *
     * @param object  $object   The object to delete
     * @param boolean $andFlush Flush after deleting the object?
     */
    public function delete($object, $andFlush = true);
}
