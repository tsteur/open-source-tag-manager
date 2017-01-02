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

namespace SevenTag\InstallerBundle\Tests\Service\Requirement;

use Prophecy\Argument;
use SevenTag\InstallerBundle\Service\Requirement\DatabaseRequirement;
use SevenTag\InstallerBundle\Service\Requirement\PhpRequirement;
use SevenTag\InstallerBundle\Service\Requirement\RequirementCollection;

/**
 * Class RequirementCollectionTest
 * @package SevenTag\InstallerBundle\Tests\Service\Requirement
 */
class RequirementCollectionTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     */
    public function itShouldAddRequirements()
    {
        $requirementCollection = new RequirementCollection();
        $requirements = [
            new PhpRequirement(true, "", ""),
            new PhpRequirement(false, "", "")
        ];
        $requirementCollection->add($requirements[0]);
        $requirementCollection->add($requirements[1]);

        $this->assertCount(2, $requirementCollection->all());
    }

    /**
     * @test
     */
    public function itShouldReturnPhpFailedRequirements()
    {
        $requirementCollection = new RequirementCollection();
        $requirementCollection->add(new PhpRequirement(true, "", ""));
        $requirementCollection->add(new PhpRequirement(false, "", ""));
        $result = $requirementCollection->getFailedPhpRequirements();

        $this->assertCount(1, $result);
    }

    /**
     * @test
     */
    public function itShouldReturnDatabaseFailedRequirements()
    {
        $requirementCollection = new RequirementCollection();
        $requirementCollection->add(new PhpRequirement(true, "", ""));
        $requirementCollection->add(new DatabaseRequirement(false, "", ""));
        $requirementCollection->add(new PhpRequirement(false, "", ""));
        $result = $requirementCollection->getFailedDatabaseRequirements();

        $this->assertCount(1, $result);
    }
}
