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

namespace SevenTag\Api\SecurityBundle\Tests\Utils;

use OAuth2\OAuth2ServerException;
use SevenTag\Api\SecurityBundle\Utils\OAuth2ServerExceptionToResponseTransformer;

/**
 * Class OAuth2ServerExceptionToResponseTransformerTest
 * @package SevenTag\Api\SecurityBundle\Tests\Utils
 */
class OAuth2ServerExceptionToResponseTransformerTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itTransformsExceptionToResponse()
    {
        $transformer = new OAuth2ServerExceptionToResponseTransformer();
        $response = $transformer->transform(new OAuth2ServerException(401, 'OAuth Error', 'OAuth Error Description'));
        $content = $response->getContent();
        $statusCode = $response->getStatusCode();

        $this->assertInstanceOf('Symfony\Component\HttpFoundation\Response', $response);
        $this->assertEquals($content, json_encode([
            'errors' => [
                'form' => [
                    'OAuth Error Description'
                ]
            ]
        ]));
        $this->assertEquals($statusCode, 401);
    }
}
