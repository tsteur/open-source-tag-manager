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

namespace SevenTag\Plugin\VisualWebsiteOptimizerCustomTemplateBundle\Form;

use SevenTag\Api\AppBundle\DataTransformer\StringToBooleanDataTransformer;
use SevenTag\Plugin\VisualWebsiteOptimizerCustomTemplateBundle\ContentTracking;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Exception;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Choice;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Optional;
use Symfony\Component\Validator\Constraints\Type;

/**
 * Class VisualWebsiteOptimizerTemplateFormType
 * @package SevenTag\Plugin\VisualWebsiteOptimizerCustomTemplateBundle\Form
 */
class VisualWebsiteOptimizerTemplateFormType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('accountId', 'text');
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
            [
                'constraints' => new Collection(
                    [
                        'fields' => [
                            'accountId' => new NotBlank()
                        ]
                    ]
                )
            ]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'visual_website_optimizer_template_form_type';
    }
}
