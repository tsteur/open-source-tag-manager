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

namespace SevenTag\Api\TriggerBundle\VariableType;

/**
 * Interface VariableTypeInterface
 * @package SevenTag\Api\TriggerBundle\VariableType
 */
interface VariableTypeInterface
{
    const TYPE_URL = 'url';
    const TYPE_REFERRER = 'referrer';
    const TYPE_PATH = 'path';
    const TYPE_HOSTNAME = 'hostname';
    const TYPE_CAMPAIGN = 'utm_campaign';

    const TYPE_FORM_CLASSESS = 'form_classes';
    const TYPE_FORM_ID = 'form_id';
    const TYPE_FORM_URL = 'form_url';

    const TYPE_CLICK_URL = 'click_url';
    const TYPE_CLICK_ID = 'click_id';
    const TYPE_CLICK_CLASSES = 'click_classes';

    const TYPE_EVENT = 'Event';

    /**
     * @return string
     */
    public function getType();

    /**
     * @return string
     */
    public function getName();

    /**
     * @return array
     */
    public function getOptions();
}
