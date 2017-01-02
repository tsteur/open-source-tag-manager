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

/**
 * Bridge between system and application.
 *
 * @package SevenTag\InstallerBundle\Service
 */
class SystemContext
{
    /**
     * Run php version_compare function from php standard library
     *
     * @param  string $version1 First version number.
     * @param  string $version2 Second version number.
     * @param  string $operator If the third optional operator argument is specified, test for a particular relationship.
     * The possible operators are: <, lt, <=, le, >, gt, >=, ge, ==, =, eq, !=, <>, ne respectively.
     *
     * @return mixed
     */
    public static function versionCompare($version1, $version2, $operator)
    {
        return call_user_func_array("version_compare", [$version1, $version2, $operator]);
    }

    /**
     * Run php is_writable function from php standard library
     *
     * @param  string  $filename The filename being checked.
     * @return boolean
     */
    public static function isWritable($filename)
    {
        return call_user_func_array("is_writable", [$filename]);
    }

    /**
     * Run php class_exists function from php standard library
     *
     * @param  string  $className
     * @param  boolean $autoload
     * @return boolean
     */
    public static function classExists($className, $autoload = true)
    {
        return call_user_func_array("class_exists", [$className, $autoload]);
    }

    /**
     * Run php extension_loaded function from php standard library
     *
     * @param  string $name
     *
     * @return boolean
     */
    public static function extensionLoaded($name)
    {
        return call_user_func_array("extension_loaded", [$name]);
    }

    /**
     * Run php function_exists function from php standard library
     *
     * @param  string $functionName
     *
     * @return boolean
     */
    public static function functionExists($functionName)
    {
        return call_user_func_array("function_exists", [$functionName]);
    }
}
