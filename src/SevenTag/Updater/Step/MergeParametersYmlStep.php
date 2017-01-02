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
use Symfony\Component\Yaml\Dumper;
use Symfony\Component\Yaml\Parser;

/**
 * Class MergeParametersYmlStep
 * @package SevenTag\Updater\Step
 */
class MergeParametersYmlStep extends LocalInstanceStep
{
    /**
     * {@inheritdoc}
     */
    protected function doPerform(EnvironmentInterface $environment)
    {
        $newestInstanceFilesystem = $environment->getNewestInstance()->getFilesystem();
        $currentInstanceFilesystem = $environment->getCurrentInstance()->getFilesystem();

        $yaml = new Parser();
        $newestParameters = $yaml->parse($newestInstanceFilesystem->read('app/config/parameters.yml.dist'));
        $currentParameters = $yaml->parse($currentInstanceFilesystem->read('app/config/parameters.yml'));

        $dumper = new Dumper();

        $currentInstanceFilesystem->put(
            'app/config/parameters.yml',
            $dumper->dump(
                ['parameters' => array_replace($newestParameters['parameters'], $currentParameters['parameters'])],
                3
            )
        );
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return 'Merge parameters YML';
    }
}
