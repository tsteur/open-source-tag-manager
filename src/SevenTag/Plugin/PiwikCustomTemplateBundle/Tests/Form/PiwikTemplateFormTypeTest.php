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

namespace SevenTag\Plugin\PiwikCustomTemplateBundle\Tests\Form;

use SevenTag\Plugin\PiwikCustomTemplateBundle\Form\PiwikTemplateFormType;
use SevenTag\Plugin\PiwikCustomTemplateBundle\Form\PiwikTrackEventFormType;
use SevenTag\Plugin\PiwikCustomTemplateBundle\Form\PiwikTrackGoalFormType;
use Symfony\Component\Form\PreloadedExtension;
use Symfony\Component\Form\Test\TypeTestCase;

/**
 * Class PiwikTemplateFormTypeTest
 * @package SevenTag\Plugin\PiwikCustomTemplateBundle\Tests\Form
 */
class PiwikTemplateFormTypeTest extends TypeTestCase
{
    protected function getExtensions()
    {
        $trackEventFormType = new PiwikTrackEventFormType();
        $trackGoalFormType = new PiwikTrackGoalFormType();

        return [
            new PreloadedExtension(
                [
                    $trackEventFormType->getName() => $trackEventFormType,
                    $trackGoalFormType->getName() => $trackGoalFormType
                ],
                []
            )
        ];
    }

    public function testSubmitValidData()
    {
        $formData = [
            'piwikUrl' => 'piwik.url/',
            'piwikSiteId' => 1
        ];

        $formType = new PiwikTemplateFormType();
        $form = $this->factory->create($formType);

        $form->submit($formData);

        $this->assertTrue($form->isSynchronized());
        $this->assertEquals(
            [
                'piwikUrl' => 'piwik.url/',
                'piwikSiteId' => 1
            ],
            $form->getData()
        );
    }
}
