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
namespace SevenTag\InstallerBundle\Service\Requirement;

use Symfony\Component\Validator\Exception\InvalidArgumentException;

/**
 * Represents a PHP requirement in form of a php.ini configuration.
 */
class PhpIniRequirement extends AbstractRequirement
{
    /**
     * Constructor that initializes the requirement.
     *
     * @param string        $cfgName           The configuration name used for ini_get()
     * @param bool|callback $evaluation        Either a boolean indicating whether the configuration should
     *                                         evaluate to true or false,
     *                                         or a callback function receiving the configuration value as
     *                                         parameter to determine the fulfillment of the requirement
     * @param bool          $approveCfgAbsence If true the Requirement will be fulfilled even if the configuration
     *                                         option does not exist, i.e. ini_get() returns false.
     *                                         This is helpful for abandoned configs in later PHP versions or configs
     *                                         of an optional extension, like Suhosin.
     *                                         Example: You require a config to be true but PHP later removes this
     *                                         config and defaults it to true internally.
     * @param string|null   $testMessage       The message for testing the requirement (when null and $evaluation
     *                                         is a boolean a default message is derived)
     * @param string|null   $helpHtml          The help text formatted in HTML for resolving the problem
     *                                         (when null and $evaluation is a boolean a default help is derived)
     * @param string|null   $helpText          The help text (when null, it will be inferred from
     *                                         $helpHtml, i.e. stripped from HTML tags)
     * @param bool          $optional          Whether this is only an optional recommendation not a mandatory requirement
     *
     * @throws InvalidArgumentException
     */
    public function __construct($cfgName, $evaluation, $approveCfgAbsence = false, $testMessage = null, $helpHtml = null, $helpText = null, $optional = false)
    {
        $cfgValue = ini_get($cfgName);

        if (is_callable($evaluation)) {
            if (null === $testMessage || null === $helpHtml) {
                throw new InvalidArgumentException('You must provide the parameters testMessage and helpHtml for a callback evaluation.');
            }

            $fulfilled = call_user_func($evaluation, $cfgValue);
        } else {
            if (null === $testMessage) {
                $testMessage = sprintf(
                    '%s %s be %s in php.ini',
                    $cfgName,
                    $optional ? 'should' : 'must',
                    $evaluation ? 'enabled' : 'disabled'
                );
            }

            if (null === $helpHtml) {
                $helpHtml = sprintf(
                    'Set <strong>%s</strong> to <strong>%s</strong> in php.ini<a href="#phpini">*</a>.',
                    $cfgName,
                    $evaluation ? 'on' : 'off'
                );
            }

            $fulfilled = $evaluation == $cfgValue;
        }

        parent::__construct($fulfilled || ($approveCfgAbsence && false === $cfgValue), $testMessage, $helpHtml, $helpText, $optional);
    }
}
