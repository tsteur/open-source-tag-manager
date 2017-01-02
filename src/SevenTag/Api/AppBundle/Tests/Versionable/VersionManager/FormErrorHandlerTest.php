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

namespace SevenTag\Api\AppBundle\Tests\Versionalbe\VersionManager;

use JMS\Serializer\Handler\HandlerRegistryInterface;
use JMS\Serializer\SerializerBuilder;
use SevenTag\Api\AppBundle\Tests\Versionable\DummyType;
use SevenTag\Api\TestBundle\Tests\TestCase\WebTestCase;

/**
 * Class FormErrorHandlerTest
 * @package SevenTag\Api\AppBundle\Serializer\Handler
 */
class FormErrorHandlerTest extends WebTestCase
{
    /** @var  $serializer \JMS\Serializer\Serializer */
    private $serializer;

    /**
     * {@inheritDoc}
     */
    public function setUp()
    {
        parent::setUp();

        $handler = $this->getContainer()
            ->get('jms_serializer.form_error_handler');

        $this->serializer = SerializerBuilder::create()
            ->configureHandlers(
                function (HandlerRegistryInterface $handlerRegistry) use ($handler) {
                    $handlerRegistry->registerSubscribingHandler($handler);
                }
            )
            ->build();
    }

    /**
     * @test
     */
    public function whetherFormHandlerReturnErrorsInJSONFormat()
    {
        $form = $this->createFormType();
        $form->submit([]);

        $this->assertFalse($form->isValid());

        $expectedResult = [
            'form' => [
                'This for form violation.',
                'This for form violation for nested form.',
            ],
            'fields' => [
                'name' => [
                    'This value should not be blank.'
                ],
                'description' => [],
                'nested' => [
                    'fields' => [
                        'nested_name' => ['This value should not be blank.'],
                        'nested_description' => []
                    ],
                ],
            ]
        ];

        $this->assertEquals(json_encode($expectedResult), $this->serializer->serialize($form, 'json'));
    }

    /**
     * @test
     */
    public function whetherFormHandlerReturnErrorsInXMLFormat()
    {
        $form = $this->createFormType();
        $form->submit([]);

        $this->assertFalse($form->isValid());

        $xml = <<<EOD
  <form name="">
      <errors>
        <entry>This for form violation.</entry>
        <entry>This for form violation for nested form.</entry>
      </errors>
      <form name="name">
        <errors>
          <entry>This value should not be blank.</entry>
        </errors>
       </form>
      <form name="description">
        <errors/>
      </form>
      <form name="nested">
        <errors/>
        <form name="nested_name">
          <errors>
            <entry>This value should not be blank.</entry>
          </errors>
        </form>
        <form name="nested_description">
          <errors/>
        </form>
      </form>
  </form>
EOD;

        $this->assertXmlStringEqualsXmlString($xml, $this->serializer->serialize($form, 'xml'));
    }

    /**
     * @return \Symfony\Component\Form\Form|\Symfony\Component\Form\FormInterface
     */
    private function createFormType()
    {
        return $this->getContainer()
            ->get('form.factory')
            ->createNamed(
                '',
                new DummyType(),
                [],
                [
                    'method' => 'POST',
                    'csrf_protection' => false
                ]
            );
    }
}
