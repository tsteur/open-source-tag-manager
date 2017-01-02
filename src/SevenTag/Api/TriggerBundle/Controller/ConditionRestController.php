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

namespace SevenTag\Api\TriggerBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use SevenTag\Api\AppBundle\Controller\RestController;
use SevenTag\Component\Container\Model\ContainerInterface;

/**
 * Class ConditionRestController
 * @package SevenTag\Api\TriggerBundle\Controller
 */
class ConditionRestController extends RestController
{
    /**
     * @ParamConverter("container", class="SevenTagContainerBundle:Container", converter="versionable_converter")
     * @Rest\Get("/containers/{id}/conditions")
     *
     * @Rest\View(
     *      serializerEnableMaxDepthChecks="true",
     *      serializerGroups={"variable"}
     * )
     *
     * @param ContainerInterface $container
     * @return mixed
     */
    public function getConditionTypesAction(ContainerInterface $container)
    {
        return $this->get('seven_tag.trigger_type.condition_preparator')
            ->getView($this->get('seven_tag.trigger_type.holder'), $container);
    }
}
