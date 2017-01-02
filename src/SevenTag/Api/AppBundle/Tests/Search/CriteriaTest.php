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

namespace SevenTag\Api\AppBundle\Tests\Search;

use SevenTag\Api\AppBundle\Search\Criteria;
use SevenTag\Api\UserBundle\Entity\User;

class CriteriaTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     * @expectedException \SevenTag\Api\ContainerBundle\Search\Exception\SearchEngineException
     */
    public function itShouldStoreUser()
    {
        $criteria = new Criteria([]);
        $this->assertFalse($criteria->hasUser());
        $criteria->getUser();

        $user = new User();
        $criteria->user = $user;
        $this->assertTrue($criteria->hasUser());
        $this->assertEquals($user, $criteria->getUser());
    }

    /**
     * @test
     * @expectedException \SevenTag\Api\ContainerBundle\Search\Exception\SearchEngineException
     */
    public function itShouldStoreOffset()
    {
        $criteria = new Criteria([]);
        $this->assertFalse($criteria->hasOffset());
        $criteria->getOffset();

        $offset = 20;
        $criteria->offset = $offset;
        $this->assertTrue($criteria->hasOffset());
        $this->assertEquals($offset, $criteria->getOffset());
    }

    /**
     * @test
     * @expectedException \SevenTag\Api\ContainerBundle\Search\Exception\SearchEngineException
     */
    public function itShouldStoreLimit()
    {
        $criteria = new Criteria([]);
        $this->assertFalse($criteria->hasLimit());
        $criteria->getLimit();

        $limit = 40;
        $criteria->limit = $limit;
        $this->assertTrue($criteria->hasLimit());
        $this->assertEquals($limit, $criteria->getLimit());
    }

    /**
     * @test
     */
    public function itShouldStoreKeyValueInputData()
    {
        $criteria = new Criteria(['name' => 'lorem']);
        $criteria->active = true;

        $this->assertEquals('lorem', $criteria->name);
        $this->assertEquals(true, $criteria->active);
    }
}
