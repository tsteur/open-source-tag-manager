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

namespace SevenTag\Api\TagBundle\Form;

use SevenTag\Api\TagBundle\Template\HolderInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class TagType
 * @package SevenTag\Api\TagBundle\Form
 */
class TagType extends AbstractType
{
    /**
     * @var HolderInterface
     */
    private $templateHolder;

    /**
     * @param HolderInterface $templateHolder
     */
    public function __construct(HolderInterface $templateHolder)
    {
        $this->templateHolder = $templateHolder;
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', null, ['description' => 'Tag name'])
            ->add('code', null, ['description' => 'Tag custom code'])
            ->add('documentWrite', null, ['description' => 'Allow document write'])
            ->add('disableInDebugMode', null, ['description' => 'Disable tag in debug mode'])
            ->add('respectVisitorsPrivacy', null, ['description' => 'Respect visitor privacy'])
            ->add('isSynchronous', null, ['description' => 'Is tag synchronous'])
            ->add('isActive', null, ['description' => 'Is tag active'])
            ->add(
                'triggers',
                'accessible',
                [
                    'class' => 'SevenTag\Api\TriggerBundle\Entity\Trigger',
                    'description' => 'Trigger assigned to tag'
                ]
            )
            ->add('priority', 'integer', ['description' => 'Tag priority'])
            ->add('template', 'text', ['description' => 'One of predefined tag templates']);

        $builder->addEventListener(
            FormEvents::PRE_SUBMIT,
            function (FormEvent $event) {
                $data = $event->getData();
                $form = $event->getForm();

                if (isset($data['template']) && !empty($data['template'])) {
                    $formType = $this->templateHolder->has($data['template'])
                        ? $this->templateHolder->get($data['template'])->getFormType() : 'collection';
                    $form->add('templateOptions', $formType);
                }
            }
        );
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
            [
                'data_class' => 'SevenTag\Api\TagBundle\Entity\Tag'
            ]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return '';
    }
}
