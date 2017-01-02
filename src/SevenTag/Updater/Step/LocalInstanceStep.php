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
use SevenTag\Updater\Exception\UnsupportedEnvironmentException;
use SevenTag\Updater\Instance\InstanceInterface;
use SevenTag\Updater\Instance\LocalInstance;

/**
 * Class LocalInstanceStep
 * @package SevenTag\Updater\Step
 */
abstract class LocalInstanceStep extends LoggableStep
{
    /**
     * {@inheritdoc}
     */
    public function perform(EnvironmentInterface $environment)
    {
        $this->validateLocalInstance($environment->getCurrentInstance());
        $this->validateLocalInstance($environment->getNewestInstance());

        $this->doPerform($environment);
    }

    /**
     * @param InstanceInterface $instance
     * @return bool
     */
    protected function validateLocalInstance(InstanceInterface $instance)
    {
        if (!$instance instanceof LocalInstance) {
            throw new UnsupportedEnvironmentException(
                sprintf(
                    '%s support only %s class.',
                    get_class($this),
                    'SevenTag\Updater\Instance\LocalInstance'
                )
            );
        }
    }

    /**
     * @param EnvironmentInterface $environment
     */
    abstract protected function doPerform(EnvironmentInterface $environment);
}
