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

namespace SevenTag\Api\ContainerBundle\TagTree\Handler;

use SevenTag\Api\TriggerBundle\TriggerType\Type\TypeInterface;
use SevenTag\Api\TriggerBundle\VariableType\VariableTypeInterface;

abstract class AbstractConditionsHandler extends ChainOfResponsibilityHandler
{
    const EVENT_PAGE_VIEW_SYNC = 'stg.pageView.sync';
    const EVENT_PAGE_VIEW = 'stg.pageView';
    const EVENT_PAGE_LOAD = 'stg.pageLoad';
    const EVENT_DOM_READY = 'stg.domReady';
    const EVENT_CLICK = 'stg.click';
    const EVENT_FORM_SUBMISSION = 'stg.formSubmit';

    /**
     * @return array
     */
    abstract public function getAllowedEventTypes();

    /**
     * @var array
     */
    protected $conditions = [];

    /**
     * {@inheritdoc}
     */
    public function handle($data)
    {
        $this->conditions = [];

        $this->addConditionForKnownTriggerType($data);
        $this->addConditionsForAlwaysStrategy($data);

        return $this->conditions;
    }

    protected function addConditionForKnownTriggerType($data)
    {
        $eventTypes = $this->getAllowedEventTypes();
        if (!isset($eventTypes[$data['type']])) {
            return;
        }

        $this->conditions[] = [
            'variable' => VariableTypeInterface::TYPE_EVENT,
            'action' => TypeInterface::ACTION_EQUALS,
            'value' => $eventTypes[$data['type']]
        ];
    }

    /**
     * @param $data
     * @return void
     */
    protected function addConditionsForAlwaysStrategy($data)
    {
        if (!isset($data['conditions']) || TypeInterface::STRATEGY_CONDITIONS !== $data['strategy']) {
            return;
        }

        foreach ($data['conditions'] as $condition) {
            $this->conditions[] = [
                'variable' => $condition['variable'],
                'action' => $condition['condition'],
                'value' => $condition['value']
            ];
        }
    }
}
