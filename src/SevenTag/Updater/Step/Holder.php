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

/**
 * Class Holder
 * @package SevenTag\Updater\Step
 */
class Holder implements HolderInterface
{
    /**
     * @var \SplQueue
     */
    private $holder;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->holder = new \SplQueue();
    }

    /**
     * {@inheritdoc}
     */
    public function getIterator()
    {
        return $this->holder;
    }

    /**
     * {@inheritdoc}
     */
    public function add(StepInterface $step)
    {
        $this->holder->push($step);

        return $this;
    }
}
