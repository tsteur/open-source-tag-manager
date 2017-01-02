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

/**
 * Class CheckPHPSettingsStep
 * @package SevenTag\Updater\Step
 */
class CheckPHPSettingsStep extends LocalInstanceStep
{
    /**
     * {@inheritdoc}
     */
    protected function doPerform(EnvironmentInterface $environment)
    {
        $memoryLimit = ini_get('memory_limit');
        if ($memoryLimit !== '-1') {
            throw new AbortedStepException(
                sprintf(
                    'There is problem with increase memory limit for updater. You current PHP installation allows only for %s bytes that is too small.',
                    $memoryLimit
                )
            );
        }

        $maxExecutionTime = ini_get('max_execution_time');
        if ($maxExecutionTime !== '0') {
            throw new AbortedStepException(
                sprintf(
                    'There is problem with increase max execution time for updater. You current PHP installation allows only for %s seconds that is too small.',
                    $maxExecutionTime
                )
            );
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return 'Check PHP settings';
    }
}
