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

namespace SevenTag\Api\AppBundle\Tests\StringToBooleanDataTransformer;

use SevenTag\Api\AppBundle\DataTransformer\StringToBooleanDataTransformer;

/**
 * Class StringToBooleanDataTransformerTest
 * @package SevenTag\Api\AppBundle\Tests\StringToBooleanDataTransformer
 */
class StringToBooleanDataTransformerTest extends \PHPUnit_Framework_TestCase
{
    public function testTransform()
    {
        $transfommer = new StringToBooleanDataTransformer();

        $this->assertTrue($transfommer->transform('true'));
        $this->assertTrue($transfommer->transform('1'));
        $this->assertTrue($transfommer->transform(true));
        $this->assertTrue($transfommer->transform(1));

        $this->assertFalse($transfommer->transform('false'));
        $this->assertFalse($transfommer->transform('0'));
        $this->assertFalse($transfommer->transform(false));
        $this->assertFalse($transfommer->transform(0));
    }

    /**
     * @expectedException \Symfony\Component\Form\Exception\TransformationFailedException
     */
    public function testReverseTransform()
    {
        $transfommer = new StringToBooleanDataTransformer();

        $this->assertTrue($transfommer->reverseTransform(true));
        $this->assertFalse($transfommer->reverseTransform(false));
        $transfommer->reverseTransform(1);
    }
}
