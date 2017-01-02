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

namespace SevenTag\Api\AppBundle\Versionable\Listener;

use Doctrine\ORM\EntityManagerInterface;
use SevenTag\Api\AppBundle\Versionable\VersionableRepositoryInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

/**
 * Class AccessIdSubscriber
 * @package SevenTag\Api\AppBundle\Versionable\Listener
 */
class AccessibleFormSubscriber implements EventSubscriberInterface
{
    /** @var EntityManagerInterface */
    protected $entityManager;
    /** @var string */
    protected $className;
    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            FormEvents::PRE_SUBMIT   => 'onPreSubmit',
        ];
    }

    public function onPreSubmit(FormEvent $event)
    {
        $values = $event->getData();

        if (!$values || empty($this->className)) {
            return;
        }

        $newValues = [];
        /** @var VersionableRepositoryInterface $repositoryManager */
        $repositoryManager = $this->entityManager->getRepository($this->className);
        foreach ($values as $row) {
            $validPK = $repositoryManager->findByAccessId($row);
            if ($validPK) {
                $newValues[] = $validPK->getId();
            }
        }

        $event->setData($newValues);
    }

    /**
     * @param string $className
     * @return AccessibleFormSubscriber
     */
    public function setClassName($className)
    {
        $this->className = $className;

        return $this;
    }
}
