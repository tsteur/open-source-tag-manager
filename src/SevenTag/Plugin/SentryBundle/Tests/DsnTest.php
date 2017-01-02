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

namespace SevenTag\Plugin\SentryBundle\Tests;

use SevenTag\Plugin\SentryBundle\Dsn;

/**
 * Class DsnTest
 * @package SevenTag\Plugin\SentryBundle\Tests
 */
class DsnTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldReturnFalseIfPrivateKeyIsNotDefined()
    {
        $dsn = new Dsn('https://00112233445566778899001122334455@app.getsentry.com/12345');

        $this->assertFalse($dsn->isValid());
    }

    /**
     * @test
     */
    public function itShouldReturnFalseIfPublicKeyIsNotDefined()
    {
        $dsn = new Dsn('https://:00112233445566778899001122334455@app.getsentry.com/12345');

        $this->assertFalse($dsn->isValid());
    }

    /**
     * @test
     */
    public function itShouldReturnFalseIfSchemaIsNotSupported()
    {
        $dsn = new Dsn('ftp://:00112233445566778899001122334455@app.getsentry.com/12345');

        $this->assertFalse($dsn->isValid());
    }

    /**
     * @test
     */
    public function itShouldReturnValidPrivateKey()
    {
        $dsn = new Dsn($this->validDsn());

        $this->assertTrue($dsn->isValid());
        $this->assertEquals('77112233445566778899001122334455', $dsn->getPrivateKey());
    }

    /**
     * @test
     */
    public function itShouldReturnValidPublicKey()
    {
        $dsn = new Dsn($this->validDsn());

        $this->assertTrue($dsn->isValid());
        $this->assertEquals('00112233445566778899001122334455', $dsn->getPublicKey());
    }

    /**
     * @test
     * @dataProvider schemaProvider
     * @param $schema
     */
    public function itShouldReturnValidSchema($schema)
    {
        $dsn = new Dsn($this->validDsn($schema));

        $this->assertTrue($dsn->isValid());
        $this->assertEquals($schema, $dsn->getSchema());
    }

    /**
     * @test
     */
    public function itShouldReturnValidProject()
    {
        $dsn = new Dsn($this->validDsn());

        $this->assertTrue($dsn->isValid());
        $this->assertEquals('12345', $dsn->getProject());
    }

    /**
     * @test
     * @dataProvider serverProvider
     * @param $server
     */
    public function itShouldReturnValidNetLocation($server)
    {
        $dsn = new Dsn($this->validDsn('https', $server));

        $this->assertTrue($dsn->isValid());
        $this->assertEquals($server, $dsn->getNetLocation());
    }

    /**
     * @test
     */
    public function itShouldReturnValidPublicDsn()
    {
        $dsn = new Dsn($this->validDsn());

        $this->assertTrue($dsn->isValid());
        $this->assertEquals('https://00112233445566778899001122334455@app.getsentry.com/12345', $dsn->getPublicDsn());
    }

    /**
     * @param string $schema
     * @param string $server
     * @return string
     */
    private function validDsn($schema = 'https', $server = 'app.getsentry.com')
    {
        return sprintf(
            '%s://00112233445566778899001122334455:77112233445566778899001122334455@%s/12345',
            $schema,
            $server
        );
    }

    /**
     * @return array
     */
    public function schemaProvider()
    {
        return [
            ['https', 'http', 'ftp']
        ];
    }

    /**
     * @return array
     */
    public function serverProvider()
    {
        return [
            ['app.getsentry.com', 'app.getsentry.com:9009']
        ];
    }
}
