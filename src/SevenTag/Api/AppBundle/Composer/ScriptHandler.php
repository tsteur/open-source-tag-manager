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

namespace SevenTag\Api\AppBundle\Composer;

use Composer\Script\CommandEvent;
use Symfony\Component\Yaml\Parser;

class ScriptHandler
{
    /**
     * @var array
     */
    private static $options = [
        'debugger-lib-target' => 'web/container-debugger'
    ];

    public static function buildContainerDebugger(CommandEvent $event)
    {
        $options = self::getOptions($event);

        $yamlParser = new Parser();
        $configuration = $yamlParser->parse(file_get_contents($options['incenteev-parameters']['file']));

        if (isset($configuration['parameters']['seventag_domain'])) {
            $files = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($options['debugger-lib-target'])
            );

            foreach ($files as $file) {
                if ($file->isFile()) {
                    $content = str_replace(
                        '##host##',
                        $configuration['parameters']['seventag_domain'] . '/container-debugger',
                        file_get_contents($file->getRealPath())
                    );

                    file_put_contents($file->getRealPath(), $content);
                }
            }
        }
    }

    /**
     * @param CommandEvent $event
     * @return array
     */
    protected static function getOptions(CommandEvent $event)
    {
        $options = array_merge(self::$options, $event->getComposer()->getPackage()->getExtra());

        return $options;
    }
}
