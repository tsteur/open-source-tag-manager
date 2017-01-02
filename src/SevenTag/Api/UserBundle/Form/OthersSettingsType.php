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

namespace SevenTag\Api\UserBundle\Form;

use SevenTag\Api\AppBundle\Language\LanguageProvider;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class OthersSettingsType
 * @package SevenTag\Api\UserBundle\Form
 */
class OthersSettingsType extends AbstractType
{

    /**
     * @var LanguageProvider
     */
    private $languageProvider;

    /**
     * @param LanguageProvider $languageProvider
     */
    public function __construct(LanguageProvider $languageProvider)
    {
        $this->languageProvider = $languageProvider;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('language', 'locale', [
                'choices' => $this->languageProvider->getLanguages()
            ]);
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'SevenTag\Api\UserBundle\Entity\User',
            'validation_groups' => ['Default', 'OthersSettings'],
            'allow_extra_fields' => false
        ]);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'seventag_userbundle_user_others_settings';
    }
}
