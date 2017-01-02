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

namespace SevenTag\Plugin\GoogleAdwordsCustomTemplateBundle\Form;

use SevenTag\Api\AppBundle\DataTransformer\StringToBooleanDataTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Choice;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Type;

/**
 * Class GoogleAdwordsTemplateFormType
 * @package SevenTag\Plugin\GoogleAdwordsCustomTemplateBundle\Form
 */
class GoogleAdwordsTemplateFormType extends AbstractType
{
    /**
     * @var array
     */
    private $types = [
        'conversion_tracking',
        'remarketing'
    ];

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('conversionId', 'text')
            ->add('conversionLabel', 'text')
            ->add('remarketingOnly', 'checkbox')
            ->add('type', 'choice', ['choices' => $this->getAllowedTypes()])
            ->add('conversionValue', 'text');

        $builder->get('remarketingOnly')
            ->addModelTransformer(new StringToBooleanDataTransformer());
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
                        'allowExtraFields' => true,
                        'fields' => [
                            'conversionId' => new NotBlank(),
                            'remarketingOnly' => new Type('boolean'),
                            'type' => new Choice(['choices' => $this->getAllowedTypes()])
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
        return 'google_adwords_template_form_type';
    }

    /**
     * {@inheritdoc}
     */
    protected function getAllowedTypes()
    {
        return array_combine($this->types, $this->types);
    }
}
