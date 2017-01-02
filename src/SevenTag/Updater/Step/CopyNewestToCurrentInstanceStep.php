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

use SevenTag\Updater\CopyStrategy\CopyStrategyInterface;
use SevenTag\Updater\Environment\EnvironmentInterface;

/**
 * Class CopyNewestToCurrentInstanceStep
 * @package SevenTag\Updater\Step
 */
class CopyNewestToCurrentInstanceStep extends LocalInstanceStep
{
    /**
     * @var CopyStrategyInterface
     */
    private $copyStrategy;

    /**
     * @param CopyStrategyInterface $copyStrategy
     */
    public function __construct(CopyStrategyInterface $copyStrategy)
    {
        $this->copyStrategy = $copyStrategy;
    }

    /**
     * {@inheritdoc}
     */
    protected function doPerform(EnvironmentInterface $environment)
    {
        $this->copyStrategy->copy(
            $environment->getCurrentInstance(),
            $environment->getNewestInstance()
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return 'Copy newest to current instance';
    }
}
