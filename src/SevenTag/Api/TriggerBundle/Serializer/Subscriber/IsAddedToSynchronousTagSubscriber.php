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

namespace SevenTag\Api\TriggerBundle\Serializer\Subscriber;

use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use JMS\Serializer\EventDispatcher\PreSerializeEvent;
use SevenTag\Component\Trigger\Model\TriggerInterface;

class IsAddedToSynchronousTagSubscriber implements EventSubscriberInterface
{

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            [
                'event' => 'serializer.pre_serialize',
                'method' => 'addInfoIsAddedToSynchronousTag'
            ]
        ];
    }

    /**
     * @param PreSerializeEvent $event
     */
    public function addInfoIsAddedToSynchronousTag(PreSerializeEvent $event)
    {
        $trigger = $event->getObject();
        if ($trigger instanceof TriggerInterface) {
            $tagsForTrigger = $trigger->getTags();
            $oneOfTagsIsSynchronous = false;

            foreach ($tagsForTrigger as $tag) {
                $oneOfTagsIsSynchronous = $oneOfTagsIsSynchronous || $tag->getIsSynchronous();
            }
            $trigger->setIsAddedToSynchronousTag($oneOfTagsIsSynchronous);
        }
    }
}
