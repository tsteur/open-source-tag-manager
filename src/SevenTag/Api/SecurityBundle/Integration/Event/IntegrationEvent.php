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

namespace SevenTag\Api\SecurityBundle\Integration\Event;

use Symfony\Component\EventDispatcher\Event;
use SevenTag\Component\Integration\Model\IntegrationInterface;

/**
 * Class IntegrationEvent
 * @package SevenTag\Api\SecurityBundle\Integration
 */
class IntegrationEvent extends Event
{
    /**
     * @var IntegrationInterface
     */
    private $integration;

    /**
     * @param IntegrationInterface $integration
     */
    public function __construct(IntegrationInterface $integration)
    {
        $this->integration = $integration;
    }

    /**
     * @return IntegrationInterface
     */
    public function getIntegration()
    {
        return $this->integration;
    }
}
