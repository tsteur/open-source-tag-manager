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
namespace SevenTag\InstallerBundle\Service;

use SevenTag\InstallerBundle\Service\Requirement\RequirementCollection;
use SevenTag\InstallerBundle\Service\SystemContext;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use SevenTag\InstallerBundle\Service\Requirement\PhpRequirement;
use SevenTag\InstallerBundle\Service\Requirement\DatabaseRequirement;
use SevenTag\InstallerBundle\Service\Requirement\SystemRequirement;

/**
 * Bridge between system and application.
 *
 * @package SevenTag\InstallerBundle\Service\Requirement
 */
class SevenTagRequirements extends RequirementCollection
{
    const REQUIRED_PHP_VERSION = '5.4.0';

    /**
     * @inheritdoc
     */
    public function __construct(SessionInterface $session, $rootDir)
    {
        $installedPhpVersion = phpversion();

        $this->addPhpRequirement(
            SystemContext::versionCompare($installedPhpVersion, static::REQUIRED_PHP_VERSION, '>='),
            sprintf('PHP version must be at least %s (%s installed)', static::REQUIRED_PHP_VERSION, $installedPhpVersion),
            sprintf(
                'You are running PHP version "<strong>%s</strong>", but Symfony needs at least PHP "<strong>%s</strong>"
                to run. Before using Symfony, upgrade your PHP installation, preferably to the latest version.',
                $installedPhpVersion,
                static::REQUIRED_PHP_VERSION
            ),
            sprintf('Install PHP %s or newer (installed version is %s)', static::REQUIRED_PHP_VERSION, $installedPhpVersion)
        );

        $cacheDir = is_dir($rootDir . '/../var/cache') ? $rootDir . '/../var/cache' : $rootDir .'/cache';

        $this->addSystemRequirement(
            SystemContext::isWritable($cacheDir),
            'var/cache/ directory must be writable',
            'Change the permissions of "<strong>var/cache/</strong>"
            directory so that the web server can write into it'
        );

        $this->addSystemRequirement(
            SystemContext::isWritable($rootDir . '/../web/containers'),
            'web/containers/ directory must be writable',
            'Change the permissions of either "<strong>web/containers/</strong>"
            directory so that the web server can write into it'
        );

        $this->addPhpIniRequirement(
            'date.timezone',
            true,
            false,
            'date.timezone setting must be set',
            'Set the "<strong>date.timezone</strong>" setting in php.ini<a href="#phpini">*</a> (like Europe/Paris)'
        );

        $timezones = [];
        foreach (\DateTimeZone::listAbbreviations() as $abbreviations) {
            foreach ($abbreviations as $abbreviation) {
                $timezones[$abbreviation['timezone_id']] = true;
            }
        }

        $this->addPhpRequirement(
            isset($timezones[@date_default_timezone_get()]),
            sprintf(
                'Configured default timezone "%s" must be supported by your installation of PHP',
                @date_default_timezone_get()
            ),
            'Your default timezone is not supported by PHP. Check for typos in your <strong>php.ini</strong>
            file and have a look at the list of deprecated timezones at
            <a href="http://php.net/manual/en/timezones.others.php">http://php.net/manual/en/timezones.others.php</a>.'
        );

        $this->addPhpRequirement(
            SystemContext::functionExists('json_encode'),
            'json_encode() must be available',
            'Install and enable the <strong>JSON</strong> extension.'
        );

        $this->addPhpRequirement(
            SystemContext::functionExists('session_start'),
            'session_start() must be available',
            'Install and enable the <strong>session</strong> extension.'
        );

        $this->addPhpRequirement(
            SystemContext::functionExists('ctype_alpha'),
            'ctype_alpha() must be available',
            'Install and enable the <strong>ctype</strong> extension.'
        );

        $this->addPhpRequirement(
            SystemContext::functionExists('token_get_all'),
            'token_get_all() must be available',
            'Install and enable the <strong>Tokenizer</strong> extension.'
        );

        $this->addPhpRequirement(
            SystemContext::functionExists('simplexml_import_dom'),
            'simplexml_import_dom() must be available',
            'Install and enable the <strong>SimpleXML</strong> extension.'
        );

        $this->addPhpIniRequirement('detect_unicode', false);

        if (SystemContext::extensionLoaded('suhosin')) {
            $this->addPhpIniRequirement(
                'suhosin.executor.include.whitelist',
                create_function('$cfgValue', 'return false !== stripos($cfgValue, "phar");'),
                false,
                'suhosin.executor.include.whitelist must be configured correctly in php.ini',
                'Add "<strong>phar</strong>" to <strong>suhosin.executor.include.whitelist</strong> in php.ini<a href="#phpini">*</a>.'
            );
        }

        if (SystemContext::extensionLoaded('xdebug')) {
            $this->addPhpIniRequirement(
                'xdebug.show_exception_trace',
                false,
                true
            );

            $this->addPhpIniRequirement(
                'xdebug.scream',
                false,
                true
            );

            $this->addPhpIniRecommendation(
                'xdebug.max_nesting_level',
                create_function('$cfgValue', 'return $cfgValue > 100;'),
                true,
                'xdebug.max_nesting_level should be above 100 in php.ini',
                'Set "<strong>xdebug.max_nesting_level</strong>" to e.g. "<strong>250</strong>"
                in php.ini<a href="#phpini">*</a> to stop Xdebug\'s infinite recursion protection
                erroneously throwing a fatal error in your project.'
            );
        }

        $pcreVersion = defined('PCRE_VERSION') ? (float) PCRE_VERSION : null;

        $this->addPhpRequirement(
            null !== $pcreVersion,
            'PCRE extension must be available',
            'Install the <strong>PCRE</strong> extension (version 8.0+).'
        );

        if (SystemContext::extensionLoaded('mbstring')) {
            $this->addPhpIniRequirement(
                'mbstring.func_overload',
                create_function('$cfgValue', 'return (int) $cfgValue === 0;'),
                true,
                'string functions should not be overloaded',
                'Set "<strong>mbstring.func_overload</strong>" to <strong>0</strong>
                in php.ini<a href="#phpini">*</a> to disable function overloading by the mbstring extension.'
            );
        }

        $this->addDatabaseRequirement(
            SystemContext::classExists('PDO'),
            'PDO should be installed',
            'Install <strong>PDO</strong> (mandatory for Doctrine).'
        );

        if (SystemContext::classExists('PDO')) {
            $drivers = \PDO::getAvailableDrivers();
            $this->addDatabaseRequirement(
                count($drivers) > 0,
                sprintf('PDO should have some drivers installed (currently available: %s)', count($drivers) ? implode(', ', $drivers) : 'none'),
                'Install <strong>PDO drivers</strong> (mandatory for Doctrine).'
            );

            $this->addDatabaseRequirement(
                $session->has('database'),
                'Database is not configured yet.',
                'Go to <a href="/install.php/configuration/database">configuration section</a> in order to configure database connection.'
            );
        }
    }
}
