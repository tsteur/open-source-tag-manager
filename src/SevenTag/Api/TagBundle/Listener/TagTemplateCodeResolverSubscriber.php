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

namespace SevenTag\Api\TagBundle\Listener;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use SevenTag\Api\TagBundle\Template\HolderInterface;
use SevenTag\Component\Tag\Model\Tag;

/**
 * Class TagTemplateCodeResolverSubscriber
 * @package SevenTag\Api\TagBundle\Listener
 */
class TagTemplateCodeResolverSubscriber implements EventSubscriber
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
     * @param LifecycleEventArgs $event
     */
    public function generateCustomTemplateCode(LifecycleEventArgs $event)
    {
        $entity = $event->getEntity();

        if ($entity instanceof Tag && $this->templateHolder->has($entity->getTemplate())) {
            $provider = $this->templateHolder->get($entity->getTemplate());
            $provider->prePersist($entity);
        }
    }

    /**
     * @param LifecycleEventArgs $event
     */
    public function preUpdate(LifecycleEventArgs $event)
    {
        $this->generateCustomTemplateCode($event);
    }

    /**
     * @param LifecycleEventArgs $event
     */
    public function prePersist(LifecycleEventArgs $event)
    {
        $this->generateCustomTemplateCode($event);
    }

    /**
     * @return array
     */
    public function getSubscribedEvents()
    {
        return [
            'preUpdate',
            'prePersist'
        ];
    }
}
