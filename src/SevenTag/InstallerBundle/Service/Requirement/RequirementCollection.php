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

/**
 * A RequirementCollection represents a set of Requirement instances.
 */
class RequirementCollection implements \IteratorAggregate
{
    protected $requirements = [];

    /**
     * Gets the current RequirementCollection as an Iterator.
     *
     * @return Traversable A Traversable interface
     */
    public function getIterator()
    {
        return new ArrayIterator($this->requirements);
    }

    /**
     * Adds a Requirement.
     *
     * @param Requirement $requirement A Requirement instance
     */
    public function add(AbstractRequirement $requirement)
    {
        $this->requirements[] = $requirement;
    }

    /**
     * Adds a mandatory requirement in form of a php.ini configuration.
     *
     * @param string        $cfgName           The configuration name used for ini_get()
     *
     * @param bool|callback $evaluation        Either a boolean indicating whether the configuration should evaluate to
     *                                         true or false,
     *                                         or a callback function receiving the configuration value as parameter to
     *                                         determine the fulfillment of the requirement
     *
     * @param bool          $approveCfgAbsence If true the Requirement will be fulfilled even if the configuration
     *                                         option does not exist, i.e. ini_get() returns false.
     *                                         This is helpful for abandoned configs in later PHP versions
     *                                         or configs of an optional extension, like Suhosin.
     *                                         Example: You require a config to be true but PHP later
     *                                         removes this config and defaults it to true internally.
     *
     * @param string        $testMessage       The message for testing the requirement (when null and $evaluation
     *                                         is a boolean a default message is derived)
     *
     * @param string        $helpHtml          The help text formatted in HTML for resolving the problem
     *                                         (when null and $evaluation is a boolean a default help is derived)
     *
     * @param string|null   $helpText          The help text (when null, it will be inferred
     *                                         from $helpHtml, i.e. stripped from HTML tags)
     */
    public function addPhpIniRequirement($cfgName, $evaluation, $approveCfgAbsence = false, $testMessage = null, $helpHtml = null, $helpText = null)
    {
        $this->add(new PhpIniRequirement($cfgName, $evaluation, $approveCfgAbsence, $testMessage, $helpHtml, $helpText, false));
    }

    /**
     * Adds an optional recommendation in form of a php.ini configuration.
     *
     * @param string        $cfgName           The configuration name used for ini_get()
     *
     * @param bool|callback $evaluation        Either a boolean indicating whether the configuration should evaluate
     *                                         to true or false,
     *                                         or a callback function receiving the configuration value as parameter
     *                                         to determine the fulfillment of the requirement
     *
     * @param bool          $approveCfgAbsence If true the Requirement will be fulfilled even if the configuration
     *                                         option does not exist, i.e. ini_get() returns false.
     *
     *                                         This is helpful for abandoned configs in later PHP versions or configs
     *                                         of an optional extension, like Suhosin.
     *                                         Example: You require a config to be true but PHP later removes this
     *                                         config and defaults it to true internally.
     *
     * @param string        $testMessage       The message for testing the requirement (when null and $evaluation
     *                                         is a boolean a default message is derived)
     *
     * @param string        $helpHtml          The help text formatted in HTML for resolving the problem
     *                                         (when null and $evaluation is a boolean a default help is derived)
     *
     * @param string|null   $helpText          The help text (when null, it will be inferred from $helpHtml, i.e. stripped from HTML tags)
     */
    public function addPhpIniRecommendation($cfgName, $evaluation, $approveCfgAbsence = false, $testMessage = null, $helpHtml = null, $helpText = null)
    {
        $this->add(new PhpIniRequirement($cfgName, $evaluation, $approveCfgAbsence, $testMessage, $helpHtml, $helpText, true));
    }

    /**
     * Adds a requirement collection to the current set of requirements.
     *
     * @param RequirementCollection $collection A RequirementCollection instance
     */
    public function addCollection(RequirementCollection $collection)
    {
        $this->requirements = array_merge($this->requirements, $collection->all());
    }

    /**
     * Returns both requirements and recommendations.
     *
     * @return array Array of Requirement instances
     */
    public function all()
    {
        return $this->requirements;
    }

    /**
     * Returns all mandatory requirements.
     *
     * @return array Array of Requirement instances
     */
    public function getRequirements()
    {
        $array = [];
        foreach ($this->requirements as $req) {
            if (!$req->isOptional()) {
                $array[] = $req;
            }
        }

        return $array;
    }

    /**
     * Returns the mandatory requirements that were not met.
     *
     * @return array Array of Requirement instances
     */
    public function getFailedRequirements()
    {
        $array = [];
        foreach ($this->requirements as $req) {
            if (!$req->isFulfilled() && !$req->isOptional()) {
                $array[] = $req;
            }
        }

        return $array;
    }

    /**
     * Returns all optional recommendations.
     *
     * @return array Array of Requirement instances
     */
    public function getRecommendations()
    {
        $array = [];
        foreach ($this->requirements as $req) {
            if ($req->isOptional()) {
                $array[] = $req;
            }
        }

        return $array;
    }

    /**
     * Returns the recommendations that were not met.
     *
     * @return array Array of Requirement instances
     */
    public function getFailedRecommendations()
    {
        $array = [];
        foreach ($this->requirements as $req) {
            if (!$req->isFulfilled() && $req->isOptional()) {
                $array[] = $req;
            }
        }

        return $array;
    }

    /**
     * Returns whether a php.ini configuration is not correct.
     *
     * @return bool php.ini configuration problem?
     */
    public function hasPhpIniConfigIssue()
    {
        foreach ($this->requirements as $req) {
            if (!$req->isFulfilled() && $req instanceof PhpIniRequirement) {
                return true;
            }
        }

        return false;
    }

    /**
     * Returns the PHP configuration file (php.ini) path.
     *
     * @return string|false php.ini file path
     */
    public function getPhpIniConfigPath()
    {
        return get_cfg_var('cfg_file_path');
    }

    /**
     * Adds a mandatory requirement.
     *
     * @param bool        $fulfilled   Whether the requirement is fulfilled
     * @param string      $testMessage The message for testing the requirement
     * @param string      $helpHtml    The help text formatted in HTML for resolving the problem
     * @param string|null $helpText    The help text (when null, it will be inferred from $helpHtml, i.e. stripped from HTML tags)
     */
    public function addPhpRequirement($fulfilled, $testMessage, $helpHtml, $helpText = null)
    {
        $this->add(new PhpRequirement($fulfilled, $testMessage, $helpText, false));
    }

    /**
     * Returns the mandatory requirements that were not met for php.
     *
     * @return array Array of Requirement instances
     */
    public function getFailedPhpRequirements()
    {
        $array = [];
        foreach ($this->requirements as $req) {
            if (!$req->isFulfilled() && !$req->isOptional() && ($req instanceof PhpRequirement || $req instanceof PhpIniRequirement)) {
                $array[] = $req;
            }
        }

        return $array;
    }

    public function hasFailedPhpRequirements()
    {
        $requirements = $this->getFailedPhpRequirements();

        return !empty($requirements);
    }

    /**
     * Adds a mandatory requirement.
     *
     * @param bool        $fulfilled   Whether the requirement is fulfilled
     * @param string      $testMessage The message for testing the requirement
     * @param string      $helpHtml    The help text formatted in HTML for resolving the problem
     * @param string|null $helpText    The help text (when null, it will be inferred from $helpHtml, i.e. stripped from HTML tags)
     */
    public function addSystemRequirement($fulfilled, $testMessage, $helpHtml, $helpText = null)
    {
        $this->add(new SystemRequirement($fulfilled, $testMessage, $helpText, false));
    }

    /**
     * Returns the mandatory requirements that were not met for system.
     *
     * @return array Array of Requirement instances
     */
    public function getFailedSystemRequirements()
    {
        $array = [];
        foreach ($this->requirements as $req) {
            if (!$req->isFulfilled() && !$req->isOptional() && $req instanceof SystemRequirement) {
                $array[] = $req;
            }
        }

        return $array;
    }

    public function hasFailedSystemRequirements()
    {
        $requirements = $this->getFailedSystemRequirements();

        return !empty($requirements);
    }

    /**
     * Adds a mandatory requirement.
     *
     * @param bool        $fulfilled   Whether the requirement is fulfilled
     * @param string      $testMessage The message for testing the requirement
     * @param string      $helpHtml    The help text formatted in HTML for resolving the problem
     * @param string|null $helpText    The help text (when null, it will be inferred from $helpHtml, i.e. stripped from HTML tags)
     */
    public function addDatabaseRequirement($fulfilled, $testMessage, $helpHtml, $helpText = null)
    {
        $this->add(new DatabaseRequirement($fulfilled, $testMessage, $helpHtml, $helpText));
    }

    /**
     * Returns the mandatory requirements that were not met for database.
     *
     * @return array Array of Requirement instances
     */
    public function getFailedDatabaseRequirements()
    {
        $array = [];
        foreach ($this->requirements as $req) {
            if (!$req->isFulfilled() && !$req->isOptional() && $req instanceof DatabaseRequirement) {
                $array[] = $req;
            }
        }

        return $array;
    }

    public function hasFailedDatabaseRequirements()
    {
        $requirements = $this->getFailedDatabaseRequirements();

        return !empty($requirements);
    }
}
