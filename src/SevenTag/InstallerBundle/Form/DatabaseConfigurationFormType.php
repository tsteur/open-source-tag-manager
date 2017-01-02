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

namespace SevenTag\InstallerBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;

/**
 * Class DatabaseConfigurationFormType
 * @package SevenTag\Installer\Form
 */
class DatabaseConfigurationFormType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add(
                'hostname',
                'text',
                [
                    'constraints' => [
                        new NotBlank()
                    ],
                    'attr' => [
                        'placeholder' => 'Hostname'
                    ]
                ]
            )
            ->add(
                'name',
                'text',
                [
                    'constraints' => [
                        new NotBlank(),
                        new Regex(
                            [
                                'pattern' => '/^[a-z0-9_.-]+$/i',
                                'message' => "Only alphanumeric chars are allowed. Allowed special chars: . - _"
                            ]
                        )
                    ],
                    'attr' => [
                        'placeholder' => 'Database name'
                    ]
                ]
            )
            ->add(
                'username',
                'text',
                [
                    'constraints' => [
                        new NotBlank()
                    ],
                    'attr' => [
                        'placeholder' => 'Username'
                    ]
                ]
            )
            ->add(
                'password',
                'password',
                [

                    'attr' => [
                        'placeholder' => 'Password'
                    ]
                ]
            )
            ->add(
                'createDatabase',
                'checkbox'
            );
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'database';
    }
}
