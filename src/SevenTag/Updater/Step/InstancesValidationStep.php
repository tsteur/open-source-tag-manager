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

namespace SevenTag\Updater\Step;

use SevenTag\Updater\Environment\EnvironmentInterface;
use SevenTag\Updater\Exception\AbortedStepException;
use SevenTag\Updater\Exception\InvalidInstanceException;
use SevenTag\Updater\Instance\InstanceInterface;

/**
 * Class InstancesValidationStep
 * @package SevenTag\Updater\Step
 */
class InstancesValidationStep extends LocalInstanceStep
{
    /**
     * {@inheritdoc}
     */
    protected function doPerform(EnvironmentInterface $environment)
    {
        $this->validateInstance($environment->getCurrentInstance(), 'current');
        $this->validateInstance($environment->getNewestInstance(), 'newest');
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return 'Validate newest and current 7tag instances';
    }

    /**
     * @param InstanceInterface $instance
     * @param string $name
     * @throws InvalidInstanceException
     */
    protected function validateInstance(InstanceInterface $instance, $name)
    {
        if (!$instance->isValid()) {
            throw new InvalidInstanceException(
                sprintf(
                    'This is not valid %s 7tag instance. Cannot recognize valid composer.json.',
                    $name
                )
            );
        }
    }
}
