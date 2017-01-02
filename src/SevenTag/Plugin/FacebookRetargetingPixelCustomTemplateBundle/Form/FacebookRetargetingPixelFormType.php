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

namespace SevenTag\Plugin\FacebookRetargetingPixelCustomTemplateBundle\Form;

use SevenTag\Plugin\FacebookRetargetingPixelCustomTemplateBundle\FacebookRetargetingPixelEvent;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class FacebookRetargetingPixelFormType
 * @package SevenTag\Plugin\FacebookRetargetingPixelCustomTemplateBundle\Form
 */
class FacebookRetargetingPixelFormType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('pixelId', 'text')
            ->add('event', 'choice', [
                'choices' => $this->getChoices(),
                'required' => true,
            ]);
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'constraints' => new Collection([
                'fields' => [
                    'pixelId' => new NotBlank(),
                    'event' => new NotBlank()
                ]
            ])
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'facebook_retargeting_pixel_form_type';
    }

    /**
     * @return array
     */
    private function getChoices()
    {
        return [
            FacebookRetargetingPixelEvent::VIEW_CONTENT => FacebookRetargetingPixelEvent::VIEW_CONTENT,
            FacebookRetargetingPixelEvent::SEARCH => FacebookRetargetingPixelEvent::SEARCH,
            FacebookRetargetingPixelEvent::ADD_TO_CART => FacebookRetargetingPixelEvent::ADD_TO_CART,
            FacebookRetargetingPixelEvent::ADD_TO_WISH_LIST => FacebookRetargetingPixelEvent::ADD_TO_WISH_LIST,
            FacebookRetargetingPixelEvent::INITIATE_CHECKOUT => FacebookRetargetingPixelEvent::INITIATE_CHECKOUT,
            FacebookRetargetingPixelEvent::ADD_PAYMENT_INFO => FacebookRetargetingPixelEvent::ADD_PAYMENT_INFO,
            FacebookRetargetingPixelEvent::LEAD => FacebookRetargetingPixelEvent::LEAD,
            FacebookRetargetingPixelEvent::COMPLETE_REGISTRATION => FacebookRetargetingPixelEvent::COMPLETE_REGISTRATION
        ];
    }
}
