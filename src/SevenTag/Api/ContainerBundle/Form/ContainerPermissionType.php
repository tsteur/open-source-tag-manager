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

namespace SevenTag\Api\ContainerBundle\Form;

use SevenTag\Api\ContainerBundle\Form\DataTransformer\PermissionsToMaskTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class ContainerPermissionType
 * @package SevenTag\Api\ContainerBundle\Form
 */
class ContainerPermissionType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('permissions', 'text')
            ->add('user', 'entity', [
                'class' => 'SevenTagUserBundle:User'
            ]);

        $builder->get('permissions')
            ->addModelTransformer(
                new PermissionsToMaskTransformer()
            );
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'SevenTag\Api\ContainerBundle\Entity\ContainerPermission',
            'cascade_validation' => false,
            'validation_groups' => ['Permissions']
        ]);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return '';
    }
}
